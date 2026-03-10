import { Check, Coffee, Wifi, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  type: "sur_place" | "en_ligne" | "premium";
  price: number;
  onPurchase: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ticketDetails = {
  sur_place: {
    title: "Ticket Sur Place",
    subtitle: "Expérience complète",
    icon: Coffee,
    features: [
      "Accès au pop-up café",
      "2 boissons incluses",
      "Test réel des produits",
      "Accès aux enchères",
      "QR codes prioritaires",
    ],
    recommended: true,
    color: "primary",
  },
  en_ligne: {
    title: "Ticket En Ligne",
    subtitle: "Accès enchères uniquement",
    icon: Wifi,
    features: [
      "Accès au site",
      "Participation aux enchères",
      "Consultation des produits",
      "Historique des mises",
    ],
    recommended: false,
    color: "muted",
  },
  premium: {
    title: "Ticket Premium",
    subtitle: "Accès VIP",
    icon: Star,
    features: [
      "Tout le ticket Sur Place",
      "3 boissons incluses",
      "Accès anticipé aux enchères",
      "Priorité sur certaines pièces",
      "Avantages exclusifs",
    ],
    recommended: false,
    color: "accent",
  },
};

export function TicketCard({ type, price, onPurchase, isLoading, isDisabled }: TicketCardProps) {
  const details = ticketDetails[type];
  const Icon = details.icon;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        details.recommended
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border bg-card"
      )}
    >
      {/* Recommended Badge */}
      {details.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            <Star className="h-3 w-3" />
            Recommandé
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex flex-col items-center text-center">
        <div
          className={cn(
            "mb-3 flex h-14 w-14 items-center justify-center rounded-full",
            details.recommended
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{details.title}</h3>
        <p className="text-sm text-muted-foreground">{details.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-6 text-center">
        <span className="text-4xl font-extrabold text-foreground">{price}</span>
        <span className="text-lg text-muted-foreground">€</span>
      </div>

      {/* Features */}
      <ul className="mb-6 flex-1 space-y-3">
        {details.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-foreground">
            <Check className="h-4 w-4 shrink-0 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        onClick={onPurchase}
        disabled={isDisabled || isLoading}
        className="w-full"
        variant={details.recommended ? "default" : "outline"}
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 animate-spin" />
            Chargement...
          </span>
        ) : (
          "Acheter ce ticket"
        )}
      </Button>
    </div>
  );
}
