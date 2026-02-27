import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface WonAuction {
  id: number;
  name: string;
  image: string;
  category: string;
  winningBid: number;
  paymentStatus: string;
  endsAt: string;
}

export const useWonAuctions = () => {
  const [wonAuctions, setWonAuctions] = useState<WonAuction[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchWonAuctions = useCallback(async () => {
    if (!user) {
      setWonAuctions([]);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("auction_objects")
      .select("id, name, image, category, current_bid, payment_status, ends_at")
      .eq("winner_user_id", user.id);

    if (error || !data) {
      setWonAuctions([]);
    } else {
      setWonAuctions(
        data.map((a: any) => ({
          id: a.id,
          name: a.name,
          image: a.image,
          category: a.category,
          winningBid: a.current_bid,
          paymentStatus: a.payment_status,
          endsAt: a.ends_at,
        }))
      );
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchWonAuctions();
  }, [fetchWonAuctions]);

  const payForAuction = useCallback(
    async (auctionObjectId: number) => {
      if (!user) return;

      const { data, error } = await supabase.functions.invoke(
        "create-winner-payment",
        {
          body: { auctionObjectId },
        }
      );

      if (error) {
        console.error("Payment error:", error);
        throw new Error("Erreur lors de la création du paiement");
      }

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    },
    [user]
  );

  return { wonAuctions, loading, payForAuction, refetch: fetchWonAuctions };
};
