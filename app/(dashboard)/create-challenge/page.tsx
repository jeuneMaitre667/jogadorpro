'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const tiers = [
  {
    id: 'demo',
    name: 'Demo Challenge',
    price: 0,
    initialBalance: 100,
    targetProfitPhase1: 10, // 10% de 100€
    targetProfitPhase2: 0, // Pas de phase 2 pour demo
    maxDailyLoss: 15, // 15% du capital (plus permissif)
    maxTotalLoss: 15, // 15% du capital
    maxDailyGain: 20, // 20% plafond gains journaliers (plus permissif)
    minPicks: 5,
    minActiveDays: 3,
    phaseDuration: 7,
    isDemo: true,
    promoCodeOnSuccess: true,
  },
  {
    id: '1k',
    name: '1K Challenge',
    price: 49,
    initialBalance: 1000,
    targetProfitPhase1: 250, // 25% de 1000€
    targetProfitPhase2: 300, // 30% de 1000€
    maxDailyLoss: 50, // 5% du capital
    maxTotalLoss: 100, // 10% du capital
    maxDailyGain: 80, // 8% plafond gains journaliers
    minPicks: 20,
    minActiveDays: 15,
    phaseDuration: 31,
    isDemo: false,
  },
  {
    id: '5k',
    name: '5K Challenge',
    price: 139,
    initialBalance: 5000,
    targetProfitPhase1: 1250, // 25% de 5000€
    targetProfitPhase2: 1500, // 30% de 5000€
    maxDailyLoss: 250, // 5% du capital
    maxTotalLoss: 500, // 10% du capital
    maxDailyGain: 400, // 8% plafond gains journaliers
    minPicks: 20,
    minActiveDays: 15,
    phaseDuration: 31,
    isDemo: false,
  },
]

export default function CreateChallengePage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUserId(user.id)
    }
    checkAuth()
  }, [router])

  const handleCreateChallenge = async () => {
    if (!selectedTier || !userId) {
      setError('Veuillez sélectionner un tier')
      return
    }

    const tier = tiers.find((t) => t.id === selectedTier)
    if (!tier) return

    setLoading(true)
    setError(null)

    try {
      const { data, error: insertError } = await supabase
        .from('challenges')
        .insert([
          {
            user_id: userId,
            tier: selectedTier,
            price_paid: tier.price,
            status: 'active',
            phase: 1,
            initial_balance: tier.initialBalance,
            current_balance: tier.initialBalance,
            target_profit: tier.targetProfitPhase1,
            max_daily_loss: tier.maxDailyLoss,
            max_total_loss: tier.maxTotalLoss,
          },
        ])
        .select()

      if (insertError) {
        setError(insertError.message)
        return
      }

      // Redirect to challenge details
      if (data && data[0]) {
        router.push(`/dashboard/challenge/${data[0].id}`)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700">
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

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Créer un Challenge
          </h1>
          <p className="text-xl text-gray-400">
            Choisissez votre tier et commencez à trader
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Tier Selection */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`rounded-xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                selectedTier === tier.id
                  ? 'border-green-600 bg-gradient-to-br from-green-900/30 to-blue-900/30 shadow-2xl'
                  : 'border-gray-700 hover:border-gray-300 bg-gray-800'
              }`}
            >
              {tier.price === 0 && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  GRATUIT
                </div>
              )}
              <h3 className="text-3xl font-bold mb-2 text-white">{tier.name}</h3>
              <p className="text-5xl font-bold text-green-400 mb-8">
                {tier.price === 0 ? 'GRATUIT' : `€${tier.price}`}
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-400">💰 Capital {tier.isDemo ? 'Fictif' : 'Initial'}</p>
                  <p className="text-2xl font-bold text-white">€{tier.initialBalance.toLocaleString()}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">📈 {tier.isDemo ? 'Objectif' : 'Phase 1 - Objectif'}</p>
                  <p className="text-xl font-bold text-green-400">
                    +€{tier.targetProfitPhase1} ({Math.round((tier.targetProfitPhase1 / tier.initialBalance) * 100)}%)
                  </p>
                </div>
                {!tier.isDemo && (
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">🚀 Phase 2 - Objectif</p>
                    <p className="text-xl font-bold text-blue-400">
                      +€{tier.targetProfitPhase2} ({Math.round((tier.targetProfitPhase2 / tier.initialBalance) * 100)}%)
                    </p>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gray-400 mb-3">⚠️ Limites de Perte</p>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-300">DD Max</span>
                    <span className="text-sm font-bold text-red-400">
                      -€{tier.maxDailyLoss} ({Math.round((tier.maxDailyLoss / tier.initialBalance) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gray-400 mb-3">📊 Règles</p>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Stake : 1-5% du balance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Max gains/jour : €{tier.maxDailyGain}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Min {tier.minPicks} picks {tier.isDemo ? 'au total' : 'par phase'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Min {tier.minActiveDays} jours actifs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>Durée : {tier.phaseDuration} jours{tier.isDemo ? '' : '/phase'}</span>
                    </div>
                    {tier.promoCodeOnSuccess && (
                      <div className="flex items-center gap-2 text-yellow-400 font-semibold mt-2">
                        <span>🎁</span>
                        <span>Code promo -30% si réussi!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedTier === tier.id && (
                <div className="text-center">
                  <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ✓ Sélectionné
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Challenge Rules */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">📋 Règles Complètes du Challenge</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-400">
                📊 Phase 1 - Qualification (31 jours)
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Objectif : <strong className="text-green-400">+25% profit</strong></li>
                <li>✓ Minimum <strong>20 picks</strong> placés</li>
                <li>✓ Minimum <strong>15 jours actifs</strong> (au moins 1 pick/jour)</li>
                <li>✓ Stake par pick : <strong>1% min - 5% max</strong> du balance</li>
                <li>✓ DD journalier max : <strong>5%</strong> du balance début journée</li>
                <li>✓ DD total max : <strong>10%</strong> du capital initial</li>
                <li>✓ Plafond gains journaliers : <strong>8% max</strong></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-400">
                🚀 Phase 2 - Vérification (31 jours)
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Objectif : <strong className="text-blue-400">+30% profit</strong></li>
                <li>✓ Minimum <strong>20 picks</strong> placés</li>
                <li>✓ Minimum <strong>15 jours actifs</strong></li>
                <li>✓ Mêmes règles de stake et DD</li>
                <li>✓ Délai création : <strong>3 jours</strong> après Phase 1</li>
                <li>✓ Si réussi : <strong>Compte Financé</strong> créé automatiquement</li>
                <li>✓ Profit share : <strong>80% trader / 20% plateforme</strong></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-red-900/20 border border-red-600 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-400">
              ⚠️ Auto-Fail Immédiat
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>❌ DD journalier {'>'} 5% → <strong className="text-red-400">Challenge Failed</strong></li>
              <li>❌ DD total {'>'} 10% → <strong className="text-red-400">Challenge Failed</strong></li>
              <li>❌ Fin des 31 jours sans atteindre objectif → <strong className="text-red-400">Challenge Failed</strong></li>
              <li>❌ Pick avec stake {'<'} 1% ou {'>'} 5% → <strong className="text-red-400">Pick refusé</strong></li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Button
            onClick={handleCreateChallenge}
            disabled={!selectedTier || loading}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold"
          >
            {loading ? 'Création en cours...' : 'Confirmer et Créer le Challenge'}
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  )
}
