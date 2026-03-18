import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Eye, Download, ShoppingCart, DollarSign, Wallet, Clock } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DashboardOverview() {
  const { t } = useTranslation();

  const stats = [
    { title: t("totalScans"), value: "0", icon: Eye, subtitle: t("vsLastMonth") },
    { title: t("totalInstalls"), value: "0", icon: Download, subtitle: t("vsLastMonth") },
    { title: t("totalPurchases"), value: "0", icon: ShoppingCart, subtitle: t("vsLastMonth") },
    { title: t("totalEarnings"), value: "€0.00", icon: DollarSign, subtitle: t("allTime") },
    { title: t("availableBalance"), value: "€0.00", icon: Wallet, subtitle: t("readyToWithdraw") },
    { title: t("pendingPayout"), value: "€0.00", icon: Clock, subtitle: t("processing") },
  ];

  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("dashboard")}</h2>
          <p className="text-sm text-muted-foreground">{t("dashboardWelcome")}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="px-4 py-3 sm:p-5 border-b">
            <h3 className="font-semibold text-sm sm:text-base">{t("recentSales")}</h3>
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("order")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("date")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("product")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("price")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("commission")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground text-sm">
                    {t("noSalesYet")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="sm:hidden px-4 py-8 text-center text-muted-foreground text-sm">
            {t("noSalesYet")}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
