export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  estado: string;
  criadoEm: string;
}

export type TipoConta = "CORRENTE" | "POUPANCA";

export interface Conta {
  id: number;
  nmrConta: string;
  nmrAgencia: string;
  saldo: number;
  tipoConta: TipoConta;
  criadoEm: string;
}

export type TipoTransacao = "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";

export interface Extrato {
  valorExtrato: number;
  realizadoEm: string;
  tipoTransacao: TipoTransacao;
  contaOrigem: string;
  contaDestinatario: string;
}

export interface ApiError {
  status: number;
  mensagem: string;
}
