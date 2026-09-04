"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Globe,
  LayoutTemplate,
  Settings,
  Plus,
  LogOut,
  Menu,
  X,
  CirclePlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/dashboard/sites", label: "Sites", icon: Globe },
  { href: "/dashboard/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-accent/10 text-accent"
                : "text-fg-muted hover:bg-bg-elevated hover:text-fg",
            )}
          >
            <item.icon
              className={cn(
                "size-4.5 transition-transform group-hover:scale-110",
                active ? "text-accent" : "text-fg-subtle group-hover:text-fg",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Handle resize to close mobile menu on desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  const Logo = ({ className }: { className?: string }) => (
    <Image
      src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1788298054/ChatGPT_Image_Sep_1_2026_10_27_51_PM_b1eh04.png"
      alt="Scaffold Logo"
      width={26}
      height={26}
      className={cn("rounded-sm object-contain shadow-sm", className)}
    />
  );

  return (
    <div className="min-h-screen bg-bg md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-bg/50 px-4 py-5 md:flex backdrop-blur-xl">
        <Link
          href="/"
          className="mb-8 flex items-center gap-3 px-2 transition-opacity hover:opacity-80"
        >
          <Logo />
          <span className="font-display text-base font-semibold tracking-tight text-fg">
            Scaffold
          </span>
        </Link>

        <Button
          asChild
          className="mb-8 w-full justify-start font-medium text-md shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Link href="/dashboard/templates">
            <CirclePlus size={29} className="mr-2" /> New site
          </Link>
        </Button>

        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          Dashboard
        </div>
        <NavItems />

        <div className="mt-auto flex items-center gap-3 rounded-xl border border-border/40 bg-bg-elevated/50 p-3 shadow-sm">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
            {user?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-fg">
              {user?.name || "Builder"}
            </p>
            <p className="truncate text-xs text-fg-subtle">
              {user?.email || "builder@scaffold.app"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="shrink-0 rounded-md p-2 text-fg-subtle transition-colors hover:bg-bg hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Log out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-bg/80 px-4 py-3 backdrop-blur-md md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Logo className="size-6" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
            Scaffold
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-1.5 text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar Drawer */}
          <div className="relative flex w-72 max-w-[80vw] flex-col bg-bg-elevated p-5 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <Logo />
                <span className="font-display text-base font-semibold tracking-tight text-fg">
                  Scaffold
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-1.5 text-fg-muted transition-colors hover:bg-bg hover:text-fg"
              >
                <X className="size-5" />
              </button>
            </div>

            <Button asChild className="mb-8 w-full justify-start shadow-sm">
              <Link
                href="/dashboard/templates"
                onClick={() => setMobileOpen(false)}
              >
                <CirclePlus className="mr-2 size-4" /> New site
              </Link>
            </Button>

            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              Menu
            </div>
            <NavItems onNavigate={() => setMobileOpen(false)} />

            <button
              onClick={handleLogout}
              className="mt-auto flex items-center gap-3 rounded-lg border border-border/40 bg-bg p-3 text-sm font-medium text-fg-muted transition-colors hover:border-border hover:text-destructive"
            >
              <LogOut className="size-4.5" />
              Log out
            </button>
          </div>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 md:py-10 lg:px-12">
        <div className="mx-auto max-w-5xl animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
