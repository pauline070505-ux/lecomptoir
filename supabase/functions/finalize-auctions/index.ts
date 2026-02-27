import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Call the finalize function
    const { error: rpcError } = await supabase.rpc("finalize_ended_auctions");
    if (rpcError) {
      console.error("Error finalizing auctions:", rpcError);
      throw rpcError;
    }

    // Get newly finalized auctions to send notifications
    const { data: winners, error: winnersError } = await supabase
      .from("auction_objects")
      .select("id, name, current_bid, winner_user_id, image")
      .eq("payment_status", "awaiting_payment")
      .not("winner_user_id", "is", null);

    if (winnersError) {
      console.error("Error fetching winners:", winnersError);
    }

    // Send email notifications to winners if RESEND_API_KEY is configured
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey && winners && winners.length > 0) {
      for (const auction of winners) {
        // Get winner's email from profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("email, display_name")
          .eq("user_id", auction.winner_user_id)
          .single();

        if (profile?.email) {
          try {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendKey}`,
              },
              body: JSON.stringify({
                from: Deno.env.get("RESEND_FROM_EMAIL") || "onboarding@resend.dev",
                to: [profile.email],
                subject: `🎉 Félicitations ! Vous avez remporté "${auction.name}"`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #1a1a1a; text-align: center;">🏆 Enchère remportée !</h1>
                    <p style="color: #555; font-size: 16px;">
                      Bonjour ${profile.display_name || ""},
                    </p>
                    <p style="color: #555; font-size: 16px;">
                      Félicitations ! Vous avez remporté l'enchère pour <strong>"${auction.name}"</strong> 
                      avec une offre de <strong>${auction.current_bid} €</strong>.
                    </p>
                    ${auction.image ? `<img src="${auction.image}" style="width: 100%; max-width: 400px; border-radius: 8px; margin: 20px auto; display: block;" />` : ""}
                    <p style="color: #555; font-size: 16px;">
                      Rendez-vous dans votre espace personnel pour finaliser le paiement.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${Deno.env.get("SITE_URL") || "https://lecomptoir.lovable.app"}" 
                         style="background: #1a1a1a; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                        Payer maintenant
                      </a>
                    </div>
                  </div>
                `,
              }),
            });
            console.log(`Email sent to ${profile.email} for auction ${auction.id}`);
          } catch (emailErr) {
            console.error(`Failed to send email to ${profile.email}:`, emailErr);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: "Auctions finalized",
        winners_count: winners?.length || 0,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
