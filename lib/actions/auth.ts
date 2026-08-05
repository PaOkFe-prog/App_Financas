"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthSchema } from "@/lib/validations/auth";

export type AuthFormState =
  | { error?: string; message?: string; email?: string }
  | undefined;

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: "E-mail ou senha inválidos." };
  }

  redirect("/dashboard");
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(parsed.data);

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return {
      message: "Cadastro realizado! Confirme seu e-mail para poder entrar.",
      email: parsed.data.email,
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
