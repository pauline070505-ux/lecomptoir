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
            Objets en enchères (simulation)
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Info size={16} className="text-primary" />
            Ces enchères sont simulées dans le cadre de ce projet étudiant.
            Aucun paiement réel n'est effectué.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
