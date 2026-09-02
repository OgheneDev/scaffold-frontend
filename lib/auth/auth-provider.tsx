"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);
  const status = useAuthStore((s) => s.status);

  useEffect(() => {
    if (status === "idle") hydrate();
  }, [status, hydrate]);

  return children;
}
