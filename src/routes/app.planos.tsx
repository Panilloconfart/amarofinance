import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS, planLabel } from "@/lib/plans";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/planos")({
  component: AppPlanosPage,
});

function AppPlanosPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Seu plano</h1>
        <p className="text-sm text-muted-foreground">
          Plano atual:{" "}
          <Badge variant="secondary" className="ml-1 gap-1">
            {user?.isAdmin && <Crown className="h-3 w-3 text-warning" />}
            {user ? planLabel(user.plan) : "Free"}
          </Badge>
        </p>
      </header>

      {user?.isAdmin && (
        <Card className="border-warning/40 bg-warning/10 p-5">
          <div className="flex items-start gap-3">
            <Crown className="mt-0.5 h-5 w-5 text-warning" />
            <div>
              <div className="font-display font-bold">Você é Admin Master</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Acesso vitalício a todos os planos e funcionalidades. Use este login para distribuir
                acessos de teste aos beta testers.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {PLANS.map((p) => {
          const current = user?.plan === p.id;
          return (
            <Card
              key={p.id}
              className={cn(
                "relative flex flex-col p-5",
                p.highlight && "border-primary shadow-elegant",
                current && "ring-2 ring-primary",
              )}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
                  Mais popular
                </span>
              )}
              <div className="font-display text-xl font-bold">{p.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold">{p.price}</span>
                <span className="text-xs text-muted-foreground">{p.priceNote}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{p.description}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {p.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-5 w-full"
                variant={current ? "secondary" : p.highlight ? "default" : "outline"}
                disabled={current}
              >
                {current ? "Plano atual" : p.cta}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
