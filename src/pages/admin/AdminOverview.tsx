import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Users, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, Globe } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const topAgents = [
  { name: "Ali Yilmaz", type: "Airport", sales: 234, earnings: "€936.00" },
  { name: "Maria Costa", type: "Hotel", sales: 189, earnings: "€567.00" },
  { name: "Ahmed Hassan", type: "Tour Guide", sales: 167, earnings: "€835.00" },
  { name: "Sofia Müller", type: "Taxi", sales: 145, earnings: "€580.00" },
  { name: "James Smith", type: "Affiliate", sales: 132, earnings: "€528.00" },
];

export default function AdminOverview() {
  const { t } = useTranslation();

  const stats = [
    { title: t("totalAgents"), value: "2,847", icon: Users, trend: { value: 18, positive: true }, subtitle: t("vsLastMonth") },
    { title: t("totalSales"), value: "12,493", icon: ShoppingCart, trend: { value: 32, positive: true }, subtitle: t("vsLastMonth") },
    { title: t("revenue"), value: "€248,610", icon: DollarSign, trend: { value: 28, positive: true }, subtitle: t("vsLastMonth") },
    { title: t("commissionsPaid"), value: "€47,200", icon: TrendingUp, subtitle: t("allTime") },
    { title: t("fraudFlags"), value: "12", icon: AlertTriangle, subtitle: t("needsReview") },
    { title: t("countries"), value: "24", icon: Globe, subtitle: t("activeMarkets") },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">{t("adminOverview")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="p-5 border-b">
            <h3 className="font-semibold">{t("topAgents")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("agent")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("type")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("sales")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("earnings")}</th>
                </tr>
              </thead>
              <tbody>
                {topAgents.map((a) => (
                  <tr key={a.name} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium">{a.name}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                        {a.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">{a.sales}</td>
                    <td className="px-5 py-3 font-medium text-success">{a.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
