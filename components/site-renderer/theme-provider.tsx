import type { CSSProperties } from "react";
import type { Theme } from "@/lib/types";

// Google Fonts URL built from a plain font-family name, e.g. "Poppins" or
// "Playfair Display". React 19 hoists <link> tags rendered anywhere in the
// tree into <head>, so this works from a nested client or server component.
function fontHref(fontFamily: string) {
  const family = fontFamily.trim();
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(
    /%20/g,
    "+",
  )}:wght@400;500;600;700;800&display=swap`;
}

export function siteThemeStyle(theme: Theme): CSSProperties {
  return {
    "--site-primary": theme.colors.primary,
    "--site-secondary": theme.colors.secondary,
    "--site-background": theme.colors.background,
    "--site-foreground": theme.colors.foreground,
    "--site-muted": theme.colors.muted,
    "--site-heading-font": `"${theme.typography.headingFont}", sans-serif`,
    "--site-body-font": `"${theme.typography.bodyFont}", sans-serif`,
    "--site-radius": theme.borderRadius,
    backgroundColor: "var(--site-background)",
    color: "var(--site-foreground)",
    fontFamily: "var(--site-body-font)",
  } as CSSProperties;
}

export function SiteThemeFonts({ theme }: { theme: Theme }) {
  const fonts = new Set([theme.typography.headingFont, theme.typography.bodyFont]);
  return (
    <>
      {[...fonts].map((font) => (
        <link key={font} rel="stylesheet" href={fontHref(font)} />
      ))}
    </>
  );
}
