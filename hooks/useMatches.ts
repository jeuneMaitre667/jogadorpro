import { useState, useEffect } from 'react'

export interface Match {
  id: string
  sport: string
  sportTitle: string
  league: string
  homeTeam: string
  awayTeam: string
  commenceTime: Date
  odds: {
    home: number | null
    draw: number | null
    away: number | null
  }
}

export interface UseMatchesOptions {
  autoFetch?: boolean
  refreshInterval?: number // ms
  sports?: string[]
}

export function useMatches(options: UseMatchesOptions = {}) {
  const {
    autoFetch = true,
    refreshInterval = 60000, // 1 minute default
    sports,
  } = options

  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)

  const fetchMatches = async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError(null)

      // Build URL with proper query params
      const params = new URLSearchParams()
      if (forceRefresh) {
        params.append('cache', 'false')
      }
      if (sports && sports.length > 0) {
        params.append('sports', sports.join(','))
      }

      const url = `/api/matches${params.toString() ? '?' + params.toString() : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.statusText}`)
      }

      const data = await response.json()

      // Convert date strings to Date objects if needed
      const processedMatches = (data.matches || []).map((match: any) => ({
        ...match,
        commenceTime: new Date(match.commenceTime),
      }))

      setMatches(processedMatches)
      setLastFetch(new Date())
      console.log(`✅ Loaded ${processedMatches.length} matches`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('❌ Error fetching matches:', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    if (autoFetch) {
      fetchMatches()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-refresh interval
  useEffect(() => {
    if (!autoFetch || refreshInterval <= 0) return

    const interval = setInterval(() => {
      fetchMatches()
    }, refreshInterval)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch, refreshInterval])

  return {
    matches,
    loading,
    error,
    lastFetch,
    refetch: () => fetchMatches(true), // Force refresh
  }
}
