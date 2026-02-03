import { NextRequest, NextResponse } from 'next/server'
import { fetchMatchesMultipleSports, Match } from '@/lib/oddsapi'

export const runtime = 'nodejs'

// Cache matches for 5 minutes
let cachedMatches: Match[] = []
let lastFetch: number = 0
let lastErrorTime: number = 0
let lastError: string | null = null

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const ERROR_CACHE_TTL = 1 * 60 * 1000 // Cache errors for 1 minute to prevent hammering

export async function GET(req: NextRequest) {
  try {
    console.log('[DEBUG] GET /api/matches - Fetching matches...')
    const now = Date.now()

    // Return cached if still fresh
    if (cachedMatches.length > 0 && (now - lastFetch) < CACHE_TTL) {
      console.log(`[DEBUG] Returning cached matches: ${cachedMatches.length}, age: ${now - lastFetch}ms`)
      return NextResponse.json({
        matches: cachedMatches,
        cached: true,
        cachedAt: new Date(lastFetch).toISOString(),
        cacheAge: now - lastFetch
      })
    }

    // Return cached error if in error window
    if (lastError && (now - lastErrorTime) < ERROR_CACHE_TTL) {
      console.warn(`[DEBUG] Returning cached error from ${now - lastErrorTime}ms ago`)
      return NextResponse.json(
        {
          error: 'API temporarily unavailable',
          details: lastError,
          retry_after: Math.ceil((ERROR_CACHE_TTL - (now - lastErrorTime)) / 1000)
        },
        { 
          status: 503,
          headers: {
            'Retry-After': String(Math.ceil((ERROR_CACHE_TTL - (now - lastErrorTime)) / 1000))
          }
        }
      )
    }

    // Fetch fresh data
    console.log('[DEBUG] Fetching fresh data from Odds API...')
    const matches = await fetchMatchesMultipleSports()
    console.log('[DEBUG] Fetched matches count:', matches.length)

    // Filter matches: only next 7 days
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
    lastError = null
    lastErrorTime = 0

    console.log('[DEBUG] Returning fresh matches:', filteredMatches.length)
    return NextResponse.json({
      matches: filteredMatches,
      cached: false,
      fetchedAt: new Date(now).toISOString(),
      count: filteredMatches.length
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[ERROR] Error in /api/matches:', errorMsg)
    
    // Store error for caching
    lastError = errorMsg
    lastErrorTime = Date.now()
    
    // If we have cached matches, return them even if they're stale
    if (cachedMatches.length > 0) {
      console.warn('[FALLBACK] Returning stale cached matches due to API error')
      return NextResponse.json({
        matches: cachedMatches,
        cached: true,
        stale: true,
        error: 'Serving stale cache due to API error',
        fetchedAt: new Date(lastFetch).toISOString()
      })
    }
    
    return NextResponse.json(
      {
        error: 'Failed to fetch matches',
        details: errorMsg
      },
      { 
        status: 503,
        headers: {
          'Retry-After': '60'
        }
      }
    )
  }
}
