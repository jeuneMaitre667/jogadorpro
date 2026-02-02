'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { authService } from '@/lib/auth'
import { MatchList } from '@/components/MatchList'
import { PlacePickModal, type PickData } from '@/components/PlacePickModal'

interface Match {
  id: string
  sport: string
  sportTitle: string
  league: string
  homeTeam: string
  awayTeam: string
  commenceTime: string
  odds: {
    home: number | null
    draw: number | null
    away: number | null
  }
}

export default function PlacePickPage() {
  const [user, setUser] = useState<any>(null)
  const [activeChallenge, setActiveChallenge] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window === 'undefined') return

        // 1) Tenter Supabase session
        const supaUser = await authService.getUser()
        let resolvedUser = supaUser || null

        if (!resolvedUser?.id) {
          // 2) Fallback localStorage
          const userStr = localStorage.getItem('user')
          if (!userStr) {
            router.push('/auth/login')
            return
          }
          resolvedUser = JSON.parse(userStr)
        }

        setUser(resolvedUser)

        // Get active challenge
        const userId = resolvedUser?.id
        const { data: challenges } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', userId)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)

        if (challenges && challenges.length > 0) {
          setActiveChallenge(challenges[0])
        }
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [router])

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match)
    setModalOpen(true)
  }

  const handlePlacePick = async (pickData: PickData) => {
    if (!activeChallenge || !user) {
      throw new Error('No active challenge')
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/picks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: activeChallenge.id,
          homeTeam: selectedMatch?.homeTeam,
          awayTeam: selectedMatch?.awayTeam,
          matchId: selectedMatch?.id,
          betType: pickData.betType,
          selection: pickData.selection,
          odds: pickData.odds,
          stake: pickData.stake
        })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to place pick')
      }

      // Success - refresh challenge data
      const { data } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', activeChallenge.id)
        .single()

      if (data) {
        setActiveChallenge(data)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!activeChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link href="/dashboard-pages/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Placer un Pick
            </h1>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-8 text-center">
            <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Aucun challenge actif
            </h2>
            <p className="text-gray-400 mb-6">
              Vous devez avoir un challenge actif pour placer des picks
            </p>
            <Link href="/dashboard-pages/create-challenge">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                Créer un Challenge
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard-pages/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Placer un Pick
            </h1>
          </div>

          {/* Challenge Info */}
          <div className="bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700">
            <p className="text-xs text-gray-400">Balance actuelle</p>
            <p className="text-lg font-bold text-emerald-400">
              €{(activeChallenge.current_balance || 0).toFixed(2)}
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-6">
            Matchs disponibles
          </h2>

          <MatchList onSelectMatch={handleSelectMatch} />
        </motion.div>
      </main>

      {/* Place Pick Modal */}
      <PlacePickModal
        match={selectedMatch}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedMatch(null)
        }}
        onPlacePick={handlePlacePick}
        currentBalance={activeChallenge?.current_balance || 0}
      />
    </div>
  )
}
