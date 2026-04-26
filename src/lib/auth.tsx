import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Plan = "free" | "free_plus" | "pro" | "full" | "b2b" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  isAdmin?: boolean;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const Ctx = createContext<AuthCtx | null>(null);

const STORAGE_KEY = "amaro_finance_user";

// Login admin master para o dono — acesso a tudo de graça
const ADMIN_EMAIL = "amarofinanceof@gmail.com";
const ADMIN_PASSWORD = "D@nilo14942103";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login: AuthCtx["login"] = async (email, password) => {
    await new Promise((r) => setTimeout(r, 400));
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      persist({
        id: "admin-master",
        name: "Admin Amaro",
        email: ADMIN_EMAIL,
        plan: "admin",
        isAdmin: true,
      });
      return { ok: true };
    }
    if (!email.includes("@") || password.length < 4) {
      return { ok: false, error: "Credenciais inválidas." };
    }
    persist({
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      plan: "free",
    });
    return { ok: true };
  };

  const signup: AuthCtx["signup"] = async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 400));
    if (!email.includes("@") || password.length < 4) {
      return { ok: false, error: "Dados inválidos." };
    }
    persist({
      id: crypto.randomUUID(),
      name: name || email.split("@")[0],
      email,
      plan: "free",
    });
    return { ok: true };
  };

  const logout = () => persist(null);

  return <Ctx.Provider value={{ user, login, signup, logout, loading }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
