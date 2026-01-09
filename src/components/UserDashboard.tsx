import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Package, Trophy, Clock, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { UserBid } from "@/hooks/useUserBids";

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  userBids: UserBid[];
  onClearBids: () => void;
}

export const UserDashboard = ({ isOpen, onClose, userBids, onClearBids }: UserDashboardProps) => {
  // Prepare chart data - top bids sorted by amount
  const chartData = [...userBids]
    .sort((a, b) => b.bidAmount - a.bidAmount)
    .slice(0, 6)
    .map((bid) => ({
      name: bid.objectName.length > 15 ? bid.objectName.substring(0, 12) + "..." : bid.objectName,
      fullName: bid.objectName,
      montant: bid.bidAmount,
      category: bid.category,
    }));

  const totalAmount = userBids.reduce((sum, bid) => sum + bid.bidAmount, 0);
  const winningCount = userBids.filter((bid) => bid.isWinning).length;

  // Colors for bars based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mobilier":
        return "hsl(var(--primary))";
      case "Décoration":
        return "hsl(var(--accent))";
      case "Luminaire":
        return "hsl(var(--warning))";
      default:
        return "hsl(var(--primary))";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-xl shadow-2xl max-w-4xl w-full p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Mon Espace Enchères
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Suivez vos enchères en temps réel
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-background rounded-lg p-4 text-center">
                <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{userBids.length}</p>
                <p className="text-xs text-muted-foreground">Objets enchéris</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{totalAmount} €</p>
                <p className="text-xs text-muted-foreground">Total enchéri</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <Trophy className="w-6 h-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{winningCount}</p>
                <p className="text-xs text-muted-foreground">Meilleures offres</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {userBids.length > 0 ? "En cours" : "-"}
                </p>
                <p className="text-xs text-muted-foreground">Statut</p>
              </div>
            </div>

            {userBids.length === 0 ? (
              <div className="text-center py-12 bg-background rounded-lg">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  Aucune enchère pour le moment
                </h3>
                <p className="text-muted-foreground">
                  Explorez nos objets et commencez à enchérir !
                </p>
              </div>
            ) : (
              <>
                {/* Chart Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                    📊 Vos meilleures enchères
                  </h3>
                  <div className="bg-background rounded-lg p-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                          angle={-35}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => `${value}€`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--foreground))",
                          }}
                          formatter={(value: number) => [`${value} €`, "Montant"]}
                          labelFormatter={(label, payload) => {
                            if (payload && payload[0]) {
                              return payload[0].payload.fullName;
                            }
                            return label;
                          }}
                        />
                        <Bar dataKey="montant" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Mobilier</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-muted-foreground">Décoration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-muted-foreground">Luminaire</span>
                    </div>
                  </div>
                </div>

                {/* Bids List */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-serif font-semibold text-foreground">
                      📦 Mes objets enchéris
                    </h3>
                    <button
                      onClick={onClearBids}
                      className="text-sm text-destructive hover:text-destructive/80 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={14} />
                      Effacer tout
                    </button>
                  </div>
                  <div className="space-y-3">
                    {userBids.map((bid) => (
                      <motion.div
                        key={bid.objectId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 bg-background rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <img
                          src={bid.objectImage}
                          alt={bid.objectName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {bid.objectName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {bid.category} • {bid.bidTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{bid.bidAmount} €</p>
                          {bid.isWinning ? (
                            <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded">
                              Meilleure offre
                            </span>
                          ) : (
                            <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">
                              Surenchéri
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-6 pt-4 border-t border-border">
              ⚠️ Simulation d'enchères - Les données sont stockées localement sur votre appareil
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
