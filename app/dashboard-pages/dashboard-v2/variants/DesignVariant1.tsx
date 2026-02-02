'use client'

import { motion } from 'framer-motion'
import { Home, TrendingUp, Settings, LogOut, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DesignVariant1Props {
  user: any
  challenge: any
}

export function DesignVariant1({ user, challenge }: DesignVariant1Props) {
  const mockMatches = [
    { id: 1, home: 'PSG', away: 'Marseille', time: '20:45', odds: { home: 1.95, draw: 3.40, away: 3.80 } },
    { id: 2, home: 'Barcelona', away: 'Real Madrid', time: '21:00', odds: { home: 2.10, draw: 3.20, away: 3.50 } },
  ]

  return (
    <div className="flex gap-0 min-h-screen bg-gray-900">
      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col"
      >
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            JogadorPro
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Home, label: 'Accueil', active: true },
            { icon: Trophy, label: 'Mes Paris', active: false },
            { icon: TrendingUp, label: 'Statut Challenge', active: false },
            { icon: Settings, label: 'Paramètres', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.active
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition">
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Challenge Header */}
        <div className="bg-gray-950 border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-400 text-sm">AC TPT7</span>
                <h3 className="text-white font-bold">Phase 1</h3>
              </div>
              <div className="h-12 w-px bg-gray-800" />
              <div>
                <span className="text-gray-400 text-sm">Paris</span>
                <p className="text-white font-bold">25/25 • Actif: 0</p>
              </div>
              <div className="h-12 w-px bg-gray-800" />
              <div>
                <span className="text-gray-400 text-sm">Solde</span>
                <p className="text-emerald-400 font-bold text-xl">${challenge?.current_balance || 100}</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500">
              Placer un Pick
            </Button>
          </div>
        </div>

        {/* Matches Section */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-xl font-bold text-white mb-4">⚽ Matchs de Football</h3>
          <div className="space-y-3">
            {mockMatches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-gray-500">Aujourd'hui</span>
                      <span className="text-xs font-bold text-orange-400">{match.time}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                          {match.home[0]}
                        </span>
                        <span className="text-white font-medium">{match.home}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                          {match.away[0]}
                        </span>
                        <span className="text-white font-medium">{match.away}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {[
                      { label: match.home.slice(0, 3), odd: match.odds.home },
                      { label: 'Draw', odd: match.odds.draw },
                      { label: match.away.slice(0, 3), odd: match.odds.away },
                    ].map((bet, i) => (
                      <button
                        key={i}
                        className="bg-gray-700/50 hover:bg-emerald-500/20 border border-gray-600 hover:border-emerald-500 rounded-lg px-4 py-3 transition"
                      >
                        <div className="text-xs text-gray-400 mb-1">{bet.label}</div>
                        <div className="text-white font-bold">{bet.odd}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Betslip Sidebar */}
      <motion.aside
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 bg-gray-950 border-l border-gray-800 flex flex-col"
      >
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">🎯 Feuille de Paris</h3>
          <p className="text-sm text-gray-400">Vos sélections de paris</p>
        </div>

        <div className="flex-1 p-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">🎲</span>
            </div>
            <p className="text-gray-400 mb-4">Votre Feuille est Vide</p>
            <p className="text-sm text-gray-500">
              Choisis tes meilleures sélections et commence à parier
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Prêt à dominer les cotes ?</span>
            </div>
          </div>
          <Button disabled className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50">
            Parier
          </Button>
        </div>
      </motion.aside>
    </div>
  )
}
