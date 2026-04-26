import type { Plan } from "./auth";

export interface PlanInfo {
  id: Plan;
  name: string;
  price: string;
  priceNote: string;
  highlight?: boolean;
  description: string;
  openFinanceLimit: number; // -1 = ilimitado
  features: string[];
  cta: string;
}

export const PLANS: PlanInfo[] = [
  {
    id: "free",
    name: "Free",
    price: "R$ 0",
    priceNote: "para sempre",
    description: "Comece a organizar suas finanças sem pagar nada.",
    openFinanceLimit: 0,
    features: [
      "Lançamentos manuais ilimitados",
      "Importação de extrato CSV",
      "Dashboard com gráficos básicos",
      "Categorias automáticas",
      "Sem integração Open Finance",
    ],
    cta: "Começar grátis",
  },
  {
    id: "free_plus",
    name: "Essencial",
    price: "R$ 5",
    priceNote: "/mês",
    description: "O primeiro passo para automação real.",
    openFinanceLimit: 1,
    features: [
      "Tudo do Free",
      "1 conta via Open Finance",
      "Sincronização automática diária",
      "Alertas inteligentes por categoria",
      "Suporte por e-mail",
    ],
    cta: "Assinar Essencial",
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 20",
    priceNote: "/mês",
    highlight: true,
    description: "O equilíbrio perfeito entre custo e poder.",
    openFinanceLimit: 2,
    features: [
      "Tudo do Essencial",
      "2 contas via Open Finance",
      "Chat com IA financeira",
      "Simulador “E se...?”",
      "Metas de economia gamificadas",
    ],
    cta: "Assinar Pro",
  },
  {
    id: "full",
    name: "Full",
    price: "R$ 39",
    priceNote: "/mês",
    description: "Toda a potência do Amaro Finance, sem limites.",
    openFinanceLimit: 5,
    features: [
      "Tudo do Pro",
      "5 contas via Open Finance",
      "Carteira de investimentos completa",
      "Relatórios avançados em PDF",
      "Assistente IA com prioridade",
    ],
    cta: "Assinar Full",
  },
  {
    id: "b2b",
    name: "B2B",
    price: "R$ 299",
    priceNote: "/mês por empresa",
    description: "White-label para contadores e fintechs.",
    openFinanceLimit: -1,
    features: [
      "Painel multi-cliente",
      "Branding personalizado",
      "API e integrações dedicadas",
      "Onboarding assistido",
      "Gerente de conta dedicado",
    ],
    cta: "Falar com vendas",
  },
];

export function planLabel(plan: Plan): string {
  if (plan === "admin") return "Admin Master";
  return PLANS.find((p) => p.id === plan)?.name ?? "Free";
}
