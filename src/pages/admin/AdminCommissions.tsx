import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function AdminCommissions() {
  const { t } = useTranslation();

  const defaultRates = [
    { type: "airport", label: t("airportAgents"), rate: 4 },
    { type: "taxi", label: t("taxiDrivers"), rate: 4 },
    { type: "hotel", label: t("hotelStaffPlural"), rate: 3 },
    { type: "tour_guide", label: t("tourGuides"), rate: 5 },
    { type: "affiliate", label: t("affiliates"), rate: 4 },
  ];

  const [rates, setRates] = useState(defaultRates);

  const updateRate = (type: string, newRate: number) => {
    setRates(rates.map(r => r.type === type ? { ...r, rate: newRate } : r));
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight">{t("commissionSettings")}</h2>

        <div className="rounded-lg border bg-card shadow-card p-6">
          <h3 className="font-semibold mb-1">{t("defaultCommissionRates")}</h3>
          <p className="text-sm text-muted-foreground mb-6">{t("defaultCommissionDesc")}</p>

          <div className="space-y-4">
            {rates.map((r) => (
              <div key={r.type} className="flex items-center justify-between gap-4">
                <Label className="flex-1">{r.label}</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">€</span>
                  <Input type="number" value={r.rate} onChange={(e) => updateRate(r.type, Number(e.target.value))} className="w-24" min={0} step={0.5} />
                  <span className="text-sm text-muted-foreground">{t("perSale")}</span>
                </div>
              </div>
            ))}
          </div>

          <Button className="mt-6 gradient-primary border-0 text-primary-foreground hover:opacity-90" onClick={() => toast.success(t("ratesUpdated"))}>
            {t("saveRates")}
          </Button>
        </div>

        <div className="rounded-lg border bg-card shadow-card p-6">
          <h3 className="font-semibold mb-1">{t("product")}: Turkey Unlimited eSIM</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs text-muted-foreground">{t("price")}</p>
              <p className="text-lg font-bold">€19.90</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("internalCost")}</p>
              <p className="text-lg font-bold">€5.00</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("avgCommission")}</p>
              <p className="text-lg font-bold">€4.00</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
