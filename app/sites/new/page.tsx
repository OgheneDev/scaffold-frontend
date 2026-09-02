"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { templatesApi } from "@/lib/api/templates";
import { sitesApi } from "@/lib/api/sites";
import { ApiError } from "@/lib/api/client";
import type { Template } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteRenderer } from "@/components/site-renderer/site-renderer";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
});

type FormValues = z.infer<typeof schema>;

export default function NewSitePage() {
  return (
    <Suspense fallback={null}>
      <NewSiteForm />
    </Suspense>
  );
}

function NewSiteForm() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const router = useRouter();

  const [template, setTemplate] = useState<Template | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: "", slug: "" } });

  const nameValue = watch("name");

  useEffect(() => {
    if (!slugTouched) setValue("slug", slugify(nameValue || ""));
  }, [nameValue, slugTouched, setValue]);

  useEffect(() => {
    if (!templateId) return;
    templatesApi
      .get(templateId)
      .then(setTemplate)
      .catch(() => setLoadError(true));
  }, [templateId]);

  async function onSubmit(values: FormValues) {
    if (!templateId) return;
    setServerError(null);
    try {
      const site = await sitesApi.create({ templateId, name: values.name, slug: values.slug });
      router.push(`/sites/${site.id}/editor`);
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 409) {
        setError("slug", { message: "That slug is already taken. Try another." });
      } else {
        setServerError(err instanceof ApiError ? err.message : "Couldn't create the site. Try again.");
      }
    }
  }

  if (!templateId || loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg text-center">
        <p className="text-sm text-fg-muted">Pick a template to start a new site.</p>
        <Button asChild>
          <Link href="/templates">Browse templates</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-6">
          <Link href={`/templates/${templateId}`} className="text-fg-subtle transition-colors hover:text-fg">
            <ArrowLeft className="size-4" />
          </Link>
          <span className="font-display text-[15px] font-medium text-fg">New site</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div>
          <h1 className="font-display text-2xl font-semibold text-fg">Name your site</h1>
          <p className="mt-2 text-sm text-fg-muted">
            {template ? (
              <>
                Starting from <span className="text-fg">{template.name}</span>
              </>
            ) : (
              "Loading template…"
            )}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Site name</Label>
              <Input id="name" placeholder="Legend Gym" {...register("name")} />
              {errors.name ? <p className="text-xs text-danger">{errors.name.message}</p> : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex items-center rounded-md border border-border bg-bg-inset focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
                <span className="pl-3 font-mono text-sm text-fg-subtle">scaffold.app/</span>
                <input
                  id="slug"
                  className="w-full bg-transparent px-1.5 py-2 font-mono text-sm text-fg outline-none"
                  {...register("slug", {
                    onChange: () => setSlugTouched(true),
                  })}
                />
              </div>
              {errors.slug ? <p className="text-xs text-danger">{errors.slug.message}</p> : null}
            </div>
            {serverError ? (
              <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">{serverError}</p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting || !template}>
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              Create site
            </Button>
          </form>
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-border px-4 py-2.5 text-xs text-fg-subtle">Preview</div>
          <div className="relative aspect-[4/3] overflow-hidden bg-bg-inset">
            {template ? (
              <div className="pointer-events-none absolute left-0 top-0 w-[250%] origin-top-left" style={{ transform: "scale(0.4)" }}>
                <SiteRenderer content={template.content} />
              </div>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
