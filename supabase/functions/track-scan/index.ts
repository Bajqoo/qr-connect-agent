import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const referralCode = body?.referral_code;
    const deviceId = body?.device_id;

    if (!referralCode || typeof referralCode !== "string") {
      return new Response(
        JSON.stringify({ error: "referral_code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Use service role to bypass RLS for public tracking
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find agent by referral code
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, referral_code")
      .eq("referral_code", referralCode)
      .single();

    if (!profile) {
      return new Response(
        JSON.stringify({ error: "Invalid referral code" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("cf-connecting-ip") ??
      null;
    const userAgent = req.headers.get("user-agent") ?? null;
    const country = body?.country ?? null;

    // Insert into referral_clicks (detailed tracking)
    const { error: clickError } = await supabase.from("referral_clicks").insert({
      referral_code: referralCode,
      agent_id: profile.id,
      device_id: deviceId || null,
      ip_address: ipAddress,
      user_agent: userAgent,
      country,
    });

    if (clickError) {
      console.error("Insert click failed", clickError);
    }

    // Also insert into referral_scans for backward compatibility
    const { error: scanError } = await supabase.from("referral_scans").insert({
      referral_code: referralCode,
      country,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (scanError) {
      console.error("Insert scan failed", scanError);
    }

    return new Response(
      JSON.stringify({ success: true, agent_id: profile.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("track-scan error", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
