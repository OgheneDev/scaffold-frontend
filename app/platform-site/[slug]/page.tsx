import { notFound } from "next/navigation";
import { sitesApi } from "@/lib/api/sites";
import { ApiError } from "@/lib/api/client";
import { SiteRenderer } from "@/components/site-renderer/site-renderer";
import type { Metadata } from "next";

async function getSite(slug: string) {
  try {
    return await sitesApi.getPublicBySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite(slug).catch(() => null);
  if (!site) return { title: "Site not found" };
  return { title: site.name };
}

export default async function PublicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site || site.status !== "published") {
    notFound();
  }

  return <SiteRenderer content={site.content} />;
}
