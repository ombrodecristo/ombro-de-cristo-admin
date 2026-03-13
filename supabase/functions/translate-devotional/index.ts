import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";
import { corsHeaders } from "../_shared/cors.ts";

const DEEPL_AUTH_KEY = Deno.env.get("DEEPL_AUTH_KEY");
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

serve(async req => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let translation_id: string | null = null;

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      throw new Error("Request payload is missing 'record' property.");
    }

    translation_id = record.id;

    const {
      original_title,
      original_content,
      original_language_code,
      target_language_code,
    } = record;

    if (!DEEPL_AUTH_KEY) {
      throw new Error("DeepL API key is not set.");
    }
    if (
      !translation_id ||
      !original_title ||
      !original_content ||
      !original_language_code ||
      !target_language_code
    ) {
      throw new Error("Missing required fields in payload record.");
    }

    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `DeepL-Auth-Key ${DEEPL_AUTH_KEY}`,
      },
      body: JSON.stringify({
        text: [original_title, original_content],
        target_lang: target_language_code.toUpperCase(),
        source_lang: original_language_code.toUpperCase(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepL API error: ${response.status} ${errorText}`);
    }

    const { translations } = await response.json();
    const [translatedTitle, translatedContent] = translations;

    const { error: updateError } = await supabaseClient
      .from("devotional_translations")
      .update({
        title: translatedTitle.text,
        content: translatedContent.text,
        status: "completed",
      })
      .eq("id", translation_id);

    if (updateError) {
      throw updateError;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error(`Error processing translation for ID ${translation_id}:`, e);

    if (translation_id) {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_KEY") ?? ""
      );
      await supabaseAdmin
        .from("devotional_translations")
        .update({
          status: "error",
          content: `Translation failed: ${errorMessage.substring(0, 500)}`,
        })
        .eq("id", translation_id);
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
