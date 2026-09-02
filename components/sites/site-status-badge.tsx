import { Badge } from "@/components/ui/badge";
import type { SiteStatus } from "@/lib/types";

export function SiteStatusBadge({ status }: { status: SiteStatus }) {
  return status === "published" ? (
    <Badge variant="success">Published</Badge>
  ) : (
    <Badge variant="default">Draft</Badge>
  );
}
