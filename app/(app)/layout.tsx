import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

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
        <header className="flex items-center justify-between border-b px-4 py-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <MobileNav />
            <span className="font-semibold">Finanças Pessoais</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
            <ThemeToggle />
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
