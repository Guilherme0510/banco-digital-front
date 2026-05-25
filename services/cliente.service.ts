import { api } from "./api";
import type { Cliente } from "@/types";
import type { ClienteInput } from "@/validators/cliente";

export const clienteService = {
  criar: (data: ClienteInput) =>
    api.post<Cliente>("/clientes", { ...data, cpf: data.cpf.replace(/\D/g, ""), telefone: data.telefone.replace(/\D/g, "") }).then((r) => r.data),
  listar: () => api.get<Cliente[]>("/clientes").then((r) => r.data),
  buscarPorId: (id: number) => api.get<Cliente>(`/clientes/${id}`).then((r) => r.data),
  buscarPorCpf: (cpf: string) => api.get<Cliente>(`/clientes/cpf/${cpf.replace(/\D/g, "")}`).then((r) => r.data),
  buscarPorEmail: (email: string) => api.get<Cliente>(`/clientes/email/${encodeURIComponent(email)}`).then((r) => r.data),
  deletarPorCpf: (cpf: string) => api.delete(`/clientes/cpf/${cpf.replace(/\D/g, "")}`).then((r) => r.data),
};
