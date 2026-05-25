import { api } from "./api";
import type { Extrato } from "@/types";

export const transacaoService = {
  transferir: (contaOrigem: string, contaDestinatario: string, valorTransacao: number) =>
    api.post("/transacoes/transferir", { contaOrigem, contaDestinatario, valorTransacao }).then((r) => r.data),
  extrato: (nmrConta: string) =>
    api.get<Extrato[]>(`/transacoes/extrato/${nmrConta}`).then((r) => r.data),
};
