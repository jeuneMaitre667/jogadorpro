'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Trophy, TrendingUp, Bell, Settings, LogOut, RefreshCw, ChevronDown, ArrowLeft, FileText, Target, X, DollarSign, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useMatches } from '@/hooks/useMatches'
import { getSportName, getSportIcon, DEFAULT_DASHBOARD_SPORTS } from '@/lib/sportsConfig'
import { Match } from '@/lib/oddsapi'

interface League {
  name: string
  matches: Match[]
}

interface SelectedPick {
  matchId: string
  homeTeam: string
  awayTeam: string
  selection: string
  odds: number
  league: string
  matchTime: string
}

interface Challenge {
  current_balance: number
}

// League flags mapping
const leagueFlags: Record<string, string> = {
  'UEFA Champions League': '🇪🇺',
  'Premier League': '🇬🇧',
  'EPL': '🇬🇧',
  'English Premier League': '🇬🇧',
  'La Liga': '🇪🇸',
  'Spain La Liga': '🇪🇸',
  'Bundesliga': '🇩🇪',
  'Germany Bundesliga': '🇩🇪',
  'Serie A': '🇮🇹',
  'Italy Serie A': '🇮🇹',
  'Ligue 1': '🇫🇷',
  'France Ligue 1': '🇫🇷',
  'Brazil Campeonato': '🇧🇷',
  'Brasileiro': '🇧🇷',
  'MLS': '🇺🇸',
  'USA MLS': '🇺🇸',
  'Liga MX': '🇲🇽',
  'Mexico Liga MX': '🇲🇽',
  'Eredivisie': '🇳🇱',
  'Netherlands Eredivisie': '🇳🇱',
  'Primeira Liga': '🇵🇹',
  'Portugal Primeira Liga': '🇵🇹',
  'Championship': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'EFL Championship': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Soccer': '⚽',
}

// Function to get league flag with fallback
const getLeagueFlag = (leagueName: string): string => {
  // Try exact match first
  if (leagueFlags[leagueName]) return leagueFlags[leagueName]
  
  // Try partial match (case insensitive)
  const lowerName = leagueName.toLowerCase()
  for (const [key, flag] of Object.entries(leagueFlags)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return flag
    }
  }
  
  // Default fallback
  return '⚽'
}

