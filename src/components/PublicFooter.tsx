import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";

export function PublicFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t py-8">
      <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Next eSIM. {t("allRightsReserved")}</span>
        <nav className="flex items-center gap-5">
          <Link to="/about" className="hover:text-foreground transition-colors">{t("navAbout")}</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">{t("navContact")}</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">{t("navTerms")}</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">{t("navPrivacy")}</Link>
        </nav>
      </div>
    </footer>
  );
}
