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
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Nos Challenges
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choisissez le challenge qui vous convient
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Starter */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-gray-300 mb-6">Pour débuter votre parcours</p>
              <p className="text-5xl font-bold text-green-600 mb-8">€49</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Capital: €1,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Target Profit: €100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Support Email</span>
                </div>
              </div>
              <Link href="/dashboard/create-challenge">
                <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500">
                  Commencer
                </Button>
              </Link>
            </motion.div>

            {/* Pro - Highlighted */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-xl border-2 border-green-600 transform md:scale-105 relative cursor-pointer"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-full text-sm font-bold"
              >
                ⭐ Recommandé
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-300 mb-6">Le plus populaire</p>
              <p className="text-5xl font-bold text-green-600 mb-8">€249</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Capital: €10,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Target Profit: €1,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Support Prioritaire</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Accès API</span>
                </div>
              </div>
              <Link href="/dashboard/create-challenge">
                <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white">
                  Commencer
                </Button>
              </Link>
            </motion.div>

            {/* Elite */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-2">Elite</h3>
              <p className="text-gray-300 mb-6">Pour les traders sérieux</p>
              <p className="text-5xl font-bold text-green-600 mb-8">€749</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Capital: €50,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Target Profit: €5,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Mentoring Exclusif</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Compte Financé Garanti</span>
                </div>
              </div>
              <Link href="/dashboard/create-challenge">
                <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500">
                  Commencer
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
