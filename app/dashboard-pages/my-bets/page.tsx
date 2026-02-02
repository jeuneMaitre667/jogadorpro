'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, FileText, Trophy, Target, TrendingUp, Bell, Settings, LogOut, ArrowLeft, Check, X, Clock, Copy } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface Pick {
  id: string
  home_team: string
  away_team: string
  selection: string
  stake: number
  odds: number
  potential_win: number
  status: 'pending' | 'won' | 'lost' | 'cancelled'
  created_at: string
  league: string
  match_commence_time?: string
}

interface Challenge {
  tier: string
  phase: number
  current_balance: number
}

export default function MyBetsPage() {
  const [user, setUser] = useState<any>(null)
  const [picks, setPicks] = useState<Pick[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'won' | 'lost' | 'cancelled'>('all')
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
        // Fetch picks
        const { data: picksData, error: picksError } = await supabase
          .from('picks')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (picksError) {
          console.error('Error fetching picks:', picksError)
        } else if (picksData) {
          setPicks(picksData)
        }

        // Fetch challenge
        const { data: challengeData } = await supabase
          .from('challenges')
          .select('tier, phase, current_balance')
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleCancelPick = async (pickId: string, matchCommenceTime?: string) => {
    // Vérifier que le match n'a pas commencé
    if (matchCommenceTime) {
      const matchStart = new Date(matchCommenceTime).getTime()
      const now = Date.now()
      if (now >= matchStart) {
        alert('❌ Impossible d\'annuler: Le match a déjà commencé')
        return
      }
    }

    if (confirm('⚠️ Êtes-vous sûr de vouloir annuler ce pari ?')) {
      try {
        const { error } = await supabase
          .from('picks')
          .update({ status: 'cancelled' })
          .eq('id', pickId)

        if (error) {
          console.error('Erreur lors de l\'annulation:', error)
          alert('Erreur lors de l\'annulation du pari')
        } else {
          // Mettre à jour l'état local
          setPicks(picks.map(p => p.id === pickId ? { ...p, status: 'cancelled' } : p))
        }
      } catch (error) {
        console.error('Erreur:', error)
        alert('Erreur lors de l\'annulation du pari')
      }
    }
  }

  const isMatchStarted = (matchCommenceTime?: string) => {
    if (!matchCommenceTime) return false
    return new Date(matchCommenceTime).getTime() <= Date.now()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <Check className="w-5 h-5 text-emerald-400" />
      case 'lost':
        return <X className="w-5 h-5 text-red-400" />
      case 'void':
        return <X className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'border-emerald-500/30 bg-emerald-500/5'
      case 'lost':
        return 'border-red-500/30 bg-red-500/5'
      case 'void':
        return 'border-gray-500/30 bg-gray-500/5'
      default:
        return 'border-yellow-500/30 bg-yellow-500/5'
    }
  }

  const stats = {
    all: picks.length,
    pending: picks.filter(p => p.status === 'pending').length,
    won: picks.filter(p => p.status === 'won').length,
    lost: picks.filter(p => p.status === 'lost').length,
    cancelled: picks.filter(p => p.status === 'cancelled').length,
  }

  const filteredPicks = filter === 'all' ? picks : picks.filter(p => p.status === filter)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

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
            { icon: FileText, label: 'Paris', active: true, action: null },
            { icon: Trophy, label: 'Matchs', active: false, action: () => router.push('/dashboard-pages/matches'), showAsFootball: true },
            { icon: Target, label: 'Challenge', active: false, action: () => router.push('/dashboard-pages/challenge-status'), color: 'text-pink-400' },
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
                  ? 'bg-white/20 text-white'
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard-pages/dashboard')}
                className="text-gray-400 hover:text-emerald-400 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">📋 Mes Paris</h1>
                <p className="text-gray-400 text-sm mt-1">Suivez votre historique de paris</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Challenge Header & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {challenge ? `${challenge.tier} Challenge` : 'Challenge'} - Phase {challenge?.phase || 1}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Paris: {stats.all}/25 • Actif: {stats.pending}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Solde</p>
                  <p className="text-2xl font-bold text-white">€{challenge?.current_balance?.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-3">
                {[
                  { key: 'all', label: 'Tous', count: stats.all, color: 'bg-blue-500/20 text-blue-400' },
                  { key: 'pending', label: 'En Attente', count: stats.pending, color: 'bg-yellow-500/20 text-yellow-400' },
                  { key: 'won', label: 'Gagnés', count: stats.won, color: 'bg-emerald-500/20 text-emerald-400' },
                  { key: 'lost', label: 'Perdus', count: stats.lost, color: 'bg-red-500/20 text-red-400' },
                  { key: 'cancelled', label: 'Annulés', count: stats.cancelled, color: 'bg-gray-500/20 text-gray-400' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      filter === tab.key ? tab.color : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-2xl font-bold">{tab.count}</span>
                    <span className="ml-2 text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Picks List */}
            <div className="space-y-4">
              {filteredPicks.length > 0 ? (
                filteredPicks.map((pick, index) => (
                  <motion.div
                    key={pick.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border rounded-xl overflow-hidden ${getStatusColor(pick.status)}`}
                  >
                    {/* Status Bar */}
                    <div className={`h-1 ${
                      pick.status === 'won' ? 'bg-emerald-500'
                      : pick.status === 'lost' ? 'bg-red-500'
                      : pick.status === 'cancelled' ? 'bg-gray-500'
                      : 'bg-yellow-500'
                    }`} />

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            pick.status === 'won' ? 'bg-emerald-500/20'
                            : pick.status === 'lost' ? 'bg-red-500/20'
                            : pick.status === 'cancelled' ? 'bg-gray-500/20'
                            : 'bg-yellow-500/20'
                          }`}>
                            {getStatusIcon(pick.status)}
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">
                              {new Date(pick.created_at).toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })} {new Date(pick.created_at).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-gray-500 font-mono">{pick.id.slice(0, 13)}</p>
                              <button
                                onClick={() => copyToClipboard(pick.id)}
                                className="text-gray-500 hover:text-emerald-400 transition"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Cancel Button - Only for pending picks and before match starts */}
                        {pick.status === 'pending' && !isMatchStarted(pick.match_commence_time) && (
                          <button
                            onClick={() => handleCancelPick(pick.id, pick.match_commence_time)}
                            className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-xs font-semibold hover:bg-red-500/30 transition"
                          >
                            Annuler
                          </button>
                        )}
                      </div>

                      {/* Pick Details */}
                      <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">JP</span>
                          </div>
                        </div>
                        <p className="text-white font-medium text-center mb-1">{pick.selection}</p>
                        <p className="text-gray-400 text-sm text-center">{pick.home_team} vs {pick.away_team}</p>
                        <p className="text-gray-500 text-xs text-center mt-1">{pick.league}</p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-gray-400 text-xs mb-1">Montant du pari</p>
                          <p className="text-white font-bold text-lg">${pick.stake.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-xs mb-1">Cotes Totales</p>
                          <p className="text-orange-400 font-bold text-lg">{pick.odds.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-xs mb-1">Gains</p>
                          <p className={`font-bold text-lg ${
                            pick.status === 'won' ? 'text-emerald-400'
                            : pick.status === 'lost' ? 'text-red-400'
                            : 'text-gray-400'
                          }`}>
                            ${pick.status === 'won' ? pick.potential_win.toFixed(2) : '0.00'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">Aucun pari trouvé</p>
                  <Button
                    onClick={() => router.push('/dashboard-pages/matches')}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    Placer un Pari
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
