import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Users, QrCode, DollarSign, ArrowRight, Shield, BarChart3, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: QrCode, title: "Auto QR Codes", desc: "Unique referral QR code generated for every agent instantly" },
  { icon: BarChart3, title: "Real-time Tracking", desc: "Track scans, installs, purchases, and commissions live" },
  { icon: DollarSign, title: "Auto Commissions", desc: "Commissions calculated and recorded automatically per sale" },
  { icon: Wallet, title: "Easy Payouts", desc: "Withdraw via Wise, Revolut, or bank transfer" },
  { icon: Shield, title: "Fraud Protection", desc: "IP monitoring, device fingerprinting, and duplicate detection" },
  { icon: Users, title: "10K+ Agents", desc: "Built to scale globally across countries and agent types" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Next eSIM</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
                Become an Agent
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-6">
            <Globe className="h-3.5 w-3.5" />
            Agent Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Sell eSIMs globally.
            <br />
            <span className="text-primary">Earn on every scan.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of airport agents, taxi drivers, hotel staff, and tour guides earning commission on every eSIM sale through their unique QR code.
          </p>
          <div className="flex items-center gap-3 justify-center">
            <Link to="/register">
              <Button size="lg" className="gradient-primary border-0 text-primary-foreground hover:opacity-90 h-12 px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="h-12 px-8">
                Admin Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="rounded-lg border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Next eSIM Agent Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
