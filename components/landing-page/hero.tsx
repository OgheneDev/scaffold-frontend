"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Check,
  ArrowUpRight,
  Pencil,
  Monitor,
  Smartphone,
  Tablet,
  Undo2,
  Redo2,
  Type,
  LayoutGrid,
  Square,
  Image as ImageIcon,
  MousePointer2,
  Globe,
  Bold,
  Italic,
  AlignLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const FRAMES = [
  {
    heading: "Your next big idea.",
    subheading: "Turn your concept into a live web application in minutes.",
    theme: "emerald",
    status: "editing",
    selectedElement: "heading",
  },
  {
    heading: "Your next big idea.",
    subheading: "Turn your concept into a live web application in minutes.",
    theme: "emerald",
    status: "published",
    selectedElement: "none",
  },
  {
    heading: "Built for the weekend.",
    subheading: "No complex setup or endless settings. Pure creative flow.",
    theme: "indigo",
    status: "editing",
    selectedElement: "heading",
  },
  {
    heading: "Built for the weekend.",
    subheading: "No complex setup or endless settings. Pure creative flow.",
    theme: "published",
    selectedElement: "none",
  },
];

const Hero = () => {
  const [frame, setFrame] = useState(0);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const current = FRAMES[frame];
  const isEditing = current.status === "editing";

  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12 md:pt-28 md:pb-24 overflow-hidden">
      <style>{`
        @keyframes cursorMoveDesktop {
          0%   { transform: translate(0px, 0px); opacity: 0; }
          15%  { opacity: 1; }
          45%  { transform: translate(140px, 28px); opacity: 1; }
          60%  { transform: translate(140px, 28px); opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translate(0px, 0px); opacity: 0; }
        }
        @keyframes cursorMoveMobile {
          0%   { transform: translate(0px, 0px); opacity: 0; }
          15%  { opacity: 1; }
          45%  { transform: translate(70px, 20px); opacity: 1; }
          60%  { transform: translate(70px, 20px); opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translate(0px, 0px); opacity: 0; }
        }
        @keyframes typeIn {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
        .heading-type {
          animation: typeIn 800ms steps(26, end) both;
        }
        .edit-cursor {
          animation: cursorMoveMobile 2.8s ease-in-out infinite;
        }
        @media (min-width: 640px) {
          .edit-cursor {
            animation: cursorMoveDesktop 2.8s ease-in-out infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .edit-cursor, .heading-type {
            animation: none !important;
          }
        }
      `}</style>

      <div className="grid gap-10 md:gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
        {/* Left Copy */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-bg-elevated/50 px-3 py-1 text-xs sm:text-sm text-fg-muted backdrop-blur-sm">
            <Sparkles className="size-3.5 text-accent" />
            <span>Scaffold is now live</span>
          </div>
          <h1 className="font-display text-4xl sm:text-[2.75rem] leading-[1.15] sm:leading-[1.05] font-semibold tracking-tight text-fg md:text-6xl lg:text-[4rem]">
            Your website, built this afternoon.
          </h1>
          <p className="mt-5 sm:mt-6 max-w-md text-base sm:text-lg leading-relaxed text-fg-muted">
            Scaffold turns a template into a finished site through a visual
            editor, not a page builder full of settings you&apos;ll never use.
            Pick a look, change the words, publish.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 px-6 text-base group shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40"
            >
              <Link href="/register">
                Start building free
                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-6 text-base transition-colors hover:bg-accent/5"
            >
              <Link href="/templates">Browse templates</Link>
            </Button>
          </div>
          <p className="mt-6 font-mono text-[12px] sm:text-[13px] text-fg-subtle flex items-center justify-center sm:justify-start gap-2">
            <span className="size-1.5 rounded-full bg-success/80" />
            no credit card · publish in minutes
          </p>
        </div>

        {/* Right Wireframe Editor Panel */}
        <div className="relative group mt-4 md:mt-0">
          <div className="relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-2xl transition-transform duration-300">
            {/* Editor Header Bar */}
            <div className="flex items-center justify-between border-b border-border bg-bg-inset/80 px-3 sm:px-4 py-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-border-strong hover:bg-red-400 transition-colors" />
                  <span className="size-2.5 rounded-full bg-border-strong hover:bg-amber-400 transition-colors" />
                  <span className="size-2.5 rounded-full bg-border-strong hover:bg-green-400 transition-colors" />
                </div>

                {/* Viewport Toggles */}
                <div className="ml-4 hidden sm:flex items-center gap-1 rounded-md border border-border/60 bg-bg-elevated p-0.5">
                  <button
                    onClick={() => setDevice("desktop")}
                    className={`rounded p-1 transition-colors ${device === "desktop" ? "bg-accent/15 text-accent" : "text-fg-muted hover:text-fg"}`}
                    aria-label="Desktop view"
                  >
                    <Monitor className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setDevice("tablet")}
                    className={`rounded p-1 transition-colors ${device === "tablet" ? "bg-accent/15 text-accent" : "text-fg-muted hover:text-fg"}`}
                    aria-label="Tablet view"
                  >
                    <Tablet className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setDevice("mobile")}
                    className={`rounded p-1 transition-colors ${device === "mobile" ? "bg-accent/15 text-accent" : "text-fg-muted hover:text-fg"}`}
                    aria-label="Mobile view"
                  >
                    <Smartphone className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* URL Address Bar */}
              <div className="flex h-6 max-w-40 sm:max-w-60 flex-1 items-center justify-center gap-1.5 rounded bg-bg-elevated px-2 border border-border/50 mx-2">
                <Globe className="size-3 text-fg-subtle shrink-0" />
                <span className="font-mono text-[10px] sm:text-[11px] text-fg-subtle truncate">
                  your-site.scaffold.app
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 text-fg-subtle">
                  <Undo2 className="size-3.5 hover:text-fg cursor-pointer" />
                  <Redo2 className="size-3.5 hover:text-fg cursor-pointer" />
                </div>
                <div className="h-3 w-px bg-border hidden sm:block" />
                <span
                  className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-medium ${isEditing ? "bg-amber-500/10 text-amber-500" : "bg-success/10 text-success"}`}
                >
                  {isEditing ? "Draft" : "Published"}
                </span>
              </div>
            </div>

            {/* Main Builder Area: Sidebar + Canvas */}
            {/* Fixed the invalid h-95 class to proper height breakpoints */}
            <div className="flex h-[340px] sm:h-[420px] bg-[#0c0f0a] text-fg">
              {/* Element Toolbar Sidebar */}
              <div className="hidden sm:flex w-12 flex-col items-center gap-4 border-r border-border/40 bg-bg-inset/30 py-4">
                <button
                  title="Select Tool"
                  className="p-1.5 rounded bg-accent/20 text-accent"
                >
                  <MousePointer2 className="size-4" />
                </button>
                <button
                  title="Add Text"
                  className="p-1.5 rounded hover:bg-bg-elevated text-fg-muted hover:text-fg transition-colors"
                >
                  <Type className="size-4" />
                </button>
                <button
                  title="Add Container"
                  className="p-1.5 rounded hover:bg-bg-elevated text-fg-muted hover:text-fg transition-colors"
                >
                  <Square className="size-4" />
                </button>
                <button
                  title="Add Image"
                  className="p-1.5 rounded hover:bg-bg-elevated text-fg-muted hover:text-fg transition-colors"
                >
                  <ImageIcon className="size-4" />
                </button>
                <button
                  title="Add Grid"
                  className="p-1.5 rounded hover:bg-bg-elevated text-fg-muted hover:text-fg transition-colors"
                >
                  <LayoutGrid className="size-4" />
                </button>
              </div>

              {/* Canvas Preview Wrapper */}
              <div className="relative flex-1 p-4 sm:p-6 overflow-hidden flex flex-col justify-between">
                {/* Subtle Grid Background for Canvas */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

                {/* Simulated Editor Cursor */}
                {isEditing && (
                  <div className="edit-cursor pointer-events-none absolute left-4 sm:left-6 top-12 sm:top-16 z-30 flex items-center gap-1.5">
                    <Pencil className="size-3.5 text-accent drop-shadow" />
                    <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] text-white shadow-md">
                      Editing
                    </span>
                  </div>
                )}

                {/* Canvas Page Navigation */}
                <div className="flex items-center justify-between border-b border-[#ffffff10] pb-2 sm:pb-3">
                  <div className="flex items-center gap-2">
                    <div className="size-4 sm:size-5 rounded-md bg-accent flex items-center justify-center font-bold text-[9px] sm:text-[10px] text-black">
                      S
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-white/80">
                      Acme Inc.
                    </span>
                  </div>
                  <div className="flex gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-white/50">
                    <span>Features</span>
                    <span>Pricing</span>
                    <span className="hidden sm:inline">About</span>
                  </div>
                </div>

                {/* Active Hero Section Block */}
                <div className="relative my-auto space-y-2.5 sm:space-y-3 p-3 sm:p-4 rounded-lg transition-all duration-300">
                  {/* Active Selection Bounding Box & Floating Toolbar */}
                  {isEditing && (
                    <div className="absolute -inset-1 rounded-md border-2 border-accent/80 pointer-events-none z-10 animate-in fade-in duration-200">
                      {/* Corner Handles */}
                      <span className="absolute -top-1 -left-1 size-2 rounded-sm bg-accent border border-white" />
                      <span className="absolute -top-1 -right-1 size-2 rounded-sm bg-accent border border-white" />
                      <span className="absolute -bottom-1 -left-1 size-2 rounded-sm bg-accent border border-white" />
                      <span className="absolute -bottom-1 -right-1 size-2 rounded-sm bg-accent border border-white" />

                      {/* Floating Text Formatting Toolbar (Repositioned for Mobile) */}
                      <div className="absolute -top-10 sm:-top-9 left-0 sm:left-2 flex items-center gap-1 sm:gap-1.5 rounded-md bg-bg-elevated border border-border px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs text-fg shadow-lg pointer-events-auto">
                        <span className="font-mono text-[9px] sm:text-[10px] text-accent font-semibold">
                          H1
                        </span>
                        <div className="h-3 w-px bg-border" />
                        <Bold className="size-3 text-fg-muted hover:text-fg cursor-pointer" />
                        <Italic className="size-3 text-fg-muted hover:text-fg cursor-pointer" />
                        <AlignLeft className="size-3 text-fg-muted hover:text-fg cursor-pointer" />
                        <div className="h-3 w-px bg-border" />
                        <span className="size-2 sm:size-2.5 rounded-full bg-accent cursor-pointer" />
                      </div>
                    </div>
                  )}

                  <div className="inline-block rounded-full bg-accent/20 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-accent">
                    New Release
                  </div>

                  {/* Heading */}
                  <h3
                    key={current.heading}
                    className="heading-type text-lg sm:text-xl font-semibold text-white tracking-tight"
                  >
                    {current.heading}
                  </h3>

                  {/* Subheading */}
                  <p className="text-[11px] sm:text-xs text-white/60 max-w-[240px] sm:max-w-xs leading-relaxed">
                    {current.subheading}
                  </p>

                  {/* CTAs */}
                  <div className="flex gap-2 pt-1 sm:pt-2">
                    <div className="h-6 sm:h-7 px-2.5 sm:px-3 rounded bg-accent text-white text-[10px] sm:text-[11px] font-medium flex items-center justify-center">
                      Get Started
                    </div>
                    <div className="h-6 sm:h-7 px-2.5 sm:px-3 rounded border border-white/20 text-white/70 text-[10px] sm:text-[11px] font-medium flex items-center justify-center">
                      Learn More
                    </div>
                  </div>
                </div>

                {/* Canvas Wireframe Feature Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-2 border-t border-[#ffffff10]">
                  <div className="rounded border border-white/10 bg-white/5 p-2 space-y-1.5">
                    <div className="size-2.5 sm:size-3 rounded-full bg-accent/40" />
                    <div className="h-1.5 w-full rounded bg-white/20" />
                    <div className="h-1.5 w-2/3 rounded bg-white/10" />
                  </div>
                  <div className="rounded border border-white/10 bg-white/5 p-2 space-y-1.5">
                    <div className="size-2.5 sm:size-3 rounded-full bg-accent/40" />
                    <div className="h-1.5 w-full rounded bg-white/20" />
                    <div className="h-1.5 w-2/3 rounded bg-white/10" />
                  </div>
                  <div className="hidden sm:block rounded border border-white/10 bg-white/5 p-2 space-y-1.5">
                    <div className="size-2.5 sm:size-3 rounded-full bg-accent/40" />
                    <div className="h-1.5 w-full rounded bg-white/20" />
                    <div className="h-1.5 w-2/3 rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Status Badge */}
          <div className="absolute -bottom-4 -left-4 hidden rounded-lg border border-border bg-bg-elevated px-3.5 py-2.5 shadow-xl lg:block transition-all z-20">
            <p className="text-[10px] font-medium text-fg-muted uppercase tracking-wider">
              {isEditing ? "Live Editing" : "Status"}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-fg">
              {isEditing ? (
                <>
                  <Pencil className="size-3.5 text-accent" /> Auto-saving
                  changes…
                </>
              ) : (
                <>
                  <Check className="size-3.5 text-success" /> Site up to date
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
