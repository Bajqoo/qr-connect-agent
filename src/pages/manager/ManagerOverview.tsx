import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const recentAgentSales = [
  { id: "ORD-301", agent: "Ali Yilmaz", product: "Turkey Unlimited", date: "Today", commission: "€4.00", managerCut: "€1.00" },
  { id: "ORD-302", agent: "Maria Costa", product: "Turkey Unlimited", date: "Today", commission: "€3.00", managerCut: "€0.75" },
  { id: "ORD-303", agent: "Ahmed Hassan", product: "Turkey Unlimited", date: "Yesterday", commission: "€5.00", managerCut: "€1.25" },
  { id: "ORD-304", agent: "Sofia Müller", product: "Turkey Unlimited", date: "Yesterday", commission: "€4.00", managerCut: "€1.00" },
];

export default function ManagerOverview() {
  const { t } = useTranslation();

  return (
    <DashboardLayout type="manager">
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("managerOverview")}</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard title={t("myAgents")} value="12" icon={Users} subtitle="+2 {t('thisMonth').toLowerCase()}" />
          <StatCard title={t("totalSales")} value="487" icon={ShoppingCart} subtitle={`+34 ${t("thisWeek").toLowerCase()}`} />
          <StatCard title={t("myEarnings")} value="€1,245" icon={DollarSign} subtitle={`+€180 ${t("thisWeek").toLowerCase()}`} />
          <StatCard title={t("avgPerAgent")} value="€103.75" icon={TrendingUp} subtitle="+8%" />
        </div>

        <div className="rounded-lg border bg-card shadow-card hidden sm:block">
          <div className="p-4 border-b">
            <h3 className="font-semibold">{t("recentAgentSales")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">{t("order")}</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">{t("agent")}</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">{t("product")}</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">{t("date")}</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">{t("agentCommission")}</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">{t("myCut")}</th>
                </tr>
              </thead>
              <tbody>
                {recentAgentSales.map((sale) => (
                  <tr key={sale.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{sale.id}</td>
                    <td className="px-4 py-3 font-medium">{sale.agent}</td>
                    <td className="px-4 py-3">{sale.product}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sale.date}</td>
                    <td className="px-4 py-3">{sale.commission}</td>
                    <td className="px-4 py-3 font-semibold text-primary">{sale.managerCut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sm:hidden rounded-lg border bg-card shadow-card">
          <div className="p-4 border-b">
            <h3 className="font-semibold">{t("recentAgentSales")}</h3>
          </div>
          <div className="divide-y">
            {recentAgentSales.map((sale) => (
              <div key={sale.id} className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{sale.agent}</span>
                  <span className="font-semibold text-primary text-sm">{sale.managerCut}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{sale.id} · {sale.product}</span>
                  <span>{sale.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
