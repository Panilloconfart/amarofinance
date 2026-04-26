import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recentTransactions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/transacoes")({
  component: TransacoesPage,
});

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function TransacoesPage() {
  const [q, setQ] = useState("");
  const list = recentTransactions.filter(
    (t) =>
      t.desc.toLowerCase().includes(q.toLowerCase()) ||
      t.category.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Transações</h1>
          <p className="text-sm text-muted-foreground">
            Lançamentos automáticos via Open Finance + manuais.
          </p>
        </div>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Novo lançamento
        </Button>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por descrição ou categoria..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card className="divide-y divide-border">
        {list.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                {t.value > 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div>
                <div className="font-medium">{t.desc}</div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{t.date}</span>
                  <Badge variant="secondary" className="font-normal">
                    {t.category}
                  </Badge>
                </div>
              </div>
            </div>
            <div
              className={cn(
                "font-mono font-semibold tabular-nums",
                t.value > 0 ? "text-success" : "text-foreground",
              )}
            >
              {t.value > 0 ? "+" : ""}
              {fmt(t.value)}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Nenhuma transação encontrada.
          </div>
        )}
      </Card>
    </div>
  );
}
