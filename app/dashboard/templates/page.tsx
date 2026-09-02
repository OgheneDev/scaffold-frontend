import { TemplateGallery } from "@/components/templates/template-gallery";

export default function DashboardTemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-fg">Templates</h1>
        <p className="mt-1 text-sm text-fg-muted">Start a new site from any template below.</p>
      </div>
      <TemplateGallery />
    </div>
  );
}
