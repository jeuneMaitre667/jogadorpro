/**
 * 💰 BALANCE & BET SETTLEMENT UTILITIES
 * Gère la déduction du solde et le règlement des paris
 */

import { supabase } from './supabase'

/**
 * Déduire la mise du solde du challenge
 * Appelé immédiatement après qu'un pari soit placé
 */
export async function updateBalanceAfterBet(
  challengeId: string,
  currentBalance: number,
  stake: number
) {
  try {
    const newBalance = currentBalance - stake
    
    console.log(`💰 Updating balance: ${currentBalance} - ${stake} = ${newBalance}`)
    
    const { data, error } = await supabase
      .from('challenges')
      .update({ 
        current_balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('id', challengeId)
      .select()

    if (error) {
      console.error('❌ Balance update error:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Balance updated successfully', data)
    return { success: true, newBalance }
  } catch (err) {
    console.error('💥 Unexpected error updating balance:', err)
    return { success: false, error: String(err) }
  }
}

/**
 * Déterminer le résultat d'un pari basé sur le résultat final du match
 * @param matchResult "Home" | "Away" | "Draw"
 * @param userSelection "Home" | "Away" | "Draw"
 * @returns "won" | "lost" | "void"
 */
function determinePickResult(
  matchResult: string,
  userSelection: string
): 'won' | 'lost' | 'void' {
  if (!matchResult || !userSelection) return 'void'
  if (matchResult === userSelection) return 'won'
  return 'lost'
}

/**
 * Calculer les gains ou pertes d'un pari
 */
function calculatePnL(
  stake: number,
  potentialWin: number,
  result: 'won' | 'lost' | 'void'
): number {
  if (result === 'won') return potentialWin - stake
  if (result === 'lost') return -stake
  return 0 // void
}

/**
 * Régler un pari après le match
 * Mettre à jour le statut du pari et ajuster le solde du challenge
 */
export async function settlePick(
  pickId: string,
  challengeId: string,
  currentBalance: number,
  stake: number,
  potentialWin: number,
  userSelection: string,
  matchResult: string
) {
  try {
    console.log(`🏁 Settling pick ${pickId}: ${userSelection} vs ${matchResult}`)

    const result = determinePickResult(matchResult, userSelection)
    const pnl = calculatePnL(stake, potentialWin, result)
    const newBalance = currentBalance + pnl

    console.log(`📊 Result: ${result} | PnL: ${pnl} | New Balance: ${newBalance}`)

    // 1. Update pick status
    const { error: pickError } = await supabase
      .from('picks')
      .update({
        status: result,
        updated_at: new Date().toISOString()
      })
      .eq('id', pickId)

    if (pickError) {
      console.error('❌ Error updating pick status:', pickError)
      return { success: false, error: pickError.message }
    }

    // 2. Update challenge balance
    const { error: balanceError } = await supabase
      .from('challenges')
      .update({
        current_balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('id', challengeId)

    if (balanceError) {
      console.error('❌ Error updating challenge balance:', balanceError)
      return { success: false, error: balanceError.message }
    }

    console.log('✅ Pick settled successfully')
    return {
      success: true,
      result,
      pnl,
      newBalance
    }
  } catch (err) {
    console.error('💥 Unexpected error settling pick:', err)
    return { success: false, error: String(err) }
  }
}

/**
 * Récupérer tous les picks en attente de règlement pour un utilisateur
 */
export async function getPendingPicks(userId: string) {
  try {
    const { data, error } = await supabase
      .from('picks')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ Error fetching pending picks:', error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (err) {
    console.error('💥 Unexpected error fetching pending picks:', err)
    return { success: false, error: String(err), data: [] }
  }
}

/**
 * Récupérer les statistiques des paris
 */
export async function getPickStats(userId: string) {
  try {
    const { data, error } = await supabase
      .from('picks')
      .select('status')
      .eq('user_id', userId)

    if (error) {
      console.error('❌ Error fetching pick stats:', error)
      return { total: 0, won: 0, lost: 0, pending: 0, void: 0 }
    }

    const picks = data || []
    return {
      total: picks.length,
      won: picks.filter(p => p.status === 'won').length,
      lost: picks.filter(p => p.status === 'lost').length,
      pending: picks.filter(p => p.status === 'pending').length,
      void: picks.filter(p => p.status === 'void').length
    }
  } catch (err) {
    console.error('💥 Unexpected error calculating pick stats:', err)
    return { total: 0, won: 0, lost: 0, pending: 0, void: 0 }
  }
}
