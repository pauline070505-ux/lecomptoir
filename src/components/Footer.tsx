import { Instagram, Facebook, Linkedin } from "lucide-react";

const footerNavLinks = [
  { href: "#concept", label: "Le Concept" },
  { href: "#fonctionnement", label: "Comment ça marche" },
  { href: "#objets", label: "Objets en enchères" },
  { href: "#experience", label: "L'Expérience" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Le Comptoir</h3>
            <p className="text-primary-foreground/70">
              Un projet étudiant explorant de nouvelles formes de consommation
              responsable et de valorisation de l'artisanat local.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">
              Suivez le projet
            </h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-primary-foreground/50 text-sm">
              Projet académique - Tous les éléments présentés sont fictifs et
              servent à illustrer le concept.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-primary-foreground/50 text-sm">
          <p>
            © 2024 Le Comptoir - Projet conceptuel. Design et développement dans
            le cadre d'un projet étudiant.
          </p>
        </div>
      </div>
    </footer>
  );
};
