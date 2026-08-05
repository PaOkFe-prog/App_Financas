"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Nota: "all" é mantido explicitamente na URL (não é removido como um
  // valor vazio seria) — algumas páginas (como o Dashboard) têm um
  // padrão diferente de "nenhum parâmetro" (mês atual) e precisam
  // distinguir isso de "usuário escolheu Todos os meses".
  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return { searchParams, updateParam };
}
