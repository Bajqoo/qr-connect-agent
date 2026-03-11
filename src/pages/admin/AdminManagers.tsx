import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, MoreHorizontal, Ban, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";

const managers = [
  { id: "MGR-001", name: "Erion Hoxha", email: "erion@example.com", agents: 12, totalSales: 487, earnings: "€1,245.00", status: "active" },
  { id: "MGR-002", name: "Luana Krasniqi", email: "luana@example.com", agents: 8, totalSales: 312, earnings: "€890.00", status: "active" },
  { id: "MGR-003", name: "Dritan Basha", email: "dritan@example.com", agents: 5, totalSales: 156, earnings: "€420.00", status: "active" },
  { id: "MGR-004", name: "Arben Duka", email: "arben@example.com", agents: 3, totalSales: 89, earnings: "€210.00", status: "blocked" },
];

export default function AdminManagers() {
  const [open, setOpen] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Manager account created successfully!");
    setOpen(false);
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Managers</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search managers..." className="pl-9" />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary border-0 text-primary-foreground hover:opacity-90 shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Add Manager
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Manager Account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Manager name" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="manager@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="••••••••" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" placeholder="+355 69 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Cut per Agent Sale (€)</Label>
                    <Input type="number" placeholder="1.00" min={0} step={0.25} required />
                    <p className="text-xs text-muted-foreground">
                      The default amount this manager earns from each agent sale
                    </p>
                  </div>
                  <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                    Create Manager
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Desktop table */}
        <div className="rounded-lg border bg-card shadow-card hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Manager</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Agents</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Total Sales</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Earnings</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {managers.map((m) => (
                  <tr key={m.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        {m.agents}
                      </div>
                    </td>
                    <td className="px-5 py-3">{m.totalSales}</td>
                    <td className="px-5 py-3 font-semibold text-primary">{m.earnings}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        m.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      }`}>{m.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info("View manager details")}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("View manager's agents")}>View Agents</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("Edit commission cut")}>Edit Commission</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => toast.warning("Manager blocked")}>
                            <Ban className="h-4 w-4 mr-2" />Block Manager
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

        {/* Mobile card list */}
        <div className="sm:hidden space-y-3">
          {managers.map((m) => (
            <div key={m.id} className="rounded-lg border bg-card shadow-card p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.email}</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast.info("View details")}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info("View agents")}>View Agents</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info("Edit commission")}>Edit Commission</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Ban className="h-4 w-4 mr-2" />Block Manager
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  m.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                }`}>{m.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div>
                  <p className="text-xs text-muted-foreground">Agents</p>
                  <p className="font-medium text-sm">{m.agents}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sales</p>
                  <p className="font-medium text-sm">{m.totalSales}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Earnings</p>
                  <p className="font-semibold text-sm text-primary">{m.earnings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
