"use client";

import { use, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sitesApi } from "@/lib/api/sites";
import { ApiError } from "@/lib/api/client";
import { useEditorStore } from "@/lib/editor/editor-store";
import { useDebouncedCallback } from "@/lib/hooks/use-debounced-callback";
import { EditorTopBar } from "@/components/editor/editor-topbar";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { EditorPreview } from "@/components/editor/editor-preview";

export default function SiteEditorPage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = use(params);
  const router = useRouter();

  const site = useEditorStore((s) => s.site);
  const content = useEditorStore((s) => s.content);
  const name = useEditorStore((s) => s.name);
  const slug = useEditorStore((s) => s.slug);
  const isDirty = useEditorStore((s) => s.isDirty);
  const load = useEditorStore((s) => s.load);
  const markSaving = useEditorStore((s) => s.markSaving);
  const markSaved = useEditorStore((s) => s.markSaved);
  const markError = useEditorStore((s) => s.markError);

  const notFoundRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    sitesApi
      .get(siteId)
      .then((s) => !cancelled && load(s))
      .catch(() => {
        if (!cancelled) {
          notFoundRef.current = true;
          toast.error("That site doesn't exist or isn't yours.");
          router.replace("/dashboard/sites");
        }
      });
    return () => {
      cancelled = true;
      // Reset the store when navigating away so the next editor mount starts clean.
      useEditorStore.setState({ site: null, content: null, selectedSectionId: null, saveStatus: "idle", isDirty: false });
    };
  }, [siteId, load, router]);

  const debouncedSave = useDebouncedCallback(async () => {
    if (!site) return;
    markSaving();
    try {
      const updated = await sitesApi.update(site.id, { name, slug, content: content ?? undefined });
      markSaved(updated);
    } catch (err) {
      markError();
      toast.error(err instanceof ApiError ? err.message : "Couldn't save your changes");
    }
  }, 900);

  useEffect(() => {
    if (isDirty) debouncedSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, name, slug]);

  // Warn on tab close with unsaved changes.
  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  if (!site || !content) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <Loader2 className="size-5 animate-spin text-fg-subtle" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-bg">
      <EditorTopBar />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <EditorPreview />
      </div>
    </div>
  );
}
