import { motion } from "framer-motion";
import { Armchair, Search, Leaf } from "lucide-react";

const features = [
  {
    icon: Armchair,
    title: "Immersion totale",
    description:
      "Vous ne visitez pas un café, vous habitez un espace éphémère où chaque détail a été pensé pour créer une atmosphère unique et mémorable.",
  },
  {
    icon: Search,
    title: "Découverte locale",
    description:
      "Rencontrez le savoir-faire d'artisans et créateurs de votre région. Chaque objet a une histoire, un visage, un atelier derrière lui.",
  },
  {
    icon: Leaf,
    title: "Consommation responsable",
    description:
      "En achetant un objet que vous avez 'testé' et apprécié dans son contexte, vous réduisez les achats impulsifs et favorisez une économie circulaire.",
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              L'Expérience Comptoir
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4 flex-shrink-0">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=500&fit=crop"
              alt="Personnes profitant de l'ambiance du Comptoir"
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg max-w-xs">
              <p className="font-serif text-lg italic text-primary">
                "Une nouvelle façon de rencontrer l'artisanat local"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
