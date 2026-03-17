import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const baseUrl =
      Deno.env.get("NEXT_ESIM_BASE_URL") || "https://esimcard.com/api/";
    const email =
      Deno.env.get("NEXT_ESIM_EMAIL") || Deno.env.get("GLOESIM_EMAIL");
    const password =
      Deno.env.get("NEXT_ESIM_PASSWORD") || Deno.env.get("GLOESIM_PASSWORD");

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "eSIM API credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse optional query params
    const url = new URL(req.url);
    const country = url.searchParams.get("country") || "turkey";

    // Step 1: Authenticate with the eSIM provider
    const loginRes = await fetch(`${baseUrl}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      const errText = await loginRes.text();
      console.error("Login failed:", loginRes.status, errText);
      return new Response(
        JSON.stringify({ error: "eSIM provider authentication failed" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const loginData = await loginRes.json();
    const token = loginData.token || loginData.access_token || loginData.data?.token;

    if (!token) {
      console.error("No token in login response:", JSON.stringify(loginData));
      return new Response(
        JSON.stringify({ error: "Could not obtain API token" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Fetch packages for the requested country
    const packagesRes = await fetch(
      `${baseUrl}packages?country=${encodeURIComponent(country)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!packagesRes.ok) {
      const errText = await packagesRes.text();
      console.error("Packages fetch failed:", packagesRes.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch eSIM packages" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const packagesData = await packagesRes.json();

    return new Response(JSON.stringify(packagesData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
