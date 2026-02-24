import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { AuctionObject } from "./useAuctionObjects";

export interface UserBid {
  objectId: number;
  objectName: string;
  objectImage: string;
  category: string;
  bidAmount: number;
  bidTime: string;
  currentHighestBid: number;
  isWinning: boolean;
}

export const useUserBids = () => {
  const [userBids, setUserBids] = useState<UserBid[]>([]);
  const { user } = useAuth();

  const fetchUserBids = useCallback(async () => {
    if (!user) {
      setUserBids([]);
      return;
    }

    const { data: bids, error } = await supabase
      .from("bids")
      .select("*, auction_objects(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !bids) {
      setUserBids([]);
      return;
    }

    // Group by auction object, keep only latest bid per object
    const bidMap = new Map<number, UserBid>();
    for (const bid of bids) {
      const obj = bid.auction_objects as any;
      if (!obj || bidMap.has(obj.id)) continue;

      // Check if user is winning (highest bid)
      const { data: topBid } = await supabase
        .from("bids")
        .select("user_id, amount")
        .eq("auction_object_id", obj.id)
        .order("amount", { ascending: false })
        .limit(1)
        .single();

      bidMap.set(obj.id, {
        objectId: obj.id,
        objectName: obj.name,
        objectImage: obj.image,
        category: obj.category,
        bidAmount: bid.amount,
        bidTime: new Date(bid.created_at).toLocaleString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        currentHighestBid: topBid?.amount || bid.amount,
        isWinning: topBid?.user_id === user.id,
      });
    }

    setUserBids(Array.from(bidMap.values()));
  }, [user]);

  useEffect(() => {
    fetchUserBids();
  }, [fetchUserBids]);

  const addBid = useCallback(
    async (object: AuctionObject, amount: number) => {
      if (!user) return;

      const displayName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Anonyme";

      const { error } = await supabase.from("bids").insert({
        auction_object_id: object.id,
        user_id: user.id,
        bidder_name: displayName,
        amount,
      });

      if (!error) {
        await fetchUserBids();
      }
    },
    [user, fetchUserBids]
  );

  const clearBids = useCallback(async () => {
    if (!user) return;
    await supabase.from("bids").delete().eq("user_id", user.id);
    setUserBids([]);
  }, [user]);

  return {
    userBids,
    addBid,
    clearBids,
    refetchBids: fetchUserBids,
  };
};
