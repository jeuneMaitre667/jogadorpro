'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    price: '€49',
    description: 'Pour débuter votre parcours',
    features: [
      '✓ Capital: €1,000',
      '✓ Phase 1: Atteindre 10% profit',
      '✓ Phase 2: Maintenir le profit',
      '✓ P&L en temps réel',
      '✓ Support email',
      '✗ Accès API',
      '✗ Compte financé',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '€249',
    description: 'Le plus populaire',
    features: [
      '✓ Capital: €10,000',
      '✓ Phase 1: Atteindre 10% profit',
      '✓ Phase 2: Maintenir le profit',
      '✓ P&L avancé + Analytics',
      '✓ Support prioritaire',
      '✓ Accès API',
      '✓ Eligible compte financé',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '€749',
    description: 'Pour les traders sérieux',
    features: [
      '✓ Capital: €50,000',
      '✓ Phase 1: Atteindre 8% profit',
      '✓ Phase 2: Maintenir le profit',
      '✓ Dashboard personnalisé',
      '✓ Mentoring exclusif',
      '✓ Accès API + Webhooks',
      '✓ Compte financé garanti',
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JogadorPro
          </a>
          <div className="hidden md:flex gap-8">
            <a href="/" className="text-gray-700 hover:text-green-600 transition">Accueil</a>
            <a href="#pricing" className="text-gray-700 hover:text-green-600 transition">Pricing</a>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Header */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Nos Challenges
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          Choisissez le challenge qui vous convient et commencez votre parcours de trading dès maintenant
        </p>
        <p className="text-lg text-gray-500">
          Tous les prix incluent un accès illimité à la plateforme pendant 60 jours
        </p>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-600 shadow-2xl transform scale-105'
                    : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Ribbon */}
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      ⭐ Recommandé
                    </div>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold text-green-600">{tier.price}</span>
                  <span className="text-gray-600 ml-2">/60 jours</span>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 py-6 text-lg font-semibold ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
                      : 'border-2 border-green-600 text-green-600 hover:bg-green-50'
                  }`}
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  Commencer Maintenant
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  <p className="font-semibold text-gray-900 mb-6">Features inclusos:</p>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Accès complet à tous les outils pendant 60 jours
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Questions Fréquentes</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Puis-je changer de tier?</h3>
              <p className="text-gray-700">
                Oui! Vous pouvez upgrader votre challenge à tout moment. La différence de prix sera calculée au prorata.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Que se passe-t-il si je fais plus de 10% de profit?</h3>
              <p className="text-gray-700">
                Bravo! Vous avez réussi Phase 1. Phase 2 commence immédiatement pour maintenir votre profit et accéder au compte financé.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Puis-je récupérer mon argent?</h3>
              <p className="text-gray-700">
                Bien sûr! Si vous n'êtes pas satisfait, vous pouvez demander un remboursement dans les 7 jours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez 500+ traders qui gagnent déjà avec JogadorPro
          </p>
          <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold">
            Choisir mon Challenge
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2026 JogadorPro. Tous les droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
