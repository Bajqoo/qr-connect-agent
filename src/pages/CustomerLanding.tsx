import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Wifi, Clock, Shield, Zap, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Zap, title: "Instant Activation", desc: "Ready in 2 minutes" },
  { icon: Wifi, title: "Unlimited Data", desc: "No speed limits" },
  { icon: Clock, title: "7-Day Coverage", desc: "Full week access" },
  { icon: Shield, title: "Secure Connection", desc: "Encrypted & private" },
];

export default function CustomerLanding() {
  const [params] = useSearchParams();
  const ref = params.get("ref") || "";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="max-w-lg mx-auto px-5 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-6">
              <Globe className="h-3.5 w-3.5" />
              Turkey eSIM
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Unlimited Internet
              <br />
              <span className="text-primary">in Turkey</span>
            </h1>
            <p className="text-muted-foreground text-base mb-8">
              Activate your eSIM in 2 minutes. No physical SIM needed.
            </p>

            {/* Price card */}
            <div className="bg-card rounded-xl border shadow-elevated p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Turkey Unlimited</h3>
                  <p className="text-sm text-muted-foreground">7-day plan</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">€19.90</div>
                  <p className="text-xs text-muted-foreground">one-time</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-6">
                {["Unlimited high-speed data", "Works on all eSIM phones", "24/7 customer support", "Instant QR code delivery"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full h-12 text-base font-semibold gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity">
                Install eSIM
              </Button>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-card rounded-lg border p-4 text-left"
                >
                  <f.icon className="h-5 w-5 text-primary mb-2" />
                  <div className="text-sm font-medium">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            © {new Date().getFullYear()} Next eSIM. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
