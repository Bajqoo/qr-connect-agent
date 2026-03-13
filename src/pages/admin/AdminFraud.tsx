import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { AlertTriangle, Shield, Fingerprint, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/LanguageContext";

const flags = [
  { id: "FRD-012", agent: "James Smith", type: "Multiple purchases same IP", ip: "185.42.xxx.xxx", count: 5, date: "Mar 10, 2026", severity: "high" },
  { id: "FRD-011", agent: "Unknown", type: "Duplicate device fingerprint", ip: "91.108.xxx.xxx", count: 3, date: "Mar 9, 2026", severity: "medium" },
  { id: "FRD-010", agent: "Sofia Müller", type: "Suspicious scan pattern", ip: "45.12.xxx.xxx", count: 48, date: "Mar 8, 2026", severity: "low" },
];

export default function AdminFraud() {
  const { t } = useTranslation();

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">{t("fraudDetection")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard title={t("openFlags")} value="12" icon={AlertTriangle} subtitle={t("needsReview")} />
          <StatCard title={t("blockedAgents")} value="3" icon={Shield} subtitle={t("thisMonth")} />
          <StatCard title={t("duplicateDevices")} value="7" icon={Fingerprint} subtitle={t("detected")} />
          <StatCard title={t("ipAnomalies")} value="5" icon={Monitor} subtitle={t("flagged")} />
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="p-5 border-b">
            <h3 className="font-semibold">{t("recentFraudFlags")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("id")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("agent")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("type")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("ip")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("count")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("severity")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {flags.map((f) => (
                  <tr key={f.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium">{f.id}</td>
                    <td className="px-5 py-3">{f.agent}</td>
                    <td className="px-5 py-3">{f.type}</td>
                    <td className="px-5 py-3 font-mono text-xs">{f.ip}</td>
                    <td className="px-5 py-3">{f.count}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        f.severity === "high" ? "bg-destructive/10 text-destructive" :
                        f.severity === "medium" ? "bg-warning/10 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>{f.severity}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => toast.info(t("investigate") + "...")}>
                          {t("investigate")}
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive" onClick={() => toast.warning(t("blockAgent"))}>
                          {t("block")}
                        </Button>
                      </div>
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
