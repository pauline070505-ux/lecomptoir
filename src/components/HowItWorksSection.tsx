import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Profitez du lieu",
    description:
      "Installez-vous, commandez une boisson, et imprégnez-vous de l'ambiance unique.",
  },
  {
    number: 2,
    title: "Scannez le QR code",
    description:
      "Repérez un objet qui vous plaît et scannez le QR code qui l'accompagne.",
  },
  {
    number: 3,
    title: "Accédez à l'enchère",
    description:
      "Vous êtes redirigé vers la page de l'objet avec tous ses détails.",
  },
  {
    number: 4,
    title: "Proposez un prix",
    description:
      "Saisissez votre offre. L'interface simule une véritable plateforme d'enchères.",
  },
  {
    number: 5,
    title: "Remportez l'objet",
    description:
      "L'offre la plus haute à la fin de l'exposition remporte l'objet.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="fonctionnement" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Comment ça marche
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un processus simple pour une expérience unique.{" "}
            <strong className="text-primary">
              Note : il s'agit d'une simulation d'enchères pour ce projet
              étudiant.
            </strong>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg shadow-sm text-center card-hover cursor-pointer"
            >
              <div className="step-number mb-4 mx-auto">{step.number}</div>
              <h3 className="font-serif font-semibold text-lg mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-card px-6 py-3 rounded-full shadow-sm">
            <QrCode className="text-primary" size={20} />
            <span className="font-medium text-foreground">
              Plus de 50 QR codes à scanner dans l'espace
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
