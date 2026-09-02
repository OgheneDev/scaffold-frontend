import { Protected } from "@/components/layout/protected";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected>
      <DashboardShell>{children}</DashboardShell>
    </Protected>
  );
}
