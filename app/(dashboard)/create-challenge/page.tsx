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
    id: 'starter',
    name: 'Starter',
    price: 49,
    initialBalance: 1000,
    targetProfit: 100,
    maxDailyLoss: 200,
    maxTotalLoss: 500,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 249,
    initialBalance: 10000,
    targetProfit: 1000,
    maxDailyLoss: 2000,
    maxTotalLoss: 5000,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 749,
    initialBalance: 50000,
    targetProfit: 5000,
    maxDailyLoss: 10000,
    maxTotalLoss: 25000,
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
            target_profit: tier.targetProfit,
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
    <div className="min-h-screen bg-white">
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

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Créer un Challenge
          </h1>
          <p className="text-xl text-gray-600">
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
                  ? 'border-green-600 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-4xl font-bold text-green-600 mb-6">€{tier.price}</p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-600">Capital Initial</p>
                  <p className="text-2xl font-bold">€{tier.initialBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Target Profit (Phase 1)</p>
                  <p className="text-2xl font-bold text-green-600">€{tier.targetProfit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Daily Loss</p>
                  <p className="text-2xl font-bold text-red-600">-€{tier.maxDailyLoss}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Total Loss</p>
                  <p className="text-2xl font-bold text-red-600">-€{tier.maxTotalLoss}</p>
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Règles du Challenge</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                📊 Phase 1 - Qualification
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Atteindre le target profit</li>
                <li>✓ Ne pas dépasser max daily loss</li>
                <li>✓ Ne pas dépasser max total loss</li>
                <li>✓ Durée: 60 jours</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                💰 Phase 2 - Compte Financé
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Maintenir votre profit</li>
                <li>✓ Accès au compte financé</li>
                <li>✓ Ratio profit: 80% trader / 20% platform</li>
                <li>✓ Retraits hebdomadaires possibles</li>
              </ul>
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
