import { useState } from "react";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ConceptSection } from "@/components/ConceptSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AuctionSection } from "@/components/AuctionSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { QRModal } from "@/components/QRModal";
import { AuctionModal } from "@/components/AuctionModal";
import { DemoModal } from "@/components/DemoModal";
import { auctionObjects } from "@/data/auctionData";
import type { AuctionObject } from "@/data/auctionData";

const Index = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState<AuctionObject | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSimulateQR = () => {
    setIsQRModalOpen(true);
  };

  const handleOpenAuction = (object: AuctionObject) => {
    setSelectedObject(object);
  };

  const handleQRSimulateAuction = () => {
    setIsQRModalOpen(false);
    // Open a random auction
    const randomObject =
      auctionObjects[Math.floor(Math.random() * auctionObjects.length)];
    setSelectedObject(randomObject);
  };

  const handleStartDemo = () => {
    setIsDemoModalOpen(false);
    scrollToSection("#objets");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection onSimulateQR={handleSimulateQR} />
        <ConceptSection onShowDemo={() => setIsDemoModalOpen(true)} />
        <HowItWorksSection />
        <AuctionSection onOpenAuction={handleOpenAuction} />
        <ExperienceSection />
        <PartnersSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Modals */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onSimulateAuction={handleQRSimulateAuction}
      />
      <AuctionModal
        isOpen={selectedObject !== null}
        object={selectedObject}
        onClose={() => setSelectedObject(null)}
      />
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onStartDemo={handleStartDemo}
      />
    </div>
  );
};

export default Index;
