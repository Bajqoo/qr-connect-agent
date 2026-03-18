import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Eye, Download, ShoppingCart, DollarSign, Wallet, Clock } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardOverview() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [totalScans, setTotalScans] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingEarnings, setPendingEarnings] = useState(0);
  const [paidEarnings, setPaidEarnings] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const fetchScans = useCallback(() => {
    if (!profile) return;
    supabase
      .from("referral_clicks")
      .select("id", { count: "exact", head: true })
      .eq("agent_id", profile.id)
      .then(({ count }) => setTotalScans(count ?? 0));

    if (profile.referral_code) {
      supabase
        .from("referral_scans")
        .select("id", { count: "exact", head: true })
        .eq("referral_code", profile.referral_code)
        .then(({ count }) => {
          setTotalScans(prev => Math.max(prev, count ?? 0));
        });
    }
  }, [profile]);

  const fetchOrders = useCallback(() => {
    if (!profile) return;
    supabase
      .from("orders")
      .select("*")
      .eq("agent_id", profile.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setTotalOrders(data.length);
          setRecentOrders(data.slice(0, 5));
        }
      });
  }, [profile]);

  const fetchCommissions = useCallback(() => {
    if (!profile) return;
    supabase
      .from("commissions")
      .select("amount, status")
      .eq("agent_id", profile.id)
      .then(({ data }) => {
        if (data) {
          const total = data.reduce((s, c) => s + Number(c.amount), 0);
          const pending = data.filter(c => c.status === "pending").reduce((s, c) => s + Number(c.amount), 0);
          const paid = data.filter(c => c.status === "paid").reduce((s, c) => s + Number(c.amount), 0);
          setTotalEarnings(total);
          setPendingEarnings(pending);
          setPaidEarnings(paid);
        }
      });
  }, [profile]);

  // Initial fetch
  useEffect(() => {
    fetchScans();
    fetchOrders();
    fetchCommissions();
  }, [fetchScans, fetchOrders, fetchCommissions]);

  // Realtime subscriptions
  useEffect(() => {
    if (!profile) return;

    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "referral_clicks" },
        () => fetchScans()
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "referral_scans" },
        () => fetchScans()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => fetchOrders()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "commissions" },
        () => fetchCommissions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile, fetchScans, fetchOrders, fetchCommissions]);

  const stats = [
    { title: t("totalScans"), value: totalScans.toString(), icon: Eye, subtitle: t("vsLastMonth") },
    { title: t("totalInstalls"), value: "0", icon: Download, subtitle: t("vsLastMonth") },
    { title: t("totalPurchases"), value: totalOrders.toString(), icon: ShoppingCart, subtitle: t("vsLastMonth") },
    { title: t("totalEarnings"), value: `€${totalEarnings.toFixed(2)}`, icon: DollarSign, subtitle: t("allTime") },
    { title: t("availableBalance"), value: `€${paidEarnings.toFixed(2)}`, icon: Wallet, subtitle: t("readyToWithdraw") },
    { title: t("pendingPayout"), value: `€${pendingEarnings.toFixed(2)}`, icon: Clock, subtitle: t("processing") },
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
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground text-sm">
                      {t("noSalesYet")}
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-5 py-3 font-mono text-xs">{order.id.substring(0, 8)}</td>
                      <td className="px-5 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-5 py-3">{order.product_name || "eSIM"}</td>
                      <td className="px-5 py-3">€{Number(order.price).toFixed(2)}</td>
                      <td className="px-5 py-3 text-primary font-medium">€{Number(order.commission).toFixed(2)}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden">
            {recentOrders.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                {t("noSalesYet")}
              </div>
            ) : (
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="px-4 py-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{order.product_name || "eSIM"}</span>
                      <span className="text-sm text-primary font-medium">€{Number(order.commission).toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(order.created_at).toLocaleDateString()} · €{Number(order.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
