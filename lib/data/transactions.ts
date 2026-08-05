import { createClient } from "@/lib/supabase/server";
import type { Transaction, TransactionFilters } from "@/types/transaction";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

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
