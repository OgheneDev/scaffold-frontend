"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { sitesApi } from "@/lib/api/sites";
import type { Site } from "@/lib/types";
import { SiteRenderer } from "@/components/site-renderer/site-renderer";
import { Protected } from "@/components/layout/protected";
import { Button } from "@/components/ui/button";
import { SiteStatusBadge } from "@/components/sites/site-status-badge";

export default function PreviewPage({ params }: { params: Promise<{ siteId: string }> }) {
  return (
    <Protected>
      <PreviewContent params={params} />
    </Protected>
  );
}

function PreviewContent({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = use(params);
  const [site, setSite] = useState<Site | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    sitesApi
      .get(siteId)
      .then((s) => !cancelled && setSite(s))
      .catch(() => !cancelled && setNotFound(true));
    return () => {
      cancelled = true;
    };
  }, [siteId]);

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg text-center">
        <p className="text-sm text-fg-muted">That site doesn&apos;t exist or isn&apos;t yours.</p>
        <Button asChild variant="secondary">
          <Link href="/dashboard/sites">Back to sites</Link>
        </Button>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 className="size-5 animate-spin text-fg-subtle" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-bg-elevated px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link href={`/sites/${site.id}/editor`} className="flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg">
            <ArrowLeft className="size-4" /> Back to editor
          </Link>
          <SiteStatusBadge status={site.status} />
        </div>
        <span className="font-mono text-xs text-fg-subtle">Preview · /{site.slug}</span>
      </div>
      <SiteRenderer content={site.content} />
    </div>
  );
}
