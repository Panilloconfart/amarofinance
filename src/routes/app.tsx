import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("amaro_finance_user");
      if (!raw) {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
