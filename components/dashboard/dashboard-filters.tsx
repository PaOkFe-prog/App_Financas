"use client";

import { PeriodCategorySelects } from "@/components/filters/period-category-selects";
import { useFilterParams } from "@/lib/hooks/use-filter-params";
import { ALL_FILTER_VALUE } from "@/lib/filter-items";

interface DashboardFiltersProps {
  defaultMonth: string;
  defaultYear: string;
}

export function DashboardFilters({
  defaultMonth,
  defaultYear,
}: DashboardFiltersProps) {
  const { searchParams, updateParam } = useFilterParams();

  return (
    <div className="flex flex-wrap items-end gap-3">
      <PeriodCategorySelects
        idPrefix="dash-filter"
        month={searchParams.get("month") ?? defaultMonth}
        year={searchParams.get("year") ?? defaultYear}
        category={searchParams.get("category") ?? ALL_FILTER_VALUE}
        onMonthChange={(value) => updateParam("month", value)}
        onYearChange={(value) => updateParam("year", value)}
        onCategoryChange={(value) => updateParam("category", value)}
      />
    </div>
  );
}
