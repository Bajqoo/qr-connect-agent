import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, QrCode, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import aboutHero from "@/assets/about-hero.jpg";
import aboutAgent from "@/assets/about-agent.jpg";
import aboutTaxi from "@/assets/about-taxi.jpg";
import aboutTech from "@/assets/about-technology.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function About() {
  const { t } = useTranslation();

  const milestones = [
    {
      year: "2023", title: t("aboutYear2023"),
      points: [t("aboutYear2023P1"), t("aboutYear2023P2"), t("aboutYear2023P3")],
    },
    {
      year: "2024", title: t("aboutYear2024"),
      points: [t("aboutYear2024P1"), t("aboutYear2024P2"), t("aboutYear2024P3"), t("aboutYear2024P4")],
    },
    {
      year: "2025", title: t("aboutYear2025"),
      points: [t("aboutYear2025P1"), t("aboutYear2025P2"), t("aboutYear2025P3"), t("aboutYear2025P4")],
    },
    {
      year: "2026", title: t("aboutYear2026"),
      points: [t("aboutYear2026P1"), t("aboutYear2026P2"), t("aboutYear2026P3"), t("aboutYear2026P4")],
    },
  ];

  const howItems = [
    { icon: QrCode, title: t("aboutHowQR"), desc: t("aboutHowQRDesc") },
    { icon: Zap, title: t("aboutHowEfficiency"), desc: t("aboutHowEfficiencyDesc") },
    { icon: Globe, title: t("aboutHowGlobal"), desc: t("aboutHowGlobalDesc") },
    { icon: Shield, title: t("aboutHowReliability"), desc: t("aboutHowReliabilityDesc") },
  ];

  const commitments = [
    { title: t("aboutCommitAgents"), desc: t("aboutCommitAgentsDesc") },
    { title: t("aboutCommitTravelers"), desc: t("aboutCommitTravelersDesc") },
    { title: t("aboutCommitManagers"), desc: t("aboutCommitManagersDesc") },
    { title: t("aboutCommitCommunity"), desc: t("aboutCommitCommunityDesc") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* Hero Title */}
      <section className="pt-16 pb-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-bold tracking-tight"
        >
          {t("aboutTitle")}
        </motion.h1>
      </section>

      {/* Hero Image */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <img src={aboutHero} alt="Next eSIM Team" className="w-full h-[300px] sm:h-[420px] lg:h-[520px] object-cover" />
      </motion.section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20 text-center">
        <motion.p {...fadeUp} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          {t("aboutIntro")}
        </motion.p>
      </section>

      {/* What is Next eSIM */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("aboutWhatTitle")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t("aboutWhatP1")}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("aboutWhatP2")}</p>
        </motion.div>
      </section>

      {/* Image Grid */}
      <motion.section {...fadeUp} className="max-w-5xl mx-auto px-5 pb-16">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <img src={aboutAgent} alt="Airport Agent" className="w-full h-64 sm:h-80 object-cover rounded-xl" />
          <img src={aboutTaxi} alt="Taxi Agent" className="w-full h-64 sm:h-80 object-cover rounded-xl" />
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("aboutMissionTitle")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {t("aboutMissionP1")}
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("aboutMissionP2")}
          </p>
        </motion.div>
      </section>

      {/* Tech Image */}
      <motion.section {...fadeUp} className="max-w-5xl mx-auto px-5 pb-16">
        <img src={aboutTech} alt="QR Technology" className="w-full h-64 sm:h-96 object-cover rounded-xl" />
      </motion.section>

      {/* Journey Timeline */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">{t("aboutJourneyTitle")}</h2>
        </motion.div>
        <div className="space-y-10">
          {milestones.map((m, i) => (
            <motion.div key={m.year} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <h3 className="text-2xl font-bold mb-1">
                <span className="text-primary">{m.year}</span>: {m.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {m.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-accent/50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("aboutHowTitle")}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">{t("aboutHowIntro")}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {howItems.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-xl border bg-card p-6 shadow-card">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">{t("aboutCommitTitle")}</h2>
        </motion.div>
        <div className="space-y-8">
          {commitments.map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-dark py-16 sm:py-20">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-sidebar-foreground mb-4">{t("aboutCTATitle")}</h2>
          <p className="text-sidebar-foreground/60 text-lg mb-8">{t("aboutCTADesc")}</p>
          <Link to="/register">
            <Button size="lg" className="gradient-primary border-0 text-primary-foreground hover:opacity-90 h-12 px-10">
              {t("aboutCTAButton")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
