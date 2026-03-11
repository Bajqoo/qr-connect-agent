import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { DollarSign, Wallet, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const payoutHistory = [
  { id: "PAY-003", date: "Mar 1, 2026", amount: "€200.00", method: "Wise", status: "paid" },
  { id: "PAY-002", date: "Feb 1, 2026", amount: "€150.00", method: "Revolut", status: "paid" },
  { id: "PAY-001", date: "Jan 1, 2026", amount: "€100.00", method: "Bank Transfer", status: "paid" },
];

export default function DashboardEarnings() {
  const [open, setOpen] = useState(false);

  const handlePayout = () => {
    toast.success("Payout request submitted! We'll process it within 3 business days.");
    setOpen(false);
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Earnings</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gradient-primary border-0 text-primary-foreground hover:opacity-90 self-start sm:self-auto">
                <ArrowUpRight className="h-4 w-4 mr-1.5" />
                Request Payout
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-4 sm:mx-auto max-w-md">
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-muted-foreground">Minimum payout: €50.00. Your available balance: €124.00</p>
                <div className="space-y-2">
                  <Label>Amount (€)</Label>
                  <Input type="number" placeholder="50.00" min={50} max={124} defaultValue={124} />
                </div>
                <div className="space-y-2">
                  <Label>Payout Method</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wise">Wise</SelectItem>
                      <SelectItem value="revolut">Revolut</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Account Details</Label>
                  <Input placeholder="IBAN or account email" />
                </div>
                <Button onClick={handlePayout} className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard title="Total Earnings" value="€624.00" icon={DollarSign} subtitle="all time" />
          <StatCard title="Available" value="€124.00" icon={Wallet} subtitle="ready to withdraw" />
          <StatCard title="Pending" value="€0.00" icon={Clock} subtitle="processing" className="col-span-2 sm:col-span-1" />
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="px-4 py-3 sm:p-5 border-b">
            <h3 className="font-semibold text-sm sm:text-base">Payout History</h3>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">ID</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Amount</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Method</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium">{p.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.date}</td>
                    <td className="px-5 py-3 font-medium">{p.amount}</td>
                    <td className="px-5 py-3">{p.method}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y">
            {payoutHistory.map((p) => (
              <div key={p.id} className="px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{p.id}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                    {p.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{p.date} · {p.method}</div>
                <div className="text-sm font-medium">{p.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
