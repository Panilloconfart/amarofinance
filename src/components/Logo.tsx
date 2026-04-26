import { cn } from "@/lib/utils";

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M4 18 L9 8 L14 14 L20 5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="5" r="2" fill="white" />
        </svg>
      </div>
      {!mark && (
        <div className="leading-tight">
          <div className="font-display text-lg font-bold tracking-tight">
            Amaro<span className="text-primary"> Finance</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Inteligência financeira
          </div>
        </div>
      )}
    </div>
  );
}
