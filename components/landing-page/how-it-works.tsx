import React from "react";
import {
  MousePointerClick,
  PenLine,
  Rocket,
  MousePointer2,
} from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick a template",
    body: "Browse a gallery of full-page templates built for a dozen different industries, or start from something close and make it yours.",
    visual: (
      <div className="flex w-full items-end justify-center gap-3 overflow-hidden px-4 pt-6">
        <div className="h-20 w-1/3 rounded-t-lg border border-border/50 bg-bg-elevated/50 opacity-40 transition-opacity group-hover:opacity-70" />
        <div className="relative h-24 w-1/3 rounded-t-lg border-2 border-accent/60 bg-bg-elevated shadow-[0_0_15px_-3px_rgba(var(--accent),0.2)]">
          <div className="absolute -right-2 -top-2 rounded-full bg-accent p-1 text-white shadow-md">
            <MousePointerClick className="size-3" />
          </div>
          <div className="mx-auto mt-2 h-1.5 w-1/2 rounded bg-border-strong" />
          <div className="mx-auto mt-2 h-1 w-2/3 rounded bg-border" />
          <div className="mx-auto mt-1 h-1 w-1/2 rounded bg-border" />
        </div>
        <div className="h-16 w-1/3 rounded-t-lg border border-border/50 bg-bg-elevated/50 opacity-40 transition-opacity group-hover:opacity-70" />
      </div>
    ),
  },
  {
    icon: PenLine,
    title: "Edit it visually",
    body: "Click into any section — a hero, a pricing table, a gallery — and change the words, images, and theme without touching code.",
    visual: (
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="relative w-[85%] rounded-md border border-dashed border-accent bg-accent/5 p-3">
          {/* Simulated text lines */}
          <div className="mb-2 h-2 w-3/4 rounded-full bg-fg-muted" />
          <div className="h-2 w-1/2 rounded-full bg-fg-subtle/50" />

          {/* Floating UI Toolbar */}
          <div className="absolute -top-3 left-3 flex items-center gap-1.5 rounded bg-bg-elevated border border-border px-1.5 py-1 shadow-sm">
            <div className="size-1.5 rounded-full bg-fg-muted" />
            <div className="size-1.5 rounded-full bg-fg-muted" />
            <div className="h-2 w-px bg-border" />
            <div className="h-1.5 w-4 rounded bg-accent/80" />
          </div>

          {/* Cursor */}
          <MousePointer2 className="absolute -bottom-3 -right-2 size-5 text-fg drop-shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1" />
        </div>
      </div>
    ),
  },
  {
    icon: Rocket,
    title: "Publish instantly",
    body: "Ship to a Scaffold subdomain the moment it's ready, then keep tuning it. Every change autosaves as you go.",
    visual: (
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="relative flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-4 py-2 shadow-sm transition-all duration-300 group-hover:border-success/30 group-hover:shadow-[0_0_20px_-5px_rgba(var(--success),0.2)]">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex size-2.5 rounded-full bg-success"></span>
          </span>
          <span className="font-mono text-xs font-medium text-fg-muted transition-colors group-hover:text-fg">
            scaffold.app/live
          </span>
        </div>
      </div>
    ),
  },
];

const Steps = () => {
  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-6xl px-6 py-24 md:py-32"
    >
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 -z-10 h-125 w-200 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top_center,rgba(var(--accent),0.05)_0%,transparent_70%)]" />

      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-5xl">
          Three steps, no learning curve
        </h2>
        <p className="mt-5 text-lg text-fg-muted leading-relaxed max-w-xl">
          Everything after &quot;pick a template&quot; happens in the same
          visual editor real pages render in — what you see is exactly what
          ships.
        </p>
      </div>

      <div className="relative mt-16 lg:mt-24">
        {/* Connecting Line (Desktop Only) */}
        <div className="absolute left-[15%] right-[15%] top-12 hidden h-0.5 bg-linear-to-r from-transparent via-border to-transparent md:block" />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative flex flex-col rounded-2xl border border-border/50 bg-bg transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-bg-inset hover:shadow-lg hover:shadow-bg-elevated"
            >
              <div className="flex p-8 pb-0 items-center justify-between">
                <div className="relative z-10 flex size-12 items-center justify-center rounded-xl border border-border/50 bg-bg-elevated shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-accent/20 group-hover:bg-accent/10">
                  <step.icon className="size-5 text-accent" />
                </div>
                <span className="font-mono text-4xl font-bold text-border/40 transition-colors duration-300 group-hover:text-border-strong">
                  0{i + 1}
                </span>
              </div>

              {/* Micro-UI Visual Container */}
              <div className="mt-6 flex h-32 w-full items-center justify-center border-y border-border/30 bg-bg-inset/30">
                {step.visual}
              </div>

              <div className="p-8 pt-6">
                <h3 className="font-display text-xl font-semibold text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
