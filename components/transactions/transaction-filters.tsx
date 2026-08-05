"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PeriodCategorySelects } from "@/components/filters/period-category-selects";
import { useFilterParams } from "@/lib/hooks/use-filter-params";
import { ALL_FILTER_VALUE } from "@/lib/filter-items";

export function TransactionFilters() {
  const { searchParams, updateParam } = useFilterParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParam("search", search);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex flex-wrap items-end gap-3">
      <PeriodCategorySelects
        idPrefix="tx-filter"
        month={searchParams.get("month") ?? ALL_FILTER_VALUE}
        year={searchParams.get("year") ?? ALL_FILTER_VALUE}
        category={searchParams.get("category") ?? ALL_FILTER_VALUE}
        onMonthChange={(value) => updateParam("month", value)}
        onYearChange={(value) => updateParam("year", value)}
        onCategoryChange={(value) => updateParam("category", value)}
      />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="search">Buscar</Label>
        <Input
          id="search"
          placeholder="Descrição..."
          className="w-48"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </div>
  );
}
