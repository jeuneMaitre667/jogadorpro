'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { authService } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

// Sample data for charts
const chartData = [
  { name: 'Jan', value: 4200 },
  { name: 'Fév', value: 3800 },
  { name: 'Mar', value: 2000 },
  { name: 'Avr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
]

const pieData = [
  { name: 'Demo', value: 30 },
  { name: '1k', value: 40 },
  { name: '5k', value: 20 },
  { name: 'Elite', value: 10 },
]

const COLORS = ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B']

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [challenges, setChallenges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [winsRate, setWinsRate] = useState(0)
  const [activeFilter, setActiveFilter] = useState<'Actifs' | 'Complétés' | 'Échoués'>('Actifs')
  const router = useRouter()

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Check authentication
        const user = await authService.getUser()
        if (!user) {
          router.push('/auth/login')
          return
        }

        setUser(user)

        // Get active challenges
        const { data: challengesData } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (challengesData) {
          setChallenges(challengesData)

          // Calculate totals
          const activeChallenges = challengesData.filter(ch => ch.status === 'active')
          const balance = activeChallenges.reduce((sum, ch) => sum + (ch.current_balance || 0), 0)
          const profit = activeChallenges.reduce((sum, ch) => sum + ((ch.current_balance || 0) - (ch.initial_balance || 0)), 0)
          
          setTotalBalance(balance)
          setTotalProfit(profit)
          setWinsRate(Math.floor(Math.random() * 100)) // Placeholder: 0-100%
        }

        setLoading(false)
      } catch (err) {
        console.error('Error loading dashboard:', err)
        setLoading(false)
      }
    }

    initDashboard()
  }, [router])

  const handleLogout = async () => {
    await authService.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-300">Chargement du dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            JogadorPro
          </h1>
          <div className="text-center flex-1 mx-4">
            <p className="text-gray-300">Solde: <span className="font-bold text-emerald-400">€{totalBalance.toLocaleString()}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
            >
              Déconnecter
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-100 mb-2">Bienvenue {user?.email?.split('@')[0]} ! 👋</h2>
        <p className="text-gray-500 mb-12">Voici vos statistiques et vos challenges</p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: '💰 Portefeuille', value: `€${totalBalance.toLocaleString()}`, desc: `${challenges.filter(c => c.status === 'active').length} actifs` },
            { label: '📊 P&L Total', value: `${totalProfit >= 0 ? '+' : ''}€${totalProfit.toLocaleString()}`, desc: `${totalProfit >= 0 ? '+' : ''}${totalBalance > 0 ? Math.floor(totalProfit / totalBalance * 100) : 0}% /mois` },
            { label: '⚡ Wins Rate', value: `${winsRate}%`, desc: `${Math.floor(winsRate * 0.3)}/29 trades` },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-gray-800/70 transition"
            >
              <p className="text-gray-400 text-sm mb-3">{kpi.label}</p>
              <p className="text-3xl font-bold text-gray-100 mb-1">{kpi.value}</p>
              <p className="text-gray-500 text-sm">{kpi.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-100">📈 Courbe de Performance</h3>
              <div className="flex gap-2">
                {['Daily', 'Weekly', 'All'].map((period) => (
                  <button
                    key={period}
                    className="px-3 py-1 text-sm rounded-lg bg-gray-700/50 hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-400 transition"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-100 mb-6">🎯 Allocation par Tier</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Challenges Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-100">🚀 CHALLENGES</h3>
            <div className="flex gap-2">
              {(['Actifs', 'Complétés', 'Échoués'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 text-sm rounded-lg transition ${
                    activeFilter === filter
                      ? 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/50'
                      : 'bg-gray-700/50 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {challenges.length > 0 ? (
              challenges.map((challenge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                  onClick={() => router.push(`/dashboard-pages/challenge/${challenge.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {challenge.tier === '1k' ? '🎯' : challenge.tier === '5k' ? '📈' : '💎'}
                    </span>
                    <span className="text-gray-200 font-semibold">
                      {challenge.tier} Challenge
                    </span>
                  </div>
                  <div className="flex items-center gap-12">
                    <span className="text-gray-400">
                      Compte: €{(challenge.current_balance || 0).toLocaleString()}
                    </span>
                    <span className={
                      (challenge.current_balance || 0) >= (challenge.initial_balance || 0)
                        ? 'text-emerald-400 font-semibold'
                        : 'text-red-400 font-semibold'
                    }>
                      Rendement: {((challenge.current_balance || 0) - (challenge.initial_balance || 0)) >= 0 ? '+' : ''}
                      {totalBalance > 0 ? Math.floor(((challenge.current_balance || 0) - (challenge.initial_balance || 0)) / (challenge.initial_balance || 1) * 100) : 0}%
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Aucun challenge pour le moment</p>
                <Link href="/dashboard-pages/create-challenge" className="text-emerald-400 hover:text-emerald-300">
                  Créer un challenge →
                </Link>
              </div>
            )}
          </div>
          <Link href="/dashboard-pages/create-challenge">
            <button className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold transition">
              + CRÉER UN CHALLENGE
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
