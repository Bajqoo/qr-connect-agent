import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { ShoppingCart, TrendingUp, DollarSign } from "lucide-react";

const sales = [
  { id: "ORD-301", agent: "Ali Yilmaz", customer: "john@mail.com", product: "Turkey Unlimited", date: "2024-01-15", agentComm: "€4.00", myCut: "€1.00", status: "completed" },
  { id: "ORD-302", agent: "Maria Costa", customer: "jane@mail.com", product: "Turkey Unlimited", date: "2024-01-15", agentComm: "€3.00", myCut: "€0.75", status: "completed" },
  { id: "ORD-303", agent: "Ahmed Hassan", customer: "mike@mail.com", product: "Turkey Unlimited", date: "2024-01-14", agentComm: "€5.00", myCut: "€1.25", status: "completed" },
  { id: "ORD-304", agent: "Sofia Müller", customer: "anna@mail.com", product: "Turkey Unlimited", date: "2024-01-14", agentComm: "€4.00", myCut: "€1.00", status: "pending" },
  { id: "ORD-305", agent: "Ali Yilmaz", customer: "tom@mail.com", product: "Turkey Unlimited", date: "2024-01-13", agentComm: "€4.00", myCut: "€1.00", status: "completed" },
];

export default function ManagerSales() {
  return (
    <DashboardLayout type="manager">
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Sales Overview</h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <StatCard title="Total Sales" value="487" icon={ShoppingCart} trend="+34 this week" />
          <StatCard title="Revenue Generated" value="€9,690" icon={TrendingUp} trend="+€676 this week" />
          <StatCard title="My Total Cut" value="€1,245" icon={DollarSign} trend="+€180 this week" />
        </div>

        {/* Desktop table */}
        <div className="rounded-lg border bg-card shadow-card hidden sm:block">
          <div className="p-4 border-b">
            <h3 className="font-semibold">All Agent Sales</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Order</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Agent</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Customer</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Agent Comm.</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">My Cut</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{s.id}</td>
                    <td className="px-4 py-3 font-medium">{s.agent}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.customer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.date}</td>
                    <td className="px-4 py-3">{s.agentComm}</td>
                    <td className="px-4 py-3 font-semibold text-primary">{s.myCut}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden rounded-lg border bg-card shadow-card">
          <div className="p-4 border-b">
            <h3 className="font-semibold">All Agent Sales</h3>
          </div>
          <div className="divide-y">
            {sales.map((s) => (
              <div key={s.id} className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{s.agent}</span>
                  <span className="font-semibold text-primary text-sm">{s.myCut}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{s.id} · {s.customer}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${
                    s.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
