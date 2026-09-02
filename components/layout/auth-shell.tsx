import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col justify-center px-8 py-16 sm:px-16 md:px-20">
        <Link href="/" className="mb-12 flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-[6px] bg-accent text-[13px] font-bold text-accent-foreground">
            B
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">Scaffold</span>
        </Link>
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold text-fg">{title}</h1>
          <p className="mt-2 text-sm text-fg-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-8 text-sm text-fg-muted">{footer}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-bg-inset md:block">
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-bg-elevated p-6 shadow-2xl">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
            </div>
            <div className="space-y-3 pt-2">
              <div className="h-2.5 w-20 rounded-full bg-accent/60" />
              <div className="h-5 w-48 rounded bg-fg/80" />
              <div className="h-2.5 w-full rounded bg-fg/15" />
              <div className="h-2.5 w-3/4 rounded bg-fg/15" />
              <div className="flex gap-2 pt-2">
                <div className="h-7 w-24 rounded-md bg-accent" />
                <div className="h-7 w-20 rounded-md border border-fg/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
