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

const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case "mbway": return "MBWay";
    case "bank-transfer": return "Transferência Bancária";
    case "paypal": return "PayPal";
    default: return method;
  }
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received booking notification request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingData = await req.json();
    console.log("Booking data received:", booking);

    const formattedDate = new Date(booking.date).toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          🎉 Nova Reserva Recebida!
        </h1>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #334155;">Detalhes do Cliente</h2>
          <p><strong>Nome:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${booking.email}">${booking.email}</a></p>
          <p><strong>Telefone:</strong> <a href="tel:${booking.phone}">${booking.phone}</a></p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #334155;">Detalhes da Reserva</h2>
          <p><strong>Serviço:</strong> ${booking.serviceName}</p>
          <p><strong>Preço:</strong> ${booking.servicePrice}</p>
          <p><strong>Duração:</strong> ${booking.serviceDuration}</p>
          <p><strong>Data:</strong> ${formattedDate}</p>
          <p><strong>Participantes:</strong> ${booking.participants} pessoa(s)</p>
          <p><strong>Método de Pagamento:</strong> ${getPaymentMethodLabel(booking.paymentMethod)}</p>
        </div>
        
        ${booking.message ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #92400e;">Mensagem do Cliente</h2>
          <p>${booking.message}</p>
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
        subject: `Nova Reserva: ${booking.serviceName} - ${booking.name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
