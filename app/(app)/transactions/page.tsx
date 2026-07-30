import { Plus } from "lucide-react";
import { getTransactions } from "@/lib/data/transactions";
import { TransactionDialog } from "@/components/transactions/transaction-dialog";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { ExportCsvButton } from "@/components/transactions/export-csv-button";
import { Button } from "@/components/ui/button";
import type { TransactionCategory } from "@/types/transaction";

interface TransactionsPageProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const params = await searchParams;

  const transactions = await getTransactions({
    month: params.month ? Number(params.month) : undefined,
    year: params.year ? Number(params.year) : undefined,
    category: params.category as TransactionCategory | undefined,
    search: params.search,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Transações</h1>
          <p className="text-muted-foreground">
            Gerencie suas receitas e despesas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportCsvButton transactions={transactions} />
          <TransactionDialog
            trigger={
              <Button>
                <Plus className="size-4" />
                Nova transação
              </Button>
            }
          />
        </div>
      </div>

      <TransactionFilters />

      <TransactionTable transactions={transactions} />
    </div>
  );
}
