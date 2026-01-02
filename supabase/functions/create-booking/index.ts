import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  date: string;
  participants: number;
  paymentMethod: string;
  message?: string;
  turnstileToken: string;
}

function isValidIp(ip: string | null | undefined): ip is string {
  if (!ip) return false;
  const v = ip.trim();

  // IPv4
  const parts = v.split(".");
  if (parts.length === 4) {
    const ok = parts.every((p) => {
      if (!/^\d+$/.test(p)) return false;
      const n = Number(p);
      return n >= 0 && n <= 255;
    });
    if (ok) return true;
  }

  // Basic IPv6 check
  if (v.includes(":") && /^[0-9a-fA-F:]+$/.test(v)) return true;

  return false;
}

async function verifyTurnstile(token: string, ip?: string | null): Promise<boolean> {
  const secretKey = Deno.env.get('TURNSTILE_SECRET_KEY');

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    return false;
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    // remoteip is optional; sending an invalid value can make verification fail
    if (isValidIp(ip)) {
      params.set('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const result = await response.json();
    const errorCodes = result?.['error-codes'] ?? result?.error_codes;

    console.log('Turnstile verification:', {
      success: result?.success === true,
      errorCodes,
      hasIp: isValidIp(ip),
    });

    return result?.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: BookingRequest = await req.json();
    const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const cfIp = req.headers.get('cf-connecting-ip')?.trim();
    const clientIP = isValidIp(forwardedFor) ? forwardedFor : (isValidIp(cfIp) ? cfIp : null);

    console.log('Booking request received for:', body.email);

    // 1. Validate required fields
    if (!body.name || !body.email || !body.phone || !body.serviceName || 
        !body.date || !body.participants || !body.paymentMethod) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.error('Invalid email format');
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validate input lengths
    if (body.name.length > 100 || body.email.length > 255 || body.phone.length > 20) {
      console.error('Input too long');
      return new Response(
        JSON.stringify({ error: 'Input too long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Verify Turnstile token
    if (!body.turnstileToken) {
      console.error('Missing Turnstile token');
      return new Response(
        JSON.stringify({ error: 'Please complete the security verification' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isTurnstileValid = await verifyTurnstile(body.turnstileToken, clientIP);
    if (!isTurnstileValid) {
      console.error('Turnstile verification failed');
      return new Response(
        JSON.stringify({ error: 'Security verification failed. Please try again.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Check rate limit
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .rpc('check_rate_limit', {
        p_identifier: body.email,
        p_action: 'booking',
        p_max_attempts: 5,
        p_window_minutes: 60
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    if (rateLimitData && !rateLimitData.allowed) {
      const retryMinutes = Math.ceil((rateLimitData.retry_after || 3600) / 60);
      console.error('Rate limit exceeded for:', body.email);
      return new Response(
        JSON.stringify({ 
          error: `Too many attempts. Please wait ${retryMinutes} minutes before trying again.`,
          retry_after: rateLimitData.retry_after
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 6. Insert booking using service role (bypasses RLS)
    const bookingId = crypto.randomUUID();
    
    const { error: insertError } = await supabase
      .from('bookings')
      .insert({
        id: bookingId,
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        service_name: body.serviceName,
        service_price: body.servicePrice,
        service_duration: body.serviceDuration,
        booking_date: body.date,
        participants: body.participants,
        payment_method: body.paymentMethod,
        message: body.message?.trim() || null,
      });

    if (insertError) {
      console.error('Error inserting booking:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create booking' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Booking created successfully:', bookingId);

    // 7. Send email notification (non-blocking)
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      const adminEmail = Deno.env.get('ADMIN_EMAIL');
      
      if (resendApiKey && adminEmail) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Seixal Tours <bookings@seixaltours.pt>',
            to: [adminEmail],
            subject: `Nova Reserva: ${body.serviceName}`,
            html: `
              <h2>Nova Reserva Recebida</h2>
              <p><strong>Nome:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Telefone:</strong> ${body.phone}</p>
              <p><strong>Serviço:</strong> ${body.serviceName}</p>
              <p><strong>Preço:</strong> ${body.servicePrice}</p>
              <p><strong>Data:</strong> ${body.date}</p>
              <p><strong>Participantes:</strong> ${body.participants}</p>
              <p><strong>Método de Pagamento:</strong> ${body.paymentMethod}</p>
              ${body.message ? `<p><strong>Mensagem:</strong> ${body.message}</p>` : ''}
            `,
          }),
        });
        console.log('Email notification sent');
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the booking if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        bookingId,
        message: 'Booking created successfully' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
