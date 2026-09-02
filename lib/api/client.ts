import type { ApiErrorShape } from "@/lib/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export class ApiError extends Error {
  statusCode: number;
  details?: string[];

  constructor(shape: ApiErrorShape, statusCode: number) {
    const message = Array.isArray(shape.message)
      ? shape.message.join(", ")
      : shape.message;
    super(message || "Something went wrong");
    this.statusCode = statusCode;
    this.details = Array.isArray(shape.message) ? shape.message : undefined;
    this.name = "ApiError";
  }
}

// The access token lives in memory only (never localStorage). The auth store
// registers itself here so the client layer never needs to import the store
// directly (avoids a circular dependency and keeps this file framework-agnostic).
type TokenGetter = () => string | null;
type RefreshFn = () => Promise<string | null>;
type UnauthorizedHandler = () => void;

let getAccessToken: TokenGetter = () => null;
let refreshAccessToken: RefreshFn = async () => null;
let onUnauthorized: UnauthorizedHandler = () => {};

export function registerAuthHooks(hooks: {
  getAccessToken: TokenGetter;
  refreshAccessToken: RefreshFn;
  onUnauthorized: UnauthorizedHandler;
}) {
  getAccessToken = hooks.getAccessToken;
  refreshAccessToken = hooks.refreshAccessToken;
  onUnauthorized = hooks.onUnauthorized;
}

// Concurrent requests that hit a 401 at the same time should share a single
// refresh call rather than each independently hitting /auth/refresh.
let refreshPromise: Promise<string | null> | null = null;

async function getFreshToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  skipAuth?: boolean;
  isRetry?: boolean;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, skipAuth, isRetry, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (body !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
  }

  if (!skipAuth) {
    const token = getAccessToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Access token expired mid-session: refresh once and retry the request.
  if (res.status === 401 && !skipAuth && !isRetry) {
    const newToken = await getFreshToken();
    if (newToken) {
      return request<T>(path, { ...options, isRetry: true });
    }
    onUnauthorized();
    throw new ApiError({ statusCode: 401, message: "Session expired" }, 401);
  }

  if (res.status === 204 || res.status === 205) {
    return null as T;
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new ApiError(
      payload ?? { statusCode: res.status, message: res.statusText },
      res.status,
    );
  }

  return unwrapEnvelope<T>(payload);
}

// The backend wraps every successful response in a global interceptor envelope:
//   { statusCode: number, message: string, data: <actual payload> }
// Every caller in this app (auth, templates, sites) wants the inner `data`,
// not the envelope, so unwrap it here once rather than in every endpoint file.
// Guarded narrowly (statusCode + message + data all present) so a backend
// response that happens to contain its own top-level `data` field for other
// reasons isn't accidentally unwrapped.
function unwrapEnvelope<T>(payload: unknown): T {
  if (
    payload !== null &&
    typeof payload === "object" &&
    "statusCode" in payload &&
    "message" in payload &&
    "data" in payload
  ) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};

export { API_URL };
