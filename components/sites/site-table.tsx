import Link from "next/link";
import { SiteStatusBadge } from "@/components/sites/site-status-badge";
import { SiteActionsMenu } from "@/components/sites/site-actions-menu";
import { formatRelativeTime } from "@/lib/utils";
import type { Site } from "@/lib/types";

export function SiteTable({
  sites,
  onChanged,
  onDeleted,
}: {
  sites: Site[];
  onChanged: (site: Site) => void;
  onDeleted: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-inset/40 text-xs text-fg-subtle">
            <th className="px-5 py-3 font-medium">Site</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Updated</th>
            <th className="w-10 px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sites.map((site) => (
            <tr key={site.id} className="transition-colors hover:bg-bg-inset/30">
              <td className="px-5 py-3.5">
                <Link href={`/sites/${site.id}/editor`} className="font-medium text-fg hover:text-accent">
                  {site.name}
                </Link>
                <p className="font-mono text-xs text-fg-subtle">/{site.slug}</p>
              </td>
              <td className="px-5 py-3.5">
                <SiteStatusBadge status={site.status} />
              </td>
              <td className="px-5 py-3.5 text-fg-muted">{formatRelativeTime(site.updatedAt)}</td>
              <td className="px-5 py-3.5 text-right">
                <SiteActionsMenu site={site} onChanged={onChanged} onDeleted={onDeleted} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
