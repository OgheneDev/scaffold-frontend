"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { templatesApi } from "@/lib/api/templates";
import type { SortOption, Template, TemplateCategory } from "@/lib/types";
import { TemplateCard } from "@/components/templates/template-card";
import { TemplateFilters } from "@/components/templates/template-filters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function TemplateGallery() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [category, setCategory] = useState<TemplateCategory | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");

  const fetchTemplates = useCallback(
    async (opts: { reset: boolean; cursor?: string | null }) => {
      if (opts.reset) setLoading(true);
      else setLoadingMore(true);
      try {
        const res = await templatesApi.list({
          category: category ?? undefined,
          sort,
          cursor: opts.cursor ?? undefined,
          limit: 12,
        });
        setTemplates((prev) => (opts.reset ? res.data : [...prev, ...res.data]));
        setCursor(res.nextCursor);
        setHasNextPage(res.hasNextPage);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, sort],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount/filter-change
    fetchTemplates({ reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort]);

  return (
    <div className="space-y-6">
      <TemplateFilters category={category} onCategoryChange={setCategory} sort={sort} onSortChange={setSort} />

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3.6] w-full" />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border py-20 text-center">
          <p className="text-sm text-fg-muted">No templates match that filter yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
          {hasNextPage ? (
            <div className="flex justify-center pt-2">
              <Button variant="secondary" onClick={() => fetchTemplates({ reset: false, cursor })} disabled={loadingMore}>
                {loadingMore ? <Loader2 className="size-4 animate-spin" /> : null}
                Load more
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
