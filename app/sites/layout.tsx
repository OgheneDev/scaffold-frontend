import { Protected } from "@/components/layout/protected";

export default function SitesLayout({ children }: { children: React.ReactNode }) {
  return <Protected>{children}</Protected>;
}
