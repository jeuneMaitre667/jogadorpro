'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, FileText, Trophy, Target, TrendingUp, Bell, Settings, LogOut, ArrowLeft, Award, Clock, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Challenge {
  id: string
  tier: string
  current_balance: number
  target_profit: number
  status: string
  created_at: string
  phase: number
}

// Sample data for charts
const performanceData = [
  { day: 'J1', balance: 1000, target: 1500 },
  { day: 'J2', balance: 1050, target: 1500 },
  { day: 'J3', balance: 1120, target: 1500 },
  { day: 'J4', balance: 1090, target: 1500 },
  { day: 'J5', balance: 1180, target: 1500 },
  { day: 'J6', balance: 1220, target: 1500 },
  { day: 'J7', balance: 1350, target: 1500 },
]

const drawdownData = [
  { day: 'J1', drawdown: 0, maxDrawdown: 0 },
  { day: 'J2', drawdown: -2, maxDrawdown: 2 },
  { day: 'J3', drawdown: 1, maxDrawdown: 2 },
  { day: 'J4', drawdown: -5, maxDrawdown: 5 },
  { day: 'J5', drawdown: 2, maxDrawdown: 5 },
  { day: 'J6', drawdown: 3, maxDrawdown: 5 },
  { day: 'J7', drawdown: 1, maxDrawdown: 5 },
]

// Drawdown rules (same for all challenges)
const DAILY_MAX_DRAWDOWN = 5
const TOTAL_MAX_DRAWDOWN = 10

