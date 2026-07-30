"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/categories";
import { MONTH_NAMES } from "@/lib/utils";

const ALL = "all";
const YEARS = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

const MONTH_ITEMS: Record<string, string> = {
  [ALL]: "Todos os meses",
  ...Object.fromEntries(MONTH_NAMES.map((name, index) => [String(index + 1), name])),
};
const YEAR_ITEMS: Record<string, string> = {
  [ALL]: "Todos",
  ...Object.fromEntries(YEARS.map((year) => [String(year), String(year)])),
};
const CATEGORY_ITEMS: Record<string, string> = {
  [ALL]: "Todas as categorias",
  ...Object.fromEntries(CATEGORIES.map((category) => [category, category])),
};

export function TransactionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === ALL) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

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
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="filter-month">Mês</Label>
        <Select
          items={MONTH_ITEMS}
          value={searchParams.get("month") ?? ALL}
          onValueChange={(value) => updateParam("month", value)}
        >
          <SelectTrigger id="filter-month" className="w-40">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todos os meses</SelectItem>
            {MONTH_NAMES.map((name, index) => (
              <SelectItem key={name} value={String(index + 1)}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="filter-year">Ano</Label>
        <Select
          items={YEAR_ITEMS}
          value={searchParams.get("year") ?? ALL}
          onValueChange={(value) => updateParam("year", value)}
        >
          <SelectTrigger id="filter-year" className="w-28">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todos</SelectItem>
            {YEARS.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="filter-category">Categoria</Label>
        <Select
          items={CATEGORY_ITEMS}
          value={searchParams.get("category") ?? ALL}
          onValueChange={(value) => updateParam("category", value)}
        >
          <SelectTrigger id="filter-category" className="w-44">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todas as categorias</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
