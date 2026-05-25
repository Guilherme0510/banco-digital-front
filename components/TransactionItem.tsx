"use client";
import { Extrato } from "@/types";
import { formatBRL, formatDate } from "@/utils/format";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { cn } from "@/utils/cn";

export function TransactionItem({ tx, contaAtual }: { tx: Extrato; contaAtual?: string }) {
  const isEntrada =
    tx.tipoTransacao === "DEPOSITO" ||
    (tx.tipoTransacao === "TRANSFERENCIA" && tx.contaDestinatario === contaAtual);
  const Icon = tx.tipoTransacao === "TRANSFERENCIA" ? ArrowLeftRight : isEntrada ? ArrowDownLeft : ArrowUpRight;

  const labels = { DEPOSITO: "Depósito", SAQUE: "Saque", TRANSFERENCIA: "Transferência" };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-bg-elevated transition-all">
      <div className={cn(
        "p-2.5 rounded-xl",
        isEntrada ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{labels[tx.tipoTransacao]}</p>
        <p className="text-xs text-zinc-500 truncate">
          {tx.tipoTransacao === "TRANSFERENCIA"
            ? `${tx.contaOrigem} → ${tx.contaDestinatario}`
            : `Conta ${tx.contaOrigem || tx.contaDestinatario}`}
        </p>
      </div>
      <div className="text-right">
        <p className={cn("text-sm font-semibold", isEntrada ? "text-emerald-400" : "text-red-400")}>
          {isEntrada ? "+" : "-"} {formatBRL(tx.valorExtrato)}
        </p>
        <p className="text-xs text-zinc-500">{formatDate(tx.realizadoEm, "dd/MM HH:mm")}</p>
      </div>
    </div>
  );
}
