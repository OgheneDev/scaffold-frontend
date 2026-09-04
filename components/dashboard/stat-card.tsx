import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-fg-muted">{label}</div>
        <Icon className="size-4 text-fg-subtle" />
      </div>
      <div className="mt-3 font-display text-3xl font-semibold text-fg">
        {value}
      </div>
    </Card>
  );
}
