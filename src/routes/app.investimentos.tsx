import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { investments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/investimentos")({
  component: InvestimentosPage,
});

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function InvestimentosPage() {
  const total = investments.reduce((s, i) => s + i.amount, 0);
  const weighted =
    investments.reduce((s, i) => s + i.perf * i.amount, 0) / total;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Investimentos</h1>
          <p className="text-sm text-muted-foreground">
            Sua carteira consolidada em tempo real.
          </p>
        </div>
        <Button>
          <Plus className="mr-1 h-4 w-4" /> Novo aporte
        </Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-gradient-card text-primary-foreground">
          <CardContent className="p-6">
            <div className="text-xs uppercase tracking-wider opacity-70">Patrimônio investido</div>
            <div className="mt-1 font-display text-3xl font-bold">{fmt(total)}</div>
            <div className="mt-1 text-sm opacity-80">+{weighted.toFixed(1)}% no ano</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Renda fixa</div>
            <div className="mt-1 font-display text-2xl font-bold">{fmt(6400)}</div>
            <div className="mt-1 text-sm text-success">+11,5%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Variável</div>
            <div className="mt-1 font-display text-2xl font-bold">{fmt(6200)}</div>
            <div className="mt-1 text-sm text-warning-foreground">+4,2%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posições</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border p-0">
          {investments.map((inv) => {
            const positive = inv.perf >= 0;
            return (
              <div key={inv.name} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-semibold">{inv.name}</div>
                  <div className="mt-1">
                    <Badge variant="secondary" className="font-normal">
                      {inv.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold tabular-nums">{fmt(inv.amount)}</div>
                  <div
                    className={cn(
                      "mt-0.5 inline-flex items-center gap-1 text-xs font-medium",
                      positive ? "text-success" : "text-destructive",
                    )}
                  >
                    {positive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {positive ? "+" : ""}
                    {inv.perf.toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
