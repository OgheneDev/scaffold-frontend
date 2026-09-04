import { Skeleton } from "../ui/skeleton";

export function TemplateGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-border/50 bg-bg-elevated/40 p-3.5 shadow-sm backdrop-blur-sm"
        >
          {/* Image Thumbnail Skeleton */}
          <Skeleton className="aspect-4/3 w-full rounded-xl bg-border/40" />

          {/* Details Skeleton */}
          <div className="mt-4 flex flex-1 flex-col justify-between space-y-3 px-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-2/5 rounded-md bg-border/50" />
                <Skeleton className="h-4 w-12 rounded-full bg-border/40" />
              </div>
              <Skeleton className="h-3.5 w-4/5 rounded-md bg-border/30" />
            </div>

            {/* Tags & Action Button Skeleton */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-14 rounded-full bg-border/30" />
                <Skeleton className="h-5 w-14 rounded-full bg-border/30" />
              </div>
              <Skeleton className="h-8 w-20 rounded-lg bg-border/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
