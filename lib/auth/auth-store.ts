import { create } from "zustand";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import type { User } from "@/lib/types";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  setSession: (user: User, accessToken: string) => void;
  clearSession: () => void;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// A non-httpOnly marker cookie, set/cleared alongside session state, purely
// so `middleware.ts` can make a fast pre-render redirect decision without
// ever touching the real token. It carries no auth power of its own.
const SESSION_HINT_COOKIE = "scaffold_session";

function setSessionHint() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_HINT_COOKIE}=1; path=/; max-age=2592000; samesite=lax`;
}

function clearSessionHint() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_HINT_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  status: "idle",

  setSession: (user, accessToken) => {
    setSessionHint();
    set({ user, accessToken, status: "authenticated" });
  },

  clearSession: () => {
    clearSessionHint();
    set({ user: null, accessToken: null, status: "unauthenticated" });
  },

  hydrate: async () => {
    if (get().status === "authenticated") return;
    set({ status: "loading" });
    try {
      const { accessToken } = await authApi.refresh();
      set({ accessToken });
      const user = await authApi.me();
      get().setSession(user, accessToken);
    } catch {
      get().clearSession();
    }
  },

  login: async (email, password) => {
    const { user, accessToken } = await authApi.signIn({ email, password });
    get().setSession(user, accessToken);
  },

  register: async (name, email, password) => {
    const { user, accessToken } = await authApi.register({ name, email, password });
    get().setSession(user, accessToken);
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {
      // Even if the network call fails, drop the local session.
    }
    get().clearSession();
  },
}));

// Wire the API client's auth hooks to this store once, at module init.
import { registerAuthHooks } from "@/lib/api/client";

registerAuthHooks({
  getAccessToken: () => useAuthStore.getState().accessToken,
  refreshAccessToken: async () => {
    try {
      const { accessToken } = await authApi.refresh();
      useAuthStore.setState({ accessToken, status: "authenticated" });
      return accessToken;
    } catch (err) {
      if (err instanceof ApiError) useAuthStore.getState().clearSession();
      return null;
    }
  },
  onUnauthorized: () => useAuthStore.getState().clearSession(),
});
