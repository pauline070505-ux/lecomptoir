
CREATE OR REPLACE FUNCTION public.validate_and_insert_bid(
  p_auction_object_id INTEGER,
  p_user_id UUID,
  p_bidder_name TEXT,
  p_amount INTEGER
)
RETURNS UUID AS $$
DECLARE
  v_current_bid INTEGER;
  v_starting_price INTEGER;
  v_new_bid_id UUID;
BEGIN
  SELECT current_bid, starting_price
  INTO v_current_bid, v_starting_price
  FROM public.auction_objects
  WHERE id = p_auction_object_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Auction object not found';
  END IF;

  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Bid amount must be positive';
  END IF;

  IF p_amount < v_starting_price THEN
    RAISE EXCEPTION 'Bid must be at least the starting price';
  END IF;

  IF p_amount <= v_current_bid THEN
    RAISE EXCEPTION 'Bid must be higher than current bid';
  END IF;

  INSERT INTO public.bids (auction_object_id, user_id, bidder_name, amount)
  VALUES (p_auction_object_id, p_user_id, p_bidder_name, p_amount)
  RETURNING id INTO v_new_bid_id;

  RETURN v_new_bid_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
