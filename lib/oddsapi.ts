// The Odds API Service
// Docs: https://the-odds-api.com/liveapi/guides/v4/

const ODDS_API_KEY = process.env.ODDS_API_KEY
const BASE_URL = 'https://api.the-odds-api.com/v4'

export interface OddsMatch {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Array<{
    key: string
    title: string
    markets: Array<{
      key: string
      outcomes: Array<{
        name: string
        price: number
      }>
    }>
  }>
}

export interface MatchOdds {
  home: number | null
  draw: number | null
  away: number | null
}

export interface MarketOutcome {
  name: string
  price: number
}

export interface EventMarket {
  key: string
  title: string
  outcomes: MarketOutcome[]
}

export interface Match {
  id: string
  sport: string
  sportTitle: string
  league: string
  homeTeam: string
  awayTeam: string
  commenceTime: Date
  odds: MatchOdds
  markets?: EventMarket[]
}

/**
 * Fetch upcoming matches from The Odds API
 * @param sport - Sport key (soccer_brazil_campeonato, soccer_epl, etc.)
 * @param regions - Regions for odds (eu, us, uk, au)
 * @param markets - Markets to fetch (h2h = 1X2)
 */
export async function fetchUpcomingMatches(
  sport: string = 'soccer_brazil_campeonato',
  regions: string = 'eu',
  markets: string = 'h2h'
): Promise<Match[]> {
  if (!ODDS_API_KEY) {
    throw new Error('ODDS_API_KEY not configured')
  }

  const url = `${BASE_URL}/sports/${sport}/odds/?apiKey=${ODDS_API_KEY}&regions=${regions}&markets=${markets}&oddsFormat=decimal`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Odds API error: ${response.status} - ${errorText}`)
    }

    const data: OddsMatch[] = await response.json()

    // Transform API response to our Match format
    return data.map(match => transformMatch(match)).filter(Boolean) as Match[]
  } catch (error) {
    console.error('Error fetching matches from Odds API:', error)
    throw error
  }
}

/**
 * Fetch multiple sports at once
 */
export async function fetchMatchesMultipleSports(
  sports: string[] = [
    'soccer_brazil_campeonato',
    'soccer_epl',
    'soccer_spain_la_liga',
    'soccer_uefa_champs_league'
  ]
): Promise<Match[]> {
  try {
    console.log('[DEBUG] Fetching matches for sports:', sports)
    const promises = sports.map(sport => 
      fetchUpcomingMatches(sport).catch(err => {
        console.error(`[ERROR] Error fetching ${sport}:`, err.message)
        return []
      })
    )

    const results = await Promise.all(promises)
    const allMatches = results.flat()
    console.log('[DEBUG] Total matches fetched:', allMatches.length)
    return allMatches
  } catch (error) {
    console.error('[ERROR] fetchMatchesMultipleSports failed:', error instanceof Error ? error.message : String(error))
    return []
  }
}

/**
 * Transform Odds API match to our Match format
 */
function transformMatch(oddsMatch: OddsMatch): Match | null {
  try {
    // Get best odds from first bookmaker (or average across bookmakers)
    const bookmaker = oddsMatch.bookmakers?.[0]
    if (!bookmaker) {
      console.warn(`[WARN] No bookmakers for match: ${oddsMatch.home_team} vs ${oddsMatch.away_team}`)
      return null
    }

    const h2hMarket = bookmaker.markets.find(m => m.key === 'h2h')
    if (!h2hMarket || !h2hMarket.outcomes) {
      console.warn(`[WARN] No h2h market for match: ${oddsMatch.home_team} vs ${oddsMatch.away_team}`)
      return null
    }

    // Find odds for each outcome
    let homeOdds = h2hMarket.outcomes.find(o => o.name === oddsMatch.home_team)
    let awayOdds = h2hMarket.outcomes.find(o => o.name === oddsMatch.away_team)
    let drawOdds = h2hMarket.outcomes.find(o => o.name === 'Draw')

    // If not found by exact name, try to find by position (home, draw, away)
    if (!homeOdds && h2hMarket.outcomes.length > 0) homeOdds = h2hMarket.outcomes[0]
    if (!drawOdds && h2hMarket.outcomes.length > 1) drawOdds = h2hMarket.outcomes[1]
    if (!awayOdds && h2hMarket.outcomes.length > 2) awayOdds = h2hMarket.outcomes[2]

    const match: Match = {
      id: oddsMatch.id,
      sport: oddsMatch.sport_key,
      sportTitle: oddsMatch.sport_title,
      league: getSportLeagueName(oddsMatch.sport_key),
      homeTeam: oddsMatch.home_team,
      awayTeam: oddsMatch.away_team,
      commenceTime: new Date(oddsMatch.commence_time),
      odds: {
        home: homeOdds?.price || null,
        draw: drawOdds?.price || null,
        away: awayOdds?.price || null,
      }
    }
    
    console.log(`[DEBUG] Transformed match: ${match.homeTeam} vs ${match.awayTeam} - Odds: H=${match.odds.home} D=${match.odds.draw} A=${match.odds.away}`)
    return match
  } catch (error) {
    console.error(`[ERROR] Failed to transform match:`, error)
    return null
  }
}

/**
 * Fetch all markets (odds types) for an event
 * Markets: h2h (1X2), spreads (handicaps), totals (over/under)
 */
export async function fetchEventMarkets(
  sport: string,
  eventId: string
): Promise<EventMarket[]> {
  if (!ODDS_API_KEY) {
    throw new Error('ODDS_API_KEY not configured')
  }

  // Fetch h2h, spreads, and totals
  const markets = ['h2h', 'spreads', 'totals']
  const marketsParam = markets.join(',')
  
  const url = `${BASE_URL}/sports/${sport}/events/${eventId}/odds/?apiKey=${ODDS_API_KEY}&regions=eu&markets=${marketsParam}&oddsFormat=decimal`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Odds API error: ${response.status} - ${errorText}`)
    }

    const data: OddsMatch = await response.json()
    const bookmaker = data.bookmakers?.[0]
    
    if (!bookmaker || !bookmaker.markets) {
      console.warn(`[WARN] No markets available for event ${eventId}`)
      return []
    }

    // Transform bookmaker markets to our format
    const transformedMarkets: EventMarket[] = bookmaker.markets.map(market => ({
      key: market.key,
      title: getMarketTitle(market.key),
      outcomes: market.outcomes || []
    }))

    console.log(`[DEBUG] Fetched ${transformedMarkets.length} markets for event ${eventId}`)
    return transformedMarkets
  } catch (error) {
    console.error(`[ERROR] Error fetching event markets:`, error)
    return []
  }
}

