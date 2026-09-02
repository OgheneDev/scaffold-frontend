"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutTemplate,
  Zap,
  CircleDollarSign,
  LogIn,
  Rocket,
  LayoutDashboard,
} from "lucide-react";

export function MarketingNav() {
  const status = useAuthStore((s) => s.status);
  const isAuthed = status === "authenticated";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for the header background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "border-b border-border/60 bg-bg/80 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand & Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Scaffold Home"
        >
          <Image
            src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1788298054/ChatGPT_Image_Sep_1_2026_10_27_51_PM_b1eh04.png"
            alt="Scaffold Logo"
            width={37}
            height={37}
            className="rounded-[6px] object-contain shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-display text-[22px] font-semibold tracking-tight text-fg">
            Scaffold
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="/templates"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-accent/50 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-accent/50 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Zap className="h-4 w-4" />
            How it works
          </a>
          <a
            href="#pricing"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-accent/50 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CircleDollarSign className="h-4 w-4" />
            Pricing
          </a>
        </nav>

        {/* Desktop Auth Actions & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            {isAuthed ? (
              <Button
                asChild
                size="sm"
                className="font-medium shadow-sm transition-transform hover:scale-[1.02]"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="font-medium transition-colors hover:bg-accent/50"
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="font-medium shadow-sm transition-transform hover:scale-[1.02]"
                >
                  <Link href="/register">Start building</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-fg-muted hover:text-fg hover:bg-accent/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 h-[calc(100vh-4rem)] w-full bg-bg/95 backdrop-blur-md border-t border-border/60 px-4 py-6 flex flex-col gap-6 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            <Link
              href="/templates"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-fg-muted transition-colors hover:bg-accent/50 hover:text-fg"
            >
              <LayoutTemplate className="h-5 w-5" />
              Templates
            </Link>
            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-fg-muted transition-colors hover:bg-accent/50 hover:text-fg"
            >
              <Zap className="h-5 w-5" />
              How it works
            </a>
            <a
              href="#pricing"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-fg-muted transition-colors hover:bg-accent/50 hover:text-fg"
            >
              <CircleDollarSign className="h-5 w-5" />
              Pricing
            </a>
          </nav>

          <hr className="border-border/60" />

          <div className="flex flex-col gap-3 px-2">
            {isAuthed ? (
              <Button asChild size="lg" className="w-full font-medium">
                <Link href="/dashboard" onClick={closeMenu}>
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full font-medium"
                >
                  <Link href="/login" onClick={closeMenu}>
                    <LogIn className="mr-2 h-5 w-5" />
                    Log in
                  </Link>
                </Button>
                <Button asChild size="lg" className="w-full font-medium">
                  <Link href="/register" onClick={closeMenu}>
                    <Rocket className="mr-2 h-5 w-5" />
                    Start building
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
