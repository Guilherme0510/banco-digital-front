"use client";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { contaService } from "@/services/conta.service";
import { toast } from "sonner";

export function WithdrawModal({ open, onClose, nmrConta, onDone }: {
  open: boolean; onClose: () => void; nmrConta: string; onDone?: () => void;
}) {
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const v = Number(valor.replace(",", "."));
    if (!v || v <= 0) return toast.error("Informe um valor válido");
    setLoading(true);
    try {
      await contaService.sacar(nmrConta, v);
      toast.success("Saque realizado!");
      setValor(""); onDone?.(); onClose();
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Sacar da conta ${nmrConta}`}>
      <div className="space-y-4">
        <Input label="Valor (R$)" placeholder="0,00" value={valor} onChange={(e) => setValor(e.target.value)} autoFocus />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={submit} loading={loading}>Sacar</Button>
        </div>
      </div>
    </Modal>
  );
}
