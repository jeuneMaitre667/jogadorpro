'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { authService } from '@/lib/auth'
import { challengeService } from '@/lib/challenges'
import { supabase } from '@/lib/supabase'
import { Challenge } from '@/lib/types'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ChallengeCard } from '@/components/dashboard/ChallengeCard'
import { StatsCard } from '@/components/dashboard/StatsCard'
import Link from 'next/link'
import { DashboardCharts } from '@/components/DashboardCharts'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const initDashboard = async () => {
      // Vérifier l'authentification
      const user = await authService.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      // Charger les challenges actifs
      const activeChallenges = await challengeService.getActiveChallenges(user.id)
      setChallenges(activeChallenges)

      // Calculer les totaux
      const balance = activeChallenges.reduce((sum, ch) => sum + ch.current_balance, 0)
      const profit = activeChallenges.reduce(
        (sum, ch) => sum + (ch.current_balance - ch.initial_balance),
        0
      )
      setTotalBalance(balance)
      setTotalProfit(profit)

      setLoading(false)
    }

    initDashboard()
  }, [router])

  const handleLogout = async () => {
    await authService.signOut()
    router.push('/')
  }

  if (loading) {
    return <LoadingSpinner message="Chargement de votre dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JogadorPro
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{user?.email}</span>
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
            <p className="text-gray-300">Bienvenue, {user?.email}!</p>
          </div>
          <Button
            onClick={() => router.push('/create-challenge')}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-6"
          >
            + Créer un Challenge
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            label="Challenges Actifs"
            value={challenges.length}
            icon="🎯"
            color="green"
          />
          <StatsCard
            label="Solde Total"
            value={`€${totalBalance.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}`}
            icon="💰"
            color="blue"
          />
          <StatsCard
            label="Profit/Loss"
            value={`${totalProfit >= 0 ? '+' : ''}€${totalProfit.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}`}
            icon="📈"
            color={totalProfit >= 0 ? 'green' : 'red'}
          />
        </div>

        {/* Challenges Section */}
        <div className="bg-gray-800 rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Vos Challenges</h2>
          {challenges.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 mb-6">Vous n'avez pas de challenge actif</p>
              <Button
                onClick={() => router.push('/dashboard/create-challenge')}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Créer votre premier challenge
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} isClickable={true} />
              ))}
            </div>
          )}
        </div>

        {/* Charts Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-white">Analytics & Performance</h2>
          <DashboardCharts challenges={challenges} bets={[]} />
        </section>
      </main>
    </div>
  )
}
