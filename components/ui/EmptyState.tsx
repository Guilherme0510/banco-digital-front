import { ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({ icon, title, description, action }: {
  icon?: ReactNode; title: string; description?: string; action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-bg-elevated border border-line flex items-center justify-center mb-4 text-brand-400">
        {icon ?? <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      {description && <p className="text-sm text-zinc-400 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
