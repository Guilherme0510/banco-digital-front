"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { contaService } from "@/services/conta.service";
import { Conta } from "@/types";
import { AccountCard } from "@/components/AccountCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DepositModal } from "@/components/modals/DepositModal";
import { WithdrawModal } from "@/components/modals/WithdrawModal";
import { ArrowDownLeft, ArrowUpRight, Plus, Receipt, ArrowLeftRight } from "lucide-react";
import Link from "next/link";

export default function ContasPage() {
  const { user } = useAuth();
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState("");
  const [dep, setDep] = useState(false);
  const [wd, setWd] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try { setContas(await contaService.listar(user.id)); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [user]);

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Contas</h1>
          <p className="text-sm text-zinc-400 mt-1">Gerencie suas contas e operações</p>
        </div>
        <Link href="/contas/criar"><Button><Plus className="w-4 h-4" /> Nova conta</Button></Link>
      </header>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-44" />)}
        </div>
      ) : contas.length === 0 ? (
        <Card><EmptyState title="Nenhuma conta" description="Crie uma conta para começar."
          action={<Link href="/contas/criar"><Button>Criar conta</Button></Link>} /></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {contas.map((c) => (
            <div key={c.id} className="space-y-3">
              <AccountCard conta={c} />
              <div className="grid grid-cols-3 gap-2">
                <Button variant="secondary" onClick={() => { setSel(c.nmrConta); setDep(true); }}>
                  <ArrowDownLeft className="w-4 h-4" /> Depositar
                </Button>
                <Button variant="secondary" onClick={() => { setSel(c.nmrConta); setWd(true); }}>
                  <ArrowUpRight className="w-4 h-4" /> Sacar
                </Button>
                <Link href={`/extrato/${c.nmrConta}`}>
                  <Button variant="secondary" className="w-full"><Receipt className="w-4 h-4" /> Extrato</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <DepositModal open={dep} onClose={() => setDep(false)} nmrConta={sel} onDone={load} />
      <WithdrawModal open={wd} onClose={() => setWd(false)} nmrConta={sel} onDone={load} />
    </div>
  );
}
