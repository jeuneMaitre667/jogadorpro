'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface PickData {
  matchId: string
  homeTeam: string
  awayTeam: string
  selection: string
  odds: number
  league: string
  matchTime: string
  stake: number
}

interface Challenge {
  id: string
  current_balance: number
  tier: string
  phase: number
}

type StoredUser = { id: string }

const getStoredUser = (): StoredUser | null => {
  try {
    const stored = localStorage.getItem('user')
    if (!stored) return null
    const parsed = JSON.parse(stored) as StoredUser
    return parsed?.id ? parsed : null
  } catch {
    return null
  }
}

function PickConfirmationContent() {
  const router = useRouter()
  const [pickData, setPickData] = useState<PickData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<User | StoredUser | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    // Get pick data from URL params
    const params = Object.fromEntries(searchParams.entries())
    if (params.data) {
      try {
        const data = JSON.parse(decodeURIComponent(params.data))
        setPickData(data)
      } catch (e) {
        console.error('Failed to parse pick data:', e)
        setError('Données de pari invalides')
      }
    }

    // Check auth
    const checkAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      const storedUser = getStoredUser()
      if (!authUser) {
        if (storedUser) {
          setUser(storedUser)
        } else {
          router.push('/auth/login')
          return
        }
      } else {
        setUser(authUser)
      }

      // Fetch challenge
      const userId = authUser?.id || storedUser?.id
      if (userId) {
        const { data: challengeData } = await supabase
          .from('challenges')
          .select('id, current_balance, tier, phase')
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
  }, [router, searchParams])

  const handleConfirm = async () => {
    if (!pickData || !challenge || !user) return

    setSubmitting(true)
    setError(null)

    try {
      const userId = user?.id || getStoredUser()?.id

      // Validate balance
      if (pickData.stake > challenge.current_balance * 0.05) {
        throw new Error('Mise supérieure à 5% du solde')
      }

      // Check for duplicate picks on same match
      const { data: existingPicks } = await supabase
        .from('picks')
        .select('id')
        .eq('user_id', userId)
        .eq('match_id', pickData.matchId)
        .eq('status', 'pending')

      if (existingPicks && existingPicks.length > 0) {
        throw new Error('Vous avez déjà un pari en attente sur ce match')
      }

      // Validate match hasn't started
      const matchStartTime = new Date(pickData.matchTime).getTime()
      if (Date.now() >= matchStartTime) {
        throw new Error('Le match a déjà commencé')
      }

      // Insert bet using the bets table
      const insertData = {
        user_id: userId,
        challenge_id: challenge.id,
        bet_type: 'match_winner',
        sport: 'soccer',
        event_description: `${pickData.homeTeam} vs ${pickData.awayTeam}`,
        odds: parseFloat(pickData.odds.toString()),
        stake: parseFloat(pickData.stake.toString()),
        potential_win: pickData.stake * pickData.odds,
        result: 'pending',
        placed_at: new Date().toISOString(),
      }

      const { data, error: insertError } = await supabase
        .from('bets')
        .insert([insertData])
        .select()

      if (insertError) {
        console.error('Supabase insert error:', insertError)
        throw new Error(`Erreur lors du placement du pari: ${insertError.message}`)
      }

      // Success - redirect to my bets
      router.push('/dashboard/my-bets')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMsg)
      console.error('Error placing pick:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!pickData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Données manquantes</h1>
          <p className="text-gray-400 mb-6">Impossible de charger les données du pari</p>
          <Button
            onClick={() => router.push('/dashboard/matches')}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Retour aux matchs
          </Button>
        </div>
      </div>
    )
  }

  const challengeBalance = challenge?.current_balance ?? 0
  const potentialWin = pickData.stake * pickData.odds

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Confirmation du Pari</h1>
            <p className="text-gray-400 text-sm">Vérifiez les détails avant de confirmer</p>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 space-y-6"
        >
          {/* Match Info */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-2">RENCONTRE</p>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{pickData.league}</p>
                    <p className="text-white font-semibold">{pickData.homeTeam}</p>
                  </div>
                  <span className="text-gray-500 text-sm">vs</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">-</p>
                    <p className="text-white font-semibold">{pickData.awayTeam}</p>
                  </div>
                </div>
                <div className="text-center text-xs text-gray-400">
                  {new Date(pickData.matchTime).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  à{' '}
                  {new Date(pickData.matchTime).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            {/* Selection */}
            <div>
              <p className="text-gray-400 text-sm mb-2">VOTRE SÉLECTION</p>
              <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{pickData.selection}</p>
                  <p className="text-xs text-gray-400 mt-1">Cote décimale</p>
                </div>
                <div className="text-right">
                  <p className="text-orange-400 font-bold text-2xl">{pickData.odds.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Stake */}
            <div>
              <p className="text-gray-400 text-sm mb-2">MONTANT DU PARI</p>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <p className="text-white font-bold text-2xl">€{pickData.stake.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {challengeBalance > 0
                    ? ((pickData.stake / challengeBalance) * 100).toFixed(2)
                    : '0.00'}% de votre solde
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Balance */}
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 text-xs mb-2">SOLDE ACTUEL</p>
              <p className="text-white font-bold text-lg">€{challengeBalance.toFixed(2)}</p>
            </div>

            {/* Potential Win */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 text-xs mb-2">GAINS POTENTIELS</p>
              <p className="text-emerald-400 font-bold text-lg">€{potentialWin.toFixed(2)}</p>
            </div>
          </div>

          {/* Rules Alert */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-300">
                <p className="font-semibold mb-1">Règles de gestion du risque</p>
                <ul className="text-xs space-y-1">
                  <li>• Mise entre 1% et 5% du solde</li>
                  <li>• Maximum 5 paris actifs simultanément</li>
                  <li>• Drawdown max 10% d'une journée à l'autre</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={submitting}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50"
          >
            {submitting ? 'Confirmation...' : 'Confirmer le Pari'}
          </Button>
        </motion.div>

        {/* Footer Info */}
        <div className="text-center text-xs text-gray-500">
          <p>En continuant, vous acceptez les conditions générales</p>
          <p>Ce pari ne peut pas être annulé après le démarrage du match</p>
        </div>
      </div>
    </div>
  )
}

export default function PickConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <PickConfirmationContent />
    </Suspense>
  )
}
