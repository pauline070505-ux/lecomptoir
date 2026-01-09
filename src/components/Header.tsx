import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onOpenDashboard?: () => void;
  userBidsCount?: number;
}

const navLinks = [
  { href: "#concept", label: "Le Concept" },
  { href: "#fonctionnement", label: "Comment ça marche" },
  { href: "#objets", label: "Objets en enchères" },
  { href: "#experience", label: "L'Expérience" },
  { href: "#partenaires", label: "Partenaires" },
  { href: "#contact", label: "Contact" },
];

export const Header = ({ onOpenDashboard, userBidsCount = 0 }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-serif font-semibold text-primary">
            Le Comptoir
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            
            {/* User Dashboard Button */}
            <button
              onClick={onOpenDashboard}
              className="relative flex items-center gap-2 bg-primary hover:bg-accent text-primary-foreground px-4 py-2 rounded-full font-medium transition-colors"
            >
              <User size={18} />
              <span>Mon Espace</span>
              {userBidsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-success text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {userBidsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenDashboard}
              className="relative text-primary p-2"
              aria-label="Mon espace"
            >
              <User size={24} />
              {userBidsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-success text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {userBidsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background shadow-lg"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="py-2 text-foreground hover:text-primary transition-colors text-left font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
