import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-bg-card border border-line p-6 shadow-card animate-fade-in",
        className
      )}
      {...rest}
    />
  );
}
