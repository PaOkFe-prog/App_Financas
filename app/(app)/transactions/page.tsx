import { Plus } from "lucide-react";
import { getTransactions } from "@/lib/data/transactions";
import { TransactionDialog } from "@/components/transactions/transaction-dialog";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { Button } from "@/components/ui/button";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Transações</h1>
          <p className="text-muted-foreground">
            Gerencie suas receitas e despesas.
          </p>
        </div>
        <TransactionDialog
          trigger={
            <Button>
              <Plus className="size-4" />
              Nova transação
            </Button>
          }
        />
      </div>

      <TransactionTable transactions={transactions} />
    </div>
  );
}
