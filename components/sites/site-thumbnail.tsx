import { SiteRenderer } from "@/components/site-renderer/site-renderer";
import type { TemplateContent } from "@/lib/types";

export function SiteThumbnail({ content }: { content: TemplateContent }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--site-background,var(--bg-inset))]">
      <div
        className="pointer-events-none absolute left-0 top-0 w-[400%] origin-top-left"
        style={{ transform: "scale(0.25)" }}
      >
        <SiteRenderer content={content} />
      </div>
    </div>
  );
}
