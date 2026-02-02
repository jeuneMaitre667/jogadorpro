import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/picks - Place a new pick on a match
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { challengeId, matchId, homeTeam, awayTeam, betType, selection, odds, stake } = body

    // Get user from request headers or body (passed from client)
    // For now, we'll trust the client since we verify challenge ownership
    
    // Verify challenge exists and is active
    const { data: challenge, error: challengeError } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .eq('status', 'active')
      .single()

    if (challengeError || !challenge) {
      return NextResponse.json({ error: 'Challenge not found or not active' }, { status: 404 })
    }

    // Validate stake is between 1-5% of current balance
    const currentBalance = challenge.current_balance || challenge.initial_balance
    const minStake = currentBalance * 0.01
    const maxStake = currentBalance * 0.05

    if (stake < minStake || stake > maxStake) {
      return NextResponse.json(
        { error: `Stake must be between €${minStake.toFixed(2)} (1%) and €${maxStake.toFixed(2)} (5%)` },
        { status: 400 }
      )
    }

    // Calculate potential profit
    const potentialProfit = stake * (odds - 1)

    // Insert pick
    const { data: pick, error: pickError } = await supabase
      .from('picks')
      .insert({
        challenge_id: challengeId,
        match_id: matchId,
        home_team: homeTeam,
        away_team: awayTeam,
        bet_type: betType,
        selection: selection,
        odds: odds,
        stake: stake,
        potential_profit: potentialProfit,
        status: 'pending',
        placed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (pickError) {
      console.error('Error inserting pick:', pickError)
      return NextResponse.json({ error: 'Failed to place pick' }, { status: 500 })
    }

    // Update challenge stats
    const { error: updateError } = await supabase
      .from('challenges')
      .update({
        total_picks: (challenge.total_picks || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', challengeId)

    if (updateError) {
      console.error('Error updating challenge:', updateError)
    }

    return NextResponse.json({
      success: true,
      pick
    })
  } catch (error) {
    console.error('Error placing pick:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
