import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const REFERRAL_CODE = "AGENT123";
const REFERRAL_URL = `https://nextesim.app/r/${REFERRAL_CODE}`;

export default function DashboardQRCode() {
  const copyLink = () => {
    navigator.clipboard.writeText(REFERRAL_URL);
    toast.success("Referral link copied to clipboard");
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
      link.download = `next-esim-qr-${REFERRAL_CODE}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      URL.revokeObjectURL(url);
      toast.success("QR code downloaded");
    };
    img.src = url;
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your QR Code</h2>
          <p className="text-muted-foreground">Share this QR code with customers to earn commissions.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* QR Code Card */}
          <div className="rounded-lg border bg-card shadow-card p-8 flex flex-col items-center">
            <div id="agent-qr" className="bg-card p-4 rounded-xl border mb-6">
              <QRCodeSVG
                value={REFERRAL_URL}
                size={200}
                level="H"
                bgColor="transparent"
                fgColor="hsl(220, 20%, 10%)"
              />
            </div>
            <p className="text-sm font-medium mb-1">Your Referral Code</p>
            <p className="text-lg font-bold text-primary mb-4">{REFERRAL_CODE}</p>
            <div className="flex gap-3 w-full max-w-xs">
              <Button onClick={downloadQR} className="flex-1 gradient-primary border-0 text-primary-foreground hover:opacity-90">
                <Download className="h-4 w-4 mr-2" />
                PNG
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Flyer PDF
              </Button>
            </div>
          </div>

          {/* Referral Link Card */}
          <div className="rounded-lg border bg-card shadow-card p-8">
            <h3 className="font-semibold mb-4">Referral Link</h3>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted mb-4">
              <code className="text-sm flex-1 truncate">{REFERRAL_URL}</code>
              <Button variant="ghost" size="icon" onClick={copyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full" onClick={() => window.open(REFERRAL_URL, "_blank")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Preview Landing Page
            </Button>

            <div className="mt-8">
              <h4 className="font-medium mb-3">How it works</h4>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Share your QR code or referral link with customers" },
                  { step: "2", text: "Customer scans and lands on your personalized page" },
                  { step: "3", text: "When they purchase, you earn commission automatically" },
                  { step: "4", text: "Track earnings and request payouts from your dashboard" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-foreground">{item.step}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
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
