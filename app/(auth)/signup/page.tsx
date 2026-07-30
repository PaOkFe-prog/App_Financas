"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, undefined);

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Criar conta</CardTitle>
          <CardDescription>
            Comece a organizar suas finanças em minutos.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="voce@email.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
              <p className="text-xs text-muted-foreground">
                Mínimo de 6 caracteres.
              </p>
            </div>
            {state?.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            {state?.message && (
              <p className="text-sm text-emerald-600">{state.message}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Criando conta..." : "Criar conta"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Entrar
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
