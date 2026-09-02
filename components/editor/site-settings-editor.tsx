"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/lib/editor/editor-store";

export function SiteSettingsEditor() {
  const name = useEditorStore((s) => s.name);
  const slug = useEditorStore((s) => s.slug);
  const setName = useEditorStore((s) => s.setName);
  const setSlug = useEditorStore((s) => s.setSlug);
  const site = useEditorStore((s) => s.site);

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-1.5">
        <Label htmlFor="site-name">Site name</Label>
        <Input id="site-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="site-slug">Slug</Label>
        <div className="flex items-center rounded-md border border-border bg-bg-inset focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
          <span className="pl-3 font-mono text-xs text-fg-subtle">scaffold.app/</span>
          <input
            id="site-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            className="w-full bg-transparent px-1.5 py-2 font-mono text-sm text-fg outline-none"
          />
        </div>
      </div>
      {site ? (
        <dl className="space-y-2 border-t border-border pt-4 text-xs text-fg-subtle">
          <div className="flex justify-between">
            <dt>Status</dt>
            <dd className="capitalize text-fg-muted">{site.status}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Created</dt>
            <dd className="text-fg-muted">{new Date(site.createdAt).toLocaleDateString()}</dd>
          </div>
          {site.publishedAt ? (
            <div className="flex justify-between">
              <dt>Published</dt>
              <dd className="text-fg-muted">{new Date(site.publishedAt).toLocaleDateString()}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </div>
  );
}
