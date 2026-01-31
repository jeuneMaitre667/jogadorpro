/**
 * Types TypeScript pour JogadorPro
 * Source unique de vérité pour les types de données
 */

// Utilisateur
export interface User {
  id: string
  email: string
  role: 'trader' | 'admin'
  kyc_status: 'pending' | 'verified' | 'rejected'
  full_name?: string
  created_at?: string
  updated_at?: string
}

// Challenge
export type ChallengeTier = 'demo' | '1k' | '5k'
export type ChallengeStatus = 'active' | 'completed' | 'failed'
export type ChallengePhase = 1 | 2

export interface Challenge {
  id: string
  user_id: string
  tier: ChallengeTier
  price_paid: number
  status: ChallengeStatus
  phase: ChallengePhase
  initial_balance: number
  current_balance: number
  target_profit: number
  max_daily_loss: number
  max_total_loss: number
  start_date?: string
  end_date?: string
  created_at?: string
  updated_at?: string
}

// Pari (Bet)
export type BetType = 'moneyline' | 'spread' | 'over-under' | 'parlay'
export type BetResult = 'pending' | 'won' | 'lost' | 'void'

export interface Bet {
  id: string
  challenge_id: string
  user_id: string
  sport: string
  event_description: string
  bet_type: BetType
  odds: number
  stake: number
  potential_win: number
  result: BetResult
  profit_loss?: number
  placed_at?: string
  resolved_at?: string
  created_at?: string
  updated_at?: string
}

// Response types pour les API
export interface ApiResponse<T> {
  data?: T
  error?: {
    message: string
    code?: string
  }
}

export interface ApiListResponse<T> {
  data?: T[]
  error?: {
    message: string
    code?: string
  }
}
