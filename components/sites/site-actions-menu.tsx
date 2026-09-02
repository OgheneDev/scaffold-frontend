"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Eye, Rocket, RotateCcw, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { sitesApi } from "@/lib/api/sites";
import { ApiError } from "@/lib/api/client";
import type { Site } from "@/lib/types";

export function SiteActionsMenu({
  site,
  onChanged,
  onDeleted,
}: {
  site: Site;
  onChanged: (site: Site) => void;
  onDeleted: (id: string) => void;
}) {
  const [busy, setBusy] = useState<"publish" | "delete" | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function togglePublish() {
    setBusy("publish");
    try {
      const updated = site.status === "published" ? await sitesApi.unpublish(site.id) : await sitesApi.publish(site.id);
      onChanged(updated);
      toast.success(updated.status === "published" ? "Site published" : "Site unpublished");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Couldn't update the site");
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    setBusy("delete");
    try {
      await sitesApi.remove(site.id);
      onDeleted(site.id);
      toast.success("Site deleted");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Couldn't delete the site");
    } finally {
      setBusy(null);
      setConfirmOpen(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" onClick={(e) => e.preventDefault()}>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/sites/${site.id}/editor`}>
              <Pencil /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/preview/${site.id}`} target="_blank">
              <Eye /> Preview
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); togglePublish(); }} disabled={busy === "publish"}>
            {busy === "publish" ? (
              <Loader2 className="animate-spin" />
            ) : site.status === "published" ? (
              <RotateCcw />
            ) : (
              <Rocket />
            )}
            {site.status === "published" ? "Unpublish" : "Publish"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={(e) => { e.preventDefault(); setConfirmOpen(true); }}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{site.name}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the site and everything in it. This can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy === "delete"}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={busy === "delete"}>
              {busy === "delete" ? <Loader2 className="size-4 animate-spin" /> : null}
              Delete site
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
