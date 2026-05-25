"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Wallet, ArrowLeftRight, Users, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contas", label: "Contas", icon: Wallet },
  { href: "/transferencias", label: "Transferências", icon: ArrowLeftRight },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-xl bg-bg-card border border-line"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-64 bg-bg-elevated border-r border-line z-50",
        "flex flex-col p-5 transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={150} height={32} className="rounded-full" />
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href} href={href} onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active ? "bg-brand-500/15 text-brand-300 border border-brand-500/30"
                        : "text-zinc-400 hover:text-white hover:bg-bg-card"
                )}
              >
                <Icon className="w-4 h-4" /> {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 pt-4 border-t border-line">
          <div className="px-3 py-2 text-xs text-zinc-500">Logado como</div>
          <div className="px-3 pb-3 text-sm text-white truncate">{user?.nome}</div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>
    </>
  );
}
