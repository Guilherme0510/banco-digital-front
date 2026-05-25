import { cn } from "@/utils/cn";
export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("skeleton", className)} />
);
