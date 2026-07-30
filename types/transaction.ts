export type TransactionType = "receita" | "despesa";

export type TransactionCategory =
  | "Alimentação"
  | "Transporte"
  | "Moradia"
  | "Lazer"
  | "Saúde"
  | "Educação"
  | "Salário"
  | "Freelance"
  | "Outros";

export interface Transaction {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: TransactionCategory;
  created_at: string;
  updated_at: string;
}

export interface TransactionFilters {
  month?: number;
  year?: number;
  category?: TransactionCategory;
  search?: string;
}
