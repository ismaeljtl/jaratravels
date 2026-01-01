import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { texts, targetLanguage, sourceLanguage = 'pt' } = await req.json();

    if (!texts || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: texts and targetLanguage' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build the translation prompt
    const textsToTranslate = Array.isArray(texts) ? texts : [texts];
    const textsJson = JSON.stringify(textsToTranslate);

    const systemPrompt = `You are a professional translator. Translate the provided texts from ${sourceLanguage} to ${targetLanguage}. 
    
Rules:
- Maintain the exact same structure and format
- Keep proper nouns, brand names (like "JaraTravels", "GetYourGuide", "MBWay", "PayPal"), and technical terms as they are
- Preserve any HTML or special characters
- Return ONLY a valid JSON array with the translated texts in the same order
- Do not add any explanation or extra text, just the JSON array`;

    const response = await fetch(AI_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Translate these texts to ${targetLanguage}:\n${textsJson}` }
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const translatedContent = data.choices?.[0]?.message?.content;

    if (!translatedContent) {
      throw new Error('No translation received');
    }

    // Parse the JSON array from the response
    let translations: string[];
    try {
      // Clean up the response - remove markdown code blocks if present
      let cleanContent = translatedContent.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      translations = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse translation response:', translatedContent);
      throw new Error('Invalid translation format');
    }

    return new Response(
      JSON.stringify({ translations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Translation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Translation failed';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
