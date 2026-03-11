import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ShoppingCart, TrendingUp, Calendar } from "lucide-react";

const sales = [
  { id: "ORD-156", date: "Mar 11, 14:32", customer: "user_***48f", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-155", date: "Mar 11, 11:15", customer: "user_***a2c", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-154", date: "Mar 10, 22:01", customer: "user_***7d1", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-153", date: "Mar 10, 18:43", customer: "user_***3e9", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "pending" },
  { id: "ORD-152", date: "Mar 9, 09:20", customer: "user_***f12", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
  { id: "ORD-151", date: "Mar 8, 16:44", customer: "user_***b8a", product: "Turkey Unlimited", price: "€19.90", commission: "€4.00", status: "completed" },
];

export default function DashboardSales() {
  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Sales</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard title="Sales Today" value="3" icon={ShoppingCart} trend={{ value: 50, positive: true }} subtitle="vs yesterday" />
          <StatCard title="This Week" value="12" icon={TrendingUp} trend={{ value: 20, positive: true }} subtitle="vs last week" />
          <StatCard title="This Month" value="38" icon={Calendar} trend={{ value: 15, positive: true }} subtitle="vs last month" className="col-span-2 sm:col-span-1" />
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="px-4 py-3 sm:p-5 border-b">
            <h3 className="font-semibold text-sm sm:text-base">All Sales</h3>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Order</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Customer</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Price</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Commission</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium">{s.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.date}</td>
                    <td className="px-5 py-3 font-mono text-xs">{s.customer}</td>
                    <td className="px-5 py-3">{s.price}</td>
                    <td className="px-5 py-3 font-medium text-success">{s.commission}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y">
            {sales.map((s) => (
              <div key={s.id} className="px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{s.id}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    s.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>{s.status}</span>
                </div>
                <div className="text-xs text-muted-foreground">{s.date} · {s.customer}</div>
                <div className="flex items-center justify-between text-sm">
                  <span>{s.price}</span>
                  <span className="font-medium text-success">{s.commission}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
