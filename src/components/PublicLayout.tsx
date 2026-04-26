import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/planos", label: "Planos" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function PublicHeader() {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === l.to ? "text-primary" : "text-muted-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button asChild>
              <Link to="/app">Abrir app</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Começar grátis</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            A inteligência financeira que cuida do seu dinheiro enquanto você cuida da sua vida.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Produto</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/planos" className="hover:text-primary">Planos</Link></li>
            <li><Link to="/sobre" className="hover:text-primary">Sobre</Link></li>
            <li><Link to="/login" className="hover:text-primary">Entrar</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Empresa</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Carreiras</li>
            <li>Imprensa</li>
            <li><a href="mailto:amarofinanceof@gmail.com" className="hover:text-primary">Suporte</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Legal</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Termos de uso</li>
            <li>Privacidade</li>
            <li>LGPD</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Amaro Finance. Feito no Brasil 🇧🇷
      </div>
    </footer>
  );
}
