'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ChallengeDetailPage() {
  const params = useParams()
  const challengeId = params.id as string
  const [challenge, setChallenge] = useState<any>(null)
  const [bets, setBets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Get challenge
        const { data: challengeData, error: challengeError } = await supabase
          .from('challenges')
          .select('*')
          .eq('id', challengeId)
          .eq('user_id', user.id)
          .single()

        if (challengeError || !challengeData) {
          setError('Challenge non trouvé')
          return
        }

        setChallenge(challengeData)

        // Get bets for this challenge
        const { data: betsData } = await supabase
          .from('bets')
          .select('*')
          .eq('challenge_id', challengeId)
          .order('placed_at', { ascending: false })

        if (betsData) {
          setBets(betsData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur')
      } finally {
        setLoading(false)
      }
    }

    loadChallenge()
  }, [challengeId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Challenge non trouvé'}</p>
          <Button onClick={() => router.push('/dashboard')}>Retour au Dashboard</Button>
        </div>
      </div>
    )
  }

  const progress = ((challenge.current_balance - challenge.initial_balance) / challenge.target_profit) * 100
  const daysElapsed = Math.floor((Date.now() - new Date(challenge.start_date).getTime()) / (1000 * 60 * 60 * 24))
  const wonBets = bets.filter(b => b.result === 'won').length
  const lostBets = bets.filter(b => b.result === 'lost').length
  const pendingBets = bets.filter(b => b.result === 'pending').length
  const winRate = bets.filter(b => b.result !== 'pending').length > 0 
    ? (wonBets / bets.filter(b => b.result !== 'pending').length * 100).toFixed(1)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JogadorPro
          </Link>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
          >
            ← Retour au Dashboard
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 capitalize">{challenge.tier} Challenge</h1>
              <p className="text-gray-600">Phase {challenge.phase} • {challenge.status}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-lg font-semibold ${
              challenge.phase === 1
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              Phase {challenge.phase}
            </span>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Current Balance</p>
            <p className="text-3xl font-bold text-blue-600">
              €{challenge.current_balance.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Profit/Loss</p>
            <p className={`text-3xl font-bold ${
              challenge.current_balance - challenge.initial_balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {challenge.current_balance - challenge.initial_balance >= 0 ? '+' : ''}
              €{(challenge.current_balance - challenge.initial_balance).toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Target Profit</p>
            <p className="text-3xl font-bold text-purple-600">€{challenge.target_profit}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Time Elapsed</p>
            <p className="text-3xl font-bold">{daysElapsed}/60 days</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Progress to Target</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Profit Progress</p>
              <p className="font-semibold">{Math.min(Math.round(progress), 100)}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-600 to-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {Math.round(challenge.current_balance - challenge.initial_balance)} € of {challenge.target_profit} € target
          </p>
        </div>

        {/* Betting Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Bets</p>
            <p className="text-3xl font-bold">{bets.length}</p>
          </div>

          <div className="bg-green-50 rounded-lg shadow p-6 border border-green-200">
            <p className="text-gray-600 text-sm mb-2">Won</p>
            <p className="text-3xl font-bold text-green-600">{wonBets}</p>
          </div>

          <div className="bg-red-50 rounded-lg shadow p-6 border border-red-200">
            <p className="text-gray-600 text-sm mb-2">Lost</p>
            <p className="text-3xl font-bold text-red-600">{lostBets}</p>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow p-6 border border-yellow-200">
            <p className="text-gray-600 text-sm mb-2">Win Rate</p>
            <p className="text-3xl font-bold text-yellow-600">{winRate}%</p>
          </div>
        </div>

        {/* Recent Bets */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Historique des Paris</h2>
          {bets.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Aucun pari placé sur ce challenge</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Sport</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Événement</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Type</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Cote</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Mise</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Gain Potentiel</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Statut</th>
                    <th className="text-right py-4 px-4 text-gray-600 font-semibold">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {bets.map((bet) => (
                    <tr key={bet.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 capitalize">{bet.sport}</td>
                      <td className="py-4 px-4 text-sm">{bet.event_description}</td>
                      <td className="py-4 px-4 capitalize">{bet.bet_type}</td>
                      <td className="py-4 px-4 font-semibold">{bet.odds.toFixed(2)}</td>
                      <td className="py-4 px-4">€{bet.stake.toFixed(2)}</td>
                      <td className="py-4 px-4">€{bet.potential_win.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bet.result === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          bet.result === 'won' ? 'bg-green-100 text-green-800' :
                          bet.result === 'void' ? 'bg-gray-100 text-gray-800' :
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
          )}
        </div>
      </main>
    </div>
  )
}
