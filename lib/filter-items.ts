import { CATEGORIES } from "@/lib/categories";
import { MONTH_NAMES } from "@/lib/utils";

export const ALL_FILTER_VALUE = "all";

const YEARS = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

export const MONTH_ITEMS: Record<string, string> = {
  [ALL_FILTER_VALUE]: "Todos os meses",
  ...Object.fromEntries(
    MONTH_NAMES.map((name, index) => [String(index + 1), name])
  ),
};

export const YEAR_ITEMS: Record<string, string> = {
  [ALL_FILTER_VALUE]: "Todos",
  ...Object.fromEntries(YEARS.map((year) => [String(year), String(year)])),
};

export const CATEGORY_ITEMS: Record<string, string> = {
  [ALL_FILTER_VALUE]: "Todas as categorias",
  ...Object.fromEntries(CATEGORIES.map((category) => [category, category])),
};
