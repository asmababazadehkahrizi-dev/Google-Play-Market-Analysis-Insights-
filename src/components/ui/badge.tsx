import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper-soft px-3 py-1 text-xs font-medium text-ink/70 dark:border-line-dark dark:bg-ink-soft dark:text-paper/70",
        className
      )}
    >
      {children}
    </span>
  );
}
