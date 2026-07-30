import { createClient } from "@/lib/supabase/server";
import type { Transaction, TransactionFilters } from "@/types/transaction";

function monthRange(month: number, year: number) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const end = `${year}-${String(month).padStart(2, "0")}-${String(endDate).padStart(2, "0")}`;
  return { start, end };
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

  if (filters.month && filters.year) {
    const { start, end } = monthRange(filters.month, filters.year);
    query = query.gte("date", start).lte("date", end);
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
  month: number,
  year: number
): Promise<DashboardSummary> {
  const transactions = await getTransactions({ month, year });

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
