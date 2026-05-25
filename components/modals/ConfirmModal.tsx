"use client";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export function ConfirmModal({ open, onClose, onConfirm, title, message, loading, danger }: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; message: string; loading?: boolean; danger?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex gap-3 mb-5">
        <div className="p-2 rounded-xl bg-red-500/15 text-red-400 h-fit"><AlertTriangle className="w-5 h-5" /></div>
        <p className="text-sm text-zinc-300">{message}</p>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} loading={loading}>Confirmar</Button>
      </div>
    </Modal>
  );
}
