import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").max(120),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().refine((v) => v.replace(/\D/g, "").length === 11, "CPF inválido"),
  telefone: z.string().refine((v) => v.replace(/\D/g, "").length >= 10, "Telefone inválido"),
  estado: z.string().length(2, "UF deve ter 2 letras").toUpperCase(),
  senha: z.string().min(6, "Mínimo 6 caracteres"),
});
export type ClienteInput = z.infer<typeof clienteSchema>;
