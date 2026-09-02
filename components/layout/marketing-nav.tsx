"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutTemplate,
  Zap,
  Info,
  LogIn,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isAnchor: boolean;
  anchorId?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Templates",
    href: "/templates",
    isAnchor: false,
    icon: LayoutTemplate,
  },
  {
    label: "How it works",
    href: "#how-it-works",
    isAnchor: true,
    anchorId: "how-it-works",
    icon: Zap,
  },
  {
    label: "About us",
    href: "#about-us",
    isAnchor: true,
    anchorId: "about-us",
    icon: Info,
  },
];

export function MarketingNav() {
  const status = useAuthStore((s) => s.status);
  const isAuthed = status === "authenticated";

  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Handle header background blur on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlight (ScrollSpy)
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const anchorIds = NAV_ITEMS.filter(
      (item) => item.isAnchor && item.anchorId,
    ).map((item) => item.anchorId as string);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        } else {
          // Clear active state if this target section is no longer intersecting
          setActiveSection((prev) => (prev === entry.target.id ? "" : prev));
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -50% 0px", // Section must be within upper-middle viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    anchorIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Handle smooth scroll navigation with header offset (Without changing URL hash)
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      if (!item.isAnchor || !item.anchorId) return;

      e.preventDefault();
      setIsMobileMenuOpen(false);

      const scrollToTarget = (targetId: string) => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const headerOffset = 72;
          const elementPosition =
            targetEl.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      if (pathname !== "/") {
        // If on another route, navigate to homepage without hash and scroll after mount
        router.push("/");
        setTimeout(() => {
          scrollToTarget(item.anchorId!);
        }, 150);
        return;
      }

      // Smooth scroll without updating URL hash
      scrollToTarget(item.anchorId);
    },
    [pathname, router],
  );

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isLinkActive = (item: NavItem) => {
    if (!item.isAnchor) {
      return pathname === item.href;
    }
    return pathname === "/" && activeSection === item.anchorId;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled || isMobileMenuOpen
          ? "border-b border-border/60 bg-bg/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand & Logo */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="group flex items-center gap-3 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Scaffold Home"
        >
          <Image
            src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1788298054/ChatGPT_Image_Sep_1_2026_10_27_51_PM_b1eh04.png"
            alt="Scaffold Logo"
            width={32}
            height={32}
            className="rounded-md object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-fg">
            Scaffold
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/40 bg-bg-inset/40 p-1 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item);
            const Icon = item.icon;

            if (item.isAnchor) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                    active
                      ? "bg-bg-elevated text-fg shadow-sm border border-border/60"
                      : "text-fg-muted hover:text-fg hover:bg-bg-elevated/40"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${active ? "text-accent" : "text-fg-subtle"}`}
                  />
                  <span>{item.label}</span>
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  active
                    ? "bg-bg-elevated text-fg shadow-sm border border-border/60"
                    : "text-fg-muted hover:text-fg hover:bg-bg-elevated/40"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${active ? "text-accent" : "text-fg-subtle"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            {isAuthed ? (
              <Button
                asChild
                size="sm"
                className="h-9 px-4 text-xs font-medium shadow-sm"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 text-xs font-medium text-fg-muted hover:text-fg hover:bg-bg-elevated"
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="h-9 px-4 text-xs font-medium shadow-sm transition-transform active:scale-95"
                >
                  <Link href="/register">
                    <span>Get Started</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden size-9 text-fg-muted hover:text-fg hover:bg-bg-elevated"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen ? "Close navigation" : "Open navigation"
            }
          >
            {isMobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 h-[calc(100vh-4rem)] w-full bg-bg/95 backdrop-blur-md border-t border-border/60 px-6 py-6 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono text-fg-subtle uppercase tracking-wider mb-2 px-3">
              Navigation
            </span>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isLinkActive(item);
                const Icon = item.icon;

                if (item.isAnchor) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-bg-elevated text-fg font-semibold border border-border/40"
                          : "text-fg-muted hover:bg-bg-elevated/50 hover:text-fg"
                      }`}
                    >
                      <Icon
                        className={`size-4 ${active ? "text-accent" : "text-fg-subtle"}`}
                      />
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-bg-elevated text-fg font-semibold border border-border/40"
                        : "text-fg-muted hover:bg-bg-elevated/50 hover:text-fg"
                    }`}
                  >
                    <Icon
                      className={`size-4 ${active ? "text-accent" : "text-fg-subtle"}`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-border/60">
            {isAuthed ? (
              <Button asChild size="lg" className="w-full text-sm font-medium">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="mr-2 size-4" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full text-sm font-medium"
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="mr-2 size-4" />
                    Log in
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full text-sm font-medium"
                >
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get started free
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
