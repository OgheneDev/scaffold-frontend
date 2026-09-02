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
const SESSION_STORAGE_KEY = "scaffold_auth_session";

type PersistedSession = {
  user: User;
  accessToken: string;
};

function setSessionHint() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_HINT_COOKIE}=1; path=/; max-age=2592000; samesite=lax`;
}

function clearSessionHint() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_HINT_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

function readPersistedSession(): PersistedSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<PersistedSession>;
    if (!parsed.user || !parsed.accessToken) return null;

    return {
      user: parsed.user,
      accessToken: parsed.accessToken,
    };
  } catch {
    return null;
  }
}

function writePersistedSession(user: User | null, accessToken: string | null) {
  if (typeof window === "undefined" || !user || !accessToken) return;

  const session: PersistedSession = { user, accessToken };
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function clearPersistedSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export const useAuthStore = create<AuthState>((set, get) => {
  const persistedSession = readPersistedSession();

  return {
    user: persistedSession?.user ?? null,
    accessToken: persistedSession?.accessToken ?? null,
    status: persistedSession ? "authenticated" : "idle",

    setSession: (user, accessToken) => {
      setSessionHint();
      writePersistedSession(user, accessToken);
      set({ user, accessToken, status: "authenticated" });
    },

    clearSession: () => {
      clearSessionHint();
      clearPersistedSession();
      set({ user: null, accessToken: null, status: "unauthenticated" });
    },

    hydrate: async () => {
      const persistedSession = readPersistedSession();
      if (persistedSession) {
        set({
          user: persistedSession.user,
          accessToken: persistedSession.accessToken,
          status: "authenticated",
        });
        return;
      }

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
      const { user, accessToken } = await authApi.register({
        name,
        email,
        password,
      });
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
  };
});

// Wire the API client's auth hooks to this store once, at module init.
import { registerAuthHooks } from "@/lib/api/client";

registerAuthHooks({
  getAccessToken: () => useAuthStore.getState().accessToken,
  refreshAccessToken: async () => {
    try {
      const { accessToken } = await authApi.refresh();
      const currentUser = useAuthStore.getState().user;
      if (currentUser) writePersistedSession(currentUser, accessToken);
      useAuthStore.setState({ accessToken, status: "authenticated" });
      return accessToken;
    } catch (err) {
      if (err instanceof ApiError) useAuthStore.getState().clearSession();
      return null;
    }
  },
  onUnauthorized: () => useAuthStore.getState().clearSession(),
});
