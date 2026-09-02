import type { SectionEntry, TemplateContent } from "@/lib/types";
import { siteThemeStyle, SiteThemeFonts } from "@/components/site-renderer/theme-provider";
import {
  AboutSection,
  CtaSection,
  FaqSection,
  FeaturesSection,
  FooterSection,
  GallerySection,
  HeroSection,
  NavbarSection,
  PricingSection,
  ServicesSection,
  StatsSection,
  TeamSection,
  TestimonialsSection,
} from "@/components/site-renderer/sections";

function SectionRenderer({ entry }: { entry: SectionEntry }) {
  const { section } = entry;
  switch (section.type) {
    case "navbar":
      return <NavbarSection content={section.content} />;
    case "hero":
      return <HeroSection content={section.content} />;
    case "features":
      return <FeaturesSection content={section.content} />;
    case "services":
      return <ServicesSection content={section.content} />;
    case "about":
      return <AboutSection content={section.content} />;
    case "stats":
      return <StatsSection content={section.content} />;
    case "testimonials":
      return <TestimonialsSection content={section.content} />;
    case "pricing":
      return <PricingSection content={section.content} />;
    case "faq":
      return <FaqSection content={section.content} />;
    case "gallery":
      return <GallerySection content={section.content} />;
    case "team":
      return <TeamSection content={section.content} />;
    case "cta":
      return <CtaSection content={section.content} />;
    case "footer":
      return <FooterSection content={section.content} />;
    default:
      return null;
  }
}

interface SiteRendererProps {
  content: TemplateContent;
  /** Optional wrapper to let the editor highlight/select individual sections without SiteRenderer knowing about editing at all. */
  renderSectionWrapper?: (entry: SectionEntry, children: React.ReactNode) => React.ReactNode;
  className?: string;
}

export function SiteRenderer({ content, renderSectionWrapper, className }: SiteRendererProps) {
  return (
    <div className={className} style={siteThemeStyle(content.theme)}>
      <SiteThemeFonts theme={content.theme} />
      {content.sections.map((entry) => {
        const rendered = <SectionRenderer key={entry.id} entry={entry} />;
        return renderSectionWrapper ? (
          <div key={entry.id}>{renderSectionWrapper(entry, rendered)}</div>
        ) : (
          rendered
        );
      })}
    </div>
  );
}
