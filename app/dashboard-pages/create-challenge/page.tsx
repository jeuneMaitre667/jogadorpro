'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { authService } from '@/lib/auth'
import { challengeService } from '@/lib/challenges'
import type { ChallengeTier } from '@/lib/types'

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
  const [selectedTier, setSelectedTier] = useState<ChallengeTier | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getUser()
        if (!user) {
          router.push('/auth/login')
          return
        }
        setUserId(user.id)
      } catch (err) {
        console.error('Auth check failed:', err)
        router.push('/auth/login')
      }
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
      const newChallenge = await challengeService.createChallenge({
        userId: userId,
        tier: selectedTier,
        pricePaid: tier.price,
        initialBalance: tier.initialBalance,
        targetProfit: tier.targetProfitPhase1,
        maxDailyLoss: tier.maxDailyLoss,
        maxTotalLoss: tier.maxTotalLoss,
      })

      // Redirect to challenge details
      router.push(`/dashboard-pages/challenge/${newChallenge.id}`)
    } catch (err) {
      console.error('Error creating challenge:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {loading && <LoadingSpinner message="Création du challenge..." />}

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
              onClick={() => setSelectedTier(tier.id as ChallengeTier)}
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

        {/* Challenge Rules - Detailed */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Side - Phases */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="text-3xl">📅</span>
              Structure des Phases
            </h3>
            
            <div className="space-y-4">
              {/* Phase 1 */}
              <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-400">
                <h4 className="text-xl font-bold text-green-400 mb-4">Phase 1 - Qualification</h4>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Objectif Profit</p>
                      <p className="text-xs text-gray-400">+25% du capital initial</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Durée</p>
                      <p className="text-xs text-gray-400">31 jours calendaires</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Picks Minimum</p>
                      <p className="text-xs text-gray-400">20 trades</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Jours Actifs</p>
                      <p className="text-xs text-gray-400">15 jours min (1 pick/jour)</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-400">
                <h4 className="text-xl font-bold text-blue-400 mb-4">Phase 2 - Vérification</h4>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Objectif Profit</p>
                      <p className="text-xs text-gray-400">+30% du capital initial</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Durée</p>
                      <p className="text-xs text-gray-400">31 jours calendaires</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Mêmes Règles</p>
                      <p className="text-xs text-gray-400">20 picks, 15 jours actifs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <div>
                      <p className="font-semibold">Si Réussi</p>
                      <p className="text-xs text-gray-400">Compte Financé (80/20)</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Trading Rules */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              Règles du Challenge
            </h3>
            
            <div className="space-y-4">
              {/* Stake Rules */}
              <div className="bg-gray-800 rounded-xl p-6 border-t-2 border-orange-400">
                <h4 className="text-lg font-bold text-orange-400 mb-3">💰 Stake (Mise)</h4>
                <div className="space-y-2 text-gray-300 text-xs">
                  <div className="flex justify-between bg-gray-900/50 p-2 rounded">
                    <span>Min par pick:</span>
                    <span className="font-bold text-orange-400">1% balance</span>
                  </div>
                  <div className="flex justify-between bg-gray-900/50 p-2 rounded">
                    <span>Max par pick:</span>
                    <span className="font-bold text-orange-400">5% balance</span>
                  </div>
                </div>
              </div>

              {/* Drawdown Rules */}
              <div className="bg-gray-800 rounded-xl p-6 border-t-2 border-red-400">
                <h4 className="text-lg font-bold text-red-400 mb-3">📉 Drawdown (Perte)</h4>
                <div className="space-y-2 text-gray-300 text-xs">
                  <div className="flex justify-between bg-gray-900/50 p-2 rounded">
                    <span>Max DD journalier:</span>
                    <span className="font-bold text-red-400">5%</span>
                  </div>
                  <div className="flex justify-between bg-gray-900/50 p-2 rounded">
                    <span>Max DD total:</span>
                    <span className="font-bold text-red-400">10%</span>
                  </div>
                </div>
              </div>

              {/* Gains Rules */}
              <div className="bg-gray-800 rounded-xl p-6 border-t-2 border-green-400">
                <h4 className="text-lg font-bold text-green-400 mb-3">🎯 Plafond Gains</h4>
                <div className="space-y-2 text-gray-300 text-xs">
                  <div className="flex justify-between bg-gray-900/50 p-2 rounded">
                    <span>Max gains/jour:</span>
                    <span className="font-bold text-green-400">8% capital</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Fail Conditions */}
        <div className="bg-red-900/20 border-2 border-red-600 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
            <span>⛔</span>
            Conditions d'Échec Immédiat
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-red-400 font-bold text-lg">❌</span>
                <div>
                  <p className="font-semibold">DD Journalier &gt; 5%</p>
                  <p className="text-xs text-gray-400">Challenge échoué immédiatement</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-red-400 font-bold text-lg">❌</span>
                <div>
                  <p className="font-semibold">DD Total &gt; 10%</p>
                  <p className="text-xs text-gray-400">Challenge échoué immédiatement</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-red-400 font-bold text-lg">❌</span>
                <div>
                  <p className="font-semibold">Fin des 31 jours sans objectif</p>
                  <p className="text-xs text-gray-400">Challenge échoué automatiquement</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-red-400 font-bold text-lg">❌</span>
                <div>
                  <p className="font-semibold">Stake invalide (&lt;1% ou &gt;5%)</p>
                  <p className="text-xs text-gray-400">Pick refusé par le système</p>
                </div>
              </div>
            </div>
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
