// Sidebar pour filtrer et afficher les matchs par ligue

'use client'

import { Match } from '@/lib/oddsapi'
import { getSportIcon, getSportColor } from '@/lib/sportsConfig'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'

interface MatchSidebarProps {
  matches: Match[]
  selectedMatch?: Match
  onSelectMatch: (match: Match) => void
}

export function MatchSidebar({
  matches,
  selectedMatch,
  onSelectMatch
}: MatchSidebarProps) {
  const [expandedLeague, setExpandedLeague] = useState<string | null>(null)

  // Group matches by league
  const groupedMatches = useMemo(() => {
    const groups: Record<string, Match[]> = {}
    
    matches.forEach(match => {
      if (!groups[match.league]) {
        groups[match.league] = []
      }
      groups[match.league].push(match)
    })

    return groups
  }, [matches])

  const leagues = Object.keys(groupedMatches).sort()

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-bold text-white">
          Matchs de Football
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {matches.length} matchs disponibles
        </p>
      </div>

      {/* Leagues List */}
      <div className="flex-1 overflow-y-auto">
        {leagues.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Aucun match disponible
          </div>
        ) : (
          leagues.map((league) => (
            <div key={league} className="border-b border-gray-800">
              {/* League Header */}
              <button
                onClick={() =>
                  setExpandedLeague(
                    expandedLeague === league ? null : league
                  )
                }
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getSportIcon(league)}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      {league}
                    </p>
                    <p className="text-xs text-gray-500">
                      {groupedMatches[league].length} matchs
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{
                    rotate:
                      expandedLeague === league ? 180 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </button>

              {/* Matches List */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height:
                    expandedLeague === league ? 'auto' : 0,
                  opacity: expandedLeague === league ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {groupedMatches[league].map((match) => (
                  <motion.button
                    key={match.id}
                    onClick={() => onSelectMatch(match)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left px-4 py-3 mx-0 border-l-4 transition-all ${
                      selectedMatch?.id === match.id
                        ? 'bg-gray-800 border-l-emerald-500'
                        : 'border-l-transparent hover:bg-gray-800 hover:border-l-gray-700'
                    }`}
                  >
                    <div className="space-y-1">
                      {/* Teams */}
                      <div className="text-sm">
                        <p className="text-white font-semibold truncate">
                          {match.homeTeam}
                        </p>
                        <p className="text-gray-400 text-xs my-0.5">vs</p>
                        <p className="text-white font-semibold truncate">
                          {match.awayTeam}
                        </p>
                      </div>

                      {/* Time */}
                      <p className="text-xs text-gray-500">
                        {formatTime(match.commenceTime)}
                      </p>

                      {/* Main Odds (H2H) */}
                      <div className="flex gap-1 mt-2">
                        <div className="flex-1 bg-gray-700 rounded px-2 py-1 text-center">
                          <span className="text-xs text-gray-400">
                            1
                          </span>
                          <p className="text-sm font-bold text-emerald-400">
                            {match.odds.home?.toFixed(2) || '-'}
                          </p>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded px-2 py-1 text-center">
                          <span className="text-xs text-gray-400">
                            X
                          </span>
                          <p className="text-sm font-bold text-emerald-400">
                            {match.odds.draw?.toFixed(2) || '-'}
                          </p>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded px-2 py-1 text-center">
                          <span className="text-xs text-gray-400">
                            2
                          </span>
                          <p className="text-sm font-bold text-emerald-400">
                            {match.odds.away?.toFixed(2) || '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
        <p>💾 Cache: 5 minutes</p>
        <p>🔄 Auto-refresh: 60s</p>
      </div>
    </div>
  )
}

export default MatchSidebar
