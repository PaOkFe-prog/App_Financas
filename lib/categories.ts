import type { TransactionCategory } from "@/types/transaction";

export const CATEGORIES: readonly TransactionCategory[] = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Salário",
  "Freelance",
  "Outros",
] as const;

// Paleta categórica validada (CVD-safe) — ordem fixa, ver skill de dataviz.
// "Outros" fica em cinza neutro por ser o "balde" de miscelânea, não uma
// 9ª categoria concorrendo por matiz com as demais.
export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  Alimentação: "#2a78d6", // blue
  Transporte: "#eb6834", // orange
  Moradia: "#1baf7a", // aqua
  Lazer: "#eda100", // yellow
  Saúde: "#e87ba4", // magenta
  Educação: "#008300", // green
  Salário: "#4a3aa7", // violet
  Freelance: "#e34948", // red
  Outros: "#8a8a86", // neutro
};
