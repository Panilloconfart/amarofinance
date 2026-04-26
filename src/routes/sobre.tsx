import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Target, Users } from "lucide-react";
import { PublicHeader, PublicFooter } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Amaro Finance" },
      {
        name: "description",
        content: "Conheça a missão do Amaro Finance: democratizar a inteligência financeira no Brasil.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
            Finanças não precisam <span className="text-gradient">ser difíceis</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Nascemos da ideia de que toda pessoa merece um conselheiro financeiro de bolso —
            inteligente, gentil e sempre disponível.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Heart, title: "Empatia", desc: "Falamos a sua língua, sem jargão de banco." },
            { icon: Target, title: "Foco no resultado", desc: "Cada feature precisa fazer você economizar mais." },
            { icon: Users, title: "Comunidade", desc: "Construímos com nossos beta testers, todos os dias." },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-card p-10 text-center text-primary-foreground shadow-elegant">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Quer fazer parte?</h2>
          <p className="mt-3 text-primary-foreground/80">
            Estamos abrindo vagas para beta testers — ganhe 60 dias do Pro de graça.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to="/login">Quero participar</Link>
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
