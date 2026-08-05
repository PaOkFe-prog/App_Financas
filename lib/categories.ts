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

// Mesmos matizes, ajustados (steps) para contraste no fundo escuro.
export const CATEGORY_COLORS_DARK: Record<TransactionCategory, string> = {
  Alimentação: "#3987e5",
  Transporte: "#d95926",
  Moradia: "#199e70",
  Lazer: "#c98500",
  Saúde: "#d55181",
  Educação: "#008300",
  Salário: "#9085e9",
  Freelance: "#e66767",
  Outros: "#a1a1aa",
};
