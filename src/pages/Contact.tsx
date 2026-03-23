import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicFooter } from "@/components/PublicFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoRed from "@/assets/logo-red.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/"><img src={logoRed} alt="Next eSIM" className="h-14" /></Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link to="/register">
              <Button size="sm" className="gradient-primary border-0 text-primary-foreground hover:opacity-90">Become an Agent</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-5 py-16">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="space-y-6 text-muted-foreground">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Email</p>
              <a href="mailto:info@nextesim.app" className="hover:text-primary transition-colors">info@nextesim.app</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Location</p>
              <p>Prishtinë, Kosovë 🇽🇰</p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
