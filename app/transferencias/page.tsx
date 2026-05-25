"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferSchema, type TransferInput } from "@/validators/transacao";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { transacaoService } from "@/services/transacao.service";
import { contaService } from "@/services/conta.service";
import { useAuth } from "@/contexts/AuthContext";
import { Conta } from "@/types";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function TransferPage() {
  const { user } = useAuth();
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TransferInput>({
    resolver: zodResolver(transferSchema),
  });

  useEffect(() => { if (user) contaService.listar(user.id).then(setContas).catch(() => {}); }, [user]);

  const onSubmit = async (data: TransferInput) => {
    setLoading(true);
    try {
      await transacaoService.transferir(data.contaOrigem, data.contaDestinatario, data.valorTransacao);
      toast.success("Transferência realizada!");
      reset();
    } catch {} finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-brand-500/15 text-brand-300"><ArrowLeftRight className="w-5 h-5" /></div>
        <div>
          <h1 className="text-2xl font-semibold">Transferência</h1>
          <p className="text-sm text-zinc-400">Envie dinheiro entre contas</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Conta origem</label>
            <select {...register("contaOrigem")}
              className="w-full rounded-xl bg-bg-elevated border border-line px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500">
              <option value="">Selecione...</option>
              {contas.map((c) => (
                <option key={c.id} value={c.nmrConta}>
                  {c.nmrConta} — {c.tipoConta}
                </option>
              ))}
            </select>
            {errors.contaOrigem && <span className="text-xs text-red-400">{errors.contaOrigem.message}</span>}
          </div>
          <Input label="Conta destinatária" placeholder="654321" {...register("contaDestinatario")} error={errors.contaDestinatario?.message} />
          <Input label="Valor (R$)" type="number" step="0.01" placeholder="0,00" {...register("valorTransacao")} error={errors.valorTransacao?.message} />
          <Button type="submit" loading={loading} className="w-full">Transferir</Button>
        </form>
      </Card>
    </div>
  );
}
