"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema, type ClienteInput } from "@/validators/cliente";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { clienteService } from "@/services/cliente.service";
import { maskCPF, maskPhone } from "@/utils/masks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function CadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<ClienteInput>({
    resolver: zodResolver(clienteSchema),
  });

  const onSubmit = async (data: ClienteInput) => {
    setLoading(true);
    try {
      await clienteService.criar(data);
      toast.success("Cadastro realizado! Faça login.");
      router.push("/login");
    } catch {} finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md animate-slide-up">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center font-bold">B</div>
          <span className="text-xl font-semibold">Banco Digital</span>
        </div>
        <h2 className="text-2xl font-semibold mb-1">Criar conta</h2>
        <p className="text-sm text-zinc-400 mb-6">É rápido e gratuito</p>

        <div className="space-y-4">
          <Input label="Nome completo" {...register("nome")} error={errors.nome?.message} />
          <Input label="E-mail" type="email" {...register("email")} error={errors.email?.message} />
          <div className="grid grid-cols-2 gap-3">
            <Controller name="cpf" control={control} render={({ field }) => (
              <Input label="CPF" placeholder="000.000.000-00" value={field.value ?? ""} onChange={(e) => field.onChange(maskCPF(e.target.value))} error={errors.cpf?.message} />
            )} />
            <Controller name="telefone" control={control} render={({ field }) => (
              <Input label="Telefone" placeholder="(11) 99999-9999" value={field.value ?? ""} onChange={(e) => field.onChange(maskPhone(e.target.value))} error={errors.telefone?.message} />
            )} />
          </div>
          <Input label="Estado (UF)" maxLength={2} {...register("estado")} error={errors.estado?.message} />
          <Input label="Senha" type="password" {...register("senha")} error={errors.senha?.message} />
          <Button type="submit" loading={loading} className="w-full">Criar conta</Button>
        </div>

        <p className="text-sm text-zinc-400 mt-6 text-center">
          Já tem conta? <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium">Entrar</Link>
        </p>
      </form>
    </main>
  );
}
