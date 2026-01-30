export interface Bid {
  bidder: string;
  amount: number;
  time: string;
}

export interface AuctionObject {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  minBidIncrement: number;
  image: string;
  category: string;
  creator: string;
  timeLeft: string;
  bids: Bid[];
}

export interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  location: string;
  specialty: string;
}

export const auctionObjects: AuctionObject[] = [
  {
    id: 1,
    name: 'Fauteuil "Lumina"',
    description: "Fauteuil design en chêne massif et tissu lin, par l'atelier Bois & Ligne. Confort exceptionnel et design épuré.",
    startingPrice: 250,
    currentBid: 320,
    minBidIncrement: 10,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    category: "Mobilier",
    creator: "Atelier Bois & Ligne",
    timeLeft: "2j 15h 30m",
    bids: [
      { bidder: "Marie D.", amount: 320, time: "Il y a 2 heures" },
      { bidder: "Pierre L.", amount: 310, time: "Il y a 3 heures" },
      { bidder: "Sophie M.", amount: 290, time: "Il y a 5 heures" }
    ]
  },
  {
    id: 2,
    name: 'Lampe "Céramos"',
    description: "Lampe de table en céramique émaillée à la main, création unique. Éclairage doux et chaleureux.",
    startingPrice: 85,
    currentBid: 120,
    minBidIncrement: 5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    category: "Décoration",
    creator: "Céramiques du Terroir",
    timeLeft: "1j 8h 45m",
    bids: [
      { bidder: "Jean P.", amount: 120, time: "Il y a 1 heure" },
      { bidder: "Claire B.", amount: 115, time: "Il y a 2 heures" },
      { bidder: "Thomas R.", amount: 105, time: "Il y a 4 heures" }
    ]
  },
  {
    id: 3,
    name: 'Table "Éphémère"',
    description: "Table basse en bois de récupération traité, piétement acier. Dimensions : 80x80x45 cm.",
    startingPrice: 180,
    currentBid: 210,
    minBidIncrement: 15,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=300&fit=crop",
    category: "Mobilier",
    creator: "Atelier Bois & Ligne",
    timeLeft: "3j 12h 20m",
    bids: [
      { bidder: "Lucie T.", amount: 210, time: "Il y a 30 minutes" },
      { bidder: "Antoine G.", amount: 200, time: "Il y a 1 heure" },
      { bidder: "Émilie F.", amount: 195, time: "Il y a 2 heures" }
    ]
  },
  {
    id: 4,
    name: 'Vase "Sculptural"',
    description: "Vase en grès tourné à la main, finition mate. Pièce unique signée par l'artiste.",
    startingPrice: 65,
    currentBid: 90,
    minBidIncrement: 5,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=300&fit=crop",
    category: "Décoration",
    creator: "Céramiques du Terroir",
    timeLeft: "5j 6h 10m",
    bids: [
      { bidder: "Nicolas D.", amount: 90, time: "Il y a 3 heures" },
      { bidder: "Isabelle M.", amount: 85, time: "Il y a 5 heures" }
    ]
  },
  {
    id: 5,
    name: 'Chaise "Assise Douce"',
    description: "Chaise en hêtre massif avec assise en laine tissée main. Confort ergonomique.",
    startingPrice: 150,
    currentBid: 185,
    minBidIncrement: 10,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop",
    category: "Mobilier",
    creator: "Atelier Bois & Ligne",
    timeLeft: "4j 20h 15m",
    bids: [
      { bidder: "Marc S.", amount: 185, time: "Il y a 45 minutes" },
      { bidder: "Caroline L.", amount: 175, time: "Il y a 2 heures" }
    ]
  },
  {
    id: 6,
    name: 'Suspension "Lumière"',
    description: "Suspension en papier washi japonais, structure en bambou. Éclairage diffus et apaisant.",
    startingPrice: 120,
    currentBid: 155,
    minBidIncrement: 10,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop",
    category: "Luminaire",
    creator: "Tissus & Patrimoine",
    timeLeft: "6j 3h 40m",
    bids: [
      { bidder: "Pauline R.", amount: 155, time: "Il y a 2 heures" },
      { bidder: "David M.", amount: 145, time: "Il y a 4 heures" },
      { bidder: "Sarah K.", amount: 135, time: "Il y a 6 heures" }
    ]
  }
];

export const partners: Partner[] = [
  {
    id: 1,
    name: "Atelier Bois & Ligne",
    description: "Ébénisterie contemporaine utilisant des essences de bois locales et des techniques traditionnelles.",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    location: "Lyon, France",
    specialty: "Mobilier design sur mesure"
  },
  {
    id: 2,
    name: "Céramiques du Terroir",
    description: "Atelier de céramique artisanale créant des pièces uniques à partir d'argile locale.",
    logo: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=100&h=100&fit=crop",
    location: "Saint-Émilion, France",
    specialty: "Céramique utilitaire et décorative"
  },
  {
    id: 3,
    name: "Tissus & Patrimoine",
    description: "Création textile à partir de matériaux recyclés et de tissus traditionnels réinterprétés.",
    logo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
    location: "Nantes, France",
    specialty: "Textile éco-responsable"
  },
  {
    id: 4,
    name: "Verre & Forme",
    description: "Soufflage de verre artisanal pour des pièces uniques et des collections limitées.",
    logo: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=100&h=100&fit=crop",
    location: "Nancy, France",
    specialty: "Verre soufflé à la bouche"
  },
  {
    id: 5,
    name: "Métal Urbain",
    description: "Design et fabrication de mobilier et d'objets en métal recyclé et acier.",
    logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=100&h=100&fit=crop",
    location: "Paris, France",
    specialty: "Métal travaillé et patiné"
  },
  {
    id: 6,
    name: "Terre & Feu",
    description: "Poterie traditionnelle et contemporaine, atelier familial depuis trois générations.",
    logo: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=100&h=100&fit=crop",
    location: "Provence, France",
    specialty: "Poterie utilitaire et artistique"
  }
];
