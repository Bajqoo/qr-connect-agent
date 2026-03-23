import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";

export default function Privacy() {
  const { t } = useTranslation();

  const sections = [
    { title: t("privacyCollectTitle"), desc: t("privacyCollectDesc") },
    { title: t("privacyUseTitle"), desc: t("privacyUseDesc") },
    { title: t("privacySecurityTitle"), desc: t("privacySecurityDesc") },
    { title: t("privacyCookiesTitle"), desc: t("privacyCookiesDesc") },
    { title: t("privacyRightsTitle"), desc: t("privacyRightsDesc") },
    { title: t("privacyContactTitle"), desc: `${t("privacyContactDesc")} info@nextesim.app.` },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNav />

      <main className="flex-1 max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{t("privacyTitle")}</h1>
          <p className="text-muted-foreground mb-10">{t("privacyLastUpdated")}</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
