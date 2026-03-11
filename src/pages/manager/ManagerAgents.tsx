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

const myAgents = [
  { id: "AGT-001", name: "Ali Yilmaz", email: "ali@example.com", type: "airport", sales: 234, commission: "€936", myEarnings: "€234", status: "active" },
  { id: "AGT-002", name: "Maria Costa", email: "maria@example.com", type: "hotel", sales: 189, commission: "€567", myEarnings: "€141.75", status: "active" },
  { id: "AGT-003", name: "Ahmed Hassan", email: "ahmed@example.com", type: "tour_guide", sales: 167, commission: "€835", myEarnings: "€208.75", status: "active" },
  { id: "AGT-004", name: "Sofia Müller", email: "sofia@example.com", type: "taxi", sales: 145, commission: "€580", myEarnings: "€145", status: "active" },
];

const typeLabels: Record<string, string> = {
  airport: "Airport",
  hotel: "Hotel",
  tour_guide: "Tour Guide",
  taxi: "Taxi",
  affiliate: "Affiliate",
};

export default function ManagerAgents() {
  const [open, setOpen] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Agent created successfully!");
    setOpen(false);
  };

  return (
    <DashboardLayout type="manager">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">My Agents</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search agents..." className="pl-9" />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary border-0 text-primary-foreground hover:opacity-90 shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Add Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Agent</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Agent name" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="agent@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" placeholder="+90 555 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label>Agent Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="airport">Airport</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="tour_guide">Tour Guide</SelectItem>
                        <SelectItem value="taxi">Taxi</SelectItem>
                        <SelectItem value="affiliate">Affiliate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Commission per Sale (€)</Label>
                    <Input type="number" placeholder="4.00" min={0} step={0.5} required />
                  </div>
                  <div className="space-y-2">
                    <Label>My Cut per Sale (€)</Label>
                    <Input type="number" placeholder="1.00" min={0} step={0.25} required />
                    <p className="text-xs text-muted-foreground">Amount you earn from each sale by this agent</p>
                  </div>
                  <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                    Create Agent
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
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Agent</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Type</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Sales</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Their Commission</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">My Earnings</th>
                  <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
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
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info("View agent details")}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("Edit commission")}>Edit Commission</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => toast.warning("Agent blocked")}>
                            <Ban className="h-4 w-4 mr-2" />Block Agent
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
          {myAgents.map((a) => (
            <div key={a.id} className="rounded-lg border bg-card shadow-card p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.email}</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast.info("View agent details")}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info("Edit commission")}>Edit Commission</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Ban className="h-4 w-4 mr-2" />Block Agent
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                  {typeLabels[a.type]}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                  {a.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div>
                  <p className="text-xs text-muted-foreground">Sales</p>
                  <p className="font-medium text-sm">{a.sales}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Their Cut</p>
                  <p className="font-medium text-sm">{a.commission}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">My Earnings</p>
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
