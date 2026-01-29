export const pricingTiers = [
  {
    id: 'demo',
    name: 'Demo Challenge',
    price: 0,
    capital: 100,
    targetProfit: 10,
    maxDailyLoss: 15,
    maxTotalLoss: 15,
    period: '7 jours',
    features: [
      'Capital virtuel',
      'Test sans risque',
      'Toutes les fonctionnalités',
      'Pas de limite de temps'
    ],
    cta: 'Essayer gratuitement',
    popular: false
  },
  {
    id: '1k',
    name: 'Challenge 1K',
    price: 49,
    capital: 1000,
    targetProfit: 250,
    maxDailyLoss: 50,
    maxTotalLoss: 100,
    period: '31 jours',
    features: [
      '2 Phases (25% → 30%)',
      'Profit Share 80/20',
      'Support prioritaire',
      'Dashboard avancé'
    ],
    cta: 'Commencer',
    popular: true
  },
  {
    id: '2.5k',
    name: 'Challenge 2.5K',
    price: 89,
    capital: 2500,
    targetProfit: 625,
    maxDailyLoss: 125,
    maxTotalLoss: 250,
    period: '31 jours',
    features: [
      '2 Phases (25% → 30%)',
      'Profit Share 80/20',
      'Support prioritaire',
      'Dashboard avancé'
    ],
    cta: 'Commencer',
    popular: false
  },
  {
    id: '5k',
    name: 'Challenge 5K',
    price: 139,
    capital: 5000,
    targetProfit: 1250,
    maxDailyLoss: 250,
    maxTotalLoss: 500,
    period: '31 jours',
    features: [
      '2 Phases (25% → 30%)',
      'Profit Share 80/20',
      'Support VIP',
      'Dashboard avancé'
    ],
    cta: 'Commencer',
    popular: false
  }
];

export const testimonials = [
  {
    name: 'Thomas M.',
    role: 'Trader Pro',
    content: 'JogadorPro a changé ma vie. J\'ai validé le challenge 1K en 3 semaines et maintenant je trade avec du capital réel.',
    rating: 5,
    avatar: 'TM'
  },
  {
    name: 'Sarah L.',
    role: 'Débutante',
    content: 'Interface intuitive et support réactif. Le challenge démo m\'a permis de m\'entraîner sans risque.',
    rating: 5,
    avatar: 'SL'
  },
  {
    name: 'Marc D.',
    role: 'Trader Expert',
    content: 'Les règles sont claires et les paiements sont rapides. Meilleure plateforme de prop trading sportif.',
    rating: 5,
    avatar: 'MD'
  }
];
