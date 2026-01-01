import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// The site key is public by design - it's meant to be visible in frontend code
const TURNSTILE_SITE_KEY = Deno.env.get("TURNSTILE_SITE_KEY");

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  return new Response(
    JSON.stringify({ siteKey: TURNSTILE_SITE_KEY || "" }),
    { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
  );
};

serve(handler);
