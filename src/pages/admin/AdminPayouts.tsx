import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const payouts = [
  { id: "PAY-089", agent: "Ali Yilmaz", amount: "€136.00", method: "Wise", requested: "Mar 10, 2026", status: "pending" },
  { id: "PAY-088", agent: "Ahmed Hassan", amount: "€245.00", method: "Revolut", requested: "Mar 9, 2026", status: "pending" },
  { id: "PAY-087", agent: "Sofia Müller", amount: "€60.00", method: "Bank Transfer", requested: "Mar 8, 2026", status: "approved" },
  { id: "PAY-086", agent: "Maria Costa", amount: "€89.00", method: "Wise", requested: "Mar 7, 2026", status: "paid" },
  { id: "PAY-085", agent: "James Smith", amount: "€72.00", method: "Revolut", requested: "Mar 5, 2026", status: "rejected" },
];

export default function AdminPayouts() {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Payouts</h2>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">ID</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Agent</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Amount</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Method</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Requested</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium">{p.id}</td>
                    <td className="px-5 py-3">{p.agent}</td>
                    <td className="px-5 py-3 font-medium">{p.amount}</td>
                    <td className="px-5 py-3">{p.method}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.requested}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "paid" ? "bg-success/10 text-success" :
                        p.status === "approved" ? "bg-info/10 text-info" :
                        p.status === "pending" ? "bg-warning/10 text-warning" :
                        "bg-destructive/10 text-destructive"
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      {p.status === "pending" && (
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-success hover:bg-success/10"
                            onClick={() => toast.success(`Payout ${p.id} approved`)}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10"
                            onClick={() => toast.error(`Payout ${p.id} rejected`)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
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
