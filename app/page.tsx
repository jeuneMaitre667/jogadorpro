'use client'

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/HeroSection"
import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            JogadorPro
          </Link>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-300 hover:text-green-400 transition">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-green-400 transition">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-green-400 transition">Contact</a>
          </div>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 shadow-lg hover:shadow-xl">
              Login
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-16">
        <HeroSection />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Pourquoi JogadorPro?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              La plateforme complète pour trader avec du capital réel
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-700 cursor-pointer"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-4xl mb-4"
              >
                💰
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">Capital Réel</h3>
              <p className="text-gray-300">
                Prouvez vos compétences et obtenez accès à un capital réel jusqu&apos;à €50,000 pour trader
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-700 cursor-pointer"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-3">Split Profits 80/20</h3>
              <p className="text-gray-300">
                Gardez 80% de vos profits. Nous prenons seulement 20% pour les frais d&apos;infrastructure
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-700 cursor-pointer"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Paiement Rapide</h3>
              <p className="text-gray-300">
                Retirez vos profits en 24-48h via virement bancaire sécurisé
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-700 cursor-pointer"
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3">Challenges à Étapes</h3>
              <p className="text-gray-300">
                Phase 1: Qualification. Phase 2: Compte Financé. Gagnez de l&apos;argent à chaque niveau
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-700 cursor-pointer"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3">Dashboard Professionnel</h3>
              <p className="text-gray-300">
                Suivi en temps réel de vos statistiques, P&amp;L, et performance
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-700 cursor-pointer"
            >
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3">Sécurité Garantie</h3>
              <p className="text-gray-300">
                Tous vos données sont chiffrées et vos fonds sont protégés
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-gray-900/50 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Choisissez votre Challenge
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Propulsez votre carrière de trader avec un capital réel
            </p>
          </motion.div>

          {/* Comparison Table - FTMO Style */}
          <div className="overflow-x-auto mb-12">
            <div className="min-w-max inline-block w-full">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {/* Header Column */}
                <div className="bg-transparent p-6">
                  <div className="h-32"></div>
                  <div className="space-y-6 text-gray-400">
                    <div className="flex items-center gap-3 h-12">
                      <span className="text-2xl">🎯</span>
                      <span className="font-semibold">Profit Target</span>
                    </div>
                    <div className="flex items-center gap-3 h-12">
                      <span className="text-2xl">📉</span>
                      <span className="font-semibold">Max. Daily Loss</span>
                    </div>
                    <div className="flex items-center gap-3 h-12">
                      <span className="text-2xl">📊</span>
                      <span className="font-semibold">Max. Loss</span>
                    </div>
                    <div className="flex items-center gap-3 h-12">
                      <span className="text-2xl">📅</span>
                      <span className="font-semibold">Min. trading days</span>
                    </div>
                    <div className="flex items-center gap-3 h-12">
                      <span className="text-2xl">⏱️</span>
                      <span className="font-semibold">Trading Period</span>
                    </div>
                    <div className="flex items-center gap-3 h-12">
                      <span className="text-2xl">💰</span>
                      <span className="font-semibold">Refund</span>
                    </div>
                  </div>
                </div>

                {/* Demo Challenge */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all shadow-xl relative"
                >
                  <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    GRATUIT
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-sm text-gray-400 mb-2">Account</h3>
                    <p className="text-4xl font-bold text-white mb-4">€100</p>
                    <span className="text-xs text-gray-500">(Capital Fictif)</span>
                  </div>
                  
                  <div className="space-y-6 text-center mb-8">
                    <div className="h-12 flex flex-col justify-center">
                      <p className="text-sm text-gray-400">OBJECTIF</p>
                      <p className="font-bold text-green-400">10%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">15%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">15%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">3 jours</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">7 jours</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-green-400">Code -30%</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6 mt-auto">
                    <p className="text-3xl font-bold text-center mb-4 text-green-400">GRATUIT</p>
                    <Link href="/signup" className="block">
                      <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-6">
                        Essayer maintenant
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* 1K Challenge - Best Value */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-green-500 transform scale-105 shadow-2xl relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <span>🔥</span>
                    <span>Best value -20%</span>
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-sm text-gray-400 mb-2">Account</h3>
                    <p className="text-4xl font-bold text-white mb-1">€1,000</p>
                  </div>
                  
                  <div className="space-y-6 text-center mb-8">
                    <div className="h-12 flex flex-col justify-center bg-gray-900/50 rounded">
                      <p className="text-xs text-gray-400">PHASE 1</p>
                      <p className="font-bold text-green-400">25%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">5%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">10%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">15 jours</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">31 jours</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-green-400">Oui <span className="text-green-500">100%</span></p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6 mt-auto">
                    <div className="text-center mb-4">
                      <span className="text-xl text-gray-500 line-through">€61</span>
                      <p className="text-3xl font-bold text-green-400">€49</p>
                    </div>
                    <Link href="/signup" className="block">
                      <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-6 shadow-lg">
                        Commencer maintenant
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* 5K Challenge */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all shadow-xl"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-sm text-gray-400 mb-2">Account</h3>
                    <p className="text-4xl font-bold text-white mb-1">€5,000</p>
                  </div>
                  
                  <div className="space-y-6 text-center mb-8">
                    <div className="h-12 flex flex-col justify-center bg-gray-900/50 rounded">
                      <p className="text-xs text-gray-400">PHASE 1</p>
                      <p className="font-bold text-blue-400">25%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">5%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">10%</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">15 jours</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-white">31 jours</p>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <p className="font-bold text-green-400">Oui <span className="text-green-500">100%</span></p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6 mt-auto">
                    <p className="text-3xl font-bold text-center mb-4 text-blue-400">€139</p>
                    <Link href="/signup" className="block">
                      <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-6">
                        Commencer maintenant
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
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
                Règles de Trading
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
                    <p className="text-xs text-gray-400 mt-3">Limite à atteindre l&apos;objectif trop vite</p>
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
              Conditions d'Échec Immédiat (Auto-Fail)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">DD Journalier &gt; 5%</p>
                    <p className="text-sm text-gray-400">Challenge échoué immédiatement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">DD Total &gt; 10%</p>
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
                    <p className="font-semibold">Stake invalide (&lt;1% ou &gt;5%)</p>
                    <p className="text-sm text-gray-400">Pick refusé par le système</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 px-6 bg-gradient-to-r from-green-400 via-blue-600 to-green-600 relative overflow-hidden">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-800 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-3xl"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-white relative z-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Prêt à commencer?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl mb-8 opacity-90"
          >
            Rejoignez 500+ traders qui gagnent déjà avec JogadorPro
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gray-800 text-green-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold">
                  Créer un compte maintenant
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">JogadorPro</h4>
              <p className="text-sm">La plateforme de prop trading pour les paris sportifs</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Challenges</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">CGU</a></li>
                <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@jogadorpro.com" className="hover:text-white transition">support@jogadorpro.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 JogadorPro. Tous les droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
