import React from "react";
import { Layers, ShieldCheck, Code2, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: Layers,
    title: "Direct manipulation, not drag-and-drop bloat",
    description:
      "Most site builders wrap basic HTML in endless nested containers and heavy Javascript runtimes. Scaffold works directly on visual layout primitives with pristine output.",
  },
  {
    icon: Code2,
    title: "Engineered for speed & clean markup",
    description:
      "Every template is hand-crafted with standard web CSS variables and semantic HTML. The site you publish renders fast, ranks natively, and stays readable.",
  },
  {
    icon: ShieldCheck,
    title: "Zero lock-in philosophy",
    description:
      "Your content and code remain yours. Host directly on Scaffold subdomains or export clean production-ready code whenever you choose.",
  },
];

export function AboutUs() {
  return (
    <section
      id="about-us"
      className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 border-t border-border/40"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column Header */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-bg-elevated/50 px-3 py-1 text-xs text-fg-muted backdrop-blur-sm mb-4">
            <Sparkles className="size-3 text-accent" />
            <span>Our Philosophy</span>
          </div>

          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl lg:text-5xl leading-[1.15]">
            Built for creators who value clarity over complexity.
          </h2>

          <p className="mt-5 text-base text-fg-muted leading-relaxed max-w-md">
            Scaffold started with a simple observation: building a clean website
            should take an afternoon, not a week of configuration or wrestling
            with bloated page builders.
          </p>

          {/* Key Stat Minimalist Badge */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-6 max-w-sm">
            <div>
              <p className="font-mono text-2xl font-semibold text-fg">100%</p>
              <p className="text-xs text-fg-subtle mt-0.5">
                Semantic Web Standard
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-fg">
                &lt; 50ms
              </p>
              <p className="text-xs text-fg-subtle mt-0.5">Average Page Load</p>
            </div>
          </div>
        </div>

        {/* Right Column Value Cards */}
        <div className="lg:col-span-7 space-y-4">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="group rounded-xl border border-border/50 bg-bg-elevated/40 p-6 transition-all duration-200 hover:border-border-strong hover:bg-bg-elevated shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-bg-inset text-accent">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-fg">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
