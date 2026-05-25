"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { contaService } from "@/services/conta.service";
import { transacaoService } from "@/services/transacao.service";
import { Conta, Extrato } from "@/types";
import { AccountCard } from "@/components/AccountCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { DepositModal } from "@/components/modals/DepositModal";
import { WithdrawModal } from "@/components/modals/WithdrawModal";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Plus,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { formatBRL } from "@/utils/format";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useAuth();
  const [contas, setContas] = useState<Conta[]>([]);
  const [txs, setTxs] = useState<Extrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConta, setSelectedConta] = useState<string>("");
  const [dep, setDep] = useState(false);
  const [wd, setWd] = useState(false);

  const router = useRouter();

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const cs = await contaService.listar(user.id);
      setContas(cs);
      if (cs[0]) {
        const t = await transacaoService
          .extrato(cs[0].nmrConta)
          .catch(() => []);
        setTxs(t.slice(0, 5));
      }
      console.log(contaService.listar(user.id));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const saldoTotal = contas.reduce((s, c) => s + Number(c.saldo || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <p className="text-sm text-zinc-400">
          Olá, {user?.nome?.split(" ")[0]} 👋
        </p>
        <h1 className="text-2xl lg:text-3xl font-semibold mt-1">
          Bem-vindo de volta
        </h1>
      </header>

      <Card className="bg-gradient-to-br from-brand-900/30 to-bg-card border-brand-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wide">
              Patrimônio total
            </p>
            <p className="text-4xl font-bold text-white mt-2">
              {loading ? "—" : formatBRL(saldoTotal)}
            </p>
            <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" /> Distribuído em{" "}
              {contas.length} conta(s)
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="secondary" onClick={() => router.push("/contas")}>
              <ArrowDownLeft className="w-4 h-4" />
              Depositar
            </Button>
            <Button variant="secondary" onClick={() => router.push("/contas")}>
              <ArrowUpRight className="w-4 h-4" />
              Sacar
            </Button>
            <Link href="/transferencias">
              <Button>
                <ArrowLeftRight className="w-4 h-4" /> Transferir
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Minhas contas</h2>
          <Link href="/contas/criar">
            <Button variant="ghost">
              <Plus className="w-4 h-4" /> Nova conta
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
        ) : contas.length === 0 ? (
          <Card>
            <EmptyState
              title="Você ainda não possui contas"
              description="Crie sua primeira conta para começar."
              action={
                <Link href="/contas/criar">
                  <Button>
                    <Plus className="w-4 h-4" /> Criar conta
                  </Button>
                </Link>
              }
            />
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contas.map((c) => (
              <AccountCard key={c.id} conta={c} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Movimentações recentes</h2>
        <Card className="p-2">
          {loading ? (
            <div className="space-y-2 p-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : txs.length === 0 ? (
            <EmptyState
              title="Sem movimentações"
              description="Suas transações aparecerão aqui."
            />
          ) : (
            <div className="divide-y divide-line">
              {txs.map((tx, i) => (
                <TransactionItem
                  key={i}
                  tx={tx}
                  contaAtual={contas[0]?.nmrConta}
                />
              ))}
            </div>
          )}
        </Card>
      </section>

      <DepositModal
        open={dep}
        onClose={() => setDep(false)}
        nmrConta={selectedConta}
        onDone={load}
      />
      <WithdrawModal
        open={wd}
        onClose={() => setWd(false)}
        nmrConta={selectedConta}
        onDone={load}
      />
    </div>
  );
}
