import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PublicFooter } from "@/components/PublicFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoRed from "@/assets/logo-red.png";

export default function Terms() {
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
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: March 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using the Next eSIM platform, you agree to be bound by these Terms of Service.</p>

        <h2>2. Agent Responsibilities</h2>
        <p>As an agent, you agree to promote Next eSIM products honestly and transparently. Fraudulent activity will result in account termination and forfeiture of unpaid commissions.</p>

        <h2>3. Commissions</h2>
        <p>Commissions are earned on valid sales tracked through your unique referral code. Payment is processed according to the payout schedule outlined in your dashboard.</p>

        <h2>4. Intellectual Property</h2>
        <p>All branding, logos, and platform content are the property of Next eSIM. Agents may use provided marketing materials only for promotion purposes.</p>

        <h2>5. Termination</h2>
        <p>We reserve the right to suspend or terminate any account that violates these terms or engages in fraudulent activity.</p>

        <h2>6. Contact</h2>
        <p>For questions regarding these terms, please contact us at <a href="mailto:info@nextesim.app">info@nextesim.app</a>.</p>
      </main>

      <PublicFooter />
    </div>
  );
}
