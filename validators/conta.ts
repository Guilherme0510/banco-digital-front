import { z } from "zod";

export const criarContaSchema = z.object({
  nmrConta: z.string().min(4, "Número inválido"),
  nmrAgencia: z.string().min(3, "Agência inválida"),
  tipoConta: z.enum(["CORRENTE", "POUPANCA"]),
  clienteId: z.coerce.number().int().positive(),
});
export type CriarContaInput = z.infer<typeof criarContaSchema>;

export const valorSchema = z.object({
  nmrConta: z.string().min(4),
  valor: z.coerce.number().positive("Valor deve ser maior que zero"),
});
export type ValorInput = z.infer<typeof valorSchema>;
