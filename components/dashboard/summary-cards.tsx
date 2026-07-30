import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
}

export function SummaryCards({ income, expense, balance }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receita total
          </CardTitle>
          <ArrowUpCircle className="size-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{formatCurrency(income)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesa total
          </CardTitle>
          <ArrowDownCircle className="size-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{formatCurrency(expense)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
          <Wallet className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "text-2xl font-semibold",
              balance >= 0 ? "text-emerald-600" : "text-red-600"
            )}
          >
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
