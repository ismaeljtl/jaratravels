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
  website?: string; // Honeypot field
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

    console.log('Booking request received for:', body.email);

    // 0. Check honeypot field (spam protection)
    if (body.website && body.website.trim() !== '') {
      console.log('Honeypot triggered - likely bot submission');
      // Return success to not alert bots, but don't process
      return new Response(
        JSON.stringify({ success: true, bookingId: crypto.randomUUID() }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

    // 4. Check rate limit
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

    // 7. Send email notifications (non-blocking)
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      const adminEmail = Deno.env.get('ADMIN_EMAIL');
      
      // Payment details for customer email
      const bankIban = Deno.env.get('BANK_IBAN') || '';
      const bankHolder = Deno.env.get('BANK_HOLDER') || '';
      const bankName = Deno.env.get('BANK_NAME') || '';
      const paypalLink = Deno.env.get('PAYPAL_LINK') || '';
      
      const formattedDate = new Date(body.date).toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const getPaymentMethodLabel = (method: string) => {
        switch (method) {
          case 'bank-transfer': return 'Transferência Bancária';
          case 'paypal': return 'PayPal';
          default: return method;
        }
      };

      const getPaymentInstructions = (method: string) => {
        if (method === 'bank-transfer') {
          return `
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
              <h3 style="margin-top: 0; color: #0369a1;">💳 Dados para Transferência Bancária</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b;">IBAN:</td><td style="padding: 8px 0; font-family: monospace; font-weight: bold;">${bankIban}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Titular:</td><td style="padding: 8px 0; font-weight: bold;">${bankHolder}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Banco:</td><td style="padding: 8px 0;">${bankName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Valor:</td><td style="padding: 8px 0; font-weight: bold; color: #059669;">${body.servicePrice}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Descrição:</td><td style="padding: 8px 0;">${body.name} - ${body.serviceName}</td></tr>
              </table>
              <p style="margin-bottom: 0; font-size: 14px; color: #64748b;">⏰ Por favor efetue o pagamento nas próximas 48 horas para confirmar a sua reserva.</p>
            </div>
          `;
        } else if (method === 'paypal') {
          return `
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="margin-top: 0; color: #b45309;">💰 Pagamento via PayPal</h3>
              <p><strong>Link PayPal:</strong> <a href="${paypalLink}" style="color: #2563eb;">${paypalLink}</a></p>
              <p><strong>Valor:</strong> <span style="font-weight: bold; color: #059669;">${body.servicePrice}</span></p>
              <p><strong>Descrição:</strong> ${body.name} - ${body.serviceName}</p>
              <ol style="margin: 15px 0; padding-left: 20px; color: #64748b;">
                <li>Clique no link acima para aceder ao PayPal</li>
                <li>Insira o valor ${body.servicePrice} e adicione a descrição</li>
                <li>Após o pagamento, receberá a confirmação por email</li>
              </ol>
              <p style="margin-bottom: 0; font-size: 14px; color: #64748b;">⏰ Por favor efetue o pagamento nas próximas 48 horas para confirmar a sua reserva.</p>
            </div>
          `;
        }
        return '';
      };

      // Customer confirmation email
      const customerEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #2563eb;">
            <h1 style="color: #2563eb; margin: 0;">JaraTravels</h1>
            <p style="color: #64748b; margin: 5px 0 0 0;">Experiências Inesquecíveis</p>
          </div>
          
          <div style="padding: 30px 0;">
            <h2 style="color: #059669;">✅ Reserva Recebida com Sucesso!</h2>
            <p style="color: #334155; font-size: 16px;">Olá <strong>${body.name}</strong>,</p>
            <p style="color: #64748b;">Obrigado por escolher a JaraTravels! Recebemos a sua reserva e estamos a processá-la.</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">📋 Detalhes da Reserva</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b;">Serviço:</td><td style="padding: 8px 0; font-weight: bold;">${body.serviceName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Data:</td><td style="padding: 8px 0; font-weight: bold;">${formattedDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Participantes:</td><td style="padding: 8px 0;">${body.participants} pessoa(s)</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Duração:</td><td style="padding: 8px 0;">${body.serviceDuration}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Preço:</td><td style="padding: 8px 0; font-weight: bold; color: #059669;">${body.servicePrice}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Método de Pagamento:</td><td style="padding: 8px 0;">${getPaymentMethodLabel(body.paymentMethod)}</td></tr>
            </table>
          </div>
          
          ${getPaymentInstructions(body.paymentMethod)}
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="margin-top: 0; color: #166534;">📧 Comprovativo de Pagamento</h3>
            <p style="color: #64748b; margin-bottom: 10px;">Após efetuar o pagamento, envie o comprovativo para:</p>
            <p style="margin: 0;"><a href="mailto:jaratravels@hotmail.com" style="color: #2563eb; font-weight: bold;">jaratravels@hotmail.com</a></p>
            <p style="color: #64748b; font-size: 14px; margin-top: 10px;">Inclua o seu nome e o serviço reservado na mensagem.</p>
          </div>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">📍 Próximos Passos</h3>
            <ol style="color: #64748b; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Complete o pagamento usando o método selecionado</li>
              <li style="margin-bottom: 8px;">Envie o comprovativo para o nosso email</li>
              <li style="margin-bottom: 8px;">Entraremos em contacto para confirmar os detalhes finais</li>
              <li>Prepare-se para uma experiência inesquecível!</li>
            </ol>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0; margin-top: 30px;">
            <p style="color: #64748b; margin: 0;">Questões? Contacte-nos:</p>
            <p style="margin: 10px 0;"><a href="mailto:jaratravels@hotmail.com" style="color: #2563eb;">jaratravels@hotmail.com</a></p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
              JaraTravels - RNAAT Nº598/2025 - Turismo de Portugal<br>
              © ${new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      `;

      if (resendApiKey) {
        // Send email to customer
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'JaraTravels <onboarding@resend.dev>',
            to: [body.email],
            subject: `Confirmação de Reserva - ${body.serviceName}`,
            html: customerEmailHtml,
          }),
        });
        console.log('Customer confirmation email sent to:', body.email);

        // Send notification to admin
        if (adminEmail) {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'JaraTravels Reservas <onboarding@resend.dev>',
              to: [adminEmail],
              subject: `Nova Reserva: ${body.serviceName} - ${body.name}`,
              html: `
                <h2>Nova Reserva Recebida</h2>
                <p><strong>Nome:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Telefone:</strong> ${body.phone}</p>
                <p><strong>Serviço:</strong> ${body.serviceName}</p>
                <p><strong>Preço:</strong> ${body.servicePrice}</p>
                <p><strong>Data:</strong> ${formattedDate}</p>
                <p><strong>Participantes:</strong> ${body.participants}</p>
                <p><strong>Método de Pagamento:</strong> ${getPaymentMethodLabel(body.paymentMethod)}</p>
                ${body.message ? `<p><strong>Mensagem:</strong> ${body.message}</p>` : ''}
              `,
            }),
          });
          console.log('Admin notification email sent');
        }
      }
    } catch (emailError) {
      console.error('Failed to send email notifications:', emailError);
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
