'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Trophy, Target, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DesignVariant2Props {
  user: any
  challenge: any
}

export function DesignVariant2({ user, challenge }: DesignVariant2Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Top Navigation */}
      <nav className="bg-gray-950/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              JogadorPro
            </h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-medium">
                Dashboard
              </button>
              <button className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition">
                Mes Paris
              </button>
              <button className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition">
                Statistiques
              </button>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500">
            Nouveau Pick
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards Compact */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: DollarSign,
              label: 'Balance',
              value: `€${challenge?.current_balance || 100}`,
              color: 'emerald',
            },
            {
              icon: Target,
              label: 'Objectif',
              value: `€${challenge?.target_profit || 110}`,
              color: 'blue',
            },
            {
              icon: Trophy,
              label: 'Picks',
              value: '0/25',
              color: 'purple',
            },
            {
              icon: TrendingUp,
              label: 'Performance',
              value: '+0%',
              color: 'cyan',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-emerald-500/50 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Challenge Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">📊 Challenge Progress - Phase 1</h3>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
              Actif
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progression vers l'objectif</span>
                <span className="text-white font-medium">0%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-0" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-gray-400 text-sm mb-1">Jours restants</p>
                <p className="text-white font-bold text-lg">7 jours</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Picks minimum</p>
                <p className="text-white font-bold text-lg">5 picks</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Perte max</p>
                <p className="text-red-400 font-bold text-lg">-€15</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6 cursor-pointer hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">⚽</div>
            <h4 className="text-white font-bold mb-2">Matchs Disponibles</h4>
            <p className="text-gray-400 text-sm">Voir tous les matchs et placer des picks</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 cursor-pointer hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">📈</div>
            <h4 className="text-white font-bold mb-2">Historique</h4>
            <p className="text-gray-400 text-sm">Consulter tes paris passés</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 cursor-pointer hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="text-white font-bold mb-2">Stratégie</h4>
            <p className="text-gray-400 text-sm">Optimise ta stratégie de paris</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
