import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Layers, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Templates — Scaffold",
  description:
    "Explore our collection of production-ready templates. Pick one, make it yours, and deploy instantly.",
};

export default function TemplatesPage() {
  return (
    <div className="relative min-h-screen bg-bg selection:bg-accent/20 selection:text-accent">
      <MarketingNav />

      {/* Subtle background glow effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-112.5 w-full max-w-7xl -translate-x-1/2 opacity-40 blur-[120px]"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-linear-to-tr from-accent/20 via-transparent to-primary/10" />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {/* Header Section */}
        <header className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-border/40 pb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {/* Category Pill Tag */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-bg-elevated/80 px-3 py-1 text-xs font-medium text-fg-muted backdrop-blur-md shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Production-Ready Gallery</span>
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Templates
            </h1>
            <p className="mt-4 text-base text-fg-muted sm:text-lg">
              Every template renders through the same engine your published site
              will — pick one, customize it, and go live in minutes.
            </p>
          </div>

          {/* Quick Value Props */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-fg-muted">
            <div className="flex items-center gap-1.5 rounded-md bg-bg-inset/60 px-2.5 py-1.5 border border-border/40">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span>Instant Deploy</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-bg-inset/60 px-2.5 py-1.5 border border-border/40">
              <Layers className="h-3.5 w-3.5 text-accent" />
              <span>Fully Modular</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-bg-inset/60 px-2.5 py-1.5 border border-border/40">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span>SEO Optimized</span>
            </div>
          </div>
        </header>

        {/* Gallery with Skeleton Fallback */}
        <section>
          <Suspense fallback={<TemplateGallerySkeleton />}>
            <TemplateGallery />
          </Suspense>
        </section>

        {/* Bottom CTA Banner */}
        <section className="mt-20 rounded-2xl border border-border/60 bg-bg-elevated/40 p-8 text-center backdrop-blur-sm sm:p-12">
          <div className="mx-auto max-w-xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Need something custom?
            </h2>
            <p className="mt-3 text-sm text-fg-muted sm:text-base">
              Start with a blank canvas or generate a tailored structure from
              scratch using our automated site builder.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-10 px-5 text-xs font-medium shadow-sm"
              >
                <Link href="/register">
                  <span>Start from Scratch</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * Enhanced Skeleton component that mimics real template cards
 */
function TemplateGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-border/50 bg-bg-elevated/40 p-3.5 shadow-sm backdrop-blur-sm"
        >
          {/* Image Thumbnail Skeleton */}
          <Skeleton className="aspect-4/3 w-full rounded-xl bg-border/40" />

          {/* Details Skeleton */}
          <div className="mt-4 flex flex-1 flex-col justify-between space-y-3 px-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-2/5 rounded-md bg-border/50" />
                <Skeleton className="h-4 w-12 rounded-full bg-border/40" />
              </div>
              <Skeleton className="h-3.5 w-4/5 rounded-md bg-border/30" />
            </div>

            {/* Tags & Action Button Skeleton */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-14 rounded-full bg-border/30" />
                <Skeleton className="h-5 w-14 rounded-full bg-border/30" />
              </div>
              <Skeleton className="h-8 w-20 rounded-lg bg-border/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
