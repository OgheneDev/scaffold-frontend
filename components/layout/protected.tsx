"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Loader2 } from "lucide-react";

export function Protected({ children }: { children: React.ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 className="size-5 animate-spin text-fg-subtle" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return children;
}
