import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const sales = [
  { id: "ORD-12493", date: "Mar 11, 14:32", agent: "Ali Yilmaz", customer: "user_***48f", product: "Turkey Unlimited", price: "€19.90", cost: "€5.00", commission: "€4.00", profit: "€10.90" },
  { id: "ORD-12492", date: "Mar 11, 11:15", agent: "Maria Costa", customer: "user_***a2c", product: "Turkey Unlimited", price: "€19.90", cost: "€5.00", commission: "€3.00", profit: "€11.90" },
  { id: "ORD-12491", date: "Mar 10, 22:01", agent: "Ahmed Hassan", customer: "user_***7d1", product: "Turkey Unlimited", price: "€19.90", cost: "€5.00", commission: "€5.00", profit: "€9.90" },
  { id: "ORD-12490", date: "Mar 10, 18:43", agent: "Sofia Müller", customer: "user_***3e9", product: "Turkey Unlimited", price: "€19.90", cost: "€5.00", commission: "€4.00", profit: "€10.90" },
];

export default function AdminSales() {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Sales</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Revenue" value="€248,610" icon={DollarSign} trend={{ value: 28, positive: true }} subtitle="vs last month" />
          <StatCard title="Total Orders" value="12,493" icon={ShoppingCart} trend={{ value: 32, positive: true }} subtitle="vs last month" />
          <StatCard title="Net Profit" value="€136,350" icon={TrendingUp} trend={{ value: 25, positive: true }} subtitle="after costs & commissions" />
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Order</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Agent</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Price</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Cost</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Commission</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Profit</th>
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
