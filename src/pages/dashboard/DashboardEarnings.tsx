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
import { useTranslation } from "@/i18n/LanguageContext";

const payoutHistory = [
  { id: "PAY-003", date: "Mar 1, 2026", amount: "€200.00", method: "Wise", status: "paid" },
  { id: "PAY-002", date: "Feb 1, 2026", amount: "€150.00", method: "Revolut", status: "paid" },
  { id: "PAY-001", date: "Jan 1, 2026", amount: "€100.00", method: "Bank Transfer", status: "paid" },
];

export default function DashboardEarnings() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handlePayout = () => {
    toast.success(t("payoutSubmitted"));
    setOpen(false);
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("earnings")}</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gradient-primary border-0 text-primary-foreground hover:opacity-90 self-start sm:self-auto">
                <ArrowUpRight className="h-4 w-4 mr-1.5" />
                {t("requestPayout")}
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-4 sm:mx-auto max-w-md">
              <DialogHeader>
                <DialogTitle>{t("requestPayout")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-muted-foreground">{t("minimumPayout")}</p>
                <div className="space-y-2">
                  <Label>{t("amount")} (€)</Label>
                  <Input type="number" placeholder="50.00" min={50} max={124} defaultValue={124} />
                </div>
                <div className="space-y-2">
                  <Label>{t("payoutMethod")}</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder={t("selectMethod")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wise">Wise</SelectItem>
                      <SelectItem value="revolut">Revolut</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("accountDetails")}</Label>
                  <Input placeholder={t("ibanOrEmail")} />
                </div>
                <Button onClick={handlePayout} className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                  {t("submitRequest")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard title={t("totalEarnings")} value="€624.00" icon={DollarSign} subtitle={t("allTime")} />
          <StatCard title={t("available")} value="€124.00" icon={Wallet} subtitle={t("readyToWithdraw")} />
          <StatCard title={t("pending")} value="€0.00" icon={Clock} subtitle={t("processing")} className="col-span-2 sm:col-span-1" />
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="px-4 py-3 sm:p-5 border-b">
            <h3 className="font-semibold text-sm sm:text-base">{t("payoutHistory")}</h3>
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("id")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("date")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("amount")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("method")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("status")}</th>
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
                        {t(p.status as any)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden divide-y">
            {payoutHistory.map((p) => (
              <div key={p.id} className="px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{p.id}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                    {t(p.status as any)}
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
