import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PublicFooter } from "@/components/PublicFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoRed from "@/assets/logo-red.png";

export default function Privacy() {
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

      <main className="flex-1 max-w-3xl mx-auto px-5 py-16 prose prose-neutral dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: March 2026</p>

        <h2>1. Information We Collect</h2>
        <p>We collect personal information you provide during registration (name, email, phone) and usage data including referral scans and sales activity.</p>

        <h2>2. How We Use Your Data</h2>
        <p>Your data is used to operate the platform, track commissions, prevent fraud, and improve our services. We do not sell your personal data to third parties.</p>

        <h2>3. Data Security</h2>
        <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest.</p>

        <h2>4. Cookies</h2>
        <p>We use essential cookies for authentication and session management. No third-party tracking cookies are used.</p>

        <h2>5. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>

        <h2>6. Contact</h2>
        <p>For privacy-related inquiries, contact us at <a href="mailto:info@nextesim.app">info@nextesim.app</a>.</p>
      </main>

      <PublicFooter />
    </div>
  );
}
