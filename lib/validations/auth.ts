import { z } from "zod";

export const AuthSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido." }),
  password: z
    .string()
    .min(6, { error: "A senha deve ter pelo menos 6 caracteres." }),
});