/**
 * Get user-friendly market title
 */
function getMarketTitle(marketKey: string): string {
  const titles: Record<string, string> = {
    'h2h': 'Match Winner (1X2)',
    'spreads': 'Asian Handicap',
    'totals': 'Over/Under',
  }
  return titles[marketKey] || marketKey
}

/**
 * Get user-friendly market key name
 */
export function getMarketKeyName(key: string): string {
  const names: Record<string, string> = {
    'h2h': '1X2',
    'spreads': 'Handicap',
    'totals': 'Over/Under',
  }
  return names[key] || key
}

/**
 * Get user-friendly league name from sport key
 */
function getSportLeagueName(sportKey: string): string {
  const leagueMap: Record<string, string> = {
    'soccer_brazil_campeonato': 'Brasileirão Série A',
    'soccer_epl': 'Premier League',
    'soccer_spain_la_liga': 'La Liga',
    'soccer_uefa_champs_league': 'UEFA Champions League',
    'soccer_france_ligue_one': 'Ligue 1',
    'soccer_germany_bundesliga': 'Bundesliga',
    'soccer_italy_serie_a': 'Serie A',
  }
  return leagueMap[sportKey] || sportKey
}

/**
 * Get available sports
 */
export async function fetchAvailableSports() {
  if (!ODDS_API_KEY) {
    throw new Error('ODDS_API_KEY not configured')
  }

  const url = `${BASE_URL}/sports/?apiKey=${ODDS_API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching available sports:', error)
    throw error
  }
}
