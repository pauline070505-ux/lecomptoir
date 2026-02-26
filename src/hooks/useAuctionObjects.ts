import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AuctionObject {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  minBidIncrement: number;
  image: string;
  category: string;
  creator: string;
  timeLeft: string;
  endsAt: string | null;
}

export interface Bid {
  id: string;
  bidder_name: string;
  amount: number;
  created_at: string;
  user_id: string;
}

const mapRow = (row: any): AuctionObject => ({
  id: row.id,
  name: row.name,
  description: row.description,
  startingPrice: row.starting_price,
  currentBid: row.current_bid,
  minBidIncrement: row.min_bid_increment,
  image: row.image,
  category: row.category,
  creator: row.creator,
  timeLeft: row.time_left,
  endsAt: row.ends_at,
});

export const useAuctionObjects = () => {
  return useQuery({
    queryKey: ["auction_objects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("auction_objects")
        .select("*")
        .order("id");
      if (error) throw error;
      return (data || []).map(mapRow);
    },
  });
};

export const useAuctionBids = (objectId: number | null) => {
  return useQuery({
    queryKey: ["auction_bids", objectId],
    queryFn: async () => {
      if (!objectId) return [];
      const { data, error } = await supabase
        .from("bids")
        .select("*")
        .eq("auction_object_id", objectId)
        .order("amount", { ascending: false });
      if (error) throw error;
      return data as Bid[];
    },
    enabled: objectId !== null,
  });
};
