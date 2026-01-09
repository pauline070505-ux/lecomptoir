import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ExternalLink } from "lucide-react";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateAuction: () => void;
}

export const QRModal = ({ isOpen, onClose, onSimulateAuction }: QRModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-foreground">
                Simulation de scan QR
              </h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="text-center mb-6">
              {/* QR Code simulation */}
              <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border-2 border-primary/30">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 ${
                        Math.random() > 0.5 ? "bg-primary" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Scannez ce code pour accéder à la simulation d'enchère
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-background p-4 rounded-lg">
                <p className="font-medium text-primary mb-2">
                  Que se passe-t-il ensuite ?
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous serez redirigé vers une page d'enchère simulée où vous
                  pourrez :
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-success" />
                    Voir les détails de l'objet
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-success" />
                    Consulter les enchères en cours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-success" />
                    Proposer votre offre
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-success" />
                    Suivre l'évolution des enchères
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSimulateAuction}
                className="w-full bg-primary hover:bg-accent text-primary-foreground py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Accéder à la simulation d'enchère
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 rounded-lg font-medium transition-colors"
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
