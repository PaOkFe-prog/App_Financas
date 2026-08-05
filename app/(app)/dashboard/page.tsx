import { getDashboardSummary } from "@/lib/data/transactions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { CashFlowWaterfall } from "@/components/dashboard/cash-flow-waterfall";
import { DashboardFilters } from "@/components/dashboard/dashboard-filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALL_FILTER_VALUE } from "@/lib/filter-items";
import { MONTH_NAMES } from "@/lib/utils";
import type { TransactionCategory } from "@/types/transaction";

interface DashboardPageProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
    category?: string;
  }>;
}

function describePeriod(month?: number, year?: number) {
  if (month && year) return `${MONTH_NAMES[month - 1]} de ${year}`;
  if (year) return `Ano de ${year}`;
  if (month) return `${MONTH_NAMES[month - 1]} (todos os anos)`;
  return "Todos os períodos";
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  const now = new Date();
  const defaultMonth = String(now.getMonth() + 1);
  const defaultYear = String(now.getFullYear());

  const monthParam = params.month ?? defaultMonth;
  const yearParam = params.year ?? defaultYear;

  const month = monthParam === ALL_FILTER_VALUE ? undefined : Number(monthParam);
  const year = yearParam === ALL_FILTER_VALUE ? undefined : Number(yearParam);
  const category =
    params.category && params.category !== ALL_FILTER_VALUE
      ? (params.category as TransactionCategory)
      : undefined;

  const summary = await getDashboardSummary({ month, year, category });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumo de {describePeriod(month, year)}
          {category ? ` — ${category}` : ""}
        </p>
      </div>

      <DashboardFilters defaultMonth={defaultMonth} defaultYear={defaultYear} />

      <SummaryCards
        income={summary.income}
        expense={summary.expense}
        balance={summary.balance}
      />

      <Card>
        <CardHeader>
          <CardTitle>Fluxo de caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <CashFlowWaterfall
            income={summary.income}
            byCategory={summary.byCategory}
            balance={summary.balance}
          />
        </CardContent>
      </Card>
    </div>
  );
}
