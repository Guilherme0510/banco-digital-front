import { api } from "./api";
import type { Conta, TipoConta } from "@/types";

export const contaService = {
  criar: (data: { nmrConta: string; nmrAgencia: string; tipoConta: TipoConta; clienteId: number }) =>
    api.post<Conta>("/contas/criar", data).then((r) => r.data),
  depositar: (nmrConta: string, valorDeposito: number) =>
    api.post<Conta>("/contas/depositar", { nmrConta, valorDeposito }).then((r) => r.data),
  sacar: (nmrConta: string, valorSaque: number) =>
    api.post<Conta>("/contas/sacar", { nmrConta, valorSaque }).then((r) => r.data),
  listar: (clienteId: number) =>
    api.get<Conta[]>(`/contas/listar/${clienteId}`).then((r) => r.data),
};
