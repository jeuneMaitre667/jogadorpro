'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-900/70 border border-gray-800 rounded-2xl p-8 text-center">
        <XCircle className="h-14 w-14 text-red-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Paiement annulé</h1>
        <p className="text-gray-400 mb-6">
          Aucun paiement n’a été effectué. Vous pouvez réessayer quand vous voulez.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/pricing">
            <Button className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500">
              Revenir aux tarifs
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
              Créer un compte
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
