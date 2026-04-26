import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Mail, User as UserIcon, Bell, Shield } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/app/configuracoes")({
  component: ConfigPage,
});

function ConfigPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerencie sua conta e preferências.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" /> Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={user?.email ?? ""} readOnly className="pl-9" />
            </div>
          </div>
          <Button
            onClick={() => toast.success("Perfil atualizado!")}
            className="w-fit"
          >
            Salvar alterações
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row label="Alertas de gasto excedido" defaultChecked />
          <Separator />
          <Row label="Resumo semanal por e-mail" defaultChecked />
          <Separator />
          <Row label="Sugestões da IA financeira" defaultChecked />
          <Separator />
          <Row label="Marketing e novidades" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" /> Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row label="Autenticação em dois fatores" />
          <Separator />
          <Row label="Sessões em outros dispositivos" defaultChecked />
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <div className="font-semibold">Sair da conta</div>
            <div className="text-sm text-muted-foreground">
              Você pode entrar novamente quando quiser.
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
          >
            <LogOut className="mr-1 h-4 w-4" /> Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <Label className="cursor-pointer">{label}</Label>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
