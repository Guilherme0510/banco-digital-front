"use client";
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";


interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...rest }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-400">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl bg-bg-elevated border border-line px-4 py-2.5 text-sm",
          "text-white placeholder:text-zinc-500",
          "focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
          "transition-all", error && "border-red-500/60",
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
);
Input.displayName = "Input";
