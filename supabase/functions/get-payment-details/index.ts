import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Payment details stored securely on server side
const PAYMENT_DETAILS = {
  bankTransfer: {
    iban: Deno.env.get("BANK_IBAN") || "",
    holder: Deno.env.get("BANK_HOLDER") || "",
    bank: Deno.env.get("BANK_NAME") || "",
  },
  mbway: {
    phone: Deno.env.get("MBWAY_PHONE") || "",
  },
  paypal: {
    link: Deno.env.get("PAYPAL_LINK") || "",
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { bookingId, paymentMethod } = await req.json();

    // Validate required fields
    if (!bookingId || !paymentMethod) {
      return new Response(
        JSON.stringify({ error: "Missing booking ID or payment method" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate payment method
    const validMethods = ["bank-transfer", "paypal"];
    if (!validMethods.includes(paymentMethod)) {
      return new Response(
        JSON.stringify({ error: "Invalid payment method" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Return payment details based on method
    let paymentInfo: Record<string, string> = {};

    switch (paymentMethod) {
      case "bank-transfer":
        paymentInfo = {
          iban: PAYMENT_DETAILS.bankTransfer.iban,
          holder: PAYMENT_DETAILS.bankTransfer.holder,
          bank: PAYMENT_DETAILS.bankTransfer.bank,
        };
        break;
      case "paypal":
        paymentInfo = {
          link: PAYMENT_DETAILS.paypal.link,
        };
        break;
    }

    console.log(`Payment details requested for booking: ${bookingId}, method: ${paymentMethod}`);

    return new Response(
      JSON.stringify({ paymentInfo }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in get-payment-details function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
