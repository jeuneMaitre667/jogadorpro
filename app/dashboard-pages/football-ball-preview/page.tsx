'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function FootballBallPreview() {
  const router = useRouter()

  const designs = [
    {
      id: 1,
      name: 'Classique Noir & Blanc',
      emoji: '⚽',
      recommended: true,
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="0.5">
          <circle cx="12" cy="12" r="10" fill="white" stroke="black" strokeWidth="1" />
          {/* Pentagon au centre */}
          <path d="M12 7 L14.5 9 L13.5 12 L10.5 12 L9.5 9 Z" fill="black" />
          {/* Hexagones autour */}
          <path d="M14.5 9 L16.5 8 L17.5 10 L16 12 L14 11.5" fill="none" stroke="black" strokeWidth="0.8" />
          <path d="M9.5 9 L7.5 8 L6.5 10 L8 12 L10 11.5" fill="none" stroke="black" strokeWidth="0.8" />
          <path d="M13.5 12 L14.5 14.5 L12 15.5 L10 14.5 L10.5 12" fill="none" stroke="black" strokeWidth="0.8" />
          <path d="M12 7 L11.5 5 L13.5 5 L14 7" fill="none" stroke="black" strokeWidth="0.8" />
        </svg>
      ),
      code: `<svg className="w-5 h-5" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="0.5">
  <circle cx="12" cy="12" r="10" fill="white" stroke="black" strokeWidth="1" />
  <path d="M12 7 L14.5 9 L13.5 12 L10.5 12 L9.5 9 Z" fill="black" />
  <path d="M14.5 9 L16.5 8 L17.5 10 L16 12 L14 11.5" fill="none" stroke="black" strokeWidth="0.8" />
  <path d="M9.5 9 L7.5 8 L6.5 10 L8 12 L10 11.5" fill="none" stroke="black" strokeWidth="0.8" />
  <path d="M13.5 12 L14.5 14.5 L12 15.5 L10 14.5 L10.5 12" fill="none" stroke="black" strokeWidth="0.8" />
  <path d="M12 7 L11.5 5 L13.5 5 L14 7" fill="none" stroke="black" strokeWidth="0.8" />
</svg>`,
    },
    {
      id: 2,
      name: 'Hexagones Simples',
      emoji: '⚡',
      recommended: true,
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10" />
          {/* Grille de hexagones */}
          <path d="M12 6 L15 8 L15 11 L12 13 L9 11 L9 8 Z" fill="currentColor" opacity="0.2" />
          <path d="M15 8 L18 6 L18 9 L15 11" fill="none" />
          <path d="M9 8 L6 6 L6 9 L9 11" fill="none" />
          <path d="M12 13 L15 15 L12 17 L9 15" fill="none" />
        </svg>
      ),
      code: `<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6 L15 8 L15 11 L12 13 L9 11 L9 8 Z" fill="currentColor" opacity="0.2" />
  <path d="M15 8 L18 6 L18 9 L15 11" fill="none" />
  <path d="M9 8 L6 6 L6 9 L9 11" fill="none" />
  <path d="M12 13 L15 15 L12 17 L9 15" fill="none" />
</svg>`,
    },
    {
      id: 3,
      name: 'Ballon Plein avec Motifs',
      emoji: '🔥',
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Pentagon */}
          <path d="M12 7 L14.5 9 L13.5 12 L10.5 12 L9.5 9 Z" fill="currentColor" />
          {/* Paires de pentagones */}
          <circle cx="15.5" cy="9" r="1.2" fill="currentColor" opacity="0.6" />
          <circle cx="8.5" cy="9" r="1.2" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="15" r="1.2" fill="currentColor" opacity="0.6" />
        </svg>
      ),
      code: `<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
  <path d="M12 7 L14.5 9 L13.5 12 L10.5 12 L9.5 9 Z" fill="currentColor" />
  <circle cx="15.5" cy="9" r="1.2" fill="currentColor" opacity="0.6" />
  <circle cx="8.5" cy="9" r="1.2" fill="currentColor" opacity="0.6" />
  <circle cx="12" cy="15" r="1.2" fill="currentColor" opacity="0.6" />
</svg>`,
    },
    {
      id: 4,
      name: 'Minimal Géométrique',
      emoji: '✨',
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="12" cy="12" r="10" />
          {/* Pentagone central large */}
          <path d="M12 6.5 L14.8 8.8 L13.8 12 L10.2 12 L9.2 8.8 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.3" />
          {/* Détails autour */}
          <line x1="12" y1="6.5" x2="12" y2="3" />
          <line x1="14.8" y1="8.8" x2="17.5" y2="7" />
          <line x1="9.2" y1="8.8" x2="6.5" y2="7" />
        </svg>
      ),
      code: `<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6.5 L14.8 8.8 L13.8 12 L10.2 12 L9.2 8.8 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.3" />
  <line x1="12" y1="6.5" x2="12" y2="3" />
  <line x1="14.8" y1="8.8" x2="17.5" y2="7" />
  <line x1="9.2" y1="8.8" x2="6.5" y2="7" />
</svg>`,
    },
    {
      id: 5,
      name: 'Ballon Sportif Épuré',
      emoji: '⭐',
      recommended: true,
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          {/* Sections horizontales */}
          <path d="M2 12 Q12 8 22 12" />
          <path d="M2 12 Q12 16 22 12" />
          {/* Pentagon central */}
          <path d="M12 8 L14 10 L13 12 L11 12 L10 10 Z" fill="currentColor" opacity="0.3" />
          {/* Points de contact */}
          <circle cx="12" cy="8" r="0.5" fill="currentColor" />
          <circle cx="14" cy="10" r="0.5" fill="currentColor" />
          <circle cx="10" cy="10" r="0.5" fill="currentColor" />
        </svg>
      ),
      code: `<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <circle cx="12" cy="12" r="10" />
  <path d="M2 12 Q12 8 22 12" />
  <path d="M2 12 Q12 16 22 12" />
  <path d="M12 8 L14 10 L13 12 L11 12 L10 10 Z" fill="currentColor" opacity="0.3" />
  <circle cx="12" cy="8" r="0.5" fill="currentColor" />
  <circle cx="14" cy="10" r="0.5" fill="currentColor" />
  <circle cx="10" cy="10" r="0.5" fill="currentColor" />
</svg>`,
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
          <h1 className="text-3xl font-bold text-white">Designs de Ballon de Foot ⚽</h1>
          <p className="text-gray-400 mt-2">Choisis le design que tu préfères pour ta navigation</p>
        </div>
      </div>

      {/* Designs Grid */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800/50 border rounded-xl p-8 hover:border-emerald-500 transition ${
                design.recommended ? 'border-emerald-500/50' : 'border-gray-700'
              }`}
            >
              {/* Badge */}
              {design.recommended && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                  ⭐ Recommandé
                </div>
              )}

              <div className="flex flex-col items-center gap-6">
                {/* Large Preview */}
                <div className="w-32 h-32 rounded-2xl bg-gray-900 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition">
                  {design.svg}
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{design.name}</p>
                  <p className="text-gray-400 text-sm mt-1">{design.emoji} Option {design.id}</p>
                </div>

                {/* Sidebar Preview */}
                <div className="w-full bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                  <p className="text-gray-500 text-xs mb-2 text-center">En sidebar</p>
                  <div className="flex justify-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/50">
                      <div className="scale-50">
                        {design.svg}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code */}
                <div className="w-full bg-gray-950 rounded-lg p-3 border border-gray-700">
                  <p className="text-gray-500 text-xs mb-2">Code SVG</p>
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    <code>{design.code}</code>
                  </pre>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => {
                    alert(`Design ${design.id} - ${design.name}\n\nTu veux l'utiliser?`)
                  }}
                  className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium transition"
                >
                  Utiliser ce Design
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
