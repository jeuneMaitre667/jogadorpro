import { NextRequest, NextResponse } from 'next/server'
import { fetchMatchesMultipleSports } from '@/lib/oddsapi'

export const runtime = 'nodejs'

// Cache matches for 5 minutes
let cachedMatches: any[] = []
let lastFetch: number = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET(req: NextRequest) {
  try {
    console.log('[DEBUG] GET /api/matches - Fetching matches...')
    const now = Date.now()

    // Return cached if still fresh
    if (cachedMatches.length > 0 && (now - lastFetch) < CACHE_TTL) {
      console.log('[DEBUG] Returning cached matches:', cachedMatches.length)
      return NextResponse.json({
        matches: cachedMatches,
        cached: true,
        cachedAt: new Date(lastFetch).toISOString()
      })
    }

    // Fetch fresh data
    console.log('[DEBUG] Fetching fresh data from Odds API...')
    const matches = await fetchMatchesMultipleSports()
    console.log('[DEBUG] Fetched matches count:', matches.length)

    // Filter matches: only next 7 days (168 hours)
    const now7days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const filteredMatches = matches.filter(match => {
      return match.commenceTime <= now7days
    })

    console.log('[DEBUG] Filtered to 7 days:', filteredMatches.length)

    // Sort by commence time (soonest first)
    filteredMatches.sort((a, b) => 
      a.commenceTime.getTime() - b.commenceTime.getTime()
    )

    // Update cache
    cachedMatches = filteredMatches
    lastFetch = now

    console.log('[DEBUG] Returning fresh matches:', filteredMatches.length)
    return NextResponse.json({
      matches: filteredMatches,
      cached: false,
      fetchedAt: new Date(now).toISOString()
    })
  } catch (error) {
    console.error('[ERROR] Error in /api/matches:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch matches',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
