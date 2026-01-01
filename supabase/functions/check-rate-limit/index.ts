import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { identifier, action = 'booking', maxAttempts = 5, windowMinutes = 60 } = await req.json();

    if (!identifier) {
      return new Response(
        JSON.stringify({ error: 'Missing identifier' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the rate limit check function
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_identifier: identifier,
      p_action: action,
      p_max_attempts: maxAttempts,
      p_window_minutes: windowMinutes
    });

    if (error) {
      console.error('Rate limit check error:', error);
      throw error;
    }

    console.log(`Rate limit check for ${identifier}: allowed=${data.allowed}, remaining=${data.remaining}`);

    return new Response(
      JSON.stringify(data),
      { 
        status: data.allowed ? 200 : 429, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: unknown) {
    console.error('Rate limit error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Rate limit check failed';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
