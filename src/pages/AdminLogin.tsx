import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoRed from "@/assets/logo-red.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("welcomeBackAdmin"));
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-8">
          <img src={logoRed} alt="Next eSIM" className="h-10" />
          <LanguageSwitcher />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-center">{t("adminPanel")}</h1>
        </div>
        <p className="text-muted-foreground text-center mb-6">
          {t("signInManagePlatform")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" placeholder="admin@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full h-11 gradient-primary border-0 text-primary-foreground hover:opacity-90" disabled={loading}>
            {loading ? t("signingIn") : t("signIn")}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
