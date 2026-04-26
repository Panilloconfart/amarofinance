export const balanceSummary = {
  total: 18420.55,
  income: 9800,
  expenses: 4280.45,
  invested: 12600,
};

export const monthlyFlow = [
  { month: "Jan", receita: 8200, despesa: 5100 },
  { month: "Fev", receita: 8400, despesa: 4900 },
  { month: "Mar", receita: 8800, despesa: 5400 },
  { month: "Abr", receita: 9000, despesa: 4700 },
  { month: "Mai", receita: 9400, despesa: 5200 },
  { month: "Jun", receita: 9800, despesa: 4280 },
];

export const categoryBreakdown = [
  { name: "Moradia", value: 1450, limit: 1600, color: "var(--color-chart-1)" },
  { name: "Alimentação", value: 920, limit: 1000, color: "var(--color-chart-2)" },
  { name: "Transporte", value: 380, limit: 500, color: "var(--color-chart-3)" },
  { name: "Lazer", value: 540, limit: 400, color: "var(--color-chart-4)" },
  { name: "Saúde", value: 290, limit: 600, color: "var(--color-chart-5)" },
];

export const recentTransactions = [
  { id: "1", date: "26/04", desc: "Mercado Pão de Açúcar", category: "Alimentação", value: -284.5 },
  { id: "2", date: "25/04", desc: "Salário", category: "Receita", value: 5400 },
  { id: "3", date: "24/04", desc: "Uber", category: "Transporte", value: -32.9 },
  { id: "4", date: "23/04", desc: "Netflix", category: "Lazer", value: -55.9 },
  { id: "5", date: "22/04", desc: "Farmácia", category: "Saúde", value: -78.4 },
  { id: "6", date: "21/04", desc: "Aluguel", category: "Moradia", value: -1450 },
  { id: "7", date: "20/04", desc: "Freela design", category: "Receita", value: 1200 },
];

export const investments = [
  { name: "Tesouro Selic 2029", type: "Renda Fixa", amount: 5400, perf: 11.2 },
  { name: "ITSA4", type: "Ações", amount: 2800, perf: 8.7 },
  { name: "HGLG11", type: "FII", amount: 2100, perf: 6.4 },
  { name: "Bitcoin", type: "Cripto", amount: 1300, perf: -3.2 },
  { name: "CDB Banco Inter", type: "Renda Fixa", amount: 1000, perf: 12.1 },
];

export const aiSuggestions = [
  "Você gastou 35% a mais em Lazer este mês — considere ajustar o limite.",
  "Sobrou R$ 1.520 esse mês. Que tal aplicar 70% no Tesouro Selic?",
  "Sua meta de viagem está a 62% — faltam R$ 1.900 para concluir.",
];
