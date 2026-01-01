import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingData {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  date: string;
  participants: string;
  paymentMethod: string;
  message?: string;
}

// Rate limiting: track requests per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Input validation
function validateBookingData(data: unknown): { valid: boolean; error?: string; booking?: BookingData } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const booking = data as Record<string, unknown>;

  // Required fields validation
  const requiredFields = ['name', 'email', 'phone', 'serviceName', 'servicePrice', 'serviceDuration', 'date', 'participants', 'paymentMethod'];
  for (const field of requiredFields) {
    if (!booking[field] || typeof booking[field] !== 'string') {
      return { valid: false, error: `Missing or invalid field: ${field}` };
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(booking.email as string)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Phone validation (basic)
  const phone = (booking.phone as string).replace(/\s/g, '');
  if (phone.length < 9 || phone.length > 20) {
    return { valid: false, error: 'Invalid phone number' };
  }

  // String length limits
  const maxLengths: Record<string, number> = {
    name: 100,
    email: 255,
    phone: 20,
    serviceName: 200,
    servicePrice: 50,
    serviceDuration: 50,
    date: 50,
    participants: 10,
    paymentMethod: 50,
    message: 1000
  };

  for (const [field, maxLen] of Object.entries(maxLengths)) {
    const value = booking[field];
    if (value && typeof value === 'string' && value.length > maxLen) {
      return { valid: false, error: `Field ${field} exceeds maximum length of ${maxLen}` };
    }
  }

  // Payment method validation
  const validPaymentMethods = ['mbway', 'bank-transfer', 'paypal'];
  if (!validPaymentMethods.includes(booking.paymentMethod as string)) {
    return { valid: false, error: 'Invalid payment method' };
  }

  return { 
    valid: true, 
    booking: {
      name: (booking.name as string).trim(),
      email: (booking.email as string).trim().toLowerCase(),
      phone: (booking.phone as string).trim(),
      serviceName: (booking.serviceName as string).trim(),
      servicePrice: (booking.servicePrice as string).trim(),
      serviceDuration: (booking.serviceDuration as string).trim(),
      date: (booking.date as string).trim(),
      participants: (booking.participants as string).trim(),
      paymentMethod: (booking.paymentMethod as string).trim(),
      message: booking.message ? (booking.message as string).trim() : undefined
    }
  };
}

const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case "mbway": return "MBWay";
    case "bank-transfer": return "Transferência Bancária";
    case "paypal": return "PayPal";
    default: return escapeHtml(method);
  }
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received booking notification request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST method
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse and validate input
    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const validation = validateBookingData(rawData);
    if (!validation.valid || !validation.booking) {
      console.warn("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const booking = validation.booking;
    console.log("Booking validated for:", booking.email);

    const formattedDate = new Date(booking.date).toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    // Escape all user inputs for HTML
    const safeName = escapeHtml(booking.name);
    const safeEmail = escapeHtml(booking.email);
    const safePhone = escapeHtml(booking.phone);
    const safeServiceName = escapeHtml(booking.serviceName);
    const safeServicePrice = escapeHtml(booking.servicePrice);
    const safeServiceDuration = escapeHtml(booking.serviceDuration);
    const safeParticipants = escapeHtml(booking.participants);
    const safeMessage = booking.message ? escapeHtml(booking.message) : '';

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          🎉 Nova Reserva Recebida!
        </h1>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #334155;">Detalhes do Cliente</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Telefone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #334155;">Detalhes da Reserva</h2>
          <p><strong>Serviço:</strong> ${safeServiceName}</p>
          <p><strong>Preço:</strong> ${safeServicePrice}</p>
          <p><strong>Duração:</strong> ${safeServiceDuration}</p>
          <p><strong>Data:</strong> ${escapeHtml(formattedDate)}</p>
          <p><strong>Participantes:</strong> ${safeParticipants} pessoa(s)</p>
          <p><strong>Método de Pagamento:</strong> ${getPaymentMethodLabel(booking.paymentMethod)}</p>
        </div>
        
        ${safeMessage ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #92400e;">Mensagem do Cliente</h2>
          <p>${safeMessage}</p>
        </div>
        ` : ''}
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; color: #1e40af;">
            <strong>Próximos passos:</strong> Confirma a disponibilidade e responde ao cliente por email ou telefone.
          </p>
        </div>
        
        <p style="color: #64748b; font-size: 12px; margin-top: 30px; text-align: center;">
          Este email foi enviado automaticamente pelo sistema de reservas da JaraTravels.
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "JaraTravels Reservas <onboarding@resend.dev>",
        to: ["jaratravels@hotmail.com"],
        subject: `Nova Reserva: ${safeServiceName} - ${safeName}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to process booking. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data = await res.json();
    console.log("Email sent successfully for booking:", booking.email);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
