import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Eye, Download, ShoppingCart, DollarSign, Wallet, Clock } from "lucide-react";

const stats = [
  { title: "Total Scans", value: "1,284", icon: Eye, trend: { value: 12, positive: true }, subtitle: "vs last month" },
  { title: "Total Installs", value: "342", icon: Download, trend: { value: 8, positive: true }, subtitle: "vs last month" },
  { title: "Total Purchases", value: "156", icon: ShoppingCart, trend: { value: 23, positive: true }, subtitle: "vs last month" },
  { title: "Total Earnings", value: "€624.00", icon: DollarSign, trend: { value: 23, positive: true }, subtitle: "all time" },
  { title: "Available Balance", value: "€124.00", icon: Wallet, subtitle: "ready to withdraw" },
  { title: "Pending Payout", value: "€0.00", icon: Clock, subtitle: "processing" },
];

const recentSales = [
  { id: "ORD-001", date: "Today, 14:32", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-002", date: "Today, 11:15", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-003", date: "Yesterday, 22:01", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-004", date: "Yesterday, 18:43", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "pending" },
  { id: "ORD-005", date: "Mar 8, 09:20", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
];

export default function DashboardOverview() {
  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your performance overview.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        {/* Recent Sales */}
        <div className="rounded-lg border bg-card shadow-card">
          <div className="p-5 border-b">
            <h3 className="font-semibold">Recent Sales</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Order</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Product</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Price</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Commission</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
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
                        sale.status === "completed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}>
                        {sale.status}
                      </span>
                    </td>
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
