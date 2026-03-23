import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/LanguageContext";
import logoRed from "@/assets/logo-red.png";

export function PublicNav() {
  const { t } = useTranslation();
  return (
    <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link to="/">
          <img src={logoRed} alt="Next eSIM" className="h-14" />
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/about">
            <Button variant="ghost" size="sm">{t("navAbout")}</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm">{t("signIn")}</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
              {t("becomeAgent")}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
