"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ALL_FILTER_VALUE } from "@/lib/filter-items";

export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === ALL_FILTER_VALUE) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return { searchParams, updateParam };
}
