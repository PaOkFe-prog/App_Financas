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

export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  Alimentação: "#f97316",
  Transporte: "#3b82f6",
  Moradia: "#8b5cf6",
  Lazer: "#ec4899",
  Saúde: "#ef4444",
  Educação: "#eab308",
  Salário: "#22c55e",
  Freelance: "#14b8a6",
  Outros: "#64748b",
};
