'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function FootballIconsPreview() {
  const router = useRouter()

  const icons = [
    {
      id: 1,
      name: 'Simple Circle - Style FundedStake',
      emoji: '⚽',
      recommended: true,
      svg: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      id: 2,
      name: 'Circle avec Pentagone Central',
      emoji: '🔥',
      recommended: true,
      svg: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8 L14.5 10 L13.5 13 L10.5 13 L9.5 10 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Outline Classique',
      emoji: '✨',
      svg: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3 Q8 8 12 12 Q16 8 12 3 Z" fill="none" />
          <path d="M12 21 Q8 16 12 12 Q16 16 12 21 Z" fill="none" />
        </svg>
      ),
    },
    {
      id: 4,
      name: 'Ballon Épuré',
      emoji: '⭐',
      svg: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="3" x2="12" y2="8" />
          <line x1="12" y1="16" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: 5,
      name: 'Ultra Minimaliste',
      emoji: '🎯',
      recommended: true,
      svg: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      id: 6,
      name: 'Ballon avec Détails Simples',
      emoji: '⚡',
      svg: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7 L13 9 L15 9 L13.5 11 L14 13 L12 12 L10 13 L10.5 11 L9 9 L11 9 Z" fill="none" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/dashboard-pages/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Preview Icônes Ballon de Foot ⚽</h1>
          <p className="text-gray-400 mt-2">Choisis le design qui match le mieux avec ton site</p>
        </div>
      </div>

      {/* Icons Grid */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {icons.map((icon, index) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-800/50 border rounded-xl p-8 hover:border-emerald-500 transition cursor-pointer group ${
                icon.recommended ? 'border-emerald-500/50' : 'border-gray-700'
              }`}
            >
              {/* Recommended Badge */}
              {icon.recommended && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold">
                  Recommandé
                </div>
              )}

              {/* Icon Number */}
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-emerald-400 font-bold">{icon.id}</span>
              </div>

              {/* Icon Display */}
              <div className="flex flex-col items-center gap-6 mt-6">
                {/* Large Preview */}
                <div className="w-32 h-32 rounded-2xl bg-gray-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-gray-400 group-hover:text-emerald-400 transition">
                    {icon.svg}
                  </div>
                </div>

                {/* Icon Info */}
                <div className="text-center">
                  <p className="text-white font-bold mb-1">{icon.name}</p>
                  <p className="text-gray-400 text-sm">Option {icon.id} {icon.emoji}</p>
                </div>

                {/* Preview in Sidebar */}
                <div className="w-full bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-500 text-xs mb-2 text-center">Preview en sidebar</p>
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition">
                      <div className="scale-75">
                        {icon.svg}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => {
                    alert(`Tu as choisi: Option ${icon.id} - ${icon.name}\n\nJe vais maintenant l'appliquer au site!`)
                    // On pourrait stocker le choix dans localStorage ou state
                  }}
                  className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium transition"
                >
                  Choisir Option {icon.id}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">💎 Option Custom</h3>
            <p className="text-gray-300 mb-4">
              Aucun de ces designs ne te plaît? Je peux créer un design complètement personnalisé avec les couleurs emerald/cyan de ton site!
            </p>
            <button className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition">
              Demander un design custom 🎨
            </button>
          </div>
        </motion.div>

        {/* Quick Comparison */}
        <div className="mt-8 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">📊 Comparaison Rapide - Style FundedStake</h3>
          <div className="grid grid-cols-6 gap-4">
            {icons.map((icon) => (
              <div key={icon.id} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gray-900 flex items-center justify-center text-gray-400 mb-2">
                  <div className="scale-50">
                    {icon.svg}
                  </div>
                </div>
                <p className="text-xs text-gray-400">Option {icon.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
