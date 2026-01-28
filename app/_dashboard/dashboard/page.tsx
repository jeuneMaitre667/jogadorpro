'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [challenges, setChallenges] = useState<any[]>([])
  const [bets, setBets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      // Get active challenges
      const { data: challengesData } = await supabase
        .from('challenges')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (challengesData) {
        setChallenges(challengesData)
        
        // Calculate totals
        const balance = challengesData.reduce((sum, ch) => sum + ch.current_balance, 0)
        const profit = challengesData.reduce((sum, ch) => sum + (ch.current_balance - ch.initial_balance), 0)
        setTotalBalance(balance)
        setTotalProfit(profit)
      }

      // Get recent bets
      if (challengesData && challengesData.length > 0) {
        const challengeIds = challengesData.map(ch => ch.id)
        const { data: betsData } = await supabase
          .from('bets')
          .select('*')
          .in('challenge_id', challengeIds)
          .order('placed_at', { ascending: false })
          .limit(10)

        if (betsData) {
          setBets(betsData)
        }
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JogadorPro
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.email}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard 📊</h1>
            <p className="text-gray-600">Bienvenue, {user?.email}!</p>
          </div>
          <Button
            onClick={() => router.push('/dashboard/create-challenge')}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-6"
          >
            + Créer un Challenge
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
            <p className="text-gray-600 text-sm font-semibold">Challenges Actifs</p>
            <p className="text-4xl font-bold text-green-600 mt-4">{challenges.length}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
            <p className="text-gray-600 text-sm font-semibold">Solde Total</p>
            <p className="text-4xl font-bold text-blue-600 mt-4">
              €{totalBalance.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className={`bg-gradient-to-br rounded-lg p-8 border ${
            totalProfit >= 0
              ? 'from-purple-50 to-purple-100 border-purple-200'
              : 'from-red-50 to-red-100 border-red-200'
          }`}>
            <p className="text-gray-600 text-sm font-semibold">Profit/Loss</p>
            <p className={`text-4xl font-bold mt-4 ${
              totalProfit >= 0 ? 'text-purple-600' : 'text-red-600'
            }`}>
              {totalProfit >= 0 ? '+' : ''}€{totalProfit.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Challenges Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Vos Challenges</h2>
          {challenges.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">Vous n'avez pas de challenge actif</p>
              <Button
                onClick={() => router.push('/dashboard/create-challenge')}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Créer votre premier challenge
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge) => {
                const progress = ((challenge.current_balance - challenge.initial_balance) / challenge.target_profit) * 100
                const daysElapsed = Math.floor((Date.now() - new Date(challenge.start_date).getTime()) / (1000 * 60 * 60 * 24))
                
                return (
                  <Link key={challenge.id} href={`/dashboard/challenge/${challenge.id}`}>
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold capitalize">{challenge.tier} Challenge</h3>
                          <p className="text-sm text-gray-600">Phase {challenge.phase}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          challenge.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600">Current Balance</p>
                          <p className="text-2xl font-bold">€{challenge.current_balance.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}</p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <p className="text-sm text-gray-600">Progress vers Target</p>
                            <p className="text-sm font-semibold">{Math.min(Math.round(progress), 100)}%</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Target Profit</p>
                            <p className="font-semibold">€{challenge.target_profit}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Days Elapsed</p>
                            <p className="font-semibold">{daysElapsed}/60</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Bets Section */}
        {bets.length > 0 && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Derniers Paris</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Sport</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Événement</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Cote</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Mise</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Statut</th>
                    <th className="text-right py-4 px-4 text-gray-600 font-semibold">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {bets.map((bet) => (
                    <tr key={bet.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 capitalize">{bet.sport}</td>
                      <td className="py-4 px-4 text-sm">{bet.event_description}</td>
                      <td className="py-4 px-4 font-semibold">{bet.odds.toFixed(2)}</td>
                      <td className="py-4 px-4">€{bet.stake.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bet.result === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          bet.result === 'won' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {bet.result.charAt(0).toUpperCase() + bet.result.slice(1)}
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-right font-bold ${
                        bet.profit_loss === null ? 'text-gray-600' :
                        bet.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {bet.profit_loss === null ? '—' : `${bet.profit_loss >= 0 ? '+' : ''}€${bet.profit_loss.toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
