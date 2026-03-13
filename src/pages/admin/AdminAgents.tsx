import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ban, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/LanguageContext";

const agents = [
  { id: "AGT-001", name: "Ali Yilmaz", email: "ali@example.com", type: "airport", country: "Turkey", sales: 234, balance: "€136.00", status: "active", code: "ALI234" },
  { id: "AGT-002", name: "Maria Costa", email: "maria@example.com", type: "hotel", country: "Portugal", sales: 189, balance: "€89.00", status: "active", code: "MARIA89" },
  { id: "AGT-003", name: "Ahmed Hassan", email: "ahmed@example.com", type: "tour_guide", country: "Egypt", sales: 167, balance: "€245.00", status: "active", code: "AHMED67" },
  { id: "AGT-004", name: "Sofia Müller", email: "sofia@example.com", type: "taxi", country: "Germany", sales: 145, balance: "€60.00", status: "active", code: "SOFIA45" },
  { id: "AGT-005", name: "James Smith", email: "james@example.com", type: "affiliate", country: "UK", sales: 132, balance: "€72.00", status: "blocked", code: "JAMES32" },
];

export default function AdminAgents() {
  const { t } = useTranslation();

  const typeLabels: Record<string, string> = {
    airport: t("airportAgent"),
    hotel: t("hotelStaff"),
    tour_guide: t("tourGuide"),
    taxi: t("taxiDriver"),
    affiliate: t("affiliate"),
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{t("agents")}</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("searchAgents")} className="pl-9" />
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("agent")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("type")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("country")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("code")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("sales")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("balance")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("status")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <div>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.email}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                        {typeLabels[a.type]}
                      </span>
                    </td>
                    <td className="px-5 py-3">{a.country}</td>
                    <td className="px-5 py-3 font-mono text-xs">{a.code}</td>
                    <td className="px-5 py-3">{a.sales}</td>
                    <td className="px-5 py-3 font-medium">{a.balance}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        a.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      }`}>{t(a.status as any)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(t("viewDetails"))}>{t("viewDetails")}</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(t("editCommission"))}>{t("editCommission")}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => toast.warning(t("blockAgent"))}>
                            <Ban className="h-4 w-4 mr-2" />{t("blockAgent")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
