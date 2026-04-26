import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  PiggyBank,
  Bot,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PublicHeader, PublicFooter } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/plans";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amaro Finance — Inteligência financeira pessoal" },
      {
        name: "description",
        content:
          "App de finanças pessoais com IA, Open Finance e simulador inteligente. Comece grátis, sem cartão.",
      },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  {
    icon: Bot,
    title: "Assistente IA financeira",
    desc: "Pergunte “quanto posso gastar este mês?” e receba respostas claras com base nas suas contas.",
  },
  {
    icon: TrendingUp,
    title: "Open Finance integrado",
    desc: "Conecte seus bancos e veja tudo em um só lugar. Sincronização diária e segura.",
  },
  {
    icon: PiggyBank,
    title: "Metas gamificadas",
    desc: "Conquistas, streaks e simulador “E se...?” para tornar economizar viciante.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidade primeiro",
    desc: "Dados criptografados e LGPD-ready. Você controla o que é compartilhado.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Beta aberto · 1 mês Pro grátis
            </span>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Sua vida financeira,{" "}
              <span className="text-gradient">finalmente clara.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Amaro Finance organiza seus gastos, automatiza lançamentos com Open Finance e usa IA
              para te dizer onde economizar — em português, do seu jeito.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-elegant">
                <Link to="/login">
                  Criar conta grátis <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/planos">Ver planos</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> Sem cartão de crédito
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> LGPD-ready
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> Cancele quando quiser
              </span>
            </div>
          </div>

          {/* Mock dashboard card */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Saldo total
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold">R$ 18.420,55</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15 text-success">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <MiniStat label="Receitas" value="R$ 9.800" tone="success" />
                <MiniStat label="Gastos" value="R$ 4.280" tone="warning" />
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { name: "Moradia", v: 90 },
                  { name: "Alimentação", v: 75 },
                  { name: "Lazer", v: 110 },
                ].map((c) => (
                  <div key={c.name}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium">{c.name}</span>
                      <span className={c.v > 100 ? "text-destructive" : "text-muted-foreground"}>
                        {c.v}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={
                          c.v > 100
                            ? "h-full rounded-full bg-destructive"
                            : "h-full rounded-full bg-gradient-primary"
                        }
                        style={{ width: `${Math.min(c.v, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-accent/50 p-3 text-sm">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p>Você gastou 35% a mais em <b>Lazer</b>. Quer ajustar o limite?</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-card p-4 shadow-card md:flex md:items-center md:gap-3">
              <Smartphone className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <div className="font-semibold">Disponível no celular</div>
                <div className="text-muted-foreground">PWA + Android</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Tudo que você precisa para dominar seu dinheiro
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sem planilha, sem complicação. O Amaro entende sua vida financeira em minutos.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-card"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS preview */}
      <section className="bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Um plano para cada momento
            </h2>
            <p className="mt-4 text-muted-foreground">
              Comece grátis. Evolua quando precisar de mais automação.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {PLANS.map((p) => (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border bg-card p-5 ${
                  p.highlight ? "border-primary shadow-elegant" : "border-border"
                }`}
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
                <div className="mt-4 text-xs font-semibold text-primary">
                  {p.openFinanceLimit === -1
                    ? "Open Finance ilimitado"
                    : p.openFinanceLimit === 0
                      ? "Sem Open Finance"
                      : `${p.openFinanceLimit} conta${p.openFinanceLimit > 1 ? "s" : ""} Open Finance`}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/planos">Comparar todos os recursos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-5xl px-4 py-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-card p-10 text-center text-primary-foreground shadow-elegant md:p-16">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Pronto para dormir tranquilo?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Crie sua conta em 30 segundos e ganhe 1 mês do plano Pro de presente.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/login">
              Começar agora <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "success" | "warning";
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={`mt-1 font-display text-lg font-bold ${
          tone === "success" ? "text-success" : "text-warning-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
