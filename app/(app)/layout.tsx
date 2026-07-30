import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/layout/sidebar-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid min-h-svh md:grid-cols-[16rem_1fr]">
      <aside className="hidden border-r bg-muted/20 p-4 md:flex md:flex-col md:gap-6">
        <span className="px-3 text-lg font-semibold">Finanças Pessoais</span>
        <SidebarNav />
      </aside>

      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <span className="font-semibold md:hidden">Finanças Pessoais</span>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <form action={logout}>
              <Button variant="outline" size="sm" type="submit">
                Sair
              </Button>
            </form>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
