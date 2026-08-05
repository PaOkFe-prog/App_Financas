import { MONTH_ABBR } from "@/lib/utils";
import type { MonthlyNet } from "@/lib/data/transactions";

export interface WaterfallStep {
  label: string;
  /** Intervalo [início, fim] no eixo de valores — funciona com qualquer sinal. */
  range: [number, number];
  /** Valor real com sinal, usado no rótulo e no tooltip. */
  displayValue: number;
  type: "opening" | "increase" | "decrease" | "closing";
}

function pointStep(
  label: string,
  amount: number,
  type: "opening" | "closing"
): WaterfallStep {
  return {
    label,
    range: [Math.min(0, amount), Math.max(0, amount)],
    displayValue: amount,
    type,
  };
}

function rangeStep(
  label: string,
  from: number,
  to: number,
  type: "increase" | "decrease"
): WaterfallStep {
  return {
    label,
    range: [Math.min(from, to), Math.max(from, to)],
    displayValue: to - from,
    type,
  };
}

/**
 * Fluxo de caixa de um único mês: parte do saldo herdado do mês anterior,
 * soma as receitas, desce categoria a categoria (maior despesa primeiro)
 * e termina no saldo final — que é o saldo inicial do mês seguinte.
 */
export function buildMonthlyWaterfall(
  openingBalance: number,
  income: number,
  byCategory: { category: string; total: number }[]
): WaterfallStep[] {
  const steps: WaterfallStep[] = [
    pointStep("Saldo inicial", openingBalance, "opening"),
  ];

  let running = openingBalance;

  steps.push(rangeStep("Receitas", running, running + income, "increase"));
  running += income;

  const sorted = [...byCategory].sort((a, b) => b.total - a.total);
  for (const { category, total } of sorted) {
    const next = running - total;
    steps.push(rangeStep(category, running, next, "decrease"));
    running = next;
  }

  steps.push(pointStep("Saldo final", running, "closing"));
  return steps;
}

/**
 * Fluxo de caixa do ano: parte do saldo herdado do ano anterior e cai em
 * cascata mês a mês — o saldo final de um mês é o saldo inicial do próximo.
 */
export function buildYearlyWaterfall(
  openingBalance: number,
  monthly: MonthlyNet[]
): WaterfallStep[] {
  const steps: WaterfallStep[] = [
    pointStep("Saldo inicial", openingBalance, "opening"),
  ];

  let running = openingBalance;
  for (const { month, net } of monthly) {
    const next = running + net;
    steps.push(
      rangeStep(MONTH_ABBR[month - 1], running, next, net >= 0 ? "increase" : "decrease")
    );
    running = next;
  }

  steps.push(pointStep("Saldo final", running, "closing"));
  return steps;
}
