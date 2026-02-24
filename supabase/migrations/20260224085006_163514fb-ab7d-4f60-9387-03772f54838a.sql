
-- Table des objets en enchère
CREATE TABLE public.auction_objects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_price INTEGER NOT NULL,
  current_bid INTEGER NOT NULL,
  min_bid_increment INTEGER NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  creator TEXT NOT NULL,
  time_left TEXT NOT NULL DEFAULT '3j 12h 00m',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.auction_objects ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les objets
CREATE POLICY "Auction objects are viewable by everyone"
  ON public.auction_objects FOR SELECT USING (true);

-- Table des enchères (bids)
CREATE TABLE public.bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auction_object_id INTEGER NOT NULL REFERENCES public.auction_objects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  bidder_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les enchères
CREATE POLICY "Bids are viewable by everyone"
  ON public.bids FOR SELECT USING (true);

-- Les utilisateurs connectés peuvent enchérir
CREATE POLICY "Authenticated users can place bids"
  ON public.bids FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres enchères
CREATE POLICY "Users can delete their own bids"
  ON public.bids FOR DELETE
  USING (auth.uid() = user_id);

-- Fonction pour mettre à jour le current_bid d'un objet quand une enchère est placée
CREATE OR REPLACE FUNCTION public.update_auction_current_bid()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.auction_objects
  SET current_bid = NEW.amount
  WHERE id = NEW.auction_object_id AND current_bid < NEW.amount;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_current_bid_on_new_bid
  AFTER INSERT ON public.bids
  FOR EACH ROW
  EXECUTE FUNCTION public.update_auction_current_bid();

-- Seed des objets initiaux
INSERT INTO public.auction_objects (id, name, description, starting_price, current_bid, min_bid_increment, image, category, creator, time_left) VALUES
(1, 'Fauteuil "Lumina"', 'Fauteuil design en chêne massif et tissu lin, par l''atelier Bois & Ligne. Confort exceptionnel et design épuré.', 250, 320, 250, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', 'Mobilier', 'Atelier Bois & Ligne', '3j 12h 00m'),
(2, 'Lampe "Céramos"', 'Lampe de table en céramique émaillée à la main, création unique. Éclairage doux et chaleureux.', 85, 120, 85, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop', 'Décoration', 'Céramiques du Terroir', '3j 12h 00m'),
(3, 'Table "Éphémère"', 'Table basse en bois de récupération traité, piétement acier. Dimensions : 80x80x45 cm.', 180, 210, 180, 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=300&fit=crop', 'Mobilier', 'Atelier Bois & Ligne', '3j 12h 00m'),
(4, 'Vase "Sculptural"', 'Vase en grès tourné à la main, finition mate. Pièce unique signée par l''artiste.', 65, 90, 65, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=300&fit=crop', 'Décoration', 'Céramiques du Terroir', '3j 12h 00m'),
(5, 'Chaise "Assise Douce"', 'Chaise en hêtre massif avec assise en laine tissée main. Confort ergonomique.', 150, 185, 150, 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop', 'Mobilier', 'Atelier Bois & Ligne', '3j 12h 00m'),
(6, 'Suspension "Lumière"', 'Suspension en papier washi japonais, structure en bambou. Éclairage diffus et apaisant.', 120, 155, 120, 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop', 'Luminaire', 'Tissus & Patrimoine', '3j 12h 00m');

-- Seed des enchères initiales
INSERT INTO public.bids (auction_object_id, user_id, bidder_name, amount, created_at) VALUES
(1, '00000000-0000-0000-0000-000000000000', 'Marie D.', 320, now() - interval '2 hours'),
(1, '00000000-0000-0000-0000-000000000000', 'Pierre L.', 310, now() - interval '3 hours'),
(1, '00000000-0000-0000-0000-000000000000', 'Sophie M.', 290, now() - interval '5 hours'),
(2, '00000000-0000-0000-0000-000000000000', 'Jean P.', 120, now() - interval '1 hour'),
(2, '00000000-0000-0000-0000-000000000000', 'Claire B.', 115, now() - interval '2 hours'),
(2, '00000000-0000-0000-0000-000000000000', 'Thomas R.', 105, now() - interval '4 hours'),
(3, '00000000-0000-0000-0000-000000000000', 'Lucie T.', 210, now() - interval '30 minutes'),
(3, '00000000-0000-0000-0000-000000000000', 'Antoine G.', 200, now() - interval '1 hour'),
(3, '00000000-0000-0000-0000-000000000000', 'Émilie F.', 195, now() - interval '2 hours'),
(4, '00000000-0000-0000-0000-000000000000', 'Nicolas D.', 90, now() - interval '3 hours'),
(4, '00000000-0000-0000-0000-000000000000', 'Isabelle M.', 85, now() - interval '5 hours'),
(5, '00000000-0000-0000-0000-000000000000', 'Marc S.', 185, now() - interval '45 minutes'),
(5, '00000000-0000-0000-0000-000000000000', 'Caroline L.', 175, now() - interval '2 hours'),
(6, '00000000-0000-0000-0000-000000000000', 'Pauline R.', 155, now() - interval '2 hours'),
(6, '00000000-0000-0000-0000-000000000000', 'David M.', 145, now() - interval '4 hours'),
(6, '00000000-0000-0000-0000-000000000000', 'Sarah K.', 135, now() - interval '6 hours');

-- Reset sequence pour les prochains inserts
SELECT setval('auction_objects_id_seq', 6);
