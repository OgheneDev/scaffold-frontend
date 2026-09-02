import { apiClient } from "@/lib/api/client";
import type { AuthResponse, User } from "@/lib/types";

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/register", data, { skipAuth: true }),

  signIn: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>("/auth/sign-in", data, { skipAuth: true }),

  refresh: () =>
    apiClient.post<{ accessToken: string }>("/auth/refresh", undefined, { skipAuth: true }),

  me: () => apiClient.get<User>("/auth/me"),

  updateProfile: (data: { name?: string; profileImage?: string }) =>
    apiClient.patch<User>("/auth/me", data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.patch<{ message: string }>("/auth/password", data),

  deleteAccount: (data: { password: string }) =>
    apiClient.delete<User>("/auth/delete", { body: data }),

  logout: () => apiClient.post<null>("/auth/logout", undefined, { skipAuth: true }),
};
