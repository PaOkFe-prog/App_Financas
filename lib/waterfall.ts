import { MONTH_ABBR } from "@/lib/utils";
import type { MonthlyNet } from "@/lib/data/transactions";

export interface WaterfallStep {
  label: string;
  /** Ponto de partida (invisível) da barra empilhada. */
  base: number;
  /** Altura visível da barra — sempre um valor positivo (magnitude). */
  value: number;
  /** Valor real com sinal, usado no rótulo e no tooltip. */
  displayValue: number;
  type: "increase" | "decrease" | "total";
}

function totalStep(label: string, amount: number): WaterfallStep {
  return {
    label,
    base: Math.min(0, amount),
    value: Math.abs(amount),
    displayValue: amount,
    type: "total",
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
  const steps: WaterfallStep[] = [totalStep("Saldo inicial", openingBalance)];

  let running = openingBalance;

  steps.push({
    label: "Receitas",
    base: running,
    value: income,
    displayValue: income,
    type: "increase",
  });
  running += income;

  const sorted = [...byCategory].sort((a, b) => b.total - a.total);
  for (const { category, total } of sorted) {
    const newRunning = running - total;
    steps.push({
      label: category,
      base: newRunning,
      value: total,
      displayValue: -total,
      type: "decrease",
    });
    running = newRunning;
  }

  steps.push(totalStep("Saldo final", running));
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
  const steps: WaterfallStep[] = [totalStep("Saldo inicial", openingBalance)];

  let running = openingBalance;
  for (const { month, net } of monthly) {
    const newRunning = running + net;
    steps.push({
      label: MONTH_ABBR[month - 1],
      base: net >= 0 ? running : newRunning,
      value: Math.abs(net),
      displayValue: net,
      type: net >= 0 ? "increase" : "decrease",
    });
    running = newRunning;
  }

  steps.push(totalStep("Saldo final", running));
  return steps;
}
