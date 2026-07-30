import { z } from "zod";
import { CATEGORIES } from "@/lib/categories";

export const TransactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, { error: "Informe uma descrição." })
    .max(200, { error: "Descrição muito longa." }),
  amount: z.coerce
    .number({ error: "Informe um valor válido." })
    .positive({ error: "O valor deve ser maior que zero." }),
  date: z.string().min(1, { error: "Informe uma data." }),
  type: z.enum(["receita", "despesa"], { error: "Selecione o tipo." }),
  category: z.enum(CATEGORIES as [string, ...string[]], {
    error: "Selecione uma categoria.",
  }),
});

export type TransactionInput = z.infer<typeof TransactionSchema>;
