import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function DashboardSettings() {
  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6 max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Settings</h2>

        <div className="rounded-lg border bg-card shadow-card p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold text-sm sm:text-base">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+90 555 123 4567" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="john@example.com" type="email" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label>Country</Label>
              <Input defaultValue="Turkey" />
            </div>
            <div className="space-y-2">
              <Label>Agent Type</Label>
              <Input defaultValue="Airport Agent" disabled />
            </div>
          </div>
          <Button size="sm" onClick={() => toast.success("Profile updated")} className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
            Save Changes
          </Button>
        </div>

        <div className="rounded-lg border bg-card shadow-card p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold text-sm sm:text-base">Default Payout Details</h3>
          <div className="space-y-2">
            <Label>Payout Method</Label>
            <Input defaultValue="Wise" />
          </div>
          <div className="space-y-2">
            <Label>Account Email / IBAN</Label>
            <Input defaultValue="john@wise.com" />
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.success("Payout details saved")}>
            Update Payout Details
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
