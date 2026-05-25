"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { LoginInput, loginSchema } from "../../validators/auth";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    try { await login(data.email, data.senha); } catch {} finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-black p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,92,255,0.4),transparent_50%)]" />
        <div className="relative flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white text-brand-700 flex items-center justify-center font-bold">B</div>
          <span className="text-xl font-semibold">Banco Digital</span>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold leading-tight mb-3">Seu dinheiro,<br/>sem complicação.</h1>
          <p className="text-zinc-300 max-w-md">Conta digital, transferências instantâneas e extrato em tempo real.</p>
        </div>
        <div className="relative text-xs text-zinc-400">© {new Date().getFullYear()} Banco Digital</div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm animate-slide-up">
          <h2 className="text-2xl font-semibold mb-1">Entrar</h2>
          <p className="text-sm text-zinc-400 mb-8">Acesse sua conta</p>

          <div className="space-y-4">
            <Input label="E-mail" type="email" placeholder="voce@email.com" {...register("email")} error={errors.email?.message} />
            <Input label="Senha" type="password" placeholder="••••••" {...register("senha")} error={errors.senha?.message} />
            <Button type="submit" loading={loading} className="w-full">Entrar</Button>
          </div>

          <p className="text-sm text-zinc-400 mt-6 text-center">
            Não tem conta? <Link href="/cadastro" className="text-brand-400 hover:text-brand-300 font-medium">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
