import { createClient } from "@/lib/supabase/server";
import { pad } from "@/lib/utils";
import type {
  Transaction,
  TransactionCategory,
  TransactionFilters,
} from "@/types/transaction";

/** Resolve um intervalo de datas a partir de mês e/ou ano (ambos opcionais). */
function dateRange(month?: number, year?: number) {
  if (!month && !year) return null;

  if (month && year) {
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return {
      start: `${year}-${pad(month)}-01`,
      end: `${year}-${pad(month)}-${pad(lastDay)}`,
    };
  }

  if (year) {
    return { start: `${year}-01-01`, end: `${year}-12-31` };
  }

  // Apenas mês informado: assume o ano corrente.
  const currentYear = new Date().getFullYear();
  const lastDay = new Date(Date.UTC(currentYear, month!, 0)).getUTCDate();
  return {
    start: `${currentYear}-${pad(month!)}-01`,
    end: `${currentYear}-${pad(month!)}-${pad(lastDay)}`,
  };
}

export async function getTransactions(
  filters: TransactionFilters = {}
): Promise<Transaction[]> {
  const supabase = await createClient();

  let query = supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  const range = dateRange(filters.month, filters.year);
  if (range) {
    query = query.gte("date", range.start).lte("date", range.end);
  }

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.search) {
    query = query.ilike("description", `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Falha ao buscar transações: ${error.message}`);
  }

  return data as Transaction[];
}

export interface DashboardSummary {
  income: number;
  expense: number;
  balance: number;
  byCategory: { category: string; total: number }[];
}

export async function getDashboardSummary(
  filters: TransactionFilters
): Promise<DashboardSummary> {
  const transactions = await getTransactions(filters);

  let income = 0;
  let expense = 0;
  const categoryTotals = new Map<string, number>();

  for (const transaction of transactions) {
    if (transaction.type === "receita") {
      income += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
      categoryTotals.set(
        transaction.category,
        (categoryTotals.get(transaction.category) ?? 0) +
          Number(transaction.amount)
      );
    }
  }

  const byCategory = Array.from(categoryTotals.entries()).map(
    ([category, total]) => ({ category, total })
  );

  return { income, expense, balance: income - expense, byCategory };
}

/** Soma (receitas - despesas) de todas as transações anteriores a `beforeDate`. */
export async function getCumulativeBalance(
  beforeDate: string,
  category?: TransactionCategory
): Promise<number> {
  const supabase = await createClient();

  let query = supabase
    .from("transactions")
    .select("type, amount")
    .lt("date", beforeDate);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Falha ao calcular saldo acumulado: ${error.message}`);
  }

  return (data ?? []).reduce(
    (sum, t) =>
      sum + (t.type === "receita" ? Number(t.amount) : -Number(t.amount)),
    0
  );
}

export interface MonthlyNet {
  month: number;
  net: number;
}

/** Resultado líquido (receitas - despesas) por mês, dentro de um ano. */
export async function getMonthlyBreakdown(
  year: number,
  category?: TransactionCategory
): Promise<MonthlyNet[]> {
  const transactions = await getTransactions({ year, category });

  const totals = new Map<number, number>();
  for (const transaction of transactions) {
    const month = Number(transaction.date.slice(5, 7));
    const delta =
      transaction.type === "receita"
        ? Number(transaction.amount)
        : -Number(transaction.amount);
    totals.set(month, (totals.get(month) ?? 0) + delta);
  }

  return Array.from(totals.entries())
    .map(([month, net]) => ({ month, net }))
    .sort((a, b) => a.month - b.month);
}
