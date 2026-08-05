"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_ITEMS, YEAR_ITEMS, CATEGORY_ITEMS } from "@/lib/filter-items";

interface PeriodCategorySelectsProps {
  idPrefix: string;
  month: string;
  year: string;
  category: string;
  onMonthChange: (value: string | null) => void;
  onYearChange: (value: string | null) => void;
  onCategoryChange: (value: string | null) => void;
}

export function PeriodCategorySelects({
  idPrefix,
  month,
  year,
  category,
  onMonthChange,
  onYearChange,
  onCategoryChange,
}: PeriodCategorySelectsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${idPrefix}-month`}>Mês</Label>
        <Select items={MONTH_ITEMS} value={month} onValueChange={onMonthChange}>
          <SelectTrigger id={`${idPrefix}-month`} className="w-40">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MONTH_ITEMS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${idPrefix}-year`}>Ano</Label>
        <Select items={YEAR_ITEMS} value={year} onValueChange={onYearChange}>
          <SelectTrigger id={`${idPrefix}-year`} className="w-28">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(YEAR_ITEMS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${idPrefix}-category`}>Categoria</Label>
        <Select
          items={CATEGORY_ITEMS}
          value={category}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger id={`${idPrefix}-category`} className="w-44">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CATEGORY_ITEMS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
