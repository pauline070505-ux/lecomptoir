import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { auctionObjects } from "@/data/auctionData";
import { AuctionCard } from "./AuctionCard";
import type { AuctionObject } from "@/data/auctionData";

interface AuctionSectionProps {
  onOpenAuction: (object: AuctionObject) => void;
}

export const AuctionSection = ({ onOpenAuction }: AuctionSectionProps) => {
  return (
    <section id="objets" className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Objets en enchères
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection d'objets actuellement disponibles. Chaque
            clic sur "Enchérir" ouvre une simulation d'enchère interactive.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {auctionObjects.map((object) => (
            <AuctionCard
              key={object.id}
              object={object}
              onBid={() => onOpenAuction(object)}
              onViewDetails={() => onOpenAuction(object)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
