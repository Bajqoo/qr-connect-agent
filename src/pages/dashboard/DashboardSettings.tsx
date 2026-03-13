import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DashboardSettings() {
  const { t } = useTranslation();

  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6 max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("settings")}</h2>

        <div className="rounded-lg border bg-card shadow-card p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold text-sm sm:text-base">{t("profileInformation")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label>{t("fullName")}</Label>
              <Input defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>{t("phone")}</Label>
              <Input defaultValue="+90 555 123 4567" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t("email")}</Label>
            <Input defaultValue="john@example.com" type="email" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label>{t("country")}</Label>
              <Input defaultValue="Turkey" />
            </div>
            <div className="space-y-2">
              <Label>{t("agentType")}</Label>
              <Input defaultValue={t("airportAgent")} disabled />
            </div>
          </div>
          <Button size="sm" onClick={() => toast.success(t("profileUpdated"))} className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
            {t("saveChanges")}
          </Button>
        </div>

        <div className="rounded-lg border bg-card shadow-card p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold text-sm sm:text-base">{t("defaultPayoutDetails")}</h3>
          <div className="space-y-2">
            <Label>{t("payoutMethod")}</Label>
            <Input defaultValue="Wise" />
          </div>
          <div className="space-y-2">
            <Label>{t("accountEmailIban")}</Label>
            <Input defaultValue="john@wise.com" />
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.success(t("payoutDetailsSaved"))}>
            {t("updatePayoutDetails")}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
