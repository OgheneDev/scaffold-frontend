import { Menu } from "lucide-react";
import type {
  AboutContent,
  CtaContent,
  FaqContent,
  FeaturesContent,
  FooterContent,
  GalleryContent,
  HeroContent,
  NavbarContent,
  PricingContent,
  ServicesContent,
  StatsContent,
  TeamContent,
  TestimonialsContent,
} from "@/lib/types";

const container = "mx-auto w-full max-w-6xl px-6 md:px-10";
const radius = { borderRadius: "var(--site-radius)" };
const headingFont = { fontFamily: "var(--site-heading-font)" };

function Img({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--site-muted)]/40 text-xs text-[var(--site-foreground)]/50 ${className ?? ""}`}
        style={radius}
      >
        {alt || "Image"}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ""} className={className} style={radius} />;
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
export function NavbarSection({ content }: { content: NavbarContent }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--site-muted)]/20 bg-[var(--site-background)]/90 backdrop-blur">
      <div className={`${container} flex h-16 items-center justify-between`}>
        <span className="text-lg font-semibold" style={headingFont}>
          {content.logo}
        </span>
        <nav className="hidden items-center gap-8 md:flex">
          {content.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--site-foreground)]/75 transition-colors hover:text-[var(--site-foreground)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {content.button ? (
          <a
            href={content.button.href}
            className="hidden rounded-[var(--site-radius)] bg-[var(--site-primary)] px-4 py-2 text-sm font-medium text-[var(--site-background)] transition-opacity hover:opacity-90 md:inline-flex"
            style={radius}
          >
            {content.button.text}
          </a>
        ) : null}
        <Menu className="size-5 md:hidden" />
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section className={`${container} grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28`}>
      <div>
        {content.eyebrow ? (
          <p className="mb-4 text-sm font-medium text-[var(--site-primary)]">{content.eyebrow}</p>
        ) : null}
        <h1 className="text-4xl leading-[1.08] font-semibold md:text-5xl" style={headingFont}>
          {content.heading}
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--site-foreground)]/70">
          {content.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {content.primaryButton ? (
            <a
              href={content.primaryButton.href}
              className="rounded-[var(--site-radius)] bg-[var(--site-primary)] px-5 py-2.5 text-sm font-medium text-[var(--site-background)] transition-opacity hover:opacity-90"
              style={radius}
            >
              {content.primaryButton.text}
            </a>
          ) : null}
          {content.secondaryButton ? (
            <a
              href={content.secondaryButton.href}
              className="rounded-[var(--site-radius)] border border-[var(--site-muted)]/50 px-5 py-2.5 text-sm font-medium text-[var(--site-foreground)] transition-colors hover:border-[var(--site-foreground)]/40"
              style={radius}
            >
              {content.secondaryButton.text}
            </a>
          ) : null}
        </div>
      </div>
      {content.image ? (
        <Img src={content.image.src} alt={content.image.alt} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="aspect-[4/3] w-full rounded-[var(--site-radius)] bg-[var(--site-primary)]/10" style={radius} />
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------
export function FeaturesSection({ content }: { content: FeaturesContent }) {
  return (
    <section className={`${container} py-20`}>
      <SectionHeading heading={content.heading} description={content.description} />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <div key={item.title}>
            <div
              className="mb-4 flex size-10 items-center justify-center bg-[var(--site-primary)]/10 text-[var(--site-primary)]"
              style={radius}
            >
              <span className="text-sm font-semibold">{(item.icon || item.title)[0]}</span>
            </div>
            <h3 className="text-base font-semibold" style={headingFont}>
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--site-foreground)]/65">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
export function ServicesSection({ content }: { content: ServicesContent }) {
  return (
    <section className={`${container} py-20`}>
      <SectionHeading heading={content.heading} description={content.description} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <div key={item.title} className="overflow-hidden border border-[var(--site-muted)]/25" style={radius}>
            {item.image ? (
              <Img src={item.image.src} alt={item.image.alt} className="h-40 w-full object-cover" />
            ) : null}
            <div className="p-5">
              <h3 className="text-base font-semibold" style={headingFont}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--site-foreground)]/65">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section className={`${container} grid gap-12 py-20 md:grid-cols-2 md:items-center`}>
      {content.image ? (
        <Img src={content.image.src} alt={content.image.alt} className="aspect-square w-full object-cover" />
      ) : (
        <div className="aspect-square w-full bg-[var(--site-primary)]/10" style={radius} />
      )}
      <div>
        <h2 className="text-3xl font-semibold" style={headingFont}>
          {content.heading}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--site-foreground)]/70">{content.description}</p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export function StatsSection({ content }: { content: StatsContent }) {
  return (
    <section className={`${container} py-16`}>
      {content.heading ? (
        <h2 className="mb-10 text-center text-2xl font-semibold" style={headingFont}>
          {content.heading}
        </h2>
      ) : null}
      <div className="grid grid-cols-2 gap-8 border-t border-[var(--site-muted)]/25 pt-10 md:grid-cols-4">
        {content.items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-3xl font-semibold text-[var(--site-primary)]" style={headingFont}>
              {item.value}
            </div>
            <div className="mt-1 text-sm text-[var(--site-foreground)]/60">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export function TestimonialsSection({ content }: { content: TestimonialsContent }) {
  return (
    <section className={`${container} py-20`}>
      <SectionHeading heading={content.heading} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {content.items.map((item) => (
          <figure key={item.name} className="border border-[var(--site-muted)]/25 p-6" style={radius}>
            <blockquote className="text-[15px] leading-relaxed text-[var(--site-foreground)]/80">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Img
                src={item.avatar?.src}
                alt={item.avatar?.alt ?? item.name}
                className="size-9 shrink-0 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium">{item.name}</div>
                {item.role ? <div className="text-xs text-[var(--site-foreground)]/55">{item.role}</div> : null}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------
export function PricingSection({ content }: { content: PricingContent }) {
  return (
    <section className={`${container} py-20`}>
      <SectionHeading heading={content.heading} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {content.plans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col border p-6"
            style={{
              ...radius,
              borderColor: plan.highlighted ? "var(--site-primary)" : "color-mix(in srgb, var(--site-muted) 35%, transparent)",
              background: plan.highlighted ? "color-mix(in srgb, var(--site-primary) 6%, transparent)" : "transparent",
            }}
          >
            <h3 className="text-base font-semibold" style={headingFont}>
              {plan.name}
            </h3>
            <div className="mt-3 text-3xl font-semibold" style={headingFont}>
              {plan.price}
            </div>
            {plan.description ? (
              <p className="mt-2 text-sm text-[var(--site-foreground)]/60">{plan.description}</p>
            ) : null}
            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="text-sm text-[var(--site-foreground)]/75">
                  · {f}
                </li>
              ))}
            </ul>
            <a
              href={plan.button.href}
              className="mt-6 inline-flex justify-center px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                ...radius,
                background: plan.highlighted ? "var(--site-primary)" : "transparent",
                color: plan.highlighted ? "var(--site-background)" : "var(--site-foreground)",
                border: plan.highlighted ? "none" : "1px solid color-mix(in srgb, var(--site-muted) 45%, transparent)",
              }}
            >
              {plan.button.text}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export function FaqSection({ content }: { content: FaqContent }) {
  return (
    <section className={`${container} py-20`}>
      <SectionHeading heading={content.heading} />
      <div className="mx-auto mt-10 max-w-2xl divide-y divide-[var(--site-muted)]/25 border-y border-[var(--site-muted)]/25">
        {content.items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium">
              {item.question}
              <span className="ml-4 text-[var(--site-foreground)]/40 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[var(--site-foreground)]/65">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------
export function GallerySection({ content }: { content: GalleryContent }) {
  return (
    <section className={`${container} py-20`}>
      <SectionHeading heading={content.heading} />
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {content.images.map((img, i) => (
          <Img key={i} src={img.src} alt={img.alt} className="aspect-square w-full object-cover" />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------
export function TeamSection({ content }: { content: TeamContent }) {
  return (
    <section className={`${container} py-20`}>
      <SectionHeading heading={content.heading} />
      <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
        {content.members.map((m) => (
          <div key={m.name}>
            <Img src={m.image.src} alt={m.image.alt} className="aspect-square w-full object-cover" />
            <div className="mt-3 text-sm font-medium">{m.name}</div>
            <div className="text-xs text-[var(--site-foreground)]/55">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------
export function CtaSection({ content }: { content: CtaContent }) {
  return (
    <section className={`${container} py-20`}>
      <div
        className="flex flex-col items-center gap-5 px-8 py-16 text-center"
        style={{ ...radius, background: "color-mix(in srgb, var(--site-primary) 10%, transparent)" }}
      >
        <h2 className="max-w-lg text-3xl font-semibold" style={headingFont}>
          {content.heading}
        </h2>
        {content.description ? (
          <p className="max-w-md text-[15px] text-[var(--site-foreground)]/70">{content.description}</p>
        ) : null}
        <a
          href={content.button.href}
          className="mt-2 rounded-[var(--site-radius)] bg-[var(--site-primary)] px-6 py-2.5 text-sm font-medium text-[var(--site-background)] transition-opacity hover:opacity-90"
          style={radius}
        >
          {content.button.text}
        </a>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
export function FooterSection({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-[var(--site-muted)]/20 py-10">
      <div className={`${container} flex flex-col items-center justify-between gap-4 md:flex-row`}>
        <span className="text-sm font-semibold" style={headingFont}>
          {content.logo}
        </span>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {content.links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-[var(--site-foreground)]/60 hover:text-[var(--site-foreground)]">
              {link.label}
            </a>
          ))}
        </nav>
        <span className="text-xs text-[var(--site-foreground)]/45">{content.copyright}</span>
      </div>
    </footer>
  );
}

function SectionHeading({ heading, description }: { heading: string; description?: string }) {
  return (
    <div className="max-w-xl">
      <h2 className="text-3xl font-semibold" style={headingFont}>
        {heading}
      </h2>
      {description ? <p className="mt-3 text-[15px] text-[var(--site-foreground)]/65">{description}</p> : null}
    </div>
  );
}
