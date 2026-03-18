import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Clock, Shield, Zap, CheckCircle2, Globe, CreditCard, Lock, ArrowLeft, Loader2, Download, Copy, AlertCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";

type Step = "landing" | "checkout" | "processing" | "success";

interface EsimPackage {
  id: string;
  name: string;
  data: string;
  duration: string;
  price: number;
  currency: string;
  country: string;
}

// Generate or retrieve a persistent device fingerprint
function getDeviceId(): string {
  let deviceId = localStorage.getItem("device_id");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("device_id", deviceId);
  }
  return deviceId;
}

export default function CustomerLanding() {
  const { refCode } = useParams();
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>("landing");
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvc: "" });
  const [packages, setPackages] = useState<EsimPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<EsimPackage | null>(null);

  // Persist referral code in localStorage + cookie
  useEffect(() => {
    if (!refCode) return;

    // Store in localStorage
    localStorage.setItem("referral_code", refCode);

    // Store in cookie as fallback (30 days)
    document.cookie = `referral_code=${refCode}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
  }, [refCode]);

  useEffect(() => {
    fetchPackages();
  }, []);

  // Track referral scan with device fingerprint
  useEffect(() => {
    if (!refCode) return;
    const deviceId = getDeviceId();
    supabase.functions.invoke("track-scan", {
      body: { referral_code: refCode, device_id: deviceId },
    }).catch(() => {});
  }, [refCode]);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("next-esim-packages", {
        body: null,
      });

      if (fnError) {
        console.error("Edge function error:", fnError);
        setError("Failed to load eSIM packages. Please try again.");
        return;
      }

      // Normalize the response - the API may return packages in different shapes
      const rawPackages = Array.isArray(data) ? data : data?.packages || data?.data || [];
      
      const normalized: EsimPackage[] = rawPackages.map((pkg: any, i: number) => ({
        id: pkg.id || pkg.package_id || `pkg-${i}`,
        name: pkg.name || pkg.title || `Turkey eSIM ${i + 1}`,
        data: pkg.data || pkg.data_amount || pkg.description || "Unlimited",
        duration: pkg.duration || pkg.validity || pkg.days ? `${pkg.days || 7} days` : "7 days",
        price: pkg.price || pkg.retail_price || pkg.amount || 0,
        currency: pkg.currency || "EUR",
        country: pkg.country || "Turkey",
      }));

      setPackages(normalized);
      if (normalized.length > 0) {
        setSelectedPkg(normalized[0]);
      }
    } catch (err: any) {
      console.error("Fetch packages error:", err);
      setError(err.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Zap, title: t("instantActivation"), desc: t("readyIn2Min") },
    { icon: Wifi, title: t("unlimitedDataFeature"), desc: t("noSpeedLimits") },
    { icon: Clock, title: t("sevenDayCoverage"), desc: t("fullWeekAccess") },
    { icon: Shield, title: t("secureConnection"), desc: t("encryptedPrivate") },
  ];

  const handleCheckout = () => setStep("checkout");

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    // Get referral code from state, localStorage, or cookie
    const storedRef =
      refCode ||
      localStorage.getItem("referral_code") ||
      document.cookie.match(/referral_code=([^;]+)/)?.[1] ||
      null;

    const deviceId = getDeviceId();

    try {
      await supabase.functions.invoke("create-order", {
        body: {
          customer_email: form.email,
          customer_name: form.name,
          product_id: selectedPkg?.id || "default",
          product_name: selectedPkg?.name || "Turkey eSIM",
          price: selectedPkg?.price || 19.90,
          currency: selectedPkg?.currency || "EUR",
          referral_code: storedRef,
          device_id: deviceId,
        },
      });
    } catch (err) {
      console.error("Order creation failed:", err);
    }

    setTimeout(() => setStep("success"), 1500);
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

  const displayPrice = selectedPkg ? `€${selectedPkg.price.toFixed(2)}` : "€19.90";
  const displayName = selectedPkg?.name || t("turkeyUnlimited");
  const displayDuration = selectedPkg?.duration || t("sevenDayPlan");

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(220, 20%, 10%) 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.2
        }}
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03] pointer-events-none" />
        <div className="max-w-lg mx-auto px-5 pt-8 pb-8">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher variant="outline" />
          </div>
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
                  {t("turkeyEsim")}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  {t("unlimitedInternet")}
                  <br />
                  <span className="text-primary">{t("inTurkey")}</span>
                </h1>
                <p className="text-muted-foreground text-base mb-8">
                  {t("activateEsim")}
                </p>

                {loading && (
                  <div className="flex flex-col items-center py-12">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
                    <p className="text-sm text-muted-foreground">Loading eSIM packages…</p>
                  </div>
                )}

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 mb-6 text-center">
                    <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
                    <p className="text-sm text-destructive font-medium mb-3">{error}</p>
                    <Button size="sm" variant="outline" onClick={fetchPackages}>
                      Try again
                    </Button>
                  </div>
                )}

                {!loading && !error && packages.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`bg-card rounded-xl border p-5 cursor-pointer transition-all ${
                          selectedPkg?.id === pkg.id
                            ? "border-primary ring-2 ring-primary/20 shadow-elevated"
                            : "hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-left">
                            <h3 className="font-semibold text-base">{pkg.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {pkg.data} · {pkg.duration}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              €{pkg.price.toFixed(2)}
                            </div>
                            <p className="text-xs text-muted-foreground">{t("oneTime")}</p>
                          </div>
                        </div>

                        {selectedPkg?.id === pkg.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 mb-4 pt-3 border-t">
                              {[t("unlimitedData"), t("worksAllPhones"), t("support247"), t("instantQR")].map((item) => (
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
                              {t("buyNow")} — €{pkg.price.toFixed(2)}
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {!loading && !error && packages.length === 0 && (
                  <div className="bg-card rounded-xl border shadow-elevated p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">{t("turkeyUnlimited")}</h3>
                        <p className="text-sm text-muted-foreground">{t("sevenDayPlan")}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">€19.90</div>
                        <p className="text-xs text-muted-foreground">{t("oneTime")}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-6">
                      {[t("unlimitedData"), t("worksAllPhones"), t("support247"), t("instantQR")].map((item) => (
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
                      {t("buyNow")} — €19.90
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {features.map((f, i) => (
                    <motion.div
                      key={i}
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
                  {t("back")}
                </button>

                <div className="bg-card rounded-xl border shadow-elevated p-6 mb-4">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <div>
                      <h3 className="font-semibold">{displayName}</h3>
                      <p className="text-sm text-muted-foreground">{displayDuration}</p>
                    </div>
                    <div className="text-xl font-bold text-primary">{displayPrice}</div>
                  </div>

                  <h2 className="text-lg font-bold mb-4">{t("paymentDetails")}</h2>

                  <form onSubmit={handlePay} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("fullName")}</label>
                      <Input
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("email")}</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("cardNumber")}</label>
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
                        <label className="text-sm font-medium">{t("expiry")}</label>
                        <Input
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t("cvc")}</label>
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
                      {t("pay")} {displayPrice}
                    </Button>
                  </form>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    {t("securePayment")}
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
                <h2 className="text-xl font-bold mb-2">{t("processingPayment")}</h2>
                <p className="text-muted-foreground text-sm">{t("pleaseWait")}</p>
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
                <h2 className="text-2xl font-bold mb-2">{t("paymentSuccessful")}</h2>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  {t("esimReady")}
                </p>

                <div className="bg-card rounded-xl border shadow-elevated p-6 max-w-sm mx-auto mb-6">
                  <h3 className="font-semibold mb-4">{t("yourEsimQR")}</h3>
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
                        toast.success(t("activationCodeCopied"));
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1.5" />
                      {t("copyCode")}
                    </Button>
                    <Button
                      size="sm"
                      className="gradient-primary border-0 text-primary-foreground hover:opacity-90"
                      onClick={() => toast.success(t("qrDownloaded"))}
                    >
                      <Download className="h-4 w-4 mr-1.5" />
                      {t("saveQR")}
                    </Button>
                  </div>

                  <div className="border-t pt-4 mt-2 space-y-2 text-sm text-left">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("plan")}</span>
                      <span className="font-medium">{displayName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("duration")}</span>
                      <span className="font-medium">{displayDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("amountPaid")}</span>
                      <span className="font-bold text-primary">{displayPrice}</span>
                    </div>
                    {refCode && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("agentRef")}</span>
                        <span className="font-medium">{refCode}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-card rounded-xl border p-5 max-w-sm mx-auto text-left">
                  <h4 className="font-semibold text-sm mb-3">{t("howToInstall")}</h4>
                  <div className="space-y-2.5">
                    {[t("installStep1"), t("installStep2"), t("installStep3"), t("installStep4")].map((text, i) => (
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
                  {t("confirmationSentTo")} <span className="font-medium text-foreground">{form.email}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-muted-foreground mt-8">
            © {new Date().getFullYear()} Next eSIM. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </div>
  );
}
