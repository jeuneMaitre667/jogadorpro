import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, tier, initialBalance } = body

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Missing Supabase service role key' },
        { status: 500 }
      )
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // Validate tier and balance
    const TIERS: Record<string, number> = {
      demo: 100,
      '1k': 1000,
      '2.5k': 2500,
      '5k': 5000,
    }

    if (!TIERS[tier]) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    const balance = initialBalance || TIERS[tier]

    // Check if user already has a demo challenge
    if (tier === 'demo') {
      const { data: existingDemo } = await supabase
        .from('challenges')
        .select('id')
        .eq('user_id', userId)
        .eq('tier', 'demo')
        .limit(1)

      if (existingDemo && existingDemo.length > 0) {
        return NextResponse.json(
          { error: 'Vous avez déjà un challenge démo. Un seul challenge démo par compte.' },
          { status: 400 }
        )
      }
    }

    // Create challenge in database
    const { data: challenge, error: createError } = await supabase
      .from('challenges')
      .insert({
        user_id: userId,
        tier,
        price_paid: 0,
        initial_balance: balance,
        current_balance: balance,
        status: 'active',
        phase: 1,
        target_profit: balance * 0.1,
        max_daily_loss: balance * 0.05,
        max_total_loss: balance * 0.2,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating challenge:', createError)
      return NextResponse.json(
        {
          error: 'Failed to create challenge',
          details: createError.message,
          code: createError.code,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      challenge,
    })
  } catch (error) {
    console.error('Error in POST /api/challenges:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
