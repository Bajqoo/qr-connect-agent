import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, MoreHorizontal, Ban, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/i18n/LanguageContext";

interface ManagerProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  manager_cut: number;
  status: string;
  created_at: string;
}

export default function AdminManagers() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState<ManagerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [managerCut, setManagerCut] = useState("1.00");

  const fetchManagers = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action: "get-users-by-role", role: "manager" },
    });
    if (!error && data?.users) setManagers(data.users);
    setLoading(false);
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action: "create-user", email, password, full_name: name, phone, role: "manager", manager_cut: parseFloat(managerCut) },
    });
    setCreating(false);
    if (error || data?.error) {
      toast.error(data?.error || error?.message || "Error creating manager");
    } else {
      toast.success(t("managerCreated"));
      setOpen(false);
      setName(""); setEmail(""); setPassword(""); setPhone(""); setManagerCut("1.00");
      fetchManagers();
    }
  };

  const handleToggleStatus = async (profileId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const { error } = await supabase.functions.invoke("admin-users", {
      body: { action: "update-status", profile_id: profileId, status: newStatus },
    });
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`${t("managers")} ${newStatus === "blocked" ? t("managerBlocked") : t("managerActivated")}`);
      fetchManagers();
    }
  };

  const filteredManagers = managers.filter((m) =>
    m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("managers")}</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("searchManagers")} className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary border-0 text-primary-foreground hover:opacity-90 shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> {t("addManager")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{t("createManagerAccount")}</DialogTitle>
                  <DialogDescription>{t("createManagerDesc")}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label>{t("fullName")}</Label>
                    <Input placeholder={t("managerName")} required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("email")}</Label>
                    <Input type="email" placeholder="manager@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("password")}</Label>
                    <Input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("phone")}</Label>
                    <Input type="tel" placeholder="+355 69 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("defaultCutPerSale")}</Label>
                    <Input type="number" min={0} step={0.25} required value={managerCut} onChange={(e) => setManagerCut(e.target.value)} />
                    <p className="text-xs text-muted-foreground">{t("cutDescription")}</p>
                  </div>
                  <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90" disabled={creating}>
                    {creating ? t("creating") : t("createManager")}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">{t("loadingManagers")}</div>
        ) : filteredManagers.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {searchQuery ? t("noManagersFound") : t("noManagersYet")}
          </div>
        ) : (
          <>
            <div className="rounded-lg border bg-card shadow-card hidden sm:block">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("managers")}</th>
                      <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("phone")}</th>
                      <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("cutPerSale")}</th>
                      <th className="text-left font-medium text-muted-foreground px-5 py-3">{t("status")}</th>
                      <th className="text-left font-medium text-muted-foreground px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredManagers.map((m) => (
                      <tr key={m.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3">
                          <div>
                            <div className="font-medium">{m.full_name}</div>
                            <div className="text-xs text-muted-foreground">{m.email}</div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{m.phone || "—"}</td>
                        <td className="px-5 py-3 font-semibold">€{Number(m.manager_cut).toFixed(2)}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            m.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                          }`}>{t(m.status as any)}</span>
                        </td>
                        <td className="px-5 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {m.status === "active" ? (
                                <DropdownMenuItem className="text-destructive" onClick={() => handleToggleStatus(m.id, m.status)}>
                                  <Ban className="h-4 w-4 mr-2" />{t("blockManager")}
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleToggleStatus(m.id, m.status)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />{t("activateManager")}
                                </DropdownMenuItem>
                              )}
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
              {filteredManagers.map((m) => (
                <div key={m.id} className="rounded-lg border bg-card shadow-card p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{m.full_name}</div>
                      <div className="text-xs text-muted-foreground">{m.email}</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {m.status === "active" ? (
                          <DropdownMenuItem className="text-destructive" onClick={() => handleToggleStatus(m.id, m.status)}>
                            <Ban className="h-4 w-4 mr-2" />{t("block")}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleToggleStatus(m.id, m.status)}>
                            <CheckCircle className="h-4 w-4 mr-2" />{t("activateManager")}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      m.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>{t(m.status as any)}</span>
                    <span className="text-xs text-muted-foreground">€{Number(m.manager_cut).toFixed(2)}/{t("sales").toLowerCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
