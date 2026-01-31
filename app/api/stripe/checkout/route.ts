import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

const getStripe = () => {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) return null
  return new Stripe(secret)
}

export async function POST(req: NextRequest) {
  try {
    const { priceId, customerEmail } = await req.json()

    const stripe = getStripe()
    if (!stripe) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY manquant' },
        { status: 500 }
      )
    }

    if (!priceId) {
      return NextResponse.json({ error: 'priceId requis' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      customer_email: customerEmail || undefined,
      metadata: {
        priceId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const stripeError = error as { raw?: { message?: string }; message?: string }
    const errorMessage =
      stripeError?.raw?.message ||
      stripeError?.message ||
      (error instanceof Error ? error.message : String(error))

    console.error('Stripe checkout error:', errorMessage)
    console.error('Full error:', error)

    return NextResponse.json(
      {
        error: 'Erreur création checkout',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
