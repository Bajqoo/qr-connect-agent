import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const sales = [
  { id: "ORD-12493", date: "Mar 11, 14:32", agent: "Ali Yilmaz", price: "€19.90", cost: "€5.00", commission: "€4.00", profit: "€10.90" },
  { id: "ORD-12492", date: "Mar 11, 11:15", agent: "Maria Costa", price: "€19.90", cost: "€5.00", commission: "€3.00", profit: "€11.90" },
  { id: "ORD-12491", date: "Mar 10, 22:01", agent: "Ahmed Hassan", price: "€19.90", cost: "€5.00", commission: "€5.00", profit: "€9.90" },
  { id: "ORD-12490", date: "Mar 10, 18:43", agent: "Sofia Müller", price: "€19.90", cost: "€5.00", commission: "€4.00", profit: "€10.90" },
];

export default function AdminSales() {
  const { t } = useTranslation();

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">{t("sales")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title={t("totalRevenue")} value="€248,610" icon={DollarSign} trend={{ value: 28, positive: true }} subtitle={t("vsLastMonth")} />
          <StatCard title={t("totalOrders")} value="12,493" icon={ShoppingCart} trend={{ value: 32, positive: true }} subtitle={t("vsLastMonth")} />
          <StatCard title={t("netProfit")} value="€136,350" icon={TrendingUp} trend={{ value: 25, positive: true }} subtitle={t("afterCostsCommissions")} />
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("order")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("date")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("agent")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("price")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("cost")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("commission")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("profit")}</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium">{s.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.date}</td>
                    <td className="px-5 py-3">{s.agent}</td>
                    <td className="px-5 py-3">{s.price}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.cost}</td>
                    <td className="px-5 py-3 text-warning">{s.commission}</td>
                    <td className="px-5 py-3 font-medium text-success">{s.profit}</td>
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
