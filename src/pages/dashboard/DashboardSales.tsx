import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ShoppingCart, TrendingUp, Calendar } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DashboardSales() {
  const { t } = useTranslation();

  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("sales")}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard title={t("salesToday")} value="0" icon={ShoppingCart} subtitle={t("vsYesterday")} />
          <StatCard title={t("thisWeek")} value="0" icon={TrendingUp} subtitle={t("vsLastWeek")} />
          <StatCard title={t("thisMonth")} value="0" icon={Calendar} subtitle={t("vsLastMonth")} className="col-span-2 sm:col-span-1" />
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="px-4 py-3 sm:p-5 border-b">
            <h3 className="font-semibold text-sm sm:text-base">{t("allSales")}</h3>
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("order")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("date")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("customer")}</th>
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
