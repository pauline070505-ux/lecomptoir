
-- Add winner tracking columns to auction_objects
ALTER TABLE public.auction_objects
ADD COLUMN winner_user_id UUID,
ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'pending';

-- Function to finalize ended auctions (set winner)
CREATE OR REPLACE FUNCTION public.finalize_ended_auctions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.auction_objects ao
  SET 
    winner_user_id = sub.winner_id,
    payment_status = 'awaiting_payment'
  FROM (
    SELECT DISTINCT ON (b.auction_object_id) 
      b.auction_object_id,
      b.user_id AS winner_id
    FROM public.bids b
    INNER JOIN public.auction_objects a ON a.id = b.auction_object_id
    WHERE a.ends_at <= now() AND a.winner_user_id IS NULL
    ORDER BY b.auction_object_id, b.amount DESC
  ) sub
  WHERE ao.id = sub.auction_object_id;
END;
$$;