export default function MatchesPage() {
  const [user, setUser] = useState<any>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedLeagues, setExpandedLeagues] = useState<string[]>([])
  const [selectedPick, setSelectedPick] = useState<SelectedPick | null>(null)
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakeError, setStakeError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLeague, setSelectedLeague] = useState<string>('Toutes les Ligues')
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const router = useRouter()

  // Load real matches from Odds API
  const {
    matches: realMatches,
    loading: matchesLoading,
    refetch: refetchMatches,
  } = useMatches({
    autoFetch: true,
    refreshInterval: 60000,
    sports: DEFAULT_DASHBOARD_SPORTS,
  })

  // Group matches by league
  const leaguesByName = useMemo(() => {
    const grouped: { [key: string]: Match[] } = {}
    
    realMatches.forEach(match => {
      const sportName = getSportName(match.sport)
      if (!grouped[sportName]) {
        grouped[sportName] = []
      }
      grouped[sportName].push(match)
    })

    return Object.entries(grouped).map(([name, matches]) => ({
      name,
      matches: matches.sort((a, b) => 
        new Date(a.commenceTime).getTime() - new Date(b.commenceTime).getTime()
      ),
    })) as League[]
  }, [realMatches])
  // Filter matches based on search query
  const filteredLeagues = useMemo(() => {
    if (!searchQuery.trim()) return leaguesByName

    return leaguesByName.map(league => ({
      ...league,
      matches: league.matches.filter(match => 
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        league.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(league => league.matches.length > 0)
  }, [leaguesByName, searchQuery])

  // Get unique league names for dropdown
  const leagueNames = useMemo(() => {
    return ['Toutes les Ligues', ...leaguesByName.map(league => league.name)]
  }, [leaguesByName])

  // Filter and sort matches by selected league and chronological order
  const sortedMatches = useMemo(() => {
    let matches = realMatches

    // Filter by league if not "Toutes les Ligues"
    if (selectedLeague !== 'Toutes les Ligues') {
      matches = matches.filter(match => getSportName(match.sport) === selectedLeague)
    }

    // Filter by search query
    if (searchQuery) {
      matches = matches.filter(match =>
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getSportName(match.sport).toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort by commence time (chronological order)
    return matches.sort((a, b) => 
      new Date(a.commenceTime).getTime() - new Date(b.commenceTime).getTime()
    )
  }, [realMatches, selectedLeague, searchQuery])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (!authUser) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          router.push('/auth/login')
          return
        }
      } else {
        setUser(authUser)
      }

      // Fetch challenge balance
      const userId = authUser?.id || JSON.parse(localStorage.getItem('user') || '{}').id
      if (userId) {
        const { data: challengeData } = await supabase
          .from('challenges')
          .select('current_balance')
          .eq('user_id', userId)
          .eq('status', 'active')
          .single()

        if (challengeData) {
          setChallenge(challengeData)
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  const toggleLeague = (leagueName: string) => {
    setExpandedLeagues(prev =>
      prev.includes(leagueName)
        ? prev.filter(l => l !== leagueName)
        : [...prev, leagueName]
    )
  }

  const handlePickSelection = (match: Match, selection: string, odds: number) => {
    setSelectedPick({
      matchId: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      selection,
      odds,
      league: getSportName(match.sport),
      matchTime: match.commenceTime.toISOString(),
    })
    setStakeAmount('')
    setStakeError('')
  }

  const validateStake = (amount: string) => {
    if (!challenge) return 'No active challenge'
    
    const stake = parseFloat(amount)
    if (isNaN(stake) || stake <= 0) return 'Montant invalide'
    
    const minStake = challenge.current_balance * 0.01 // 1%
    const maxStake = challenge.current_balance * 0.05 // 5%
    
    if (stake < minStake) return `Minimum ${minStake.toFixed(2)}$ (1% du solde)`
    if (stake > maxStake) return `Maximum ${maxStake.toFixed(2)}$ (5% du solde)`
    
    return ''
  }

  const handleStakeChange = (value: string) => {
    setStakeAmount(value)
    const error = validateStake(value)
    setStakeError(error)
  }

  const handlePlaceBet = async () => {
    if (!selectedPick || !stakeAmount || stakeError) return

    const stake = parseFloat(stakeAmount)
    const potentialWin = stake * selectedPick.odds

    try {
      const userId = user?.id || JSON.parse(localStorage.getItem('user') || '{}').id

      if (!userId) {
        alert('Utilisateur non connecté')
        return
      }

      console.log('User ID:', userId)

      // Get active challenge
      const { data: challengeData, error: challengeError } = await supabase
        .from('challenges')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

      if (challengeError || !challengeData) {
        console.error('Challenge error:', challengeError)
        alert('Pas de challenge actif trouvé')
        return
      }

      const insertData = {
        user_id: userId,
        challenge_id: challengeData.id,
        home_team: selectedPick.homeTeam,
        away_team: selectedPick.awayTeam,
        selection: selectedPick.selection,
        odds: parseFloat(selectedPick.odds.toString()),
        stake: parseFloat(stake.toString()),
        potential_win: parseFloat(potentialWin.toString()),
        status: 'pending',
        league: selectedPick.league,
        match_commence_time: selectedPick.matchTime,
      }

      console.log('Inserting pick with data:', insertData)

      const { data, error } = await supabase.from('picks').insert([insertData]).select()

      if (error) {
        console.error('Supabase insert error full:', error)
        alert(`Erreur Supabase: ${error.message}`)
        return
      }

      console.log('Pick placed successfully:', data)

      // Clear betslip
      setSelectedPick(null)
      setStakeAmount('')
      setStakeError('')

      // Success - redirect to my bets
      setTimeout(() => router.push('/dashboard/my-bets'), 500)
    } catch (error) {
      console.error('Catch error placing bet:', error)
      alert(`Erreur: ${error}`)
    }
  }

  const getOddsForMatch = (match: Match) => {
    return {
      homeOdds: { price: match.odds.home || 1.5 },
      drawOdds: { price: match.odds.draw || 3.0 },
      awayOdds: { price: match.odds.away || 2.5 }
    }
  }

  if (loading || matchesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  const potentialWin = selectedPick && stakeAmount ? parseFloat(stakeAmount) * selectedPick.odds : 0

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Compact Sidebar 80px */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-6"
      >
        <div className="mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">JP</span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-4">
          {[
            { icon: Home, label: 'Dashboard', active: false, action: () => router.push('/dashboard/dashboard') },
            { icon: FileText, label: 'Paris', active: false, action: () => router.push('/dashboard/my-bets') },
            { icon: Trophy, label: 'Matchs', active: true, action: null, showAsFootball: true },
            { icon: Target, label: 'Challenge', active: false, action: () => router.push('/dashboard/challenge-status'), color: 'text-pink-400' },
            { icon: TrendingUp, label: 'Stats', active: false, action: null },
            { icon: Bell, label: 'Notifications', active: false, action: null },
            { icon: Settings, label: 'Paramètres', active: false, action: () => router.push('/dashboard/settings') },
          ].map((item) => (
            <button
              key={item.label}
              title={item.label}
              onClick={item.action || undefined}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                item.active
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : item.label === 'Notifications'
                  ? 'text-yellow-400 hover:bg-yellow-500/10'
                  : item.label === 'Paris'
                  ? 'text-white hover:bg-gray-800'
                  : item.label === 'Challenge'
                  ? 'text-pink-400 hover:bg-pink-500/10'
                  : item.label === 'Paramètres'
                  ? 'text-gray-500 hover:bg-gray-800'
                  : item.label === 'Stats'
                  ? 'text-green-400 hover:bg-green-500/10'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.showAsFootball ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8">
                  <circle cx="12" cy="12" r="9.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                  {/* Pentagon doré foncé au centre */}
                  <path d="M12 7 L14.5 9 L13.5 12 L10.5 12 L9.5 9 Z" fill="#d97706" />
                  {/* Hexagones dorés foncés autour */}
                  <path d="M14.5 9 L16 8 L17 10 L16 12 L14 11" fill="#d97706" />
                  <path d="M9.5 9 L8 8 L7 10 L8 12 L10 11" fill="#d97706" />
                  <path d="M13.5 12 L15 14 L12 15.5 L9 14 L10.5 12" fill="#d97706" />
                  <path d="M12 7 L12 5 L14 6 L14.5 9" fill="#d97706" />
                </svg>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-950 border-b border-gray-800 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">⚽ Matchs Disponibles</h1>
              <p className="text-gray-400 text-sm mt-1">{realMatches.length} matchs trouvés</p>
            </div>
            <Button
              onClick={() => refetchMatches()}
              disabled={matchesLoading}
              className="gap-2 bg-emerald-500 hover:bg-emerald-600"
            >
              <RefreshCw className={`w-4 h-4 ${matchesLoading ? 'animate-spin' : ''}`} />
              {matchesLoading ? 'Actualisation...' : 'Actualiser'}
            </Button>
          </div>
        </motion.div>

        {/* Filters Bar */}
        <div className="bg-gray-950 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center gap-4">
            {/* League Dropdown */}
            <div className="relative">
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white hover:border-orange-500 transition cursor-pointer focus:outline-none focus:border-orange-500"
              >
                {leagueNames.map((league) => (
                  <option key={league} value={league}>
                    {league}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Rechercher un match..."
                className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid: Matches + Betslip */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden">
          {/* Left Column: Matches (2/3 width) */}
          <div className="lg:col-span-2 overflow-y-auto p-6 flex flex-col">
            <div className="space-y-3">
            {sortedMatches.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>{searchQuery ? `Aucun match trouvé pour "${searchQuery}"` : 'Aucun match disponible pour le moment'}</p>
              </div>
            ) : (
              sortedMatches.map((match) => {
                const odds = getOddsForMatch(match)
                if (!odds) return null
                
                const isSelected = selectedMatch?.id === match.id
                
                return (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedMatch(isSelected ? null : match)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getLeagueFlag(getSportName(match.sport))}</span>
                        <span className="text-xs text-gray-400">{getSportName(match.sport)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-400 text-sm font-semibold">
                          {new Date(match.commenceTime).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                        </span>
                        <span className="text-orange-400 text-sm font-bold">
                          {new Date(match.commenceTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
                        </div>
                        <span className="text-white font-semibold">{match.homeTeam}</span>
                      </div>
                      
                      <span className="text-gray-500 font-bold mx-4">VS</span>
                      
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="text-white font-semibold">{match.awayTeam}</span>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Odds - Résultat */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-orange-400 text-sm font-semibold">Résultat</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePickSelection(match, match.homeTeam, odds.homeOdds.price)
                          }}
                          className={`border rounded p-3 transition-all ${
                            selectedPick?.matchId === match.id && selectedPick?.selection === match.homeTeam
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-orange-500'
                              : 'border-gray-700 hover:border-orange-500 bg-gray-900/50'
                          }`}
                        >
                          <p className="text-gray-400 text-xs mb-1">{match.homeTeam}</p>
                          <p className="text-white font-bold text-lg">{odds.homeOdds.price.toFixed(2)}</p>
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePickSelection(match, 'Draw', odds.drawOdds.price)
                          }}
                          className={`border rounded p-3 transition-all ${
                            selectedPick?.matchId === match.id && selectedPick?.selection === 'Draw'
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-orange-500'
                              : 'border-gray-700 hover:border-orange-500 bg-gray-900/50'
                          }`}
                        >
                          <p className="text-gray-400 text-xs mb-1">Match nul</p>
                          <p className="text-white font-bold text-lg">{odds.drawOdds.price.toFixed(2)}</p>
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePickSelection(match, match.awayTeam, odds.awayOdds.price)
                          }}
                          className={`border rounded p-3 transition-all ${
                            selectedPick?.matchId === match.id && selectedPick?.selection === match.awayTeam
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-orange-500'
                              : 'border-gray-700 hover:border-orange-500 bg-gray-900/50'
                          }`}
                        >
                          <p className="text-gray-400 text-xs mb-1">{match.awayTeam}</p>
                          <p className="text-white font-bold text-lg">{odds.awayOdds.price.toFixed(2)}</p>
                        </button>
                      </div>
                    </div>

                    {/* Additional Markets - Only shown when match is selected */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-700 space-y-4"
                      >
                        {/* Placeholder for additional markets */}
                        <div className="text-center py-4">
                          <p className="text-gray-400 text-sm">Marchés supplémentaires à venir</p>
                          <p className="text-gray-500 text-xs mt-1">(Handicap, 1er mi-temps, Total buts, etc.)</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })
            )}
            </div>
          </div>

          {/* Right Column: Betslip (1/3 width) */}
          <div className="bg-gray-950 border-l border-gray-800 p-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-bold text-white">Betslip</h2>
            </div>

            {!selectedPick ? (
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-400 text-sm">Cliquez sur une cote pour ajouter un pick à votre betslip</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selected Pick Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">{selectedPick.league}</p>
                      <p className="text-white font-bold text-sm">{selectedPick.homeTeam} vs {selectedPick.awayTeam}</p>
                      <p className="text-xs text-orange-400 mt-1">
                        {new Date(selectedPick.matchTime).toLocaleString('fr-FR', { 
                          day: '2-digit', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedPick(null)
                        setStakeAmount('')
                        setStakeError('')
                      }}
                      className="text-gray-400 hover:text-red-400 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                    <p className="text-xs text-gray-400 mb-1">Votre sélection</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-bold">{selectedPick.selection}</p>
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-3 py-1 rounded text-sm">
                        {selectedPick.odds.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stake Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Montant de la mise (€)</label>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => handleStakeChange(e.target.value)}
                    placeholder="Entrez votre mise"
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 outline-none transition ${
                      stakeError 
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  {stakeError && (
                    <p className="text-red-400 text-xs">{stakeError}</p>
                  )}
                  {challenge && (
                    <p className="text-xs text-gray-500">
                      Min: €{(challenge.current_balance * 0.01).toFixed(2)} - Max: €{(challenge.current_balance * 0.05).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Cancellation Rule */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-xs text-red-400 font-semibold mb-1">⚠️ Règle d'annulation</p>
                  <p className="text-xs text-red-300">Les paris peuvent être annulés uniquement dans les 2 minutes suivant leur placement</p>
                </div>

                {/* Potential Win */}
                {stakeAmount && !stakeError && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 text-sm">Gains potentiels</span>
                      <span className="text-emerald-400 font-bold text-lg">€{potentialWin.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Place Bet Button */}
                <button
                  onClick={handlePlaceBet}
                  disabled={!stakeAmount || !!stakeError}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    !stakeAmount || !!stakeError
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600'
                  }`}
                >
                  Placer le pari
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
