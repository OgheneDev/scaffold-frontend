"use client";

import { ArrowLeft, Copy, Trash2 } from "lucide-react";
import { useEditorStore } from "@/lib/editor/editor-store";
import { SECTION_META } from "@/lib/section-defaults";
import { Button } from "@/components/ui/button";
import {
  AboutForm,
  CtaForm,
  FaqForm,
  FeaturesForm,
  FooterForm,
  GalleryForm,
  HeroForm,
  NavbarForm,
  PricingForm,
  ServicesForm,
  StatsForm,
  TeamForm,
  TestimonialsForm,
} from "@/components/editor/section-forms";

export function SectionEditorPanel() {
  const content = useEditorStore((s) => s.content);
  const selectedSectionId = useEditorStore((s) => s.selectedSectionId);
  const selectSection = useEditorStore((s) => s.selectSection);
  const deleteSection = useEditorStore((s) => s.deleteSection);
  const duplicateSection = useEditorStore((s) => s.duplicateSection);
  const updateSectionContent = useEditorStore((s) => s.updateSectionContent);

  const entry = content?.sections.find((s) => s.id === selectedSectionId);
  if (!entry) return null;

  const meta = SECTION_META[entry.section.type];
  const onChange = (patch: Record<string, unknown>) => updateSectionContent(entry.id, patch);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          onClick={() => selectSection(null)}
          className="flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" /> {meta.label}
        </button>
        <div className="flex items-center gap-1">
          {!meta.singleton ? (
            <Button variant="ghost" size="icon" onClick={() => duplicateSection(entry.id)} aria-label="Duplicate section">
              <Copy className="size-4" />
            </Button>
          ) : null}
          {!meta.singleton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteSection(entry.id)}
              aria-label="Delete section"
              className="hover:text-danger"
            >
              <Trash2 className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {(() => {
          switch (entry.section.type) {
            case "navbar":
              return <NavbarForm content={entry.section.content} onChange={onChange} />;
            case "hero":
              return <HeroForm content={entry.section.content} onChange={onChange} />;
            case "features":
              return <FeaturesForm content={entry.section.content} onChange={onChange} />;
            case "services":
              return <ServicesForm content={entry.section.content} onChange={onChange} />;
            case "about":
              return <AboutForm content={entry.section.content} onChange={onChange} />;
            case "stats":
              return <StatsForm content={entry.section.content} onChange={onChange} />;
            case "testimonials":
              return <TestimonialsForm content={entry.section.content} onChange={onChange} />;
            case "pricing":
              return <PricingForm content={entry.section.content} onChange={onChange} />;
            case "faq":
              return <FaqForm content={entry.section.content} onChange={onChange} />;
            case "gallery":
              return <GalleryForm content={entry.section.content} onChange={onChange} />;
            case "team":
              return <TeamForm content={entry.section.content} onChange={onChange} />;
            case "cta":
              return <CtaForm content={entry.section.content} onChange={onChange} />;
            case "footer":
              return <FooterForm content={entry.section.content} onChange={onChange} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
