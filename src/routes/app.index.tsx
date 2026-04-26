import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  balanceSummary,
  monthlyFlow,
  categoryBreakdown,
  recentTransactions,
  aiSuggestions,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  component: DashboardPage,
});

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Visão geral</h1>
        <p className="text-sm text-muted-foreground">Atualizado há poucos minutos</p>
      </header>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Wallet}
          label="Saldo total"
          value={fmt(balanceSummary.total)}
          trend="+8,2% no mês"
          tone="primary"
        />
        <KpiCard
          icon={TrendingUp}
          label="Receitas"
          value={fmt(balanceSummary.income)}
          trend="+4,4% vs mês passado"
          tone="success"
        />
        <KpiCard
          icon={TrendingDown}
          label="Despesas"
          value={fmt(balanceSummary.expenses)}
          trend="-12% vs mês passado"
          tone="warning"
        />
        <KpiCard
          icon={PiggyBank}
          label="Investido"
          value={fmt(balanceSummary.invested)}
          trend="+R$ 1.200 no mês"
          tone="primary"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fluxo mensal</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFlow} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="desp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                  formatter={(v: number) => fmt(v)}
                />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2}
                  fill="url(#rec)"
                  name="Receita"
                />
                <Area
                  type="monotone"
                  dataKey="despesa"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#desp)"
                  name="Despesa"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Por categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {categoryBreakdown.map((c, i) => (
                    <Cell key={i} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Limites por categoria + IA */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Limites por categoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {categoryBreakdown.map((c) => {
              const pct = Math.round((c.value / c.limit) * 100);
              const over = pct > 100;
              return (
                <div key={c.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{c.name}</span>
                    <span
                      className={cn(
                        "tabular-nums",
                        over ? "font-semibold text-destructive" : "text-muted-foreground",
                      )}
                    >
                      {fmt(c.value)} / {fmt(c.limit)} · {pct}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min(pct, 100)}
                    className={cn("h-2", over && "[&>div]:bg-destructive")}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-gradient-to-br from-card to-accent/30">
          <CardHeader className="flex flex-row items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>Sugestões da IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiSuggestions.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-background/60 p-3 text-sm leading-relaxed"
              >
                {s}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Transações recentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Últimas transações</CardTitle>
          <a className="inline-flex items-center gap-1 text-sm text-primary" href="/app/transacoes">
            Ver todas <ArrowUpRight className="h-4 w-4" />
          </a>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {recentTransactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  {t.value > 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.desc}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.date} · {t.category}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "font-mono text-sm font-semibold tabular-nums",
                  t.value > 0 ? "text-success" : "text-foreground",
                )}
              >
                {t.value > 0 ? "+" : ""}
                {fmt(t.value)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
  tone: "primary" | "success" | "warning";
}) {
  const toneCls = {
    primary: "bg-gradient-primary text-primary-foreground shadow-glow",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning-foreground",
  }[tone];
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-2xl font-bold tabular-nums">{value}</div>
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", toneCls)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 text-xs font-medium text-muted-foreground">{trend}</div>
      </CardContent>
    </Card>
  );
}
