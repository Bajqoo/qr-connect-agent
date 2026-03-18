import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoRed from "@/assets/logo-red.png";
import logoWhite from "@/assets/logo-white.png";
import loginBg from "@/assets/login-bg.jpg";

export default function AgentLogin() {
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
      toast.success(t("welcomeBack") + "!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - background image */}
      <div className="hidden lg:flex lg:w-1/2 relative items-end justify-start p-10">
        <img
          src={loginBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <img src={logoWhite} alt="Next eSIM" className="h-10 mb-4" />
          <h2 className="text-2xl font-bold text-white">The Next Sim</h2>
          <p className="text-white/80 text-lg">Anyone, Anywhere</p>
        </motion.div>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="flex justify-between items-center mb-8">
            <img src={logoRed} alt="Next eSIM" className="h-10 lg:hidden" />
            <div className="lg:hidden" />
            <LanguageSwitcher />
          </div>

          <h1 className="text-2xl font-bold text-center mb-1">{t("welcomeBack")}</h1>
          <p className="text-muted-foreground text-center mb-6">
            {t("signInAgent")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" placeholder="john@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
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

          <p className="text-sm text-muted-foreground mt-6 text-center">
            {t("dontHaveAccount")}{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              {t("signUp")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
