import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ConceptSectionProps {
  onShowDemo: () => void;
}

export const ConceptSection = ({ onShowDemo }: ConceptSectionProps) => {
  return (
    <section id="concept" className="section-padding bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Le Concept
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                <strong className="text-primary">Le Comptoir</strong> est bien plus
                qu'un simple café. C'est une expérience éphémère où l'art de vivre
                rencontre l'art de consommer autrement.
              </p>
              <p>
                Imaginez un espace chaleureux où chaque chaise, chaque table, chaque
                objet de décoration provient d'artisans et de boutiques locales.
                Vous ne faites pas que les regarder : vous les utilisez, vous les
                vivez.
              </p>
              <p>
                Et si un objet vous séduit ? Scannez son QR code, proposez votre
                prix, et peut-être repartirez-vous avec lui à la fin de
                l'exposition.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onShowDemo}
              className="mt-8 inline-flex items-center text-primary hover:text-accent font-medium gap-2 transition-colors"
            >
              <PlayCircle size={20} />
              Voir la démonstration
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop"
              alt="Intérieur chaleureux du café Le Comptoir avec mobilier design"
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg shadow-lg">
              <p className="text-sm text-primary font-medium italic">
                "Une expérience à vivre avant de posséder"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
