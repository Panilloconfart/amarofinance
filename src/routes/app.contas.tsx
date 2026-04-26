import { createFileRoute } from "@tanstack/react-router";
import { Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/contas")({
  component: ContasPage,
});

const ACCOUNTS = [
  { bank: "Nubank", type: "Conta corrente", balance: 4820.55, status: "ok", logo: "🟣" },
  { bank: "Itaú", type: "Poupança", balance: 1200.0, status: "ok", logo: "🟠" },
  { bank: "Banco Inter", type: "Conta + Investimentos", balance: 12400.0, status: "ok", logo: "🟧" },
  { bank: "C6 Bank", type: "Cartão de crédito", balance: -890.45, status: "sync", logo: "⬛" },
];

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function ContasPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Contas & Bancos</h1>
          <p className="text-sm text-muted-foreground">
            Conecte via Open Finance ou importe extratos CSV.
          </p>
        </div>
        <Button>
          <Plus className="mr-1 h-4 w-4" /> Conectar nova conta
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {ACCOUNTS.map((a) => (
          <Card key={a.bank}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">
                {a.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{a.bank}</span>
                  {a.status === "ok" ? (
                    <Badge variant="secondary" className="gap-1 text-success">
                      <CheckCircle2 className="h-3 w-3" /> Sincronizado
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1 text-warning-foreground">
                      <AlertCircle className="h-3 w-3" /> Sincronizando
                    </Badge>
                  )}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{a.type}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg font-bold tabular-nums">{fmt(a.balance)}</div>
                <div className="text-xs text-muted-foreground">Atualizado hoje</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold">Conecte mais bancos</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Disponível nos planos Essencial, Pro e Full. Suporte a 50+ instituições brasileiras.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
