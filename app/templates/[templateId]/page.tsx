"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { templatesApi } from "@/lib/api/templates";
import type { Template } from "@/lib/types";
import { SiteRenderer } from "@/components/site-renderer/site-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/auth/auth-store";

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

export default function TemplateDetailPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = use(params);
  const [template, setTemplate] = useState<Template | null>(null);
  const [notFound, setNotFound] = useState(false);
  const status = useAuthStore((s) => s.status);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    templatesApi
      .get(templateId)
      .then((t) => !cancelled && setTemplate(t))
      .catch(() => !cancelled && setNotFound(true));
    return () => {
      cancelled = true;
    };
  }, [templateId]);

  function handleUseTemplate() {
    const target = `/sites/new?templateId=${templateId}`;
    if (status === "authenticated") {
      router.push(target);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
    }
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg text-center">
        <p className="text-sm text-fg-muted">This template doesn&apos;t exist.</p>
        <Button asChild variant="secondary">
          <Link href="/templates">Back to templates</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/templates" className="shrink-0 text-fg-subtle transition-colors hover:text-fg">
              <ArrowLeft className="size-4" />
            </Link>
            {template ? (
              <div className="min-w-0">
                <p className="truncate font-display text-[15px] font-medium text-fg">{template.name}</p>
                <p className="text-xs text-fg-subtle">{CATEGORY_LABEL[template.category] ?? template.category}</p>
              </div>
            ) : (
              <Skeleton className="h-8 w-40" />
            )}
          </div>
          <Button onClick={handleUseTemplate} disabled={!template}>
            Use this template <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </header>

      {template?.description ? (
        <div className="mx-auto max-w-6xl px-6 pt-6">
          <p className="max-w-xl text-sm text-fg-muted">{template.description}</p>
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-4 flex items-center gap-2">
          {template ? <Badge variant="outline">{CATEGORY_LABEL[template.category] ?? template.category}</Badge> : null}
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          {template ? (
            <SiteRenderer content={template.content} />
          ) : (
            <div className="space-y-4 p-10">
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-64 w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
