import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TicketCard } from "@/components/TicketCard";
import { useUserBids } from "@/hooks/useUserBids";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Tickets = () => {
  const { userBids } = useUserBids();
  const { user } = useAuth();
  const [loadingTicket, setLoadingTicket] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      toast({ title: "Paiement réussi !", description: "Votre ticket a été acheté avec succès." });
    } else if (payment === "cancelled") {
      toast({ title: "Paiement annulé", description: "Le paiement a été annulé.", variant: "destructive" });
    }
  }, [searchParams]);

  const handlePurchase = async (type: string) => {
    if (!user) {
      toast({ title: "Connexion requise", description: "Veuillez vous connecter pour acheter un ticket.", variant: "destructive" });
      return;
    }

    setLoadingTicket(type);
    try {
      const { data, error } = await supabase.functions.invoke("create-ticket-payment", {
        body: { ticketType: type },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message || "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setLoadingTicket(null);
    }
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
