import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNav />

      <main className="flex-1 max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">{t("contactTitle")}</h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl">{t("contactSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4">
              <Mail className="h-5 w-5 text-accent-foreground" />
            </div>
            <p className="font-semibold mb-1">{t("contactEmail")}</p>
            <a href="mailto:info@nextesim.app" className="text-primary hover:underline">info@nextesim.app</a>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4">
              <MapPin className="h-5 w-5 text-accent-foreground" />
            </div>
            <p className="font-semibold mb-1">{t("contactLocation")}</p>
            <p className="text-muted-foreground">{t("contactLocationValue")}</p>
          </div>
        </motion.div>
      </main>

      <PublicFooter />
    </div>
  );
}
