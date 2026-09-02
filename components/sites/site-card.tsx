import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteStatusBadge } from "@/components/sites/site-status-badge";
import { SiteThumbnail } from "@/components/sites/site-thumbnail";
import { SiteActionsMenu } from "@/components/sites/site-actions-menu";
import { formatRelativeTime } from "@/lib/utils";
import type { Site } from "@/lib/types";

export function SiteCard({
  site,
  onChanged,
  onDeleted,
}: {
  site: Site;
  onChanged: (site: Site) => void;
  onDeleted: (id: string) => void;
}) {
  return (
    <Card className="group overflow-hidden">
      <Link href={`/sites/${site.id}/editor`} className="block border-b border-border">
        <SiteThumbnail content={site.content} />
      </Link>
      <div className="flex items-start justify-between gap-2 p-4">
        <div className="min-w-0">
          <Link href={`/sites/${site.id}/editor`} className="truncate text-sm font-medium text-fg hover:text-accent">
            {site.name}
          </Link>
          <p className="truncate font-mono text-xs text-fg-subtle">/{site.slug}</p>
          <div className="mt-2 flex items-center gap-2">
            <SiteStatusBadge status={site.status} />
            <span className="text-xs text-fg-subtle">{formatRelativeTime(site.updatedAt)}</span>
          </div>
        </div>
        <SiteActionsMenu site={site} onChanged={onChanged} onDeleted={onDeleted} />
      </div>
    </Card>
  );
}
