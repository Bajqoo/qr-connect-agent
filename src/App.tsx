import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgentRegister from "./pages/AgentRegister";
import AgentLogin from "./pages/AgentLogin";
import CustomerLanding from "./pages/CustomerLanding";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardQRCode from "./pages/dashboard/DashboardQRCode";
import DashboardSales from "./pages/dashboard/DashboardSales";
import DashboardEarnings from "./pages/dashboard/DashboardEarnings";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminSales from "./pages/admin/AdminSales";
import AdminCommissions from "./pages/admin/AdminCommissions";
import AdminPayouts from "./pages/admin/AdminPayouts";
import AdminFraud from "./pages/admin/AdminFraud";
import ManagerLogin from "./pages/ManagerLogin";
import ManagerOverview from "./pages/manager/ManagerOverview";
import ManagerAgents from "./pages/manager/ManagerAgents";
import ManagerSales from "./pages/manager/ManagerSales";
import ManagerEarnings from "./pages/manager/ManagerEarnings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<AgentRegister />} />
          <Route path="/login" element={<AgentLogin />} />
          <Route path="/r/:refCode" element={<CustomerLanding />} />
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/qr-code" element={<DashboardQRCode />} />
          <Route path="/dashboard/sales" element={<DashboardSales />} />
          <Route path="/dashboard/earnings" element={<DashboardEarnings />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/agents" element={<AdminAgents />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/admin/commissions" element={<AdminCommissions />} />
          <Route path="/admin/payouts" element={<AdminPayouts />} />
          <Route path="/admin/fraud" element={<AdminFraud />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
