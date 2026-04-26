import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PublicHeader, PublicFooter } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/plans";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos — Amaro Finance" },
      {
        name: "description",
        content:
          "5 planos do Amaro Finance: Free, Essencial (R$5), Pro (R$20), Full (R$39) e B2B. Compare recursos.",
      },
    ],
  }),
  component: PlanosPage,
});

function PlanosPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="bg-gradient-hero py-16">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
            Planos do <span className="text-gradient">Amaro</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Comece grátis. Evolua quando precisar de Open Finance, IA avançada e investimentos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 ${
                p.highlight
                  ? "border-primary shadow-elegant lg:scale-105"
                  : "border-border shadow-card"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
                  Mais popular
                </span>
              )}
              <div className="font-display text-2xl font-bold">{p.name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.priceNote}</span>
              </div>

              <div className="mt-5 rounded-lg bg-accent/40 px-3 py-2 text-xs font-semibold text-accent-foreground">
                {p.openFinanceLimit === -1
                  ? "Open Finance ilimitado"
                  : p.openFinanceLimit === 0
                    ? "Sem Open Finance"
                    : `${p.openFinanceLimit} conta${p.openFinanceLimit > 1 ? "s" : ""} via Open Finance`}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => {
                  const isNeg = f.toLowerCase().includes("sem ");
                  return (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      {isNeg ? (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      )}
                      <span className={isNeg ? "text-muted-foreground" : ""}>{f}</span>
                    </li>
                  );
                })}
              </ul>

              <Button
                asChild
                className="mt-6 w-full"
                variant={p.highlight ? "default" : "outline"}
              >
                <Link to="/login">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-card p-8 text-center">
          <h3 className="font-display text-2xl font-bold">Está testando o Amaro?</h3>
          <p className="mt-2 text-muted-foreground">
            Beta testers ganham 60 dias do plano Pro grátis. Entre em contato pelo e-mail{" "}
            <a href="mailto:amarofinanceof@gmail.com" className="font-semibold text-primary underline">amarofinanceof@gmail.com</a>.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
