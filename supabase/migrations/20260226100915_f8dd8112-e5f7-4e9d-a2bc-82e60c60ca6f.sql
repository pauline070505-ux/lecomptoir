
-- Add ends_at column for live countdown
ALTER TABLE public.auction_objects ADD COLUMN ends_at TIMESTAMPTZ;

-- Set ends_at to 3 days 12 hours from now for all existing objects
UPDATE public.auction_objects SET ends_at = now() + interval '3 days 12 hours';

-- Make it NOT NULL with a default for future inserts
ALTER TABLE public.auction_objects ALTER COLUMN ends_at SET NOT NULL;
ALTER TABLE public.auction_objects ALTER COLUMN ends_at SET DEFAULT (now() + interval '3 days 12 hours');
