import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Clock, Shield, Zap, CheckCircle2, Globe, CreditCard, Lock, ArrowLeft, Loader2, Download, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const features = [
  { icon: Zap, title: "Instant Activation", desc: "Ready in 2 minutes" },
  { icon: Wifi, title: "Unlimited Data", desc: "No speed limits" },
  { icon: Clock, title: "7-Day Coverage", desc: "Full week access" },
  { icon: Shield, title: "Secure Connection", desc: "Encrypted & private" },
];

type Step = "landing" | "checkout" | "processing" | "success";

export default function CustomerLanding() {
  const { refCode } = useParams();
  const [step, setStep] = useState<Step>("landing");
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvc: "" });

  const handleCheckout = () => setStep("checkout");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => setStep("success"), 2500);
  };

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Dotted grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(220, 20%, 10%) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.08
        }}
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03] pointer-events-none" />
        <div className="max-w-lg mx-auto px-5 pt-12 pb-8">
          <AnimatePresence mode="wait">
            {step === "landing" && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-6">
                  <Globe className="h-3.5 w-3.5" />
                  Turkey eSIM
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Unlimited Internet
                  <br />
                  <span className="text-primary">in Turkey</span>
                </h1>
                <p className="text-muted-foreground text-base mb-8">
                  Activate your eSIM in 2 minutes. No physical SIM needed.
                </p>

                {/* Price card */}
                <div className="bg-card rounded-xl border shadow-elevated p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">Turkey Unlimited</h3>
                      <p className="text-sm text-muted-foreground">7-day plan</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">€19.90</div>
                      <p className="text-xs text-muted-foreground">one-time</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    {["Unlimited high-speed data", "Works on all eSIM phones", "24/7 customer support", "Instant QR code delivery"].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full h-12 text-base font-semibold gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Buy Now — €19.90
                  </Button>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3">
                  {features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="bg-card rounded-lg border p-4 text-left"
                    >
                      <f.icon className="h-5 w-5 text-primary mb-2" />
                      <div className="text-sm font-medium">{f.title}</div>
                      <div className="text-xs text-muted-foreground">{f.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {refCode && (
                  <p className="text-xs text-muted-foreground mt-6">
                    Ref: <span className="font-medium text-foreground">{refCode}</span>
                  </p>
                )}
              </motion.div>
            )}

            {step === "checkout" && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <button
                  onClick={() => setStep("landing")}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <div className="bg-card rounded-xl border shadow-elevated p-6 mb-4">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <div>
                      <h3 className="font-semibold">Turkey Unlimited</h3>
                      <p className="text-sm text-muted-foreground">7-day plan</p>
                    </div>
                    <div className="text-xl font-bold text-primary">€19.90</div>
                  </div>

                  <h2 className="text-lg font-bold mb-4">Payment Details</h2>

                  <form onSubmit={handlePay} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <div className="relative">
                        <Input
                          placeholder="4242 4242 4242 4242"
                          value={form.card}
                          onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
                          required
                          className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry</label>
                        <Input
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVC</label>
                        <Input
                          placeholder="123"
                          value={form.cvc}
                          onChange={(e) => setForm({ ...form, cvc: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity mt-2"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Pay €19.90
                    </Button>
                  </form>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Secure payment · SSL encrypted
                  </div>
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
                <h2 className="text-xl font-bold mb-2">Processing Payment</h2>
                <p className="text-muted-foreground text-sm">Please wait while we confirm your payment...</p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Your eSIM is ready. Scan the QR code below with your phone camera to install it.
                </p>

                {/* eSIM QR Code */}
                <div className="bg-card rounded-xl border shadow-elevated p-6 max-w-sm mx-auto mb-6">
                  <h3 className="font-semibold mb-4">Your eSIM QR Code</h3>
                  <div className="bg-background p-4 rounded-xl border inline-block mb-4">
                    <QRCodeSVG
                      value={`LPA:1$esim.nextesim.app$MOCK-${Date.now().toString(36).toUpperCase()}`}
                      size={200}
                      level="H"
                      bgColor="transparent"
                      fgColor="hsl(220, 20%, 10%)"
                    />
                  </div>
                  <div className="flex gap-2 justify-center mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(`LPA:1$esim.nextesim.app$MOCK-DEMO`);
                        toast.success("Activation code copied!");
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1.5" />
                      Copy Code
                    </Button>
                    <Button
                      size="sm"
                      className="gradient-primary border-0 text-primary-foreground hover:opacity-90"
                      onClick={() => toast.success("QR code downloaded!")}
                    >
                      <Download className="h-4 w-4 mr-1.5" />
                      Save QR
                    </Button>
                  </div>

                  <div className="border-t pt-4 mt-2 space-y-2 text-sm text-left">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan</span>
                      <span className="font-medium">Turkey Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">7 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Paid</span>
                      <span className="font-bold text-primary">€19.90</span>
                    </div>
                    {refCode && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Agent Ref</span>
                        <span className="font-medium">{refCode}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Installation Steps */}
                <div className="bg-card rounded-xl border p-5 max-w-sm mx-auto text-left">
                  <h4 className="font-semibold text-sm mb-3">How to Install</h4>
                  <div className="space-y-2.5">
                    {[
                      "Open Settings → Mobile Data → Add eSIM",
                      "Scan the QR code above with your camera",
                      "Confirm the eSIM installation",
                      "Turn on the eSIM when you arrive in Turkey",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="h-5 w-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-primary-foreground">{i + 1}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-6">
                  Confirmation sent to <span className="font-medium text-foreground">{form.email}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-muted-foreground mt-8">
            © {new Date().getFullYear()} Next eSIM. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
