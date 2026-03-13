import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, MoreHorizontal, Ban } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";

const myAgents = [
  { id: "AGT-001", name: "Ali Yilmaz", email: "ali@example.com", type: "airport", sales: 234, commission: "€936", myEarnings: "€234", status: "active" },
  { id: "AGT-002", name: "Maria Costa", email: "maria@example.com", type: "hotel", sales: 189, commission: "€567", myEarnings: "€141.75", status: "active" },
  { id: "AGT-003", name: "Ahmed Hassan", email: "ahmed@example.com", type: "tour_guide", sales: 167, commission: "€835", myEarnings: "€208.75", status: "active" },
  { id: "AGT-004", name: "Sofia Müller", email: "sofia@example.com", type: "taxi", sales: 145, commission: "€580", myEarnings: "€145", status: "active" },
];

export default function ManagerAgents() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const typeLabels: Record<string, string> = {
    airport: t("airportAgent"),
    hotel: t("hotelStaff"),
    tour_guide: t("tourGuide"),
    taxi: t("taxiDriver"),
    affiliate: t("affiliate"),
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("agentCreated"));
    setOpen(false);
  };

  return (
    <DashboardLayout type="manager">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("myAgents")}</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("searchAgents")} className="pl-9" />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary border-0 text-primary-foreground hover:opacity-90 shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> {t("addAgent")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{t("createNewAgent")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label>{t("fullName")}</Label>
                    <Input placeholder={t("agent")} required />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("email")}</Label>
                    <Input type="email" placeholder="agent@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("phone")}</Label>
                    <Input type="tel" placeholder="+90 555 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("agentType")}</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder={t("selectType")} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="airport">{t("airportAgent")}</SelectItem>
                        <SelectItem value="hotel">{t("hotelStaff")}</SelectItem>
                        <SelectItem value="tour_guide">{t("tourGuide")}</SelectItem>
                        <SelectItem value="taxi">{t("taxiDriver")}</SelectItem>
                        <SelectItem value="affiliate">{t("affiliate")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("commissionPerSale")}</Label>
                    <Input type="number" placeholder="4.00" min={0} step={0.5} required />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("myCutPerSale")}</Label>
                    <Input type="number" placeholder="1.00" min={0} step={0.25} required />
                    <p className="text-xs text-muted-foreground">{t("myCutDesc")}</p>
                  </div>
                  <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                    {t("createAccount")}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-card hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("agent")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("type")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("sales")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("theirCommission")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("myEarnings")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("status")}</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {myAgents.map((a) => (
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
                    <td className="px-5 py-3">{a.sales}</td>
                    <td className="px-5 py-3">{a.commission}</td>
                    <td className="px-5 py-3 font-semibold text-primary">{a.myEarnings}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                        {t(a.status as any)}
                      </span>
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

        <div className="sm:hidden space-y-3">
          {myAgents.map((a) => (
            <div key={a.id} className="rounded-lg border bg-card shadow-card p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.email}</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast.info(t("viewDetails"))}>{t("viewDetails")}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info(t("editCommission"))}>{t("editCommission")}</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Ban className="h-4 w-4 mr-2" />{t("blockAgent")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                  {typeLabels[a.type]}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                  {t(a.status as any)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div>
                  <p className="text-xs text-muted-foreground">{t("sales")}</p>
                  <p className="font-medium text-sm">{a.sales}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("theirCommission")}</p>
                  <p className="font-medium text-sm">{a.commission}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("myEarnings")}</p>
                  <p className="font-semibold text-sm text-primary">{a.myEarnings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
