import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardQRCode() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("id, referral_code")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) setReferralCode(data.referral_code ?? data.id);
      });
  }, [user]);

  const referralUrl = `https://www.nextesim.app/countries/134/?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    toast.success(t("referralLinkCopied"));
  };

  const downloadQR = () => {
    const svg = document.querySelector("#agent-qr svg") as SVGElement;
    if (!svg) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      const link = document.createElement("a");
      link.download = `next-esim-qr-${referralCode}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      URL.revokeObjectURL(url);
      toast.success(t("qrCodeDownloaded"));
    };
    img.src = url;
  };

  if (!referralCode) {
    return (
      <DashboardLayout type="agent">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">{t("loading")}...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="agent">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("yourQRCode")}</h2>
          <p className="text-sm text-muted-foreground">{t("shareQRCode")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-lg border bg-card shadow-card p-5 sm:p-8 flex flex-col items-center">
            <div id="agent-qr" className="bg-card p-3 sm:p-4 rounded-xl border mb-4 sm:mb-6">
              <QRCodeSVG
                value={referralUrl}
                size={160}
                level="H"
                bgColor="transparent"
                fgColor="hsl(220, 20%, 10%)"
                className="sm:w-[200px] sm:h-[200px]"
              />
            </div>
            <p className="text-sm font-medium mb-1">{t("yourReferralCode")}</p>
            <p className="text-lg font-bold text-primary mb-4 font-mono">{referralCode}</p>
            <Button onClick={downloadQR} size="sm" className="w-full max-w-xs gradient-primary border-0 text-primary-foreground hover:opacity-90">
              <Download className="h-4 w-4 mr-1.5" />
              PNG
            </Button>
          </div>

          <div className="rounded-lg border bg-card shadow-card p-5 sm:p-8">
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t("referralLink")}</h3>
            <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-muted mb-3 sm:mb-4">
              <code className="text-xs sm:text-sm flex-1 truncate">{referralUrl}</code>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={copyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(referralUrl, "_blank")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("previewLandingPage")}
            </Button>

            <div className="mt-6 sm:mt-8">
              <h4 className="font-medium mb-3 text-sm">{t("howItWorks")}</h4>
              <div className="space-y-2.5 sm:space-y-3">
                {[t("qrStep1"), t("qrStep2"), t("qrStep3"), t("qrStep4")].map((text, i) => (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] sm:text-xs font-bold text-primary-foreground">{i + 1}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
