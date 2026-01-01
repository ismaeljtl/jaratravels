import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No authorization header provided");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // Create Supabase client with the user's token to verify auth
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Verify the user's JWT token
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: `Bearer ${token}` }
      }
    });

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      console.log("Auth error:", authError?.message || "No user found");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Authenticated user: ${user.email}`);

    // Check if user is an authorized admin (supports comma-separated emails)
    const adminEmails = Deno.env.get("ADMIN_EMAIL");
    const adminList = adminEmails ? adminEmails.split(",").map(e => e.trim().toLowerCase()) : [];
    const userEmail = user.email?.toLowerCase() || "";
    
    if (!adminList.includes(userEmail)) {
      console.log(`Access denied for user: ${user.email}. Authorized admins: ${adminList.join(", ")}`);
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin access only" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Admin access granted");

    // Use service role client for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse body for POST requests
    let body: any = {};
    if (req.method === "POST") {
      try {
        body = await req.json();
      } catch {
        body = {};
      }
    }

    const action = body.action || "fetch"; // Default action is fetch

    // POST with action: "fetch" - Fetch all bookings
    if (req.method === "POST" && action === "fetch") {
      const status = body.status;
      
      let query = supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching bookings:", error);
        return new Response(
          JSON.stringify({ error: "Failed to fetch bookings" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ bookings: data }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // POST with action: "update" - Update booking status
    if (req.method === "POST" && action === "update") {
      const { id, status } = body;

      if (!id || !status) {
        return new Response(
          JSON.stringify({ error: "Missing id or status" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
      if (!validStatuses.includes(status)) {
        return new Response(
          JSON.stringify({ error: "Invalid status" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const { data, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating booking:", error);
        return new Response(
          JSON.stringify({ error: "Failed to update booking" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ booking: data }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // POST with action: "delete" - Delete a booking
    if (req.method === "POST" && action === "delete") {
      const { id } = body;

      if (!id) {
        return new Response(
          JSON.stringify({ error: "Missing booking id" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting booking:", error);
        return new Response(
          JSON.stringify({ error: "Failed to delete booking" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in admin-bookings function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
