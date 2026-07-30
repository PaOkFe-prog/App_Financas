import { getDashboardSummary } from "@/lib/data/transactions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MONTH_NAMES } from "@/lib/utils";

export default async function DashboardPage() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const summary = await getDashboardSummary(month, year);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumo de {MONTH_NAMES[month - 1]} de {year}
        </p>
      </div>

      <SummaryCards
        income={summary.income}
        expense={summary.expense}
        balance={summary.balance}
      />

      <Card>
        <CardHeader>
          <CardTitle>Despesas por categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart data={summary.byCategory} />
        </CardContent>
      </Card>
    </div>
  );
}
