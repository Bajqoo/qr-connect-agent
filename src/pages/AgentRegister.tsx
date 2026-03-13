import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoRed from "@/assets/logo-red.png";
import logoWhite from "@/assets/logo-white.png";

export default function AgentRegister() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const agentTypes = [
    { value: "airport", label: t("airportAgent") },
    { value: "taxi", label: t("taxiDriver") },
    { value: "hotel", label: t("hotelStaff") },
    { value: "tour_guide", label: t("tourGuide") },
    { value: "affiliate", label: t("affiliate") },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("registrationSuccess"));
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-dark items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <div className="mb-8">
            <img src={logoWhite} alt="Next eSIM" className="h-10" />
          </div>
          <h2 className="text-3xl font-bold text-sidebar-foreground mb-4">
            {t("registerLeftTitle")}
          </h2>
          <p className="text-sidebar-foreground/60 text-lg mb-8">
            {t("registerLeftSubtitle")}
          </p>
          <div className="space-y-4">
            {[t("registerBullet1"), t("registerBullet2"), t("registerBullet3"), t("registerBullet4")].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sidebar-foreground/80">
                <div className="h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-between items-center lg:justify-end mb-8">
            <div className="lg:hidden">
              <img src={logoRed} alt="Next eSIM" className="h-8" />
            </div>
            <LanguageSwitcher />
          </div>

          <h1 className="text-2xl font-bold mb-1">{t("createAgentAccount")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              {t("signIn")}
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("fullName")}</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input id="phone" type="tel" placeholder="+1 555 000" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">{t("country")}</Label>
                <Input id="country" placeholder="Turkey" required />
              </div>
              <div className="space-y-2">
                <Label>{t("agentType")}</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    {agentTypes.map((at) => (
                      <SelectItem key={at.value} value={at.value}>
                        {at.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 gradient-primary border-0 text-primary-foreground hover:opacity-90" disabled={loading}>
              {loading ? t("creatingAccount") : t("createAccount")}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-6 text-center">
            {t("agreeTerms")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
