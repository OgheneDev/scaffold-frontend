import Link from "next/link";
import {
  ArrowUpRight,
  MousePointerClick,
  PenLine,
  Rocket,
  Check,
  Sparkles,
} from "lucide-react";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { Button } from "@/components/ui/button";

const categories = [
  "Agency",
  "Portfolio",
  "Restaurant",
  "Real estate",
  "Fitness",
  "E-commerce",
  "Events",
  "Construction",
];

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick a template",
    body: "Browse a gallery of full-page templates built for a dozen different industries, or start from something close and make it yours.",
  },
  {
    icon: PenLine,
    title: "Edit it visually",
    body: "Click into any section — a hero, a pricing table, a gallery — and change the words, images, and theme without touching code.",
  },
  {
    icon: Rocket,
    title: "Publish instantly",
    body: "Ship to a Scaffold subdomain the moment it's ready, then keep tuning it. Every change autosaves as you go.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg selection:bg-accent/20">
      <MarketingNav />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-32 md:pb-28 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 opacity-20 blur-[100px] bg-gradient-to-b from-accent to-transparent rounded-full pointer-events-none" />

        <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-bg-elevated/50 px-3 py-1 text-sm text-fg-muted backdrop-blur-sm">
              <Sparkles className="size-3.5 text-accent" />
              <span>Scaffold 2.0 is now live</span>
            </div>
            <h1 className="font-display text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-fg md:text-6xl lg:text-[4rem]">
              Your website, built this afternoon.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
              Scaffold turns a template into a finished site through a visual
              editor, not a page builder full of settings you&apos;ll never use.
              Pick a look, change the words, publish.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 text-base group shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40"
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
                className="h-12 px-6 text-base transition-colors hover:bg-accent/5"
              >
                <Link href="/templates">Browse templates</Link>
              </Button>
            </div>
            <p className="mt-6 font-mono text-[13px] text-fg-subtle flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success/80 animate-pulse" />
              no credit card · publish in minutes
            </p>
          </div>

          <div className="relative group">
            {/* Ambient glow for mock browser */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-accent/20 to-border/10 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-80" />

            <div className="relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-2xl transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center gap-2 border-b border-border/80 bg-bg-inset/50 px-4 py-3 backdrop-blur-sm">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-border-strong hover:bg-red-400 transition-colors" />
                  <span className="size-2.5 rounded-full bg-border-strong hover:bg-amber-400 transition-colors" />
                  <span className="size-2.5 rounded-full bg-border-strong hover:bg-green-400 transition-colors" />
                </div>
                <div className="mx-auto flex h-6 w-2/3 items-center justify-center rounded bg-bg-elevated px-2 border border-border/50">
                  <span className="font-mono text-[11px] text-fg-subtle truncate">
                    legend-gym.scaffold.app
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-6" style={{ background: "#0e130a" }}>
                <div className="h-3 w-24 rounded-full bg-accent/70" />
                <div className="h-8 w-64 rounded-md bg-[#f4f3ee]/90" />
                <div className="h-3 w-3/4 rounded-full bg-[#f4f3ee]/30" />
                <div className="h-3 w-1/2 rounded-full bg-[#f4f3ee]/30" />
                <div className="flex gap-3 pt-4">
                  <div className="h-9 w-28 rounded-md bg-accent" />
                  <div className="h-9 w-24 rounded-md border border-[#f4f3ee]/20" />
                </div>
                <div className="grid grid-cols-3 gap-3 pt-6">
                  <div className="aspect-[4/3] rounded-md bg-[#f4f3ee]/10 transition-colors hover:bg-[#f4f3ee]/20" />
                  <div className="aspect-[4/3] rounded-md bg-[#f4f3ee]/10 transition-colors hover:bg-[#f4f3ee]/20" />
                  <div className="aspect-[4/3] rounded-md bg-[#f4f3ee]/10 transition-colors hover:bg-[#f4f3ee]/20" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-lg border border-border bg-bg-elevated px-4 py-3 shadow-xl sm:block animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              <p className="text-xs font-medium text-fg-muted uppercase tracking-wider">
                Published
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-fg">
                <Check className="size-4 text-success" /> Live in 4s
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="border-y border-border/60 bg-bg-inset/30 py-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-sm font-medium text-fg-subtle">
            Jumpstart your workflow with templates for:
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                href={`/templates?category=${c.toLowerCase()}`}
                key={c}
                className="rounded-full border border-border/80 bg-bg px-4 py-1.5 text-sm text-fg-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-fg hover:shadow-sm"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-6 py-24 md:py-32"
      >
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Three steps, no learning curve
          </h2>
          <p className="mt-4 text-lg text-fg-muted leading-relaxed">
            Everything after &quot;pick a template&quot; happens in the same
            visual editor real pages render in — what you see is exactly what
            ships.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-2xl border border-border/50 bg-bg p-8 transition-all hover:border-border hover:bg-bg-elevated hover:shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/15">
                  <step.icon className="size-6 text-accent" />
                </div>
                <span className="font-mono text-3xl font-bold text-fg-subtle/20 group-hover:text-fg-subtle/30 transition-colors">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium text-fg">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-bg-elevated to-bg px-8 py-20 text-center shadow-sm md:px-16">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl lg:text-5xl">
              Stop staring at a blank page. <br className="hidden md:block" />
              Start from one that works.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-fg-muted">
              Join thousands of creators building faster with Scaffold.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-accent/10 transition-transform hover:scale-[1.02]"
              >
                <Link href="/register">
                  Create your first site{" "}
                  <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-bg-inset/30 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-sm text-fg-subtle md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display font-medium text-fg">Scaffold</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-8">
            <Link href="/templates" className="transition-colors hover:text-fg">
              Templates
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-fg"
            >
              How it works
            </Link>
            <Link href="/login" className="transition-colors hover:text-fg">
              Log in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
