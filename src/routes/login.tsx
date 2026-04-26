import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Amaro Finance" },
      { name: "description", content: "Entre ou crie sua conta no Amaro Finance." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const r = await login(loginEmail, loginPwd);
    setLoading(false);
    if (r.ok) {
      toast.success("Bem-vindo de volta!");
      navigate({ to: "/app" });
    } else {
      toast.error(r.error ?? "Erro no login");
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const r = await signup(name, email, pwd);
    setLoading(false);
    if (r.ok) {
      toast.success("Conta criada! 1 mês Pro liberado 🎉");
      navigate({ to: "/app" });
    } else {
      toast.error(r.error ?? "Erro ao criar conta");
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Lado esquerdo — branding */}
      <div className="relative hidden overflow-hidden bg-gradient-card p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="relative">
          <Link to="/">
            <Logo className="text-primary-foreground" />
          </Link>
        </div>
        <div className="relative">
          <Sparkles className="mb-4 h-8 w-8" />
          <h1 className="font-display text-4xl font-bold leading-tight">
            “Em 2 semanas o Amaro me mostrou onde eu queimava R$ 800 por mês sem perceber.”
          </h1>
          <p className="mt-4 text-primary-foreground/80">
            — Marina, beta tester · São Paulo
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-4 text-center">
          {[
            { v: "+12k", l: "Beta testers" },
            { v: "R$ 4M", l: "Economizados" },
            { v: "4.9", l: "Avaliação" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl font-bold">{s.v}</div>
              <div className="text-xs text-primary-foreground/70">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div className="relative flex flex-col bg-background">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="lg:hidden">
            <Logo />
          </Link>
          <span className="hidden lg:inline" />
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12">
          <div className="w-full max-w-md">
            <h2 className="font-display text-3xl font-bold">Acesse o Amaro</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Entre ou crie uma conta gratuita em 30 segundos.
            </p>

            <Tabs defaultValue="login" className="mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar conta</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <Input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="voce@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-pwd">Senha</Label>
                    <div className="relative">
                      <Input
                        id="login-pwd"
                        type={showPwd ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={loginPwd}
                        onChange={(e) => setLoginPwd(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPwd((s) => !s)}
                        aria-label="Mostrar senha"
                      >
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Entrar
                  </Button>
                </form>

                <div className="mt-6 rounded-lg border border-warning/30 bg-warning/10 p-3 text-xs">
                  <div className="font-semibold text-warning-foreground">
                    🔑 Login Admin Master (acesso total grátis)
                  </div>
                  <div className="mt-1 font-mono text-muted-foreground">
                    amarofinanceof@gmail.com · D@nilo14942103
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="su-name">Nome</Label>
                    <Input
                      id="su-name"
                      required
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-email">E-mail</Label>
                    <Input
                      id="su-email"
                      type="email"
                      required
                      placeholder="voce@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-pwd">Senha</Label>
                    <Input
                      id="su-pwd"
                      type="password"
                      required
                      minLength={4}
                      placeholder="Mínimo 4 caracteres"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Criar conta grátis
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Ao criar conta você concorda com os Termos e a Política de Privacidade.
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
