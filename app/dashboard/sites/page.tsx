"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CirclePlus, LayoutGrid, List, Loader2, Plus } from "lucide-react";
import { sitesApi } from "@/lib/api/sites";
import type { Site, SiteStatus, SortOption } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteCard } from "@/components/sites/site-card";
import { SiteTable } from "@/components/sites/site-table";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";

type StatusFilter = "all" | SiteStatus;

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [view, setView] = useState<"grid" | "table">("grid");

  const fetchSites = useCallback(
    async (opts: { reset: boolean; cursor?: string | null }) => {
      if (opts.reset) setLoading(true);
      else setLoadingMore(true);
      try {
        const res = await sitesApi.list({
          status: status === "all" ? undefined : status,
          sort,
          cursor: opts.cursor ?? undefined,
          limit: 12,
        });
        setSites((prev) => (opts.reset ? res.data : [...prev, ...res.data]));
        setCursor(res.nextCursor);
        setHasNextPage(res.hasNextPage);
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 401) {
          // Session genuinely expired (refresh failed) — the auth store's
          // onUnauthorized hook already cleared state; middleware/Protected
          // will redirect to /login on next render. Nothing else to do here.
          return;
        }
        toast.error(
          err instanceof ApiError ? err.message : "Couldn't load your sites",
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [status, sort],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount/filter-change
    fetchSites({ reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, sort]);

  function handleChanged(updated: Site) {
    setSites((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }

  function handleDeleted(id: string) {
    setSites((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-fg">Sites</h1>
          <p className="mt-1 text-sm text-fg-muted">
            Manage every site you&apos;ve created.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/templates">
            <CirclePlus className="size-4" /> New site
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={status}
          onValueChange={(v) => setStatus(v as StatusFilter)}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="name-asc">Name A–Z</SelectItem>
              <SelectItem value="name-desc">Name Z–A</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-md border border-border p-0.5">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "rounded-sm p-1.5",
                view === "grid" ? "bg-bg-elevated text-fg" : "text-fg-subtle",
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setView("table")}
              className={cn(
                "rounded-sm p-1.5",
                view === "table" ? "bg-bg-elevated text-fg" : "text-fg-subtle",
              )}
              aria-label="Table view"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3.4] w-full" />
          ))}
        </div>
      ) : sites.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 px-6 py-20 text-center">
          <p className="text-sm text-fg-muted">
            {status === "all"
              ? "You haven&apos;t created a site yet."
              : `No ${status} sites yet.`}
          </p>
          <div className="flex gap-3">
            <Button asChild variant="secondary" size="sm">
              <Link href="/templates">Browse templates</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/templates">Create your first site</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sites.map((site) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  onChanged={handleChanged}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>
          ) : (
            <SiteTable
              sites={sites}
              onChanged={handleChanged}
              onDeleted={handleDeleted}
            />
          )}

          {hasNextPage ? (
            <div className="flex justify-center pt-2">
              <Button
                variant="secondary"
                onClick={() => fetchSites({ reset: false, cursor })}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                Load more
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
