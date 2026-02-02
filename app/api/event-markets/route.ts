// GET /api/event-markets?sport=soccer_epl&eventId=abc123
// Fetch all available markets/odds types for a specific event

import { fetchEventMarkets } from '@/lib/oddsapi'
import { NextRequest, NextResponse } from 'next/server'

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const marketCache = new Map<string, { data: any; timestamp: number }>()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sport = searchParams.get('sport')
    const eventId = searchParams.get('eventId')

    if (!sport || !eventId) {
      return NextResponse.json(
        { error: 'Missing sport or eventId parameter' },
        { status: 400 }
      )
    }

    const cacheKey = `${sport}:${eventId}`
    const cached = marketCache.get(cacheKey)

    // Check if cache is valid
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log(`[DEBUG] Returning cached markets for ${cacheKey}`)
      return NextResponse.json({
        markets: cached.data,
        source: 'cache',
        timestamp: new Date(cached.timestamp)
      })
    }

    console.log(`[DEBUG] Fetching fresh markets for ${sport} event ${eventId}...`)
    const markets = await fetchEventMarkets(sport, eventId)

    // Update cache
    marketCache.set(cacheKey, {
      data: markets,
      timestamp: Date.now()
    })

    return NextResponse.json({
      markets,
      source: 'fresh',
      timestamp: new Date()
    })
  } catch (error) {
    console.error('[ERROR] Error fetching event markets:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch event markets',
        markets: []
      },
      { status: 500 }
    )
  }
}
