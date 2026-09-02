"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  Loader2,
  Rocket,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEditorStore, type SaveStatus } from "@/lib/editor/editor-store";
import { sitesApi } from "@/lib/api/sites";
import { ApiError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

function SaveStatusLabel({ status }: { status: SaveStatus }) {
  if (status === "saving") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
        <Loader2 className="size-3 animate-spin" /> Saving…
      </span>
    );
  }
  if (status === "saved") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
        <Check className="size-3 text-success" /> Saved
      </span>
    );
  }
  if (status === "error") {
    return <span className="text-xs text-danger">Couldn&apos;t save</span>;
  }
  if (status === "pending") {
    return <span className="text-xs text-fg-subtle">Unsaved changes</span>;
  }
  return null;
}

export function EditorTopBar() {
  const site = useEditorStore((s) => s.site);
  const name = useEditorStore((s) => s.name);
  const setName = useEditorStore((s) => s.setName);
  const saveStatus = useEditorStore((s) => s.saveStatus);
  const [publishing, setPublishing] = useState(false);

  async function togglePublish() {
    if (!site) return;
    setPublishing(true);
    try {
      const updated =
        site.status === "published"
          ? await sitesApi.unpublish(site.id)
          : await sitesApi.publish(site.id);
      useEditorStore.setState({ site: updated });
      toast.success(
        updated.status === "published" ? "Site published" : "Site unpublished",
      );
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Couldn't update publish status",
      );
    } finally {
      setPublishing(false);
    }
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-bg-elevated px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href="/dashboard/sites"
          className="shrink-0 text-fg-subtle transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-accent text-[13px] font-bold text-accent-foreground">
          B
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-fg outline-none focus:underline"
          style={{ maxWidth: 220 }}
        />
        <SaveStatusLabel status={saveStatus} />
      </div>

      <div className="flex items-center gap-2">
        {site ? (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/preview/${site.id}`} target="_blank">
              <Eye className="size-4" /> Preview
            </Link>
          </Button>
        ) : null}
        <Button
          size="sm"
          variant={site?.status === "published" ? "secondary" : "default"}
          onClick={togglePublish}
          disabled={!site || publishing}
        >
          {publishing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : site?.status === "published" ? (
            <RotateCcw className="size-4" />
          ) : (
            <Rocket className="size-4" />
          )}
          {site?.status === "published" ? "Unpublish" : "Publish"}
        </Button>
        {site?.status === "published" ? (
          <span
            className={cn(
              "hidden items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs text-success md:flex",
            )}
          >
            Live
          </span>
        ) : null}
      </div>
    </header>
  );
}
