import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/LanguageContext";
import logoRed from "@/assets/logo-red.png";

export function PublicNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link to="/">
          <img src={logoRed} alt="Next eSIM" className="h-14" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-card animate-fade-in">
          <div className="flex flex-col gap-1 px-5 py-4">
            <Link to="/about" onClick={() => setOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">{t("navAbout")}</Button>
            </Link>
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">{t("signIn")}</Button>
            </Link>
            <Link to="/register" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                {t("becomeAgent")}
              </Button>
            </Link>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
