import { z } from "zod";

export const transferSchema = z.object({
  contaOrigem: z.string().min(4, "Conta origem inválida"),
  contaDestinatario: z.string().min(4, "Conta destino inválida"),
  valorTransacao: z.coerce.number().positive("Valor deve ser maior que zero"),
});
export type TransferInput = z.infer<typeof transferSchema>;
