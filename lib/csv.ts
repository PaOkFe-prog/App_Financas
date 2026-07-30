import { formatDate } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

function escapeCsvField(field: string) {
  if (/[";\n]/.test(field)) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function transactionsToCSV(transactions: Transaction[]) {
  const header = ["Data", "Descrição", "Categoria", "Tipo", "Valor"];
  const rows = transactions.map((transaction) => [
    formatDate(transaction.date),
    transaction.description,
    transaction.category,
    transaction.type === "receita" ? "Receita" : "Despesa",
    transaction.amount.toFixed(2).replace(".", ","),
  ]);

  return [header, ...rows]
    .map((row) => row.map(escapeCsvField).join(";"))
    .join("\n");
}