export default function ChallengeStatusPage() {
  const [user, setUser] = useState<any>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (!authUser) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          router.push('/auth/login')
          return
        }
      } else {
        setUser(authUser)
      }

      const userId = authUser?.id || JSON.parse(localStorage.getItem('user') || '{}').id
      if (userId) {
        const { data: challengeData } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', userId)
          .eq('status', 'active')
          .single()

        if (challengeData) {
          setChallenge(challengeData)
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  const progressPercent = challenge ? (challenge.current_balance / (challenge.current_balance + challenge.target_profit)) * 100 : 0

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Compact Sidebar 80px */}
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
            { icon: Home, label: 'Dashboard', active: false, action: () => router.push('/dashboard-pages/dashboard') },
            { icon: FileText, label: 'Paris', active: false, action: () => router.push('/dashboard-pages/my-bets') },
            { icon: Trophy, label: 'Matchs', active: false, action: () => router.push('/dashboard-pages/matches'), showAsFootball: true },
            { icon: Target, label: 'Challenge', active: true, action: null, color: 'text-pink-400' },
            { icon: TrendingUp, label: 'Stats', active: false, action: null },
            { icon: Bell, label: 'Notifications', active: false, action: null },
            { icon: Settings, label: 'Paramètres', active: false, action: () => router.push('/dashboard-pages/settings') },
          ].map((item) => (
            <button
              key={item.label}
              title={item.label}
              onClick={item.action || undefined}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                item.active
                  ? 'bg-pink-500/20 text-pink-400'
                  : item.label === 'Notifications'
                  ? 'text-yellow-400 hover:bg-yellow-500/10'
                  : item.label === 'Paris'
                  ? 'text-white hover:bg-gray-800'
                  : item.label === 'Challenge'
                  ? 'text-pink-400 hover:bg-pink-500/10'
                  : item.label === 'Paramètres'
                  ? 'text-gray-500 hover:bg-gray-800'
                  : item.label === 'Stats'
                  ? 'text-green-400 hover:bg-green-500/10'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.showAsFootball ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8">
                  <circle cx="12" cy="12" r="9.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                  <path d="M12 7 L14.5 9 L13.5 12 L10.5 12 L9.5 9 Z" fill="#d97706" />
                  <path d="M14.5 9 L16 8 L17 10 L16 12 L14 11" fill="#d97706" />
                  <path d="M9.5 9 L8 8 L7 10 L8 12 L10 11" fill="#d97706" />
                  <path d="M13.5 12 L15 14 L12 15.5 L9 14 L10.5 12" fill="#d97706" />
                  <path d="M12 7 L12 5 L14 6 L14.5 9" fill="#d97706" />
                </svg>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-950 border-b border-gray-800 p-6"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard-pages/dashboard')}
              className="text-gray-400 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">🎯 Statut du Défi</h1>
              <p className="text-gray-400 text-sm mt-1">Suivi de votre progression et performance</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {challenge ? (
            <div className="max-w-4xl space-y-6">
              {/* Challenge Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{challenge.tier} Challenge</h2>
                    <p className="text-gray-400">Phase {challenge.phase}</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-400 font-bold text-sm">
                    {challenge.status.toUpperCase()}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progression</span>
                    <span className="text-pink-400 font-bold">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Solde Actuel</p>
                    <p className="text-white font-bold text-lg">€{challenge.current_balance.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Objectif</p>
                    <p className="text-white font-bold text-lg">€{challenge.target_profit.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">À Gagner</p>
                    <p className="text-white font-bold text-lg">€{(challenge.target_profit - challenge.current_balance).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Award, label: 'Win Rate', value: '0%', color: 'emerald' },
                  { icon: Zap, label: 'ROI', value: '+0%', color: 'blue' },
                  { icon: Clock, label: 'Temps Restant', value: '7 jours', color: 'purple' },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-pink-500/50 transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      <span className="text-xs text-gray-500">aujourd'hui</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Performance Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800/30 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">📈 Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#ec4899"
                      fillOpacity={1}
                      fill="url(#colorBalance)"
                      name="Solde Actuel"
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorTarget)"
                      name="Objectif"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Drawdown Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/30 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">📉 Drawdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={drawdownData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="drawdown"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={{ fill: '#f97316', r: 4 }}
                      name="Drawdown Actuel"
                    />
                    <Line
                      type="stepAfter"
                      dataKey="maxDrawdown"
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Max Drawdown"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Drawdown Rules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">⚠️ Règles de Drawdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Daily Max */}
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-3">Drawdown Journalier Max</p>
                    <div className="mb-3">
                      <div className="text-2xl font-bold text-white mb-2">
                        {DAILY_MAX_DRAWDOWN}%
                      </div>
                      <p className="text-xs text-gray-500">Limite quotidienne</p>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(Math.abs(drawdownData[drawdownData.length - 1].drawdown) / DAILY_MAX_DRAWDOWN) * 100}%` }}
                        className={`h-full ${Math.abs(drawdownData[drawdownData.length - 1].drawdown) > DAILY_MAX_DRAWDOWN ? 'bg-red-500' : 'bg-orange-500'}`}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Actuel: {Math.abs(drawdownData[drawdownData.length - 1].drawdown)}%</p>
                  </div>

                  {/* Total Max */}
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-3">Drawdown Total Max</p>
                    <div className="mb-3">
                      <div className="text-2xl font-bold text-white mb-2">
                        {TOTAL_MAX_DRAWDOWN}%
                      </div>
                      <p className="text-xs text-gray-500">Limite du défi</p>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(drawdownData[drawdownData.length - 1].maxDrawdown / TOTAL_MAX_DRAWDOWN) * 100}%` }}
                        className={`h-full ${drawdownData[drawdownData.length - 1].maxDrawdown > TOTAL_MAX_DRAWDOWN ? 'bg-red-500' : 'bg-yellow-500'}`}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Actuel: {drawdownData[drawdownData.length - 1].maxDrawdown}%</p>
                  </div>
                </div>

                {/* Warning if limits exceeded */}
                {(Math.abs(drawdownData[drawdownData.length - 1].drawdown) > DAILY_MAX_DRAWDOWN ||
                  drawdownData[drawdownData.length - 1].maxDrawdown > TOTAL_MAX_DRAWDOWN) && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-sm">⚠️ Vous approchez des limites de drawdown!</p>
                  </div>
                )}
              </motion.div>

              {/* Challenges Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800/30 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Informations du Défi</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Commencé le</span>
                    <span className="text-white font-medium">
                      {new Date(challenge.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Picks réussis</span>
                    <span className="text-white font-medium">0/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cotes moyennes</span>
                    <span className="text-white font-medium">0.00</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push('/dashboard-pages/matches')}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Placer un Pari
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard-pages/dashboard')}
                  className="flex-1"
                >
                  Retour Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-400 mb-4">Aucun défi actif</p>
              <Button
                onClick={() => router.push('/dashboard-pages/dashboard')}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Retour au Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
