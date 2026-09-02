"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, CheckCircle2, FileEdit, Plus, LayoutTemplate, ArrowUpRight } from "lucide-react";
import { sitesApi } from "@/lib/api/sites";
import type { Site } from "@/lib/types";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteStatusBadge } from "@/components/sites/site-status-badge";
import { useAuthStore } from "@/lib/auth/auth-store";
import { formatRelativeTime } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const user = useAuthStore((s) => s.user);
  const [sites, setSites] = useState<Site[] | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    sitesApi.list({ limit: 50, sort: "newest" }).then((res) => {
      if (!cancelled) {
        setSites(res.data);
        setHasMore(res.hasNextPage);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const published = sites?.filter((s) => s.status === "published").length ?? 0;
  const drafts = sites?.filter((s) => s.status === "draft").length ?? 0;
  const total = sites?.length ?? 0;
  const recent = sites?.slice(0, 5) ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-fg">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Overview"}
          </h1>
          <p className="mt-1 text-sm text-fg-muted">Here&apos;s what&apos;s happening across your sites.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link href="/templates">
              <LayoutTemplate className="size-4" /> Browse templates
            </Link>
          </Button>
          <Button asChild>
            <Link href="/templates">
              <Plus className="size-4" /> New site
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="Total sites" value={sites ? `${total}${hasMore ? "+" : ""}` : <Skeleton className="h-8 w-10" />} icon={Globe} />
        <StatCard label="Published" value={sites ? published : <Skeleton className="h-8 w-10" />} icon={CheckCircle2} />
        <StatCard label="Drafts" value={sites ? drafts : <Skeleton className="h-8 w-10" />} icon={FileEdit} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-medium text-fg">Recently updated</h2>
          <Link href="/dashboard/sites" className="flex items-center gap-1 text-sm text-fg-muted hover:text-fg">
            View all <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {sites === null ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="text-sm text-fg-muted">You haven&apos;t created a site yet.</p>
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
          <Card className="divide-y divide-border">
            {recent.map((site) => (
              <Link
                key={site.id}
                href={`/sites/${site.id}/editor`}
                className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-bg-inset/40"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">{site.name}</p>
                  <p className="truncate font-mono text-xs text-fg-subtle">/{site.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <SiteStatusBadge status={site.status} />
                  <span className="hidden text-xs text-fg-subtle sm:inline">{formatRelativeTime(site.updatedAt)}</span>
                </div>
              </Link>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
