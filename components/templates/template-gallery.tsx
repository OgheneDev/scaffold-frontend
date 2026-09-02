"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Loader2,
  FolderOpen,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { templatesApi } from "@/lib/api/templates";
import type { SortOption, Template, TemplateCategory } from "@/lib/types";
import { TEMPLATE_CATEGORIES } from "@/lib/types";
import { TemplateCard } from "@/components/templates/template-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Name (A–Z)", value: "name-asc" },
  { label: "Name (Z–A)", value: "name-desc" },
];

function parseCategory(value: string | null): TemplateCategory | null {
  if (!value) return null;
  return (TEMPLATE_CATEGORIES as string[]).includes(value)
    ? (value as TemplateCategory)
    : null;
}

function parseSort(value: string | null): SortOption {
  if (!value) return "name-asc";
  const validSorts = SORT_OPTIONS.map((s) => s.value);
  return validSorts.includes(value as SortOption)
    ? (value as SortOption)
    : "name-asc";
}

function formatCategoryName(cat: string): string {
  return cat
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function TemplateGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Seed filter state from URL
  const [category, setCategory] = useState<TemplateCategory | null>(() =>
    parseCategory(searchParams.get("category")),
  );
  const [sort, setSort] = useState<SortOption>(() =>
    parseSort(searchParams.get("sort")),
  );

  const fetchTemplates = useCallback(
    async (opts: {
      reset: boolean;
      cursor?: string | null;
      category: TemplateCategory | null;
      sort: SortOption;
    }) => {
      if (opts.reset) setLoading(true);
      else setLoadingMore(true);
      try {
        const res = await templatesApi.list({
          category: opts.category ?? undefined,
          sort: opts.sort,
          cursor: opts.cursor ?? undefined,
          limit: 12,
        });
        setTemplates((prev) =>
          opts.reset ? res.data : [...prev, ...res.data],
        );
        setCursor(res.nextCursor);
        setHasNextPage(res.hasNextPage);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  // Synchronize state with URL search params
  useEffect(() => {
    fetchTemplates({ reset: true, category, sort });

    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sort !== "name-asc") params.set("sort", sort);
    const qs = params.toString();
    router.replace(qs ? `/templates?${qs}` : "/templates", { scroll: false });
  }, [category, sort, fetchTemplates, router]);

  // Keep state updated if URL changes externally
  useEffect(() => {
    const urlCategory = parseCategory(searchParams.get("category"));
    const urlSort = parseSort(searchParams.get("sort"));
    setCategory((prev) => (prev !== urlCategory ? urlCategory : prev));
    setSort((prev) => (prev !== urlSort ? urlSort : prev));
  }, [searchParams]);

  const handleResetFilters = () => {
    setCategory(null);
    setSort("name-asc");
  };

  return (
    <div className="space-y-8">
      {/* Navigation Filter Bar */}
      <div className="flex flex-col gap-4 border-b border-border/60 pb-px sm:flex-row sm:items-center sm:justify-between">
        {/* Underline Tab Navigation for Categories */}
        <nav
          className="-mb-px flex items-center gap-6 overflow-x-auto scrollbar-none"
          aria-label="Template Categories"
        >
          {/* "All" Option */}
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`relative pb-3 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              category === null
                ? "text-fg font-semibold"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            All Templates
            {category === null && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-accent transition-all duration-200" />
            )}
          </button>

          {/* Category List */}
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat as TemplateCategory)}
                className={`relative pb-3 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "text-fg font-semibold"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {formatCategoryName(cat)}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-accent transition-all duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sort Dropdown Selector */}
        <div className="flex items-center gap-2 self-end pb-2 sm:pb-3">
          <ArrowUpDown className="h-3.5 w-3.5 text-fg-subtle" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-transparent text-xs font-medium text-fg-muted hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md py-1 px-1.5 cursor-pointer transition-colors"
            aria-label="Sort templates"
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-bg text-fg"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header Info */}
      {!loading && templates.length > 0 && (
        <div className="flex items-center justify-between text-xs text-fg-muted">
          <span>
            Showing {templates.length}{" "}
            {category ? formatCategoryName(category) : ""} template
            {templates.length === 1 ? "" : "s"}
          </span>
          {(category !== null || sort !== "name-asc") && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 hover:text-fg transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset filters
            </button>
          )}
        </div>
      )}

      {/* Grid Content / Skeletons / Empty State */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-border/50 bg-bg-elevated/30 p-3.5"
            >
              <Skeleton className="aspect-4/3 w-full rounded-xl bg-border/40" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-5 w-1/2 rounded-md bg-border/50" />
                <Skeleton className="h-3.5 w-4/5 rounded-md bg-border/30" />
              </div>
            </div>
          ))}
        </div>
      ) : templates.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-bg-elevated/20 py-20 px-4 text-center">
          <div className="mb-4 rounded-full bg-bg-inset p-3.5 border border-border/50 text-fg-subtle">
            <FolderOpen className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-semibold text-fg">
            No templates found
          </h3>
          <p className="mt-1.5 max-w-sm text-xs text-fg-muted">
            We couldn&apos;t find any templates in the &quot;
            {category ? formatCategoryName(category) : "selected"}&quot;
            category.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="mt-6 text-xs h-8"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Clear all filters
          </Button>
        </div>
      ) : (
        /* Template Gallery Grid */
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {/* Load More Pagination */}
          {hasNextPage && (
            <div className="flex flex-col items-center gap-3 pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  fetchTemplates({ reset: false, cursor, category, sort })
                }
                disabled={loadingMore}
                className="min-w-35 text-xs font-medium border-border/80 hover:bg-bg-elevated"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin text-accent" />
                    Loading...
                  </>
                ) : (
                  <span>Load more templates</span>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
