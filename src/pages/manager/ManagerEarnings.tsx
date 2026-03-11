import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { DollarSign, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const earningsByAgent = [
  { agent: "Ali Yilmaz", sales: 234, totalEarned: "€234.00", pending: "€12.00" },
  { agent: "Ahmed Hassan", sales: 167, totalEarned: "€208.75", pending: "€8.75" },
  { agent: "Maria Costa", sales: 189, totalEarned: "€141.75", pending: "€6.00" },
  { agent: "Sofia Müller", sales: 145, totalEarned: "€145.00", pending: "€4.00" },
];

export default function ManagerEarnings() {
  return (
    <DashboardLayout type="manager">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">My Earnings</h2>
          <Button
            className="gradient-primary border-0 text-primary-foreground hover:opacity-90"
            onClick={() => toast.success("Payout requested!")}
          >
            <ArrowUpRight className="h-4 w-4 mr-1" /> Request Payout
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard title="Total Earned" value="€1,245" icon={DollarSign} subtitle="All time" />
          <StatCard title="This Month" value="€320" icon={TrendingUp} subtitle="+18%" />
          <StatCard title="Pending" value="€30.75" icon={Wallet} subtitle="4 sales" />
          <StatCard title="Paid Out" value="€894.25" icon={DollarSign} subtitle="Last: Jan 10" />
        </div>

        {/* Desktop table */}
        <div className="rounded-lg border bg-card shadow-card hidden sm:block">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Earnings by Agent</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Agent</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Sales</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Total Earned</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Pending</th>
                </tr>
              </thead>
              <tbody>
                {earningsByAgent.map((a) => (
                  <tr key={a.agent} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{a.agent}</td>
                    <td className="px-4 py-3">{a.sales}</td>
                    <td className="px-4 py-3 font-semibold text-primary">{a.totalEarned}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden rounded-lg border bg-card shadow-card">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Earnings by Agent</h3>
          </div>
          <div className="divide-y">
            {earningsByAgent.map((a) => (
              <div key={a.agent} className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{a.agent}</span>
                  <span className="font-semibold text-primary text-sm">{a.totalEarned}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{a.sales} sales</span>
                  <span>Pending: {a.pending}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
