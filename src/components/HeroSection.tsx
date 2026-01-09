import { QrCode } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onSimulateQR: () => void;
}

export const HeroSection = ({ onSimulateQR }: HeroSectionProps) => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Ici, tout se vit.
            <br />
            <span className="text-primary">Tout s'enchérit.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Bienvenue au Comptoir, un café éphémère où chaque objet raconte une
            histoire. Asseyez-vous, savourez, et repartez avec un morceau de
            l'expérience grâce à notre système d'enchères simulées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("#concept")}
              className="btn-primary"
            >
              Découvrir le concept
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSimulateQR}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <QrCode size={20} />
              Simuler un scan QR
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
