import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, QrCode, DollarSign, ArrowRight, Shield, BarChart3, Wallet, Plane, UserPlus, ScanLine, Smartphone, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import heroBg from "@/assets/hero-bg.jpg";

export default function Index() {
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const features = [
    { icon: QrCode, title: t("featAutoQR"), desc: t("featAutoQRDesc") },
    { icon: BarChart3, title: t("featTracking"), desc: t("featTrackingDesc") },
    { icon: DollarSign, title: t("featCommissions"), desc: t("featCommissionsDesc") },
    { icon: Wallet, title: t("featPayouts"), desc: t("featPayoutsDesc") },
    { icon: Shield, title: t("featFraud"), desc: t("featFraudDesc") },
    { icon: Users, title: t("featScale"), desc: t("featScaleDesc") },
  ];

  const steps = [
    { num: 1, icon: UserPlus, label: t("stepRegister") },
    { num: 2, icon: QrCode, label: t("stepGetQR") },
    { num: 3, icon: ScanLine, label: t("stepShare") },
    { num: 4, icon: CreditCard, label: t("stepEarn") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* Full-width hero image — Wolt style */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroBg}
            alt=""
            className="w-full h-[280px] sm:h-[380px] lg:h-[440px] object-cover"
          />
        </motion.div>
      </section>

      {/* Step progress bar */}
      <section className="border-b bg-card">
        <div className="max-w-3xl mx-auto px-5 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div className="flex items-center w-full">
                  {i > 0 && <div className="flex-1 h-0.5 bg-border -ml-1 mr-2" />}
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                    i === 0 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-border -mr-1 ml-2" />}
                </div>
                <span className={`text-xs font-medium text-center ${
                  i === 0 ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero text content */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-6">
            {t("agentPlatform")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {t("heroTitle1")}
            <br />
            <span className="text-primary">{t("heroTitle2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex items-center gap-3 justify-center">
            <Link to="/register">
              <Button size="lg" className="gradient-primary border-0 text-primary-foreground hover:opacity-90 h-12 px-8">
                {t("getStartedFree")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-12 px-8">
                {t("signIn")}
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
              key={i}
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

      {/* Partners */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">{t("partnersTitle")}</h2>
          <p className="text-muted-foreground">{t("partnersSubtitle")}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            { name: t("partnerPristina"), code: "PRN", country: "🇽🇰" },
            { name: t("partnerTirana"), code: "TIA", country: "🇦🇱" },
          ].map((airport, i) => (
            <motion.div
              key={airport.code}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="rounded-lg border bg-card p-6 shadow-card flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Plane className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{airport.country}</span>
                  <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{airport.code}</span>
                </div>
                <p className="font-semibold text-sm mt-1">{airport.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
