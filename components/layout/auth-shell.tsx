"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left Pane: Auth Form */}
      <div className="flex flex-col justify-center px-8 py-16 sm:px-16 md:px-20">
        <Link
          href="/"
          className="group flex mb-5 items-center gap-2.5 rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-fit"
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
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold text-fg">
            {title}
          </h1>
          <p className="mt-2 text-sm text-fg-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-8 text-sm text-fg-muted">{footer}</div>
        </div>
      </div>

      {/* Right Pane: Animated Builder Wireframe */}
      <div className="relative hidden overflow-hidden bg-bg-inset md:block">
        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-16">
          <AnimatedBuilder />
        </div>
      </div>
    </div>
  );
}

/**
 * Extracted animated builder component to keep the shell clean.
 * Simulates a website being constructed in a miniature editor.
 */
function AnimatedBuilder() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Cycles through 4 steps to build the layout, then resets
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-[420px] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-2xl">
      {/* Browser / Editor Top Bar */}
      <div className="flex items-center justify-between border-b border-border bg-bg-elevated/50 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong/60" />
          <span className="size-2.5 rounded-full bg-border-strong/60" />
          <span className="size-2.5 rounded-full bg-border-strong/60" />
        </div>
        <div className="h-2 w-24 rounded-full bg-fg/10" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Sidebar (Tools) */}
        <div className="w-24 border-r border-border bg-bg-inset/50 p-3 space-y-3 hidden sm:block">
          <div className="h-2 w-10 rounded bg-fg/20 mb-4" />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-12 w-full rounded-md border border-dashed border-border transition-all duration-300 ${
                step === i
                  ? "bg-accent/10 border-accent/40 scale-95"
                  : "bg-bg-elevated"
              }`}
            />
          ))}
        </div>

        {/* Builder Canvas */}
        <div className="flex-1 bg-bg-inset p-5 relative overflow-hidden flex flex-col gap-4">
          {/* Component 1: Navbar */}
          <div
            className={`flex items-center justify-between rounded-lg border border-border bg-bg-elevated p-3 shadow-sm transition-all duration-500 ease-out ${
              step >= 1
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-4 opacity-0 scale-95"
            }`}
          >
            <div className="h-3 w-12 rounded-full bg-accent/80" />
            <div className="flex gap-2">
              <div className="h-2 w-6 rounded-full bg-fg/15" />
              <div className="h-2 w-6 rounded-full bg-fg/15" />
            </div>
          </div>

          {/* Component 2: Hero Section */}
          <div
            className={`flex flex-col items-center justify-center space-y-3 rounded-lg border border-border bg-bg-elevated py-8 shadow-sm transition-all duration-500 ease-out delay-100 ${
              step >= 2
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-4 opacity-0 scale-95"
            }`}
          >
            <div className="h-4 w-32 rounded bg-fg/80" />
            <div className="h-2 w-48 rounded bg-fg/20" />
            <div className="h-2 w-40 rounded bg-fg/20" />
            <div className="mt-2 h-6 w-20 rounded-md bg-accent" />
          </div>

          {/* Component 3: Feature Grid */}
          <div
            className={`grid grid-cols-2 gap-3 transition-all duration-500 ease-out delay-200 ${
              step >= 3
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-4 opacity-0 scale-95"
            }`}
          >
            <div className="h-20 rounded-lg border border-border bg-bg-elevated shadow-sm p-3 space-y-2">
              <div className="h-3 w-8 rounded-full bg-accent/40" />
              <div className="h-2 w-full rounded bg-fg/15" />
              <div className="h-2 w-3/4 rounded bg-fg/15" />
            </div>
            <div className="h-20 rounded-lg border border-border bg-bg-elevated shadow-sm p-3 space-y-2">
              <div className="h-3 w-8 rounded-full bg-accent/40" />
              <div className="h-2 w-full rounded bg-fg/15" />
              <div className="h-2 w-3/4 rounded bg-fg/15" />
            </div>
          </div>

          {/* Subtle builder grid background on empty canvas */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none -z-10 mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </div>
      </div>
    </div>
  );
}
