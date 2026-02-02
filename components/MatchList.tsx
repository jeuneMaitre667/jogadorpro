'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Search, Calendar, TrendingUp } from 'lucide-react'
import { LoadingSpinner } from '@/components/LoadingSpinner'

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

interface MatchListProps {
  onSelectMatch: (match: Match) => void
}

export function MatchList({ onSelectMatch }: MatchListProps) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)

  useEffect(() => {
    fetchMatches()
  }, [])

  async function fetchMatches() {
    try {
      setLoading(true)
      const res = await fetch('/api/matches')
      if (!res.ok) throw new Error('Failed to fetch matches')
      const data = await res.json()
      setMatches(data.matches)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading matches')
    } finally {
      setLoading(false)
    }
  }

  // Get unique leagues
  const leagues = Array.from(new Set(matches.map(m => m.league)))

  // Filter matches
  const filteredMatches = matches.filter(match => {
    const matchesSearch = searchQuery === '' || 
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLeague = !selectedLeague || match.league === selectedLeague

    return matchesSearch && matchesLeague
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner message="Chargement des matchs..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-semibold mb-2">Erreur</p>
        <p className="text-red-600 text-sm">{error}</p>
        <Button onClick={fetchMatches} variant="outline" className="mt-4">
          Réessayer
        </Button>
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Aucun match disponible pour le moment</p>
        <Button onClick={fetchMatches} variant="outline" className="mt-4">
          Actualiser
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Chercher une équipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedLeague === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedLeague(null)}
          >
            Tous
          </Button>
          {leagues.map(league => (
            <Button
              key={league}
              variant={selectedLeague === league ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLeague(league)}
            >
              {league}
            </Button>
          ))}
        </div>
      </div>

      {/* Match List */}
      <div className="space-y-3">
        {filteredMatches.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Aucun match trouvé
          </p>
        ) : (
          filteredMatches.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              onSelect={() => onSelectMatch(match)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function MatchCard({ match, onSelect }: { match: Match; onSelect: () => void }) {
  const commenceDate = new Date(match.commenceTime)
  const isToday = commenceDate.toDateString() === new Date().toDateString()
  const dateStr = isToday 
    ? `Aujourd'hui ${commenceDate.toLocaleTimeString('fr-BR', { hour: '2-digit', minute: '2-digit' })}`
    : commenceDate.toLocaleDateString('fr-BR', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onSelect}>
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs">
          {match.league}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          {dateStr}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-3">
        <div className="text-right">
          <p className="font-semibold text-gray-900">{match.homeTeam}</p>
        </div>
        <div className="text-center px-3">
          <p className="text-xs text-gray-500 font-medium">VS</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{match.awayTeam}</p>
        </div>
      </div>

      {/* Odds */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t">
        <OddsButton label="1" value={match.odds.home} />
        <OddsButton label="X" value={match.odds.draw} />
        <OddsButton label="2" value={match.odds.away} />
      </div>
    </Card>
  )
}

function OddsButton({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="bg-gray-50 rounded p-2 text-center hover:bg-gray-100 transition-colors">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="font-bold text-green-600 flex items-center justify-center gap-1">
        {value ? (
          <>
            <TrendingUp className="h-3 w-3" />
            {value.toFixed(2)}
          </>
        ) : (
          <span className="text-gray-400 text-xs">-</span>
        )}
      </div>
    </div>
  )
}
