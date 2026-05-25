import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v ?? 0);

export const formatDate = (iso: string, pattern = "dd/MM/yyyy 'às' HH:mm") => {
  try {
    return format(parseISO(iso), pattern, { locale: ptBR });
  } catch {
    return iso;
  }
};

export const formatCPF = (cpf: string) =>
  cpf?.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") ?? "";

export const formatPhone = (p: string) => {
  const d = p?.replace(/\D/g, "") ?? "";
  if (d.length === 11) return d.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  if (d.length === 10) return d.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  return p;
};
