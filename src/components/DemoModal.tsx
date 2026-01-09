import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

export const DemoModal = ({ isOpen, onClose, onStartDemo }: DemoModalProps) => {
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
            className="bg-card rounded-xl shadow-2xl max-w-2xl w-full p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-foreground">
                Démonstration interactive
              </h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-background p-6 rounded-lg">
                <h4 className="font-serif text-xl font-semibold text-primary mb-4">
                  Comment fonctionne Le Comptoir ?
                </h4>
                <p className="text-muted-foreground mb-4">
                  Suivez ces étapes pour comprendre l'expérience complète :
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="step-number text-sm mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Explorez les objets disponibles
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Parcourez la section "Objets en enchères" et cliquez sur
                        "Enchérir" pour un objet qui vous intéresse.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="step-number text-sm mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Simulez une enchère
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Dans la fenêtre d'enchère, proposez un prix et voyez
                        comment le système réagit.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="step-number text-sm mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Testez le scan QR
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Cliquez sur "Simuler un scan QR" dans la bannière
                        principale pour voir comment fonctionne l'accès mobile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStartDemo}
                  className="bg-primary hover:bg-accent text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Play size={18} />
                  Commencer la démonstration
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
