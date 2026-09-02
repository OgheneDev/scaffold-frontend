import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg text-center px-6">
      <p className="font-mono text-xs text-fg-subtle">404</p>
      <h1 className="font-display text-2xl font-semibold text-fg">This page doesn&apos;t exist.</h1>
      <p className="max-w-sm text-sm text-fg-muted">
        The page you&apos;re looking for was moved, deleted, or never existed.
      </p>
      <Button asChild variant="secondary">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
