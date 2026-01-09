import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    newsletter: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message envoyé avec succès !", {
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", message: "", newsletter: false });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Rejoignez l'expérience
            </h2>
            <p className="text-muted-foreground">
              Vous êtes artisan local, partenaire potentiel, ou simplement
              curieux ? Contactez-nous pour en savoir plus sur le projet.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl shadow-lg p-8"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-foreground font-medium mb-2"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
                placeholder="Votre nom"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-foreground font-medium mb-2"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-foreground font-medium mb-2"
              >
                Votre message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none resize-none"
                placeholder="Parlez-nous de votre intérêt pour le projet..."
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) =>
                    setFormData({ ...formData, newsletter: e.target.checked })
                  }
                  className="rounded border-border text-primary focus:ring-primary mr-2"
                />
                <span className="text-muted-foreground text-sm">
                  Je souhaite recevoir les actualités du Comptoir
                </span>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-accent text-primary-foreground py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Envoyer le message
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-muted-foreground space-y-2"
          >
            <p className="flex items-center justify-center gap-2">
              <MapPin size={16} className="text-primary" />
              Prochain emplacement : À définir dans le centre-ville
            </p>
            <p className="flex items-center justify-center gap-2">
              <Calendar size={16} className="text-primary" />
              Prochaine édition : Printemps 2024
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
