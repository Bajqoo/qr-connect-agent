import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const providerEmail = Deno.env.get("NEXT_ESIM_EMAIL") ?? Deno.env.get("GLOESIM_EMAIL");
const providerPassword = Deno.env.get("NEXT_ESIM_PASSWORD") ?? Deno.env.get("GLOESIM_PASSWORD");
const providerBaseUrl = (Deno.env.get("NEXT_ESIM_BASE_URL") ?? "https://esimcard.com/api/").replace(/\/+$/, "");

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  if (!providerEmail || !providerPassword) {
    throw new Error("Next eSIM credentials are not configured.");
  }

  const response = await fetch(`${providerBaseUrl}/developer/reseller/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: providerEmail,
      password: providerPassword,
    }),
  });

  const payload = await response.json().catch(() => null);
  const token = payload?.access_token ?? payload?.token ?? payload?.data?.access_token ?? null;

  if (!response.ok || !payload?.status || !token) {
    console.error("Provider login failed", payload);
    throw new Error("Unable to authenticate with the Next eSIM API.");
  }

  cachedToken = token;
  tokenExpiresAt = Date.now() + 45 * 60 * 1000;
  return token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const countryId = String(body?.countryId ?? "134");
    const token = await getAccessToken();

    const response = await fetch(
      `${providerBaseUrl}/developer/reseller/packages/country/${encodeURIComponent(countryId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.status) {
      console.error("Provider package fetch failed", payload);
      return new Response(JSON.stringify({ error: "Unable to load country packages." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        countryId,
        packages: payload?.data ?? [],
        data: payload?.data ?? [],
        meta: payload?.meta ?? null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("next-esim-packages failed", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
