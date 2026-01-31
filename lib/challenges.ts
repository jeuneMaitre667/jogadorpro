/**
 * Service Challenges
 * Centralise toute la logique métier pour les challenges
 */

import { supabase } from './supabase'
import { Challenge, ChallengeTier, ApiResponse, ApiListResponse } from './types'

interface CreateChallengeParams {
  userId: string
  tier: ChallengeTier
  pricePaid: number
  initialBalance: number
  targetProfit: number
  maxDailyLoss: number
  maxTotalLoss: number
}

export const challengeService = {
  /**
   * Récupère tous les challenges actifs de l'utilisateur
   */
  async getActiveChallenges(userId: string): Promise<Challenge[]> {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching challenges:', error.message)
      return []
    }

    return data || []
  },

  /**
   * Récupère un challenge spécifique avec validation de propriété
   */
  async getChallengeById(
    challengeId: string,
    userId: string
  ): Promise<Challenge | null> {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching challenge:', error.message)
      return null
    }

    return data
  },

  /**
   * Crée un nouveau challenge
   */
  async createChallenge(params: CreateChallengeParams): Promise<Challenge> {
    const { data, error } = await supabase
      .from('challenges')
      .insert([
        {
          user_id: params.userId,
          tier: params.tier,
          price_paid: params.pricePaid,
          status: 'active',
          phase: 1,
          initial_balance: params.initialBalance,
          current_balance: params.initialBalance,
          target_profit: params.targetProfit,
          max_daily_loss: params.maxDailyLoss,
          max_total_loss: params.maxTotalLoss,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating challenge:', error.message)
      throw new Error(error.message)
    }

    if (!data) {
      throw new Error('Aucune donnée retournée par Supabase')
    }

    return data
  },

  /**
   * Met à jour le balance d'un challenge
   */
  async updateChallengeBalance(
    challengeId: string,
    newBalance: number
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('challenges')
        .update({ current_balance: newBalance })
        .eq('id', challengeId)

      if (error) {
        console.error('Error updating challenge balance:', error.message)
        return false
      }

      return true
    } catch (err: any) {
      console.error('Error updating challenge balance:', err.message)
      return false
    }
  },

  /**
   * Met à jour la phase d'un challenge
   */
  async updateChallengePhase(challengeId: string, phase: 1 | 2): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('challenges')
        .update({ phase })
        .eq('id', challengeId)

      if (error) {
        console.error('Error updating challenge phase:', error.message)
        return false
      }

      return true
    } catch (err: any) {
      console.error('Error updating challenge phase:', err.message)
      return false
    }
  },

  /**
   * Complète ou échoue un challenge
   */
  async updateChallengeStatus(
    challengeId: string,
    status: 'completed' | 'failed'
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('challenges')
        .update({ status, end_date: new Date().toISOString() })
        .eq('id', challengeId)

      if (error) {
        console.error('Error updating challenge status:', error.message)
        return false
      }

      return true
    } catch (err: any) {
      console.error('Error updating challenge status:', err.message)
      return false
    }
  },
}
