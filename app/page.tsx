'use client'

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/HeroSection"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            JogadorPro
          </Link>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-300 hover:text-green-400 transition">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-green-400 transition">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-green-400 transition">FAQ</a>
            <a href="#contact" className="text-gray-300 hover:text-green-400 transition">Contact</a>
          </div>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 shadow-lg hover:shadow-xl">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pourquoi Choisir JogadorPro?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              La plateforme complète pour les traders sportifs professionnels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 p-8 rounded-xl hover:border-green-400/50 transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">Suivi en Temps Réel</h3>
              <p className="text-gray-400">
                Suivez vos performances avec des statistiques détaillées et des graphiques interactifs
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 p-8 rounded-xl hover:border-green-400/50 transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Challenges Personnalisés</h3>
              <p className="text-gray-400">
                Créez et participez à des challenges adaptés à votre niveau et stratégie
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 p-8 rounded-xl hover:border-green-400/50 transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">Gains Réels</h3>
              <p className="text-gray-400">
                Débloquez des récompenses et montez en niveau pour gagner plus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - FTMO Style */}
      <section id="pricing" className="py-24 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Nos Challenges
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choisissez le challenge adapté à vos ambitions
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
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
                  <p className="text-xs text-gray-400 mb-1">Max Total Loss</p>
                  <p className="text-lg font-bold text-white">15%</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Periode de Trading</p>
                  <p className="text-lg font-bold text-white">7 jours</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-3xl font-bold text-center mb-4 text-green-400">GRATUIT</p>
                <Link href="/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-3">
                    Essayer maintenant
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
                <span>🔥</span>
                <span>Best value</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Challenge 1K</h3>
                <p className="text-4xl font-bold text-green-400 mb-2">€49</p>
                <p className="text-sm text-gray-400 line-through">€61</p>
                <p className="text-xs text-green-400 font-semibold mt-2">📊 2 Phases</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                {/* Phase 1 */}
                <div className="bg-gray-900/70 border-l-4 border-green-400 p-4 rounded-lg">
                  <p className="text-xs text-green-400 font-bold mb-2">PHASE 1 - Qualification</p>
                  <p className="text-lg font-bold text-white">Objectif: 25%</p>
                  <p className="text-xs text-gray-400 mt-1">Durée: 31 jours</p>
                </div>
                
                {/* Phase 2 */}
                <div className="bg-gray-900/70 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-xs text-blue-400 font-bold mb-2">PHASE 2 - Vérification</p>
                  <p className="text-lg font-bold text-white">Objectif: 30%</p>
                  <p className="text-xs text-gray-400 mt-1">Durée: 31 jours</p>
                </div>

                {/* Trading Rules */}
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-xs text-purple-400 font-bold mb-2">📋 Règles</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">✓ Picks min: 20 par phase</p>
                    <p className="text-xs text-gray-300">✓ Jours actifs: 15/31 jours</p>
                    <p className="text-xs text-gray-300">✓ Stake: 1-5% du balance</p>
                    <p className="text-xs text-gray-300">✓ DD journalier: max 5%</p>
                    <p className="text-xs text-gray-300">✓ DD total: max 10%</p>
                  </div>
                </div>

                {/* Phase Completion */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-green-400/30">
                  <p className="text-xs text-green-400 font-bold mb-2">✅ Phase Completion</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">Phase 1 Passed → Phase 2 Auto</p>
                    <p className="text-xs text-gray-300">Phase 2 Passed → Compte Financé</p>
                    <p className="text-xs text-gray-300">Profit Share: 80/20</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Link href="/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-3 shadow-lg">
                    Commencer maintenant
                  </Button>
                </Link>
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
                <p className="text-xs text-purple-400 font-semibold mt-2">📊 2 Phases</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                {/* Phase 1 */}
                <div className="bg-gray-900/70 border-l-4 border-green-400 p-4 rounded-lg">
                  <p className="text-xs text-green-400 font-bold mb-2">PHASE 1 - Qualification</p>
                  <p className="text-lg font-bold text-white">Objectif: 25%</p>
                  <p className="text-xs text-gray-400 mt-1">Durée: 31 jours</p>
                </div>
                
                {/* Phase 2 */}
                <div className="bg-gray-900/70 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-xs text-blue-400 font-bold mb-2">PHASE 2 - Vérification</p>
                  <p className="text-lg font-bold text-white">Objectif: 30%</p>
                  <p className="text-xs text-gray-400 mt-1">Durée: 31 jours</p>
                </div>

                {/* Trading Rules */}
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-xs text-purple-400 font-bold mb-2">📋 Règles</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">✓ Picks min: 20 par phase</p>
                    <p className="text-xs text-gray-300">✓ Jours actifs: 15/31 jours</p>
                    <p className="text-xs text-gray-300">✓ Stake: 1-5% du balance</p>
                    <p className="text-xs text-gray-300">✓ DD journalier: max 5%</p>
                    <p className="text-xs text-gray-300">✓ DD total: max 10%</p>
                  </div>
                </div>

                {/* Phase Completion */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-green-400/30">
                  <p className="text-xs text-green-400 font-bold mb-2">✅ Phase Completion</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">Phase 1 Passed → Phase 2 Auto</p>
                    <p className="text-xs text-gray-300">Phase 2 Passed → Compte Financé</p>
                    <p className="text-xs text-gray-300">Profit Share: 80/20</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Link href="/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3">
                    Commencer maintenant
                  </Button>
                </Link>
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
                <p className="text-xs text-blue-400 font-semibold mt-2">📊 2 Phases</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                {/* Phase 1 */}
                <div className="bg-gray-900/70 border-l-4 border-green-400 p-4 rounded-lg">
                  <p className="text-xs text-green-400 font-bold mb-2">PHASE 1 - Qualification</p>
                  <p className="text-lg font-bold text-white">Objectif: 25%</p>
                  <p className="text-xs text-gray-400 mt-1">Durée: 31 jours</p>
                </div>
                
                {/* Phase 2 */}
                <div className="bg-gray-900/70 border-l-4 border-blue-400 p-4 rounded-lg">
                  <p className="text-xs text-blue-400 font-bold mb-2">PHASE 2 - Vérification</p>
                  <p className="text-lg font-bold text-white">Objectif: 30%</p>
                  <p className="text-xs text-gray-400 mt-1">Durée: 31 jours</p>
                </div>

                {/* Trading Rules */}
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-xs text-purple-400 font-bold mb-2">📋 Règles</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">✓ Picks min: 20 par phase</p>
                    <p className="text-xs text-gray-300">✓ Jours actifs: 15/31 jours</p>
                    <p className="text-xs text-gray-300">✓ Stake: 1-5% du balance</p>
                    <p className="text-xs text-gray-300">✓ DD journalier: max 5%</p>
                    <p className="text-xs text-gray-300">✓ DD total: max 10%</p>
                  </div>
                </div>

                {/* Phase Completion */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-green-400/30">
                  <p className="text-xs text-green-400 font-bold mb-2">✅ Phase Completion</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">Phase 1 Passed → Phase 2 Auto</p>
                    <p className="text-xs text-gray-300">Phase 2 Passed → Compte Financé</p>
                    <p className="text-xs text-gray-300">Profit Share: 80/20</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Link href="/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3">
                    Commencer maintenant
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm"
          >
            <p>Tous les prix sont des paiements uniques. Remboursement à 100% après réussite des phases.</p>
          </motion.div>

          {/* Comparison Section - Old Way vs JogadorPro Way */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">
                <span className="text-white">Votre Bankroll</span>
                {' '}
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">VS</span>
                {' '}
                <span className="text-white">JogadorPro</span>
              </h2>
              <p className="text-xl text-gray-400">La différence est claire. JogadorPro gagne.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* The Old Way */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700"
              >
                <h3 className="text-2xl font-bold text-gray-300 mb-8 text-center">L&apos;Ancienne Méthode</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p>Bankroll limitée qui vous freine</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p>Risquer votre propre argent sur chaque pick</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p>Aucune structure, juste des paris hasardeux</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p>Difficile de suivre vos picks et profits</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p>Retraits compliqués et lents</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">✕</span>
                    </div>
                    <p>Aucun support ni accompagnement</p>
                  </div>
                </div>
              </motion.div>

              {/* The JogadorPro Way */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-green-400/10 to-blue-400/10 backdrop-blur rounded-2xl p-8 border-2 border-green-400/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 blur-3xl"></div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-8 text-center relative">
                  La Méthode <span className="font-black">JogadorPro</span>
                </h3>
                <div className="space-y-4 relative">
                  <div className="flex items-start gap-4 text-gray-200">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <p>Réussissez le Challenge et scalez vos picks sans limite</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-200">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <p>Aucun capital personnel</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-200">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <p>Suivi simple et clair de vos profits et paiements</p>
                  </div>
                  <div className="flex items-start gap-4 text-gray-200">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <p>Paiements rapides</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Rules Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Règles Complètes du Challenge
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprendre les règles pour réussir votre challenge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Side - Phases */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                <span className="text-4xl">📅</span>
                Structure des Phases
              </h3>
              
              <div className="space-y-6">
                {/* Phase 1 */}
                <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-400">
                  <h4 className="text-2xl font-bold text-green-400 mb-4">Phase 1 - Qualification</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Objectif Profit</p>
                        <p className="text-sm text-gray-400">+25% du capital initial</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Durée</p>
                        <p className="text-sm text-gray-400">31 jours calendaires</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Picks Minimum</p>
                        <p className="text-sm text-gray-400">20 trades par phase</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Jours Actifs Minimum</p>
                        <p className="text-sm text-gray-400">15 jours sur 31 (min 1 pick/jour)</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Phase 2 */}
                <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-400">
                  <h4 className="text-2xl font-bold text-blue-400 mb-4">Phase 2 - Vérification</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Objectif Profit</p>
                        <p className="text-sm text-gray-400">+30% du capital initial</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Durée</p>
                        <p className="text-sm text-gray-400">31 jours calendaires</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Création</p>
                        <p className="text-sm text-gray-400">3 jours après succès Phase 1</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Si Réussi</p>
                        <p className="text-sm text-gray-400">Compte Financé créé (80/20 profit share)</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Trading Rules */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                <span className="text-4xl">⚙️</span>
                Règles du Challenge
              </h3>
              
              <div className="space-y-4">
                {/* Stake Rules */}
                <div className="bg-gray-800 rounded-xl p-6 border-t-2 border-orange-400">
                  <h4 className="text-xl font-bold text-orange-400 mb-4">💰 Stake (Mise)</h4>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded">
                      <span>Minimum par pick:</span>
                      <span className="font-bold text-orange-400">1% du balance actuel</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded">
                      <span>Maximum par pick:</span>
                      <span className="font-bold text-orange-400">5% du balance actuel</span>
                    </div>
                  </div>
                </div>

                {/* Drawdown Rules */}
                <div className="bg-gray-800 rounded-xl p-6 border-t-2 border-red-400">
                  <h4 className="text-xl font-bold text-red-400 mb-4">📉 Drawdown (Perte Autorisée)</h4>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded">
                      <span>Max Daily Loss (DD journalier):</span>
                      <span className="font-bold text-red-400">5% du balance début journée</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded">
                      <span>Max Total Loss (DD total):</span>
                      <span className="font-bold text-red-400">10% du capital initial</span>
                    </div>
                    <p className="text-xs text-red-400 mt-3 font-semibold">⚠️ Dépassement = Fail Immédiat</p>
                  </div>
                </div>

                {/* Gains Rules */}
                <div className="bg-gray-800 rounded-xl p-6 border-t-2 border-green-400">
                  <h4 className="text-xl font-bold text-green-400 mb-4">🎯 Plafond Gains Journaliers</h4>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded">
                      <span>Gains max par jour:</span>
                      <span className="font-bold text-green-400">8% du capital initial</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Limite pour ne pas atteindre l&apos;objectif trop vite</p>
                  </div>
                </div>

                {/* Trading Requirements */}
                <div className="bg-gray-800 rounded-xl p-6 border-t-2 border-purple-400">
                  <h4 className="text-xl font-bold text-purple-400 mb-4">📈 Exigences de Trading</h4>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded">
                      <span>Picks minimum:</span>
                      <span className="font-bold text-purple-400">20 par phase</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded">
                      <span>Jours actifs:</span>
                      <span className="font-bold text-purple-400">15/31 jours minimum</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Minimum 1 pick par jour actif requis</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Auto-Fail Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-red-900/20 border-2 border-red-600 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
              <span>⛔</span>
              Conditions d&apos;Échec Immédiat (Auto-Fail)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">DD Journalier supérieur à 5%</p>
                    <p className="text-sm text-gray-400">Challenge échoué immédiatement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">DD Total supérieur à 10%</p>
                    <p className="text-sm text-gray-400">Challenge échoué immédiatement</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">Fin des 31 jours sans objectif</p>
                    <p className="text-sm text-gray-400">Challenge échoué automatiquement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">Stake invalide: moins de 1% ou plus de 5%</p>
                    <p className="text-sm text-gray-400">Pick refusé par le système</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Comment ça Marche?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Trois étapes simples pour commencer votre parcours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 h-full hover:border-green-400/50 transition">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-white mb-4">S&apos;inscrire</h3>
                  <p className="text-gray-400">
                    Créez votre compte gratuit et choisissez le challenge qui vous correspond
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 h-full hover:border-blue-400/50 transition">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-white mb-4">Trader</h3>
                  <p className="text-gray-400">
                    Passez vos picks selon les règles du challenge en 31 jours
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 h-full hover:border-green-400/50 transition">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-white mb-4">Financé</h3>
                  <p className="text-gray-400">
                    Réussissez et accédez à votre compte financé avec profit sharing
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-300">
              Trouvez les réponses à vos questions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* FAQ Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-400/50 transition"
            >
              <h3 className="text-lg font-bold text-green-400 mb-3">⏱️ Combien de temps pour valider?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Vous avez 31 jours calendaires pour atteindre l&apos;objectif profit requis. Une fois complété, votre compte financé est créé dans les 3 jours ouvrables.
              </p>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-400/50 transition"
            >
              <h3 className="text-lg font-bold text-blue-400 mb-3">🔄 Puis-je retenter si j&apos;échoue?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Absolument! Vous pouvez retenter le challenge autant de fois que vous le souhaitez. Nous vous donnons une chance illimitée de réussir et d&apos;accéder à votre compte financé.
              </p>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-400/50 transition"
            >
              <h3 className="text-lg font-bold text-green-400 mb-3">💰 Comment sont versés les profits?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Les profits sont versés tous les 30 jours une fois votre compte financé activé. Vous recevez votre part selon le profit sharing de votre tier (80/20 par défaut). Les paiements sont rapides et sécurisés.
              </p>
            </motion.div>

            {/* FAQ Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-400/50 transition"
            >
              <h3 className="text-lg font-bold text-purple-400 mb-3">📊 Puis-je trader n&apos;importe quand?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Oui! Il n&apos;y a pas de restrictions d&apos;horaires. Vous pouvez trader quand vous le souhaitez durant les 31 jours du challenge, tant que vous respectez les règles de stake et drawdown.
              </p>
            </motion.div>

            {/* FAQ Item 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-pink-400/50 transition"
            >
              <h3 className="text-lg font-bold text-pink-400 mb-3">🎯 Qu&apos;est-ce qu&apos;un compte financé?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Une fois vos phases validées, vous accédez à un compte avec capital réel. Vous tradez sur cet argent et partagez les profits générés selon votre tier (80/20).
              </p>
            </motion.div>

            {/* FAQ Item 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-400/50 transition"
            >
              <h3 className="text-lg font-bold text-orange-400 mb-3">❌ Qu&apos;est-ce qui me fait échouer?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Dépassement du DD journalier (5%), DD total (10%), fin de la période sans atteindre l&apos;objectif, ou stake invalide. Les règles sont strictes pour votre propre protection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-400/10 to-blue-400/10 backdrop-blur border border-green-400/30 rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à Commencer?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Rejoignez des milliers de traders qui font déjà confiance à JogadorPro
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-lg px-8">
                  Créer un Compte
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950/95 border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                JogadorPro
              </h3>
              <p className="text-gray-400 text-sm">
                La plateforme de trading sportif la plus avancée du marché
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produit</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-green-400 transition text-sm">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-green-400 transition text-sm">Pricing</a></li>
                <li><Link href="/affiliate" className="text-gray-400 hover:text-green-400 transition text-sm">Affiliation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Guides</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-green-400 transition text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">CGU</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 JogadorPro. Tous les droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
