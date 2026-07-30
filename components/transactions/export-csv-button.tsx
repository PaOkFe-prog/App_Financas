"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { transactionsToCSV } from "@/lib/csv";
import type { Transaction } from "@/types/transaction";

export function ExportCsvButton({
  transactions,
}: {
  transactions: Transaction[];
}) {
  function handleExport() {
    const csv = transactionsToCSV(transactions);
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transacoes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={transactions.length === 0}
    >
      <Download className="size-4" />
      Exportar CSV
    </Button>
  );
}
