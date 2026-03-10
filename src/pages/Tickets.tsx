import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TicketCard } from "@/components/TicketCard";
import { useUserBids } from "@/hooks/useUserBids";
import { toast } from "@/hooks/use-toast";

const Tickets = () => {
  const { userBids } = useUserBids();
  const [loadingTicket, setLoadingTicket] = useState<string | null>(null);

  const handlePurchase = (type: string) => {
    setLoadingTicket(type);
    setTimeout(() => {
      setLoadingTicket(null);
      toast({
        title: "Bientôt disponible",
        description: "L'achat de tickets sera disponible prochainement.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onOpenDashboard={() => {}}
        userBidsCount={userBids.length}
      />

      <main className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Nos Tickets
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choisissez le ticket qui vous correspond et participez à l'expérience Le Comptoir.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <TicketCard
            type="en_ligne"
            price={5}
            onPurchase={() => handlePurchase("en_ligne")}
            isLoading={loadingTicket === "en_ligne"}
          />
          <TicketCard
            type="sur_place"
            price={15}
            onPurchase={() => handlePurchase("sur_place")}
            isLoading={loadingTicket === "sur_place"}
          />
          <TicketCard
            type="premium"
            price={30}
            onPurchase={() => handlePurchase("premium")}
            isLoading={loadingTicket === "premium"}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tickets;
