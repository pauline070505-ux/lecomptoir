
-- 1. Server-side bid validation function
CREATE OR REPLACE FUNCTION public.validate_and_insert_bid(
  p_auction_object_id INTEGER,
  p_user_id UUID,
  p_bidder_name TEXT,
  p_amount INTEGER
)
RETURNS UUID AS $$
DECLARE
  v_current_bid INTEGER;
  v_min_increment INTEGER;
  v_new_bid_id UUID;
BEGIN
  SELECT current_bid, min_bid_increment
  INTO v_current_bid, v_min_increment
  FROM public.auction_objects
  WHERE id = p_auction_object_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Auction object not found';
  END IF;

  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Bid amount must be positive';
  END IF;

  IF p_amount <= v_current_bid THEN
    RAISE EXCEPTION 'Bid must be higher than current bid';
  END IF;

  IF p_amount < v_current_bid + v_min_increment THEN
    RAISE EXCEPTION 'Bid must meet minimum increment';
  END IF;

  INSERT INTO public.bids (auction_object_id, user_id, bidder_name, amount)
  VALUES (p_auction_object_id, p_user_id, p_bidder_name, p_amount)
  RETURNING id INTO v_new_bid_id;

  RETURN v_new_bid_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Add CHECK constraint for positive bids
ALTER TABLE public.bids ADD CONSTRAINT bid_amount_positive CHECK (amount > 0);

-- 3. Restrict profiles SELECT to own user only
DROP POLICY "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);
