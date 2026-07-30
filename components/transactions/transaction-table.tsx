import { Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TransactionDialog } from "@/components/transactions/transaction-dialog";
import { DeleteTransactionDialog } from "@/components/transactions/delete-transaction-dialog";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

export function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (transactions.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Nenhuma transação encontrada.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-24 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="whitespace-nowrap">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Badge variant="secondary">{transaction.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.type === "receita" ? "default" : "destructive"
                  }
                >
                  {transaction.type === "receita" ? "Receita" : "Despesa"}
                </Badge>
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-medium whitespace-nowrap",
                  transaction.type === "receita"
                    ? "text-emerald-600"
                    : "text-red-600"
                )}
              >
                {transaction.type === "receita" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <TransactionDialog
                    transaction={transaction}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Editar transação"
                      >
                        <Pencil className="size-4" />
                      </Button>
                    }
                  />
                  <DeleteTransactionDialog
                    id={transaction.id}
                    description={transaction.description}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
