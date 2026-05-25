"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { transacaoService } from "@/services/transacao.service";
import { Extrato, TipoTransacao } from "@/types";
import { TransactionItem } from "@/components/TransactionItem";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/utils/cn";

const FILTERS: { v: TipoTransacao | "TODOS"; l: string }[] = [
  { v: "TODOS", l: "Todos" }, { v: "DEPOSITO", l: "Depósitos" },
  { v: "SAQUE", l: "Saques" }, { v: "TRANSFERENCIA", l: "Transferências" },
];

export default function ExtratoPage() {
  const { nmrConta } = useParams<{ nmrConta: string }>();
  const [txs, setTxs] = useState<Extrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TipoTransacao | "TODOS">("TODOS");

  useEffect(() => {
    setLoading(true);
    transacaoService.extrato(nmrConta).then(setTxs).catch(() => setTxs([])).finally(() => setLoading(false));
  }, [nmrConta]);

  const filtered = useMemo(() =>
    filter === "TODOS" ? txs : txs.filter((t) => t.tipoTransacao === filter),
  [txs, filter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <p className="text-sm text-zinc-400">Conta {nmrConta}</p>
        <h1 className="text-2xl font-semibold mt-1">Extrato</h1>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button key={f.v} onClick={() => setFilter(f.v)}
            className={cn("px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all",
              filter === f.v ? "bg-brand-500/20 border-brand-500/40 text-brand-200" : "bg-bg-card border-line text-zinc-400 hover:text-white")}>
            {f.l}
          </button>
        ))}
      </div>

      <Card className="p-2">
        {loading ? (
          <div className="space-y-2 p-2">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState title="Sem movimentações" description="Não há transações para este filtro." />
        ) : (
          <div className="divide-y divide-line">
            {filtered.map((tx, i) => <TransactionItem key={i} tx={tx} contaAtual={nmrConta} />)}
          </div>
        )}
      </Card>
    </div>
  );
}
