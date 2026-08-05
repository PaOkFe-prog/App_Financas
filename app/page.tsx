import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Download,
  Filter,
  LayoutDashboard,
  PieChart,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Dashboard visual",
    description:
      "Veja receitas, despesas e saldo do mês em cards claros, sem precisar abrir uma planilha.",
  },
  {
    icon: PieChart,
    title: "Gastos por categoria",
    description:
      "Gráfico de pizza mostra para onde seu dinheiro está indo, categoria por categoria.",
  },
  {
    icon: Filter,
    title: "Filtros e busca",
    description:
      "Encontre qualquer transação por mês, ano, categoria ou descrição em segundos.",
  },
  {
    icon: Download,
    title: "Exportação em CSV",
    description:
      "Exporte suas transações filtradas para continuar a análise onde quiser.",
  },
];

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="font-semibold">Finanças Pessoais</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/login">Entrar</Link>}
          />
          <Button
            nativeButton={false}
            render={<Link href="/signup">Criar conta</Link>}
          />
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Organize suas finanças pessoais em um só lugar
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Registre receitas e despesas, acompanhe seu saldo mensal e entenda
            para onde vai seu dinheiro — de forma simples e visual.
          </p>
          <div className="flex gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/signup">Começar gratuitamente</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/login">Já tenho conta</Link>}
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="size-6 text-primary" />
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="border-t bg-muted/20 px-6 py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <ShieldCheck className="size-8 text-primary" />
            <h2 className="text-xl font-semibold">Seus dados, só seus</h2>
            <p className="max-w-lg text-sm text-muted-foreground">
              Cada conta só acessa as próprias transações, com autenticação e
              Row Level Security no banco de dados.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
        Finanças Pessoais — projeto de estudo.
      </footer>
    </div>
  );
}
