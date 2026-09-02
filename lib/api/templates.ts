import { apiClient } from "@/lib/api/client";
import type { PaginatedResponse, SortOption, Template, TemplateCategory } from "@/lib/types";

export interface GetTemplatesParams {
  category?: TemplateCategory;
  cursor?: string;
  limit?: number;
  sort?: SortOption;
}

function buildQuery(params: object): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params as Record<string, string | number | undefined>)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const templatesApi = {
  list: (params: GetTemplatesParams = {}) =>
    apiClient.get<PaginatedResponse<Template>>(`/templates${buildQuery(params)}`, {
      skipAuth: true,
    }),

  get: (id: string) => apiClient.get<Template>(`/templates/${id}`, { skipAuth: true }),
};
