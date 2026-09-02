import { NextRequest, NextResponse } from "next/server";

// The root domain this app is served from in production, e.g. "scaffold.app".
// Any request whose host is "{slug}.scaffold.app" is a published site and gets
// transparently rewritten to the public renderer route.
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "scaffold.app";

const PROTECTED_PREFIXES = ["/dashboard", "/sites/new", "/sites/"];

function getSiteSlugFromHost(host: string): string | null {
  const hostname = host.split(":")[0];

  // Local dev: "acme.localhost" -> "acme"
  if (hostname.endsWith(".localhost")) {
    const parts = hostname.split(".");
    return parts.length > 1 ? parts[0] : null;
  }

  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) return null;

  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return hostname.replace(`.${ROOT_DOMAIN}`, "");
  }

  return null;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const slug = getSiteSlugFromHost(host);

  if (slug) {
    const url = request.nextUrl.clone();
    url.pathname = `/platform-site/${slug}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (isProtected) {
    // This cookie is a non-authoritative hint only (see auth-store.ts). Real
    // authorization always happens client-side against the access token /
    // refresh cookie — this just avoids flashing protected UI to a browser
    // that we already know logged out.
    const hasSessionHint = request.cookies.get("scaffold_session");
    if (!hasSessionHint) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
