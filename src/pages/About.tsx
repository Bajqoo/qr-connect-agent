import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Wifi, Globe, Users, QrCode, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoRed from "@/assets/logo-red.png";
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
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/">
            <img src={logoRed} alt="Next eSIM" className="h-14" />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
                Become an Agent
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Title */}
      <section className="pt-16 pb-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl font-bold tracking-tight"
        >
          About
        </motion.h1>
      </section>

      {/* Hero Image - Full Width */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={aboutHero}
          alt="Next eSIM Team"
          className="w-full h-[300px] sm:h-[420px] lg:h-[520px] object-cover"
        />
      </motion.section>

      {/* Intro Text */}
      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20 text-center">
        <motion.p {...fadeUp} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Next eSIM e bën tepër të thjeshtë lidhjen me internet kudo në botë. Ne ndërtojmë infrastrukturën
          që lidh udhëtarët me konektivitetin – shpejt, me besueshmëri dhe me çmim të përballueshëm.
          Dhe duke e bërë këtë, ne sjellim mundësi fitimi për agjentët tanë kudo në botë.
        </motion.p>
      </section>

      {/* Section: What is Next eSIM */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Çfarë është Next eSIM në fakt?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Next eSIM është një platformë teknologjike me misionin për t'i lidhur udhëtarët me internet
            në çdo vend të botës, nëpërmjet eSIM-ve dixhitale. Ne kemi ndërtuar një rrjet agjentësh –
            nga agjentët e aeroportit, taksistët, stafi i hoteleve deri te guidat turistike – që fitojnë
            komisione për çdo shitje që bëjnë përmes kodit të tyre unik QR.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Themeluar me vizionin që konektiviteti duhet të jetë i aksesueshëm për të gjithë, Next eSIM
            operon në mbi 200 vende dhe ofron paketa të përballueshme duke filluar nga 2.99€.
          </p>
        </motion.div>
      </section>

      {/* Image Section */}
      <motion.section {...fadeUp} className="max-w-5xl mx-auto px-5 pb-16">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <img
            src={aboutAgent}
            alt="Airport Agent"
            className="w-full h-64 sm:h-80 object-cover rounded-xl"
          />
          <img
            src={aboutTaxi}
            alt="Taxi Agent"
            className="w-full h-64 sm:h-80 object-cover rounded-xl"
          />
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Misioni dhe vizioni ynë
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Misioni ynë është i thjeshtë: <span className="text-foreground font-semibold">t'i lidhim njerëzit me botën</span>.
            Ne besojmë se çdo udhëtar meriton internet të shpejtë dhe të besueshëm pa u shqetësuar
            për roaming-un e shtrenjtë ose kërkim të SIM-ve fizike.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Vizioni ynë është të ndërtojmë rrjetin më të madh të agjentëve të konektivitetit në botë –
            ku çdo taksist, çdo recepsionist hoteli, çdo guide turistike mund të bëhet partner ynë dhe
            të fitojë duke i ndihmuar udhëtarët. <em>Dhe ne jemi ende vetëm duke filluar.</em>
          </p>
        </motion.div>
      </section>

      {/* Tech Image */}
      <motion.section {...fadeUp} className="max-w-5xl mx-auto px-5 pb-16">
        <img
          src={aboutTech}
          alt="QR Technology"
          className="w-full h-64 sm:h-96 object-cover rounded-xl"
        />
      </motion.section>

      {/* Journey Timeline */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            Rrugëtimi ynë deri tani
          </h2>
        </motion.div>

        <div className="space-y-10">
          {[
            {
              year: "2023",
              title: "Fillimi i idesë",
              points: [
                "Ekipi themelues identifikoi problemin: udhëtarët paguajnë shuma të mëdha për roaming",
                "Filloi zhvillimi i platformës së parë Next eSIM",
                "Partneriteti i parë me ofruesit globalë të eSIM",
              ],
            },
            {
              year: "2024",
              title: "Lansimi i platformës së agjentëve",
              points: [
                "Lansimi i platformës QR-based për agjentët",
                "Agjentët e parë në aeroportin e Prishtinës 🇽🇰",
                "Mbulim në mbi 200 vende me paketa eSIM",
                "Sistemi i komisioneve automatike u aktivizua",
              ],
            },
            {
              year: "2025",
              title: "Zgjerim në rajon",
              points: [
                "Zgjerim në aeroportin e Tiranës 🇦🇱",
                "Rrjeti i agjentëve u rrit me taksistë, hotele dhe guida turistike",
                "Lansimi i dashboard-it real-time për agjentët",
                "Mbi 1,000+ shitje të realizuara përmes platformës",
              ],
            },
            {
              year: "2026",
              title: "Rritja globale",
              points: [
                "Zgjerim në tregje të reja evropiane",
                "Platformë e re me tracking të avancuar",
                "Sistemi i menaxherëve për rrjete agjentësh",
                "Drejt 10,000+ agjentëve aktivë globalë",
              ],
            },
          ].map((milestone, i) => (
            <motion.div key={milestone.year} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <h3 className="text-2xl font-bold mb-1">
                <span className="text-primary">{milestone.year}</span>: {milestone.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {milestone.points.map((point, j) => (
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Si funksionon?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Next eSIM nuk është thjesht një shitës i SIM-ve dixhitale. Ne kemi ndërtuar një
              ekosistem të plotë ku çdo hallkë ka rolin e vet:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: QrCode,
                title: "Teknologjia QR",
                desc: "Çdo agjent merr kodin e vet unik QR. Kur një udhëtar e skanon, automatikisht drejtohet te dyqani ynë ku mund të blejë eSIM menjëherë.",
              },
              {
                icon: Zap,
                title: "Efikasiteti",
                desc: "Procesi i blerjes zgjat vetëm 2 minuta – nga skanimi i QR kodit deri te aktivizimi i eSIM-it në telefon.",
              },
              {
                icon: Globe,
                title: "Mbulim global",
                desc: "Me mbi 200 vende të mbuluara, udhëtarët mund të blejnë internet para se të udhëtojnë ose sapo mbërrijnë në destinacion.",
              },
              {
                icon: Shield,
                title: "Besueshmëria",
                desc: "Çdo transaksion monitorohet në kohë reale. Sistemi ynë anti-mashtrim siguron që çdo komisjon është i drejtë dhe transparent.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border bg-card p-6 shadow-card"
              >
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Angazhimi ynë ndaj partnerëve
          </h2>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              title: "Agjentët",
              desc: "Ne jemi të përkushtuar të jemi një platformë e drejtë dhe e qëndrueshme. Çdo agjent fiton komisione transparente dhe ka akses në dashboard real-time për të ndjekur performancën e tij.",
            },
            {
              title: "Udhëtarët",
              desc: "Ne jemi të përkushtuar t'u ofrojmë shërbimin më të mirë. Paketa të përballueshme, aktivizim i menjëhershëm, dhe mbështetje 24/7 për çdo problem teknik.",
            },
            {
              title: "Menaxherët",
              desc: "Menaxherët tanë kanë mjete të fuqishme për të ndërtuar dhe menaxhuar rrjetin e tyre të agjentëve, me statistika të detajuara dhe komisione automatike.",
            },
            {
              title: "Komuniteti",
              desc: "Ne besojmë se konektiviteti i përballueshëm i bën qytetet tona vende më të mira për të jetuar dhe punuar. Çdo eSIM e shitur e sjell një udhëtar më pranë përvojës lokale.",
            },
          ].map((item, i) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-sidebar-foreground mb-4">
            Bëhu pjesë e rrjetit tonë
          </h2>
          <p className="text-sidebar-foreground/60 text-lg mb-8">
            Bashkohu me mijëra agjentë që fitojnë komisione për çdo eSIM të shitur.
            Regjistrohu falas dhe fillo të fitosh sot.
          </p>
          <Link to="/register">
            <Button size="lg" className="gradient-primary border-0 text-primary-foreground hover:opacity-90 h-12 px-10">
              Regjistrohu Falas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Next eSIM. All rights reserved. | www.nextesim.app
        </div>
      </footer>
    </div>
  );
}
