"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Usuario } from "../types";
import { authService } from "../services/auth.service";

interface AuthCtx {
  user: Usuario | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

const setCookie = (name: string, value: string, days = 7) => {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; Path=/; Expires=${exp}; SameSite=Lax`;
};
const delCookie = (name: string) => (document.cookie = `${name}=; Path=/; Max-Age=0`);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) { setToken(t); setUser(JSON.parse(u)); }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    const data = await authService.login(email, senha);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.usuario));
    setCookie("token", data.token);
    setToken(data.token);
    setUser(data.usuario);
    toast.success(`Bem-vindo, ${data.usuario.nome.split(" ")[0]}!`);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delCookie("token");
    setToken(null); setUser(null);
    router.push("/login");
  };

  return <Ctx.Provider value={{ user, token, loading, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
};
