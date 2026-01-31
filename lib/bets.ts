/**
 * Service Bets (Paris)
 * Centralise toute la logique métier pour les paris
 */

import { supabase } from './supabase'
import { Bet, BetType, BetResult } from './types'

interface CreateBetParams {
  challengeId: string
  userId: string
  sport: string
  eventDescription: string
  betType: BetType
  odds: number
  stake: number
}

export const betsService = {
  /**
   * Récupère tous les paris d'un challenge
   */
  async getBetsByChallenge(challengeId: string): Promise<Bet[]> {
    const { data, error } = await supabase
      .from('bets')
      .select('*')
      .eq('challenge_id', challengeId)
      .order('placed_at', { ascending: false })

    if (error) {
      console.error('Error fetching bets:', error.message)
      return []
    }

    return data || []
  },

  /**
   * Récupère les statistiques des paris pour un challenge
   */
  async getBetStats(challengeId: string) {
    const bets = await this.getBetsByChallenge(challengeId)

    const resolved = bets.filter((b) => b.result !== 'pending')
    const wonBets = bets.filter((b) => b.result === 'won').length
    const lostBets = bets.filter((b) => b.result === 'lost').length
    const pendingBets = bets.filter((b) => b.result === 'pending').length

    const winRate =
      resolved.length > 0 ? ((wonBets / resolved.length) * 100).toFixed(1) : '0'

    return {
      total: bets.length,
      won: wonBets,
      lost: lostBets,
      pending: pendingBets,
      winRate: parseFloat(winRate),
    }
  },

  /**
   * Crée un nouveau pari
   */
  async createBet(params: CreateBetParams): Promise<Bet | null> {
    try {
      const potentialWin = params.stake * params.odds

      const { data, error } = await supabase
        .from('bets')
        .insert([
          {
            challenge_id: params.challengeId,
            user_id: params.userId,
            sport: params.sport,
            event_description: params.eventDescription,
            bet_type: params.betType,
            odds: params.odds,
            stake: params.stake,
            potential_win: potentialWin,
            result: 'pending',
            placed_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error('Error creating bet:', error.message)
        return null
      }

      return data
    } catch (err: any) {
      console.error('Error creating bet:', err.message)
      return null
    }
  },

  /**
   * Met à jour le résultat d'un pari
   */
  async updateBetResult(
    betId: string,
    result: BetResult,
    profitLoss?: number
  ): Promise<boolean> {
    try {
      const updateData: any = {
        result,
        resolved_at: new Date().toISOString(),
      }

      if (profitLoss !== undefined) {
        updateData.profit_loss = profitLoss
      }

      const { error } = await supabase.from('bets').update(updateData).eq('id', betId)

      if (error) {
        console.error('Error updating bet result:', error.message)
        return false
      }

      return true
    } catch (err: any) {
      console.error('Error updating bet result:', err.message)
      return false
    }
  },

  /**
   * Récupère un pari spécifique
   */
  async getBetById(betId: string): Promise<Bet | null> {
    const { data, error } = await supabase
      .from('bets')
      .select('*')
      .eq('id', betId)
      .single()

    if (error) {
      console.error('Error fetching bet:', error.message)
      return null
    }

    return data
  },
}
