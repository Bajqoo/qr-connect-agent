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
    const body = await req.json();
    const {
      customer_email,
      customer_name,
      product_id,
      product_name,
      price,
      currency = "EUR",
      referral_code,
      device_id,
    } = body;

    if (!customer_email || !price) {
      return new Response(
        JSON.stringify({ error: "customer_email and price are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log("[create-order] Received referral_code:", referral_code, "device_id:", device_id);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("cf-connecting-ip") ??
      null;

    let agentId: string | null = null;
    let finalReferralCode = referral_code ? referral_code.toUpperCase().trim() : null;
    const COMMISSION_AMOUNT = 4.0;

    // 1. Try to find agent by referral_code
    if (finalReferralCode) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("referral_code", finalReferralCode)
        .single();

      console.log("[create-order] Agent lookup by referral_code:", finalReferralCode, "→ found:", profile?.id || "NONE");

      if (profile) {
        agentId = profile.id;
      }
    }

    // 2. Fallback: match by IP + device_id from recent clicks (last 24h)
    if (!agentId && (ipAddress || device_id)) {
      let query = supabase
        .from("referral_clicks")
        .select("agent_id, referral_code")
        .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order("created_at", { ascending: false })
        .limit(1);

      if (device_id) {
        query = query.eq("device_id", device_id);
      } else if (ipAddress) {
        query = query.eq("ip_address", ipAddress);
      }

      const { data: recentClick } = await query.single();

      if (recentClick) {
        agentId = recentClick.agent_id;
        finalReferralCode = finalReferralCode || recentClick.referral_code;
      }
    }

    console.log("[create-order] Final agent_id:", agentId, "referral_code:", finalReferralCode);

    // 3. Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_email,
        customer_name: customer_name || null,
        product_id: product_id || null,
        product_name: product_name || null,
        price,
        currency,
        agent_id: agentId,
        referral_code: finalReferralCode,
        device_id: device_id || null,
        ip_address: ipAddress,
        commission: agentId ? COMMISSION_AMOUNT : 0,
        status: "completed",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation failed", orderError);
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 4. Create commission if agent attributed
    if (agentId && order) {
      const { error: commError } = await supabase
        .from("commissions")
        .insert({
          agent_id: agentId,
          order_id: order.id,
          amount: COMMISSION_AMOUNT,
          currency,
          status: "pending",
        });

      if (commError) {
        console.error("Commission creation failed", commError);
      }

      // Also check if agent has a manager - give manager cut
      const { data: managerLink } = await supabase
        .from("manager_agents")
        .select("manager_id")
        .eq("agent_id", agentId)
        .single();

      if (managerLink) {
        // Get agent's manager_cut value
        const { data: agentProfile } = await supabase
          .from("profiles")
          .select("manager_cut")
          .eq("id", agentId)
          .single();

        const managerCut = agentProfile?.manager_cut || 1.0;

        const { error: managerCommError } = await supabase
          .from("commissions")
          .insert({
            agent_id: managerLink.manager_id,
            order_id: order.id,
            amount: managerCut,
            currency,
            status: "pending",
          });

        if (managerCommError) {
          console.error("Manager commission failed", managerCommError);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, order_id: order.id, agent_attributed: !!agentId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("create-order error", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
