"use client";
import { Wallet, Eye, EyeOff } from "lucide-react";
import { Conta } from "@/types";
import { formatBRL } from "@/utils/format";
import { useState } from "react";
import { cn } from "@/utils/cn";

export function AccountCard({ conta, onClick }: { conta: Conta; onClick?: () => void }) {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 border border-brand-500/30",
        "bg-gradient-to-br from-brand-900/40 via-bg-card to-bg-card",
        "shadow-card hover:shadow-glow transition-all cursor-pointer animate-fade-in"
      )}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-500/20"><Wallet className="w-4 h-4 text-brand-300" /></div>
          <span className="text-xs font-medium text-zinc-400">
            {conta.tipoConta === "CORRENTE" ? "Conta Corrente" : "Poupança"}
          </span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setHidden(!hidden); }} className="text-zinc-400 hover:text-white">
          {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      <div className="relative">
        <p className="text-xs text-zinc-500 mb-1">Saldo disponível</p>
        <p className="text-3xl font-bold text-white tracking-tight">
          {hidden ? "R$ ••••••" : formatBRL(conta.saldo)}
        </p>
      </div>
      <div className="relative mt-6 flex justify-between text-xs text-zinc-500">
        <span>Agência {conta.nmrAgencia}</span>
        <span>Conta {conta.nmrConta}</span>
      </div>
    </div>
  );
}
