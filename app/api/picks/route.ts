import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/picks - Place a new pick on a match
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, challengeId, homeTeam, awayTeam, selection, league, odds, stake, potentialWin } = body

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

    // Insert pick with correct column names
    const { data: pick, error: pickError } = await supabase
      .from('picks')
      .insert({
        user_id: userId,
        challenge_id: challengeId,
        home_team: homeTeam,
        away_team: awayTeam,
        selection: selection,
        league: league,
        odds: odds,
        stake: stake,
        potential_win: potentialWin,
        status: 'pending'
      })
      .select()
      .single()

    if (pickError) {
      console.error('Error inserting pick:', pickError)
      return NextResponse.json({ error: 'Failed to place pick', details: pickError }, { status: 500 })
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

