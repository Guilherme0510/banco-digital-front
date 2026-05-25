"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { criarContaSchema, type CriarContaInput } from "@/validators/conta";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { contaService } from "@/services/conta.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CriarContaPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CriarContaInput>({
    resolver: zodResolver(criarContaSchema),
    defaultValues: { tipoConta: "CORRENTE", clienteId: user?.id, nmrAgencia: "001" },
  });

  const onSubmit = async (data: CriarContaInput) => {
    setLoading(true);
    try {
      await contaService.criar(data);
      toast.success("Conta criada!");
      router.push("/contas");
    } catch {} finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold mb-1">Nova conta</h1>
      <p className="text-sm text-zinc-400 mb-6">Preencha os dados da nova conta</p>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Número da conta" placeholder="123456" {...register("nmrConta")} error={errors.nmrConta?.message} />
          <Input label="Agência" placeholder="001" {...register("nmrAgencia")} error={errors.nmrAgencia?.message} />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Tipo</label>
            <select {...register("tipoConta")}
              className="w-full rounded-xl bg-bg-elevated border border-line px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500">
              <option value="CORRENTE">Conta Corrente</option>
              <option value="POUPANCA">Poupança</option>
            </select>
          </div>
          <Input disabled label="ID do cliente" type="number" {...register("clienteId")} error={errors.clienteId?.message} />
          <Button type="submit" loading={loading} className="w-full">Criar conta</Button>
        </form>
      </Card>
    </div>
  );
}
