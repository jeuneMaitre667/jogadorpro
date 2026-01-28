'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JogadorPro
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.email}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold mb-4">Bienvenue! 👋</h2>
          <p className="text-gray-600 mb-6">
            Vous êtes connecté en tant que: <strong>{user?.email}</strong>
          </p>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Stats */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <p className="text-gray-600 text-sm">Challenges Actifs</p>
              <p className="text-3xl font-bold text-green-600 mt-2">0</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <p className="text-gray-600 text-sm">Solde Total</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">R$ 0</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <p className="text-gray-600 text-sm">Profit/Loss</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">R$ 0</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Prochaines étapes:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Vous êtes connecté!</li>
              <li>🔄 Dashboard bientôt complet</li>
              <li>📊 Statistiques en cours</li>
              <li>💰 Challenges à venir</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
