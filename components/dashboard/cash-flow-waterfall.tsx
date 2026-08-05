"use client";

import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { WaterfallStep } from "@/lib/waterfall";

interface CashFlowWaterfallProps {
  steps: WaterfallStep[];
}

const COLORS = {
  light: { increase: "#059669", decrease: "#dc2626", total: "#2a78d6" },
  dark: { increase: "#10b981", decrease: "#ef4444", total: "#3987e5" },
};

function colorFor(step: WaterfallStep, colors: typeof COLORS.light) {
  if (step.type === "total") {
    return step.displayValue < 0 ? colors.decrease : colors.total;
  }
  return colors[step.type];
}

export function CashFlowWaterfall({ steps }: CashFlowWaterfallProps) {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "dark" ? COLORS.dark : COLORS.light;

  const isEmpty = steps.every((step) => step.value === 0);
  if (isEmpty) {
    return (
      <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
        Nenhuma movimentação registrada neste período.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={steps}
          margin={{ top: 24, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            interval={0}
            angle={steps.length > 5 ? -35 : 0}
            textAnchor={steps.length > 5 ? "end" : "middle"}
            height={steps.length > 5 ? 55 : 30}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(Number(value))}
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip
            formatter={(_value, _name, item) => {
              const step = item?.payload as WaterfallStep | undefined;
              return formatCurrency(step?.displayValue ?? 0);
            }}
            cursor={{ fill: "var(--muted)", opacity: 0.4 }}
          />
          <Bar
            dataKey="base"
            stackId="waterfall"
            fill="transparent"
            isAnimationActive={false}
          />
          <Bar dataKey="value" stackId="waterfall" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {steps.map((step) => (
              <Cell key={step.label} fill={colorFor(step, colors)} />
            ))}
            <LabelList
              dataKey="displayValue"
              position="top"
              formatter={(value) => formatCurrency(Number(value))}
              style={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-sm"
            style={{ backgroundColor: colors.increase }}
          />
          Entradas
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-sm"
            style={{ backgroundColor: colors.decrease }}
          />
          Saídas / saldo negativo
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-sm"
            style={{ backgroundColor: colors.total }}
          />
          Saldo positivo
        </span>
      </div>
    </div>
  );
}
