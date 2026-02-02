'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface DesignVariant3Props {
  user: any
  challenge: any
}

export function DesignVariant3({ user, challenge }: DesignVariant3Props) {
  const mockMatches = [
    { id: 1, home: 'PSG', away: 'Marseille', time: '20:45', odds: { home: 1.95, draw: 3.40, away: 3.80 } },
    { id: 2, home: 'Barcelona', away: 'Real Madrid', time: '21:00', odds: { home: 2.10, draw: 3.20, away: 3.50 } },
    { id: 3, home: 'Liverpool', away: 'Man City', time: '21:00', odds: { home: 2.20, draw: 3.60, away: 2.62 } },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            JogadorPro
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Bienvenue, <span className="text-white font-medium">{user?.email}</span>
            </span>
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500">
              Nouveau Challenge
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Left Panel - Matches */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-4"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">⚽ Matchs Disponibles</h2>
            
            <div className="space-y-4">
              {mockMatches.map((match) => (
                <div
                  key={match.id}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
                        LIVE • {match.time}
                      </span>
                      <span className="text-gray-400 text-sm">Serie A</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-xl">{match.home[0]}</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">{match.home}</p>
                        <p className="text-gray-400 text-sm">Domicile</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <div>
                        <p className="text-white font-bold text-right">{match.away}</p>
                        <p className="text-gray-400 text-sm text-right">Extérieur</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-xl">{match.away[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button className="bg-gray-800 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500 rounded-lg py-3 transition">
                      <div className="text-gray-400 text-xs mb-1">Victoire {match.home}</div>
                      <div className="text-white font-bold text-lg">{match.odds.home}</div>
                    </button>
                    <button className="bg-gray-800 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500 rounded-lg py-3 transition">
                      <div className="text-gray-400 text-xs mb-1">Match Nul</div>
                      <div className="text-white font-bold text-lg">{match.odds.draw}</div>
                    </button>
                    <button className="bg-gray-800 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500 rounded-lg py-3 transition">
                      <div className="text-gray-400 text-xs mb-1">Victoire {match.away}</div>
                      <div className="text-white font-bold text-lg">{match.odds.away}</div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Stats & Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 space-y-4"
        >
          {/* Challenge Card */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">💎 Challenge Démo</h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                PHASE 1
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Balance Actuelle</span>
                  <span className="text-emerald-400 font-bold">€{challenge?.current_balance || 100}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/50">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Objectif</p>
                  <p className="text-white font-bold">€{challenge?.target_profit || 110}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Progression</p>
                  <p className="text-white font-bold">0%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Picks</p>
                  <p className="text-white font-bold">0/5</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Jours restants</p>
                  <p className="text-white font-bold">7j</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Tracking */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">📊 Performance Tracking</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <span className="text-gray-400 text-sm">Win Rate</span>
                <span className="text-white font-bold">0%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <span className="text-gray-400 text-sm">ROI Moyen</span>
                <span className="text-emerald-400 font-bold">+0%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <span className="text-gray-400 text-sm">Plus longue série</span>
                <span className="text-white font-bold">0</span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">💡 Conseil du jour</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Commence avec des paris à faible risque pour construire ta confiance. 
              Respecte toujours la gestion de bankroll!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
