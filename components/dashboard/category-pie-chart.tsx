"use client";

import { useTheme } from "next-themes";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS, CATEGORY_COLORS_DARK } from "@/lib/categories";
import { formatCurrency } from "@/lib/utils";
import type { TransactionCategory } from "@/types/transaction";

interface CategoryPieChartProps {
  data: { category: string; total: number }[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "dark" ? CATEGORY_COLORS_DARK : CATEGORY_COLORS;

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
          paddingAngle={data.length > 1 ? 1 : 0}
          stroke="var(--background)"
          strokeWidth={2}
          isAnimationActive={false}
        >
          {data.map((entry) => (
            <Cell
              key={entry.category}
              fill={
                colors[entry.category as TransactionCategory] ??
                colors.Outros
              }
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: 13 }}
          formatter={(value) => (
            <span className="text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
