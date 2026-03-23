import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";

export default function Terms() {
  const { t } = useTranslation();

  const sections = [
    { title: t("termsAcceptTitle"), desc: t("termsAcceptDesc") },
    { title: t("termsAgentTitle"), desc: t("termsAgentDesc") },
    { title: t("termsCommTitle"), desc: t("termsCommDesc") },
    { title: t("termsIPTitle"), desc: t("termsIPDesc") },
    { title: t("termsTermTitle"), desc: t("termsTermDesc") },
    { title: t("termsContactTitle"), desc: `${t("termsContactDesc")} info@nextesim.app.` },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNav />

      <main className="flex-1 max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{t("termsTitle")}</h1>
          <p className="text-muted-foreground mb-10">{t("termsLastUpdated")}</p>
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
