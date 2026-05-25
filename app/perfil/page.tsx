"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useEffect, useState } from "react";
import { clienteService } from "@/services/cliente.service";
import { Cliente } from "@/types";
import { formatCPF, formatPhone, formatDate } from "@/utils/format";
import { Mail, Phone, MapPin, IdCard, Calendar, User } from "lucide-react";

export default function PerfilPage() {
  const { user } = useAuth();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    clienteService.buscarPorId(user.id).then(setCliente).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <header>
        <h1 className="text-2xl font-semibold">Meu perfil</h1>
        <p className="text-sm text-zinc-400 mt-1">Suas informações pessoais</p>
      </header>

      {loading ? (
        <Skeleton className="h-80" />
      ) : (
        <Card>
          <div className="flex items-center gap-4 pb-6 border-b border-line">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-2xl font-bold">
              {user?.nome?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{cliente?.nome ?? user?.nome}</h2>
              <p className="text-sm text-zinc-400">{cliente?.email ?? user?.email}</p>
            </div>
          </div>

          <dl className="grid sm:grid-cols-2 gap-5 pt-6">
            <Info icon={<User className="w-4 h-4" />} label="Nome" value={cliente?.nome} />
            <Info icon={<Mail className="w-4 h-4" />} label="E-mail" value={cliente?.email} />
            <Info icon={<IdCard className="w-4 h-4" />} label="CPF" value={cliente && formatCPF(cliente.cpf)} />
            <Info icon={<Phone className="w-4 h-4" />} label="Telefone" value={cliente && formatPhone(cliente.telefone)} />
            <Info icon={<MapPin className="w-4 h-4" />} label="Estado" value={cliente?.estado} />
            <Info icon={<Calendar className="w-4 h-4" />} label="Cliente desde" value={cliente && formatDate(cliente.criadoEm, "dd/MM/yyyy")} />
          </dl>
        </Card>
      )}
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 mb-1">{icon}{label}</dt>
      <dd className="text-sm text-white">{value || "—"}</dd>
    </div>
  );
}
