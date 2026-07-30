"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "@/lib/categories";
import { formatCurrency } from "@/lib/utils";
import type { TransactionCategory } from "@/types/transaction";

interface CategoryPieChartProps {
  data: { category: string; total: number }[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
        Nenhuma despesa registrada neste período.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          innerRadius={0}
          outerRadius={100}
          paddingAngle={1}
          stroke="var(--background)"
          strokeWidth={2}
        >
          {data.map((entry) => (
            <Cell
              key={entry.category}
              fill={
                CATEGORY_COLORS[entry.category as TransactionCategory] ??
                CATEGORY_COLORS.Outros
              }
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: 13, color: "var(--muted-foreground)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
