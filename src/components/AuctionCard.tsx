import { motion } from "framer-motion";
import { Info, Clock } from "lucide-react";
import type { AuctionObject } from "@/data/auctionData";

interface AuctionCardProps {
  object: AuctionObject;
  onBid: () => void;
  onViewDetails: () => void;
}

export const AuctionCard = ({ object, onBid, onViewDetails }: AuctionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-background rounded-lg overflow-hidden shadow-md card-hover"
    >
      <div className="relative overflow-hidden">
        <img
          src={object.image}
          alt={object.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            {object.name}
          </h3>
          <span className="category-badge">{object.category}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {object.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm text-muted-foreground">Prix de départ</p>
              <p className="text-lg font-bold text-primary">
                {object.startingPrice} €
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Enchère actuelle</p>
              <p className="text-lg font-bold text-foreground">
                {object.currentBid} €
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-warning">
            <Clock size={14} />
            <p className="text-sm font-medium">{object.timeLeft}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBid}
            className="flex-1 bg-primary hover:bg-accent text-primary-foreground py-3 rounded-lg font-medium transition-colors"
          >
            Enchérir
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewDetails}
            className="w-12 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors flex items-center justify-center"
          >
            <Info size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
