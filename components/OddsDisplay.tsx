// Composant pour afficher tous les types de paris d'un match

'use client'

import { EventMarket, getMarketKeyName } from '@/lib/oddsapi'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OddsDisplayProps {
  sport: string
  matchId: string
  homeTeam: string
  awayTeam: string
}

export function OddsDisplay({ sport, matchId, homeTeam, awayTeam }: OddsDisplayProps) {
  const [markets, setMarkets] = useState<EventMarket[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<'h2h' | 'spreads' | 'totals'>('h2h')

  const fetchMarkets = async () => {
    if (markets.length > 0) return // Already loaded

    setLoading(true)
    try {
      const response = await fetch(
        `/api/event-markets?sport=${sport}&eventId=${matchId}`
      )
      const data = await response.json()
      setMarkets(data.markets || [])
    } catch (error) {
      console.error('Failed to fetch markets:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch on component mount
  useEffect(() => {
    fetchMarkets()
  }, [matchId])

  const currentMarket = markets.find(m => m.key === selectedMarket)

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
      {/* Market Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-800 pb-3">
        {['h2h', 'spreads', 'totals'].map((key) => (
          <button
            key={key}
            onClick={() => setSelectedMarket(key as any)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              selectedMarket === key
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {getMarketKeyName(key)}
          </button>
        ))}
      </div>

      {/* Odds Display */}
      {loading ? (
        <div className="text-center py-4 text-gray-500">Chargement...</div>
      ) : currentMarket ? (
        <div className="grid grid-cols-3 gap-2">
          {currentMarket.outcomes.slice(0, 3).map((outcome, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded text-center transition-colors"
            >
              <div className="text-xs text-gray-400 truncate">{outcome.name}</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                {outcome.price.toFixed(2)}
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          Aucune cote disponible
        </div>
      )}
    </div>
  )
}

export default OddsDisplay
