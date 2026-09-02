import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-6">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated px-6 py-12 text-center shadow-sm md:px-12 md:py-14">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="mx-auto max-w-xl font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl lg:text-4xl">
            Stop staring at a blank page. <br className="hidden sm:block" />
            Start from one that works.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-base text-fg-muted">
            Pick a template, customize it visually in your browser, and publish
            instantly.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 w-full sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group h-11 px-6 text-sm font-medium transition-all w-full sm:w-auto"
            >
              <Link href="/register">
                <span>Create your first site</span>
                <ArrowUpRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          </div>

          <p className="mt-5 font-mono text-xs text-fg-subtle flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-fg-subtle/40" />
            Free plan available · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
