import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Sparkles,
  Settings,
  LogOut,
  Crown,
  Receipt,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth";
import { planLabel } from "@/lib/plans";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/transacoes", label: "Transações", icon: Receipt, exact: false },
  { to: "/app/investimentos", label: "Investimentos", icon: TrendingUp, exact: false },
  { to: "/app/ia", label: "Chat IA", icon: Sparkles, exact: false },
  { to: "/app/contas", label: "Contas & Bancos", icon: Wallet, exact: false },
  { to: "/app/planos", label: "Planos", icon: Crown, exact: false },
  { to: "/app/configuracoes", label: "Configurações", icon: Settings, exact: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="px-5 pt-6 pb-4">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-sidebar-accent/60 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user?.name}</div>
              <div className="flex items-center gap-1 text-xs text-sidebar-foreground/70">
                {user?.isAdmin && <Crown className="h-3 w-3 text-warning" />}
                {user ? planLabel(user.plan) : ""}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block">
            <div className="text-sm text-muted-foreground">Bem-vindo de volta</div>
            <div className="font-display text-lg font-semibold">{user?.name}</div>
          </div>
          <div className="flex items-center gap-2">
            {user?.isAdmin && (
              <span className="hidden items-center gap-1 rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning-foreground sm:inline-flex">
                <Crown className="h-3 w-3" /> Admin Master — acesso total
              </span>
            )}
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pb-10">{children}</main>

        {/* Bottom nav mobile */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-card/95 px-2 py-2 backdrop-blur-md lg:hidden">
          {NAV.slice(0, 5).map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
