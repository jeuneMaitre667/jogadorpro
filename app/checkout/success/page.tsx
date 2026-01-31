'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-900/70 border border-gray-800 rounded-2xl p-8 text-center">
        <CheckCircle className="h-14 w-14 text-green-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Paiement confirmé 🎉</h1>
        <p className="text-gray-400 mb-6">
          Merci pour votre achat. Votre challenge est en préparation.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500">
              Accéder au dashboard
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
              Voir les autres plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
