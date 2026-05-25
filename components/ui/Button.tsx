"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ loading, variant = "primary", className, children, disabled, ...rest }, ref) => {
    const variants = {
      primary: "bg-brand-500 hover:bg-brand-600 text-white shadow-soft hover:shadow-glow",
      secondary: "bg-bg-card hover:bg-bg-elevated text-white border border-line",
      ghost: "hover:bg-bg-card text-zinc-300",
      danger: "bg-red-500/90 hover:bg-red-500 text-white",
    };
    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium",
          "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant], className
        )}
        {...rest}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
