import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SiteRenderer } from "@/components/site-renderer/site-renderer";
import type { Template } from "@/lib/types";

const CATEGORY_LABEL: Record<string, string> = {
  business: "Business",
  agency: "Agency",
  portfolio: "Portfolio",
  "real-estate": "Real Estate",
  restaurant: "Restaurant",
  ecommerce: "E-commerce",
  personal: "Personal",
  services: "Services",
  fitness: "Fitness",
  education: "Education",
  events: "Events",
  construction: "Construction",
};

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates/${template.id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-bg-elevated transition-colors hover:border-border-strong"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-bg-inset">
        <div
          className="pointer-events-none absolute left-0 top-0 w-[300%] origin-top-left transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ transform: "scale(0.3333)" }}
        >
          <SiteRenderer content={template.content} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-display text-[15px] font-medium text-fg">{template.name}</h3>
          <Badge variant="outline">{CATEGORY_LABEL[template.category] ?? template.category}</Badge>
        </div>
      </div>
    </Link>
  );
}
