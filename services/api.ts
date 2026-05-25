import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

if (typeof window !== "undefined") {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (r) => r,
    (error: AxiosError<{ status: number; mensagem: string }>) => {
      const data = error.response?.data;
      const msg = data?.mensagem || error.message || "Erro inesperado";
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        document.cookie = "token=; Path=/; Max-Age=0";
        if (!location.pathname.startsWith("/login")) location.href = "/login";
        toast.error("Sessão expirada. Faça login novamente.");
      } else {
        toast.error(msg);
      }
      return Promise.reject(error);
    }
  );
}
