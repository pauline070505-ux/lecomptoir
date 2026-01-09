import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, User, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { AuctionObject } from "@/data/auctionData";

interface AuctionModalProps {
  isOpen: boolean;
  object: AuctionObject | null;
  onClose: () => void;
}

export const AuctionModal = ({ isOpen, object, onClose }: AuctionModalProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(object?.currentBid || 0);
  const [bids, setBids] = useState(object?.bids || []);

  if (!object) return null;

  const minBid = currentBid + object.minBidIncrement;

  const handleBid = () => {
    const amount = parseInt(bidAmount);

    if (isNaN(amount) || amount < minBid) {
      toast.error("Offre invalide", {
        description: `L'offre minimum est de ${minBid} €`,
      });
      return;
    }

    // Simulate placing a bid
    const newBid = {
      bidder: "Vous",
      amount: amount,
      time: "À l'instant",
    };

    setBids([newBid, ...bids]);
    setCurrentBid(amount);
    setBidAmount("");

    toast.success("Enchère enregistrée !", {
      description: `Votre offre de ${amount} € a été prise en compte.`,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-xl shadow-2xl max-w-lg w-full p-8 my-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-foreground">
                Enchère : {object.name}
              </h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Object info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={object.image}
                    alt={object.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {object.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Créateur :</span>{" "}
                      <span className="font-medium text-foreground">
                        {object.creator}
                      </span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Catégorie :</span>{" "}
                      <span className="category-badge">{object.category}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bid info */}
              <div className="bg-background rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Prix de départ</p>
                    <p className="text-lg font-bold text-primary">
                      {object.startingPrice} €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Enchère actuelle</p>
                    <p className="text-lg font-bold text-foreground">
                      {currentBid} €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temps restant</p>
                    <p className="text-lg font-bold text-warning flex items-center justify-center gap-1">
                      <Clock size={16} />
                      {object.timeLeft}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bid input */}
              <div>
                <label className="block text-foreground font-medium mb-2">
                  Votre offre (minimum {minBid} €)
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`${minBid}`}
                      min={minBid}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      €
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBid}
                    className="bg-primary hover:bg-accent text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Enchérir
                  </motion.button>
                </div>
              </div>

              {/* Bid history */}
              <div>
                <h4 className="font-medium text-foreground mb-3">
                  Historique des enchères
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {bids.map((bid, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        index === 0 ? "bg-success/10" : "bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {bid.bidder}
                        </span>
                        {index === 0 && (
                          <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded">
                            Meilleure offre
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{bid.amount} €</p>
                        <p className="text-xs text-muted-foreground">{bid.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 text-sm text-muted-foreground bg-background p-3 rounded-lg">
                <AlertCircle size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <p>
                  Ceci est une simulation d'enchères. Aucun paiement ni engagement
                  réel n'est requis.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
