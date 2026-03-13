import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Eye, Download, ShoppingCart, DollarSign, Wallet, Clock } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const recentSales = [
  { id: "ORD-001", date: "Today, 14:32", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-002", date: "Today, 11:15", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-003", date: "Yesterday, 22:01", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-004", date: "Yesterday, 18:43", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "pending" },
  { id: "ORD-005", date: "Mar 8, 09:20", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
];

export default function DashboardOverview() {
  const { t } = useTranslation();

  const stats = [
    { title: t("totalScans"), value: "1,284", icon: Eye, trend: { value: 12, positive: true }, subtitle: t("vsLastMonth") },
    { title: t("totalInstalls"), value: "342", icon: Download, trend: { value: 8, positive: true }, subtitle: t("vsLastMonth") },
    { title: t("totalPurchases"), value: "156", icon: ShoppingCart, trend: { value: 23, positive: true }, subtitle: t("vsLastMonth") },
    { title: t("totalEarnings"), value: "€624.00", icon: DollarSign, trend: { value: 23, positive: true }, subtitle: t("allTime") },
    { title: t("availableBalance"), value: "€124.00", icon: Wallet, subtitle: t("readyToWithdraw") },
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
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium">{sale.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{sale.date}</td>
                    <td className="px-5 py-3">{sale.product}</td>
                    <td className="px-5 py-3">{sale.price}</td>
                    <td className="px-5 py-3 font-medium text-success">{sale.commission}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        sale.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>{t(sale.status as any)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden divide-y">
            {recentSales.map((sale) => (
              <div key={sale.id} className="px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{sale.id}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    sale.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>{t(sale.status as any)}</span>
                </div>
                <div className="text-xs text-muted-foreground">{sale.date}</div>
                <div className="flex items-center justify-between text-sm">
                  <span>{sale.price}</span>
                  <span className="font-medium text-success">{sale.commission}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
