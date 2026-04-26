import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ia")({
  component: ChatIA,
});

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "Quanto posso gastar com lazer este mês?",
  "Onde estou desperdiçando dinheiro?",
  "Vale a pena trocar minha CDB por Tesouro Selic?",
  "Quanto preciso poupar para juntar R$ 30 mil em 1 ano?",
];

const FAKE_REPLIES: Record<string, string> = {
  default:
    "Analisando seu histórico... Você tem em média R$ 1.520 sobrando por mês. Posso sugerir um plano de aplicação?",
  lazer:
    "Você gastou R$ 540 em Lazer este mês — 35% acima do limite. Sugiro reduzir para R$ 400 e direcionar a diferença para sua reserva.",
  desperdicio:
    "Identifiquei 3 assinaturas pouco usadas (R$ 89/mês), e seu app de delivery custou R$ 320 — economia potencial: R$ 410/mês.",
  cdb: "Seu CDB rende 12,1% a.a. e o Tesouro Selic está em 11,2%. Mantenha o CDB pela rentabilidade superior, desde que tenha proteção FGC.",
};

function pickReply(q: string) {
  const t = q.toLowerCase();
  if (t.includes("lazer")) return FAKE_REPLIES.lazer;
  if (t.includes("desperd")) return FAKE_REPLIES.desperdicio;
  if (t.includes("cdb") || t.includes("tesouro")) return FAKE_REPLIES.cdb;
  return FAKE_REPLIES.default;
}

function ChatIA() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Olá! Sou sua IA financeira. Posso analisar seus gastos, sugerir investimentos e responder dúvidas. O que vamos resolver hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", text: pickReply(text) }]);
      setTyping(false);
    }, 800);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col">
      <header className="mb-4">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold tracking-tight">
          <Sparkles className="h-7 w-7 text-primary" />
          Chat IA
        </h1>
        <p className="text-sm text-muted-foreground">
          Pergunte qualquer coisa sobre suas finanças.
        </p>
      </header>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  m.role === "user"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-gradient-primary text-primary-foreground shadow-glow",
                )}
              >
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-muted text-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {msgs.length <= 1 && (
          <div className="border-t border-border p-4">
            <div className="mb-2 text-xs font-medium text-muted-foreground">Sugestões:</div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs hover:border-primary hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2 border-t border-border p-4"
        >
          <Input
            placeholder="Pergunte algo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
