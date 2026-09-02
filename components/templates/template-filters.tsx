"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TEMPLATE_CATEGORIES, type SortOption, type TemplateCategory } from "@/lib/types";

const CATEGORY_LABEL: Record<TemplateCategory, string> = {
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

export function TemplateFilters({
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: {
  category: TemplateCategory | null;
  onCategoryChange: (c: TemplateCategory | null) => void;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            category === null ? "border-accent bg-accent-dim text-accent" : "border-border text-fg-muted hover:border-border-strong",
          )}
        >
          All
        </button>
        {TEMPLATE_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              category === c ? "border-accent bg-accent-dim text-accent" : "border-border text-fg-muted hover:border-border-strong",
            )}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="name-asc">Name A–Z</SelectItem>
            <SelectItem value="name-desc">Name Z–A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
