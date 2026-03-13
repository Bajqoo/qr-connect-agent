import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, ShoppingCart, DollarSign,
  QrCode, Settings, LogOut, Shield, Menu
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoWhite from "@/assets/logo-white.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "agent" | "admin" | "manager";
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const agentLinks = [
    { href: "/dashboard", label: t("overview"), icon: LayoutDashboard },
    { href: "/dashboard/qr-code", label: t("qrCode"), icon: QrCode },
    { href: "/dashboard/sales", label: t("sales"), icon: ShoppingCart },
    { href: "/dashboard/earnings", label: t("earnings"), icon: DollarSign },
    { href: "/dashboard/settings", label: t("settings"), icon: Settings },
  ];

  const adminLinks = [
    { href: "/admin", label: t("overview"), icon: LayoutDashboard },
    { href: "/admin/managers", label: t("managers"), icon: Users },
    { href: "/admin/agents", label: t("agents"), icon: Users },
    { href: "/admin/sales", label: t("sales"), icon: ShoppingCart },
    { href: "/admin/commissions", label: t("commissions"), icon: DollarSign },
    { href: "/admin/payouts", label: t("payouts"), icon: DollarSign },
    { href: "/admin/fraud", label: t("fraudDetection"), icon: Shield },
  ];

  const managerLinks = [
    { href: "/manager", label: t("overview"), icon: LayoutDashboard },
    { href: "/manager/agents", label: t("myAgents"), icon: Users },
    { href: "/manager/sales", label: t("sales"), icon: ShoppingCart },
    { href: "/manager/earnings", label: t("earnings"), icon: DollarSign },
  ];

  const links = type === "admin" ? adminLinks : type === "manager" ? managerLinks : agentLinks;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 gradient-dark text-sidebar-foreground flex flex-col transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <img src={logoWhite} alt="Next eSIM" className="h-7" />
            <p className="text-xs text-sidebar-foreground/60">
              {type === "admin" ? t("adminPanel") : type === "manager" ? t("managerPortal") : t("agentPortal")}
            </p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {t("signOut")}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 border-b bg-card flex items-center px-4 gap-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <LanguageSwitcher />
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">A</span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
