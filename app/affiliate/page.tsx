'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AffiliatePage() {
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
            <Link href="/#pricing" className="text-gray-300 hover:text-green-400 transition">Pricing</Link>
            <Link href="/affiliate" className="text-green-400 font-semibold">Affiliation</Link>
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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Programme d'Affiliation
            </h1>
            <p className="text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
              Aidez les parieurs à réaliser leur potentiel et soyez récompensés pour vos efforts
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Rejoignez notre programme d'affiliation et gagnez des commissions généreuses en recommandant JogadorPro à votre communauté
            </p>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-xl px-12 py-7 font-semibold shadow-2xl hover:shadow-3xl">
                Rejoindre Maintenant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">
              Pourquoi Devenir Partenaire?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Découvrez tous les avantages de notre programme d'affiliation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-400 transition"
            >
              <div className="text-5xl mb-6">💰</div>
              <h3 className="text-2xl font-bold text-white mb-4">Commissions Généreuses</h3>
              <p className="text-gray-400 leading-relaxed">
                Gagnez de 10% à 20% sur chaque nouveau client que vous recommandez. Plus vous référez de clients, plus vos commissions augmentent avec notre système de paliers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-400 transition"
            >
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">Suivi Professionnel</h3>
              <p className="text-gray-400 leading-relaxed">
                Accédez à un dashboard dédié pour suivre vos clics, conversions, commissions et tous les statistiques importantes en temps réel. Interface intuitive et rapports détaillés.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-400 transition"
            >
              <div className="text-5xl mb-6">🎁</div>
              <h3 className="text-2xl font-bold text-white mb-4">Challenges Gratuits</h3>
              <p className="text-gray-400 leading-relaxed">
                Atteignez les niveaux Gold et Platinum pour recevoir des challenges gratuits (1K ou 5K) à offrir à votre communauté ou à utiliser vous-même.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-400 transition"
            >
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-4">Approbation Immédiate</h3>
              <p className="text-gray-400 leading-relaxed">
                Les commissions sont approuvées automatiquement dès que votre client démarre son challenge. Retraits traités rapidement en quelques jours ouvrés. Plusieurs devises supportées.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-400 transition"
            >
              <div className="text-5xl mb-6">🛠️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Outils Marketing</h3>
              <p className="text-gray-400 leading-relaxed">
                Recevez des bannières, logos, vidéos et liens personnalisés pour promouvoir JogadorPro efficacement sur vos plateformes et réseaux sociaux.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-400 transition"
            >
              <div className="text-5xl mb-6">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-4">Classement des Affiliés</h3>
              <p className="text-gray-400 leading-relaxed">
                Découvrez les meilleurs affiliés du mois et inspirez-vous de leur succès. Rejoignez le leaderboard et maximisez vos gains en voyant ce qui fonctionne.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tier System */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Niveaux de Partenariat</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              4 paliers progressifs avec des commissions et avantages croissants
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Bronze */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-orange-900/20 to-gray-800 rounded-xl p-8 border-2 border-orange-600"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">🥉</div>
                <h4 className="text-3xl font-bold text-orange-400">Bronze</h4>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Commission</p>
                  <p className="text-2xl font-bold text-white">10%</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Minimum mensuel</p>
                  <p className="text-2xl font-bold text-white">€0</p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Tableau de bord
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Liens personnalisés
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">✗</span> Challenge gratuit
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Silver */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-400/20 to-gray-800 rounded-xl p-8 border-2 border-gray-400"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">🥈</div>
                <h4 className="text-3xl font-bold text-gray-300">Silver</h4>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Commission</p>
                  <p className="text-2xl font-bold text-white">12%</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Minimum mensuel</p>
                  <p className="text-2xl font-bold text-white">€250</p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Tout Bronze +
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Support prioritaire
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">✗</span> Challenge gratuit
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Gold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-600/30 to-gray-800 rounded-xl p-8 border-2 border-yellow-500 scale-105 shadow-2xl shadow-yellow-500/20"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                POPULAIRE
              </div>
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">🥇</div>
                <h4 className="text-3xl font-bold text-yellow-400">Gold</h4>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Commission</p>
                  <p className="text-2xl font-bold text-white">15%</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Minimum mensuel</p>
                  <p className="text-2xl font-bold text-white">€1,000</p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Tout Silver +
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> <strong>Challenge 1K gratuit</strong>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Matériel marketing
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Platinum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-600/30 to-gray-800 rounded-xl p-8 border-2 border-blue-400 shadow-xl shadow-blue-400/20"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">💎</div>
                <h4 className="text-3xl font-bold text-blue-400">Platinum</h4>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Commission</p>
                  <p className="text-2xl font-bold text-white">20%</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Minimum mensuel</p>
                  <p className="text-2xl font-bold text-white">€2,500</p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Tout Gold +
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> <strong>Challenge 5K gratuit</strong>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span> Deals personnalisés
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Comment Ça Marche?</h2>
            <p className="text-xl text-gray-400">3 étapes simples pour commencer à gagner</p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex gap-6 items-start bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Inscription</h3>
                <p className="text-gray-400 leading-relaxed">
                  Créez votre compte affilié gratuitement. Vous recevrez immédiatement vos liens personnalisés et accès à votre dashboard de suivi.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-6 items-start bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Promotion</h3>
                <p className="text-gray-400 leading-relaxed">
                  Partagez vos liens sur vos réseaux sociaux, blog, YouTube, Discord, etc. Utilisez nos bannières et contenus prêts à l'emploi pour maximiser vos conversions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-6 items-start bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Gagnez des Commissions</h3>
                <p className="text-gray-400 leading-relaxed">
                  Recevez 10-20% de commission pour chaque nouveau client qui s'inscrit via votre lien. Commissions approuvées automatiquement et versées rapidement.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Prêt à Commencer?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez des centaines d'affiliés qui gagnent déjà des commissions en recommandant JogadorPro
            </p>
            <Link href="/signup">
              <Button className="bg-white text-green-600 hover:bg-gray-100 text-xl px-12 py-7 font-semibold shadow-2xl hover:shadow-3xl">
                Rejoindre le Programme
              </Button>
            </Link>
            <p className="text-white/80 mt-6 text-sm">
              Inscription gratuite • Commissions dès le premier client • Support 24/7
            </p>
          </motion.div>
        </div>
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
                <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/affiliate" className="hover:text-white transition text-green-400">Programme Affiliation</Link></li>
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
