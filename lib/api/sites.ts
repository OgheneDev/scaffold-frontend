import { apiClient } from "@/lib/api/client";
import type {
  PaginatedResponse,
  Site,
  SiteStatus,
  SortOption,
  TemplateContent,
} from "@/lib/types";

export interface GetSitesParams {
  status?: SiteStatus;
  cursor?: string;
  limit?: number;
  sort?: SortOption;
}

export interface CreateSitePayload {
  templateId: string;
  name: string;
  slug: string;
}

export interface UpdateSitePayload {
  name?: string;
  slug?: string;
  content?: TemplateContent;
  status?: SiteStatus;
}

function buildQuery(params: object): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(
    params as Record<string, string | number | undefined>,
  )) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const sitesApi = {
  list: (params: GetSitesParams = {}) =>
    apiClient.get<PaginatedResponse<Site>>(`/sites${buildQuery(params)}`),

  get: (id: string) => apiClient.get<Site>(`/sites/${id}`),

  create: (data: CreateSitePayload) => apiClient.post<Site>("/sites", data),

  update: (id: string, data: UpdateSitePayload) =>
    apiClient.patch<Site>(`/sites/${id}`, data),

  remove: (id: string) =>
    apiClient.delete<{
      id: string;
      name: string;
      slug: string;
      createdAt: string;
    }>(`/sites/${id}`),

  publish: (id: string) =>
    apiClient.patch<Site>(`/sites/${id}`, {
      status: "published" as SiteStatus,
    }),

  unpublish: (id: string) =>
    apiClient.patch<Site>(`/sites/${id}`, { status: "draft" as SiteStatus }),

  getPublicBySlug: (slug: string) =>
    apiClient.get<Site>(`/sites/${slug}`, { skipAuth: true }),
};
