'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowRight, TrendingUp, Shield, Zap, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const PRICE_IDS = {
    '1k': process.env.NEXT_PUBLIC_STRIPE_PRICE_1K,
    '2_5k': process.env.NEXT_PUBLIC_STRIPE_PRICE_2_5K,
    '5k': process.env.NEXT_PUBLIC_STRIPE_PRICE_5K,
  }

  const handleCheckout = async (plan: '1k' | '2_5k' | '5k') => {
    const priceId = PRICE_IDS[plan]
    if (!priceId) {
      console.error(`Stripe priceId manquant pour le plan ${plan}`)
      return
    }

    try {
      setLoadingPlan(plan)
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        console.error(data?.error || 'Erreur checkout')
      }
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            JogadorPro
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/#features" className="text-gray-300 hover:text-green-400 transition">Features</Link>
            <Link href="/pricing" className="text-green-400 font-semibold">Pricing</Link>
            <Link href="/#faq" className="text-gray-300 hover:text-green-400 transition">FAQ</Link>
            <Link href="/#contact" className="text-gray-300 hover:text-green-400 transition">Contact</Link>
          </div>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 shadow-lg hover:shadow-xl">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 px-4 py-2 text-sm bg-green-100 text-green-800 border-green-200">
              💰 Prop Trading pour Paris Sportifs
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
          >
            Choisissez Votre Challenge
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Des comptes de trading de €100 à €50,000. Passez nos challenges en 2 phases 
            et tradez avec notre capital. Gardez jusqu'à 80% des profits.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Demo Challenge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all shadow-xl relative flex flex-col h-full"
            >
              <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                GRATUIT
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Demo Challenge</h3>
                <p className="text-4xl font-bold text-green-400 mb-2">€100</p>
                <div className="mt-3 inline-block bg-orange-500/20 border border-orange-500 text-orange-400 px-3 py-1 rounded-full text-xs font-bold">
                  🎁 -30% sur challenge payant
                </div>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Objectif Profit</p>
                  <p className="text-lg font-bold text-green-400">10%</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Max Daily Loss</p>
                  <p className="text-lg font-bold text-white">15%</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Durée</p>
                  <p className="text-lg font-bold text-white">7 jours</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-3xl font-bold text-center mb-4 text-green-400">GRATUIT</p>
                <Link href="/auth/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-3">
                    Commencer gratuitement
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* 1K Challenge - Best Value */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-green-500 shadow-2xl relative flex flex-col h-full lg:scale-105"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <Star className="h-4 w-4" />
                <span>Best value</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Challenge 1K</h3>
                <p className="text-4xl font-bold text-green-400 mb-2">€49</p>
                <p className="text-sm text-gray-400 line-through">€61</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="bg-gray-900/70 border-l-4 border-green-400 p-4 rounded-lg">
                  <p className="text-xs text-green-400 font-bold mb-2">PHASE 1</p>
                  <p className="text-lg font-bold text-white">Objectif: 25%</p>
                  <p className="text-xs text-gray-400 mt-1">31 jours • 20 picks min</p>
                </div>
                
                <div className="bg-gray-900/70 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-xs text-blue-400 font-bold mb-2">PHASE 2</p>
                  <p className="text-lg font-bold text-white">Objectif: 30%</p>
                  <p className="text-xs text-gray-400 mt-1">31 jours • 20 picks min</p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg border border-green-400/30">
                  <p className="text-xs text-green-400 font-bold mb-2">✅ Profit Share</p>
                  <p className="text-2xl font-bold text-white">80/20</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Button
                  onClick={() => handleCheckout('1k')}
                  disabled={loadingPlan === '1k'}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-3 shadow-lg"
                >
                  {loadingPlan === '1k' ? 'Redirection...' : 'Acheter maintenant'}
                </Button>
              </div>
            </motion.div>

            {/* 2.5K Challenge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all shadow-xl flex flex-col h-full"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Challenge 2.5K</h3>
                <p className="text-4xl font-bold text-purple-400 mb-2">€89</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="bg-gray-900/70 border-l-4 border-green-400 p-4 rounded-lg">
                  <p className="text-xs text-green-400 font-bold mb-2">PHASE 1</p>
                  <p className="text-lg font-bold text-white">Objectif: 25%</p>
                  <p className="text-xs text-gray-400 mt-1">31 jours • 20 picks min</p>
                </div>
                
                <div className="bg-gray-900/70 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-xs text-blue-400 font-bold mb-2">PHASE 2</p>
                  <p className="text-lg font-bold text-white">Objectif: 30%</p>
                  <p className="text-xs text-gray-400 mt-1">31 jours • 20 picks min</p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg border border-green-400/30">
                  <p className="text-xs text-green-400 font-bold mb-2">✅ Profit Share</p>
                  <p className="text-2xl font-bold text-white">80/20</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Button
                  onClick={() => handleCheckout('2_5k')}
                  disabled={loadingPlan === '2_5k'}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3"
                >
                  {loadingPlan === '2_5k' ? 'Redirection...' : 'Acheter maintenant'}
                </Button>
              </div>
            </motion.div>

            {/* 5K Challenge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all shadow-xl flex flex-col h-full"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Challenge 5K</h3>
                <p className="text-4xl font-bold text-blue-400 mb-2">€139</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="bg-gray-900/70 border-l-4 border-green-400 p-4 rounded-lg">
                  <p className="text-xs text-green-400 font-bold mb-2">PHASE 1</p>
                  <p className="text-lg font-bold text-white">Objectif: 25%</p>
                  <p className="text-xs text-gray-400 mt-1">31 jours • 20 picks min</p>
                </div>
                
                <div className="bg-gray-900/70 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-xs text-blue-400 font-bold mb-2">PHASE 2</p>
                  <p className="text-lg font-bold text-white">Objectif: 30%</p>
                  <p className="text-xs text-gray-400 mt-1">31 jours • 20 picks min</p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg border border-green-400/30">
                  <p className="text-xs text-green-400 font-bold mb-2">✅ Profit Share</p>
                  <p className="text-2xl font-bold text-white">80/20</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Button
                  onClick={() => handleCheckout('5k')}
                  disabled={loadingPlan === '5k'}
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3"
                >
                  {loadingPlan === '5k' ? 'Redirection...' : 'Acheter maintenant'}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <div className="bg-gray-800/50 backdrop-blur rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-2 text-center">Tableau Comparatif Détaillé</h2>
              <p className="text-gray-400 text-center mb-8">Comparez tous les avantages de chaque challenge</p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Caractéristiques</th>
                      <th className="text-center py-4 px-4 text-green-400 font-bold">Demo</th>
                      <th className="text-center py-4 px-4 text-green-400 font-bold">1K</th>
                      <th className="text-center py-4 px-4 text-purple-400 font-bold">2.5K</th>
                      <th className="text-center py-4 px-4 text-blue-400 font-bold">5K</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Capital de départ</td>
                      <td className="text-center py-4 px-4 text-white font-semibold">€100</td>
                      <td className="text-center py-4 px-4 text-white font-semibold">€1,000</td>
                      <td className="text-center py-4 px-4 text-white font-semibold">€2,500</td>
                      <td className="text-center py-4 px-4 text-white font-semibold">€5,000</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Nombre de phases</td>
                      <td className="text-center py-4 px-4 text-white">1 phase</td>
                      <td className="text-center py-4 px-4 text-white">2 phases</td>
                      <td className="text-center py-4 px-4 text-white">2 phases</td>
                      <td className="text-center py-4 px-4 text-white">2 phases</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Objectif Phase 1</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold">10%</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold">25%</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold">25%</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold">25%</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Objectif Phase 2</td>
                      <td className="text-center py-4 px-4 text-gray-500">-</td>
                      <td className="text-center py-4 px-4 text-blue-400 font-bold">30%</td>
                      <td className="text-center py-4 px-4 text-blue-400 font-bold">30%</td>
                      <td className="text-center py-4 px-4 text-blue-400 font-bold">30%</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Durée par phase</td>
                      <td className="text-center py-4 px-4 text-white">7 jours</td>
                      <td className="text-center py-4 px-4 text-white">31 jours</td>
                      <td className="text-center py-4 px-4 text-white">31 jours</td>
                      <td className="text-center py-4 px-4 text-white">31 jours</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Picks minimum</td>
                      <td className="text-center py-4 px-4 text-white">5</td>
                      <td className="text-center py-4 px-4 text-white">20</td>
                      <td className="text-center py-4 px-4 text-white">20</td>
                      <td className="text-center py-4 px-4 text-white">20</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Max Daily Loss</td>
                      <td className="text-center py-4 px-4 text-white">15%</td>
                      <td className="text-center py-4 px-4 text-white">5%</td>
                      <td className="text-center py-4 px-4 text-white">5%</td>
                      <td className="text-center py-4 px-4 text-white">5%</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Max Total Loss</td>
                      <td className="text-center py-4 px-4 text-white">15%</td>
                      <td className="text-center py-4 px-4 text-white">10%</td>
                      <td className="text-center py-4 px-4 text-white">10%</td>
                      <td className="text-center py-4 px-4 text-white">10%</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Profit Share</td>
                      <td className="text-center py-4 px-4 text-gray-500">-</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold">80%</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold">80%</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold">80%</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Compte financé</td>
                      <td className="text-center py-4 px-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                      <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                      <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                      <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-4 px-4 text-gray-300">Reduction sur challenge</td>
                      <td className="text-center py-4 px-4 text-orange-400 font-bold">-30%</td>
                      <td className="text-center py-4 px-4"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                      <td className="text-center py-4 px-4"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                      <td className="text-center py-4 px-4"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-300 font-bold">Prix</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold text-lg">GRATUIT</td>
                      <td className="text-center py-4 px-4 text-green-400 font-bold text-lg">€49</td>
                      <td className="text-center py-4 px-4 text-purple-400 font-bold text-lg">€89</td>
                      <td className="text-center py-4 px-4 text-blue-400 font-bold text-lg">€139</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Questions Fréquentes</h2>
          <p className="text-gray-400 text-center mb-12">Tout ce que vous devez savoir sur nos challenges</p>
          
          <div className="space-y-4">
            <details className="bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 p-6">
              <summary className="text-lg font-semibold text-white cursor-pointer">
                Que se passe-t-il si je réussis la Phase 1 ?
              </summary>
              <p className="mt-4 text-gray-400">
                Vous passez automatiquement à la Phase 2 sans frais supplémentaires. Vous conservez votre capital et vos gains de Phase 1.
              </p>
            </details>

            <details className="bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 p-6">
              <summary className="text-lg font-semibold text-white cursor-pointer">
                Comment fonctionne le profit share de 80/20 ?
              </summary>
              <p className="mt-4 text-gray-400">
                Une fois votre compte financé, vous gardez 80% de tous vos profits, et JogadorPro prend 20%. Les paiements sont effectués tous les 15 jours.
              </p>
            </details>

            <details className="bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 p-6">
              <summary className="text-lg font-semibold text-white cursor-pointer">
                Puis-je trader sur tous les sports ?
              </summary>
              <p className="mt-4 text-gray-400">
                Oui ! Football, Basketball, Tennis, MMA, eSports... Tous les sports sont autorisés tant que vous respectez les règles de gestion du risque.
              </p>
            </details>

            <details className="bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 p-6">
              <summary className="text-lg font-semibold text-white cursor-pointer">
                Que se passe-t-il si j'échoue un challenge ?
              </summary>
              <p className="mt-4 text-gray-400">
                Vous pouvez racheter le même challenge avec une réduction de 30% si vous avez commencé par le Demo Challenge gratuit.
              </p>
            </details>

            <details className="bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 p-6">
              <summary className="text-lg font-semibold text-white cursor-pointer">
                Y a-t-il une garantie satisfait ou remboursé ?
              </summary>
              <p className="mt-4 text-gray-400">
                Oui ! Garantie 7 jours satisfait ou remboursé sur tous les challenges payants, sans condition.
              </p>
            </details>

            <details className="bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 p-6">
              <summary className="text-lg font-semibold text-white cursor-pointer">
                Combien de temps pour recevoir mon compte financé ?
              </summary>
              <p className="mt-4 text-gray-400">
                Dès que vous réussissez la Phase 2, votre compte financé est activé sous 24-48h. Vous recevez vos identifiants par email.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Commencer Votre Challenge ?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Rejoignez des milliers de traders qui font déjà confiance à JogadorPro
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-lg px-8">
                Commencer Gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#contact">
              <Button size="lg" variant="outline" className="text-lg px-8 border-gray-600 text-gray-300 hover:bg-gray-800">
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 JogadorPro. Tous droits réservés.</p>
          <p className="mt-2 text-sm">Prop Trading pour Paris Sportifs Professionnels</p>
        </div>
      </footer>
    </div>
  )
}
