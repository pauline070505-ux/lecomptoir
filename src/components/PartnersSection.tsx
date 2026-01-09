import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { partners } from "@/data/auctionData";

export const PartnersSection = () => {
  return (
    <section id="partenaires" className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Partenaires & Créateurs Locaux
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Le Comptoir s'appuie sur un réseau d'artisans, designers et boutiques
            locales qui partagent notre vision d'une consommation plus consciente
            et engagée.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-background rounded-lg shadow-sm card-hover"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-secondary">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
                {partner.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {partner.description}
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <MapPin size={12} />
                  {partner.location}
                </p>
                <p className="flex items-center justify-center gap-1">
                  <Star size={12} />
                  {partner.specialty}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-background rounded-xl p-8 text-center"
        >
          <p className="text-lg font-serif text-foreground mb-4 italic">
            "Notre collaboration avec Le Comptoir nous permet de présenter nos
            créations dans un contexte vivant, où les visiteurs peuvent
            véritablement les expérimenter."
          </p>
          <p className="text-muted-foreground">
            — Marie, fondatrice de Céramiques du Terroir
          </p>
        </motion.div>
      </div>
    </section>
  );
};
