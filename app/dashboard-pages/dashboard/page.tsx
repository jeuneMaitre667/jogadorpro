'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, TrendingUp, Trophy, Target, DollarSign, Settings, LogOut, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface Challenge {
  id: string
  tier: string
  current_balance: number
  target_profit: number
  status: string
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Mock matches data
  const mockMatches = [
    { id: 1, league: 'Ligue 1', home: 'PSG', away: 'Marseille', time: '20:45', live: true, odds: { home: 1.95, draw: 3.40, away: 3.80 } },
    { id: 2, league: 'La Liga', home: 'Barcelona', away: 'Real Madrid', time: '21:00', live: true, odds: { home: 2.10, draw: 3.20, away: 3.50 } },
    { id: 3, league: 'Premier League', home: 'Liverpool', away: 'Man City', time: '21:00', live: false, odds: { home: 2.20, draw: 3.60, away: 2.62 } },
  ]

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (!authUser) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          router.push('/login')
          return
        }
      } else {
        setUser(authUser)
      }

      const userId = authUser?.id || JSON.parse(localStorage.getItem('user') || '{}').id
      if (userId) {
        const { data: challengesData, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (!error && challengesData) {
          setChallenges(challengesData)
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  const activeChallenge = challenges.find(c => c.status === 'active')

  const stats = [
    { icon: DollarSign, label: 'Balance', value: `€${activeChallenge?.current_balance || 0}`, color: 'emerald', change: '+0%' },
    { icon: Target, label: 'Objectif', value: `€${activeChallenge?.target_profit || 0}`, color: 'blue', change: '+10%' },
    { icon: Trophy, label: 'Win Rate', value: '0%', color: 'purple', change: '0/0' },
    { icon: TrendingUp, label: 'ROI', value: '+0%', color: 'cyan', change: 'Avg' },
  ]

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Compact Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-6"
      >
        <div className="mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">JP</span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-4">
          {[
            { icon: Home, label: 'Dashboard', active: true },
            { icon: Trophy, label: 'Paris', active: false },
            { icon: TrendingUp, label: 'Stats', active: false },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: Settings, label: 'Paramètres', active: false },
          ].map((item) => (
            <button
              key={item.label}
              title={item.label}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                item.active
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Stats Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-950 border-b border-gray-800 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Bienvenue, {user?.email?.split('@')[0]}</h1>
              <p className="text-gray-400 text-sm">
                {activeChallenge ? `Ton challenge ${activeChallenge.tier} est actif • Phase 1` : 'Aucun challenge actif'}
              </p>
            </div>
            <Button 
              onClick={() => router.push('/dashboard-pages/create-challenge')}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            >
              + Nouveau Challenge
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-emerald-500/50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                  <span className="text-xs text-gray-500">{stat.change}</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Matches Panel */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">⚽ Matchs en Direct</h2>
              <div className="flex gap-2">
                {['Tous', 'Live', 'À venir'].map((filter) => (
                  <button
                    key={filter}
                    className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {mockMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedMatch(match.id)}
                  className={`bg-gray-800/50 border rounded-xl p-5 cursor-pointer transition ${
                    selectedMatch === match.id
                      ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {/* Match Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {match.live && (
                        <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          LIVE
                        </span>
                      )}
                      <span className="text-gray-400 text-sm">{match.league}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-orange-400 text-sm font-bold">{match.time}</span>
                    </div>
                    <button className="text-gray-400 hover:text-emerald-400 transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{match.home[0]}</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">{match.home}</p>
                        <p className="text-gray-500 text-xs">Domicile</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <div className="text-right">
                        <p className="text-white font-bold">{match.away}</p>
                        <p className="text-gray-500 text-xs">Extérieur</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{match.away[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Odds Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button className="group bg-gray-900/50 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500 rounded-lg py-4 transition-all">
                      <div className="text-gray-400 group-hover:text-emerald-400 text-xs mb-1">1</div>
                      <div className="text-white group-hover:text-emerald-400 font-bold text-lg">{match.odds.home}</div>
                    </button>
                    <button className="group bg-gray-900/50 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500 rounded-lg py-4 transition-all">
                      <div className="text-gray-400 group-hover:text-emerald-400 text-xs mb-1">X</div>
                      <div className="text-white group-hover:text-emerald-400 font-bold text-lg">{match.odds.draw}</div>
                    </button>
                    <button className="group bg-gray-900/50 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500 rounded-lg py-4 transition-all">
                      <div className="text-gray-400 group-hover:text-emerald-400 text-xs mb-1">2</div>
                      <div className="text-white group-hover:text-emerald-400 font-bold text-lg">{match.odds.away}</div>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Stats Panel */}
          <motion.aside
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-80 bg-gray-950 border-l border-gray-800 overflow-y-auto p-6"
          >
            {/* Challenge Progress */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">💎 Challenge Actif</h3>
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  PHASE 1
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progression</span>
                  <span className="text-emerald-400 font-bold">0%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-0 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Restant</p>
                  <p className="text-white font-bold">7j</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Picks</p>
                  <p className="text-white font-bold">0/5</p>
                </div>
              </div>
            </div>

            {/* Performance Tracking */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 mb-6">
              <h3 className="text-white font-bold mb-4">📊 Performance</h3>
              <div className="space-y-3">
                {[
                  { label: 'Win Rate', value: '0%', bar: 0 },
                  { label: 'Avg Odds', value: '0.00', bar: 0 },
                  { label: 'Best Streak', value: '0', bar: 0 },
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{metric.label}</span>
                      <span className="text-white font-medium">{metric.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                        style={{ width: `${metric.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>Conseil Pro</span>
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Commence avec des cotes entre 1.50 et 2.00 pour minimiser le risque. 
                La constance bat l'agressivité!
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
