import { MarketingNav } from "@/components/layout/marketing-nav";
import { TemplateGallery } from "@/components/templates/template-gallery";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-bg">
      <MarketingNav />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 max-w-lg">
          <h1 className="font-display text-3xl font-semibold text-fg md:text-4xl">Templates</h1>
          <p className="mt-3 text-[15px] text-fg-muted">
            Every template renders through the same engine your published site will — pick one, make it yours.
          </p>
        </div>
        <TemplateGallery />
      </div>
    </div>
  );
}
