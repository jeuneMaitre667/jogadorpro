'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { authService } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { DesignVariant1 } from './variants/DesignVariant1'
import { DesignVariant2 } from './variants/DesignVariant2'
import { DesignVariant3 } from './variants/DesignVariant3'
import { DesignVariant4 } from './variants/DesignVariant4'

type DesignType = 'variant1' | 'variant2' | 'variant3' | 'variant4'

export default function DashboardV2Page() {
  const [selectedDesign, setSelectedDesign] = useState<DesignType>('variant4')
  const [user, setUser] = useState<any>(null)
  const [activeChallenge, setActiveChallenge] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window === 'undefined') return

        const supaUser = await authService.getUser()
        let resolvedUser = supaUser || null

        if (!resolvedUser?.id) {
          const userStr = localStorage.getItem('user')
          if (!userStr) {
            router.push('/auth/login')
            return
          }
          resolvedUser = JSON.parse(userStr)
        }

        setUser(resolvedUser)

        // Get active challenge
        const { data: challenges } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', resolvedUser.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)

        if (challenges && challenges.length > 0) {
          setActiveChallenge(challenges[0])
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  const designs = [
    {
      id: 'variant4' as const,
      name: '⭐ Hybrid Ultimate',
      description: 'Mix optimal des 3 designs - RECOMMANDÉ',
      features: ['Sidebar compact', 'Stats quick view', 'Performance tracking', 'UX optimisée'],
    },
    {
      id: 'variant1' as const,
      name: 'Design FundedStake',
      description: 'Sidebar + Betslip latéral (comme FundedStake)',
      features: ['Navigation latérale', 'Betslip persistant', 'Cards de matchs'],
    },
    {
      id: 'variant2' as const,
      name: 'Design Compact',
      description: 'Top nav + Dashboard cards optimisé',
      features: ['Barre supérieure', 'Vue compacte', 'Statistiques visibles'],
    },
    {
      id: 'variant3' as const,
      name: 'Design Split Screen',
      description: 'Matchs à gauche, Stats à droite',
      features: ['Écran divisé', 'Multi-info', 'Performance tracking'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Design Selector */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">🎨 Dashboard V2 - Sélecteur de Design</h1>
              <p className="text-gray-400 text-sm">Choisis le design qui te convient le mieux</p>
            </div>
            <Link href="/dashboard-pages/dashboard">
              <Button variant="outline" className="text-white">
                ← Retour Dashboard V1
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {designs.map((design) => (
              <motion.button
                key={design.id}
                onClick={() => setSelectedDesign(design.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition text-left ${
                  selectedDesign === design.id
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">{design.name}</h3>
                  {selectedDesign === design.id && (
                    <span className="text-emerald-400 text-xl">✓</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3">{design.description}</p>
                <div className="space-y-1">
                  {design.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-emerald-400">•</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Design Preview */}
      <div className="p-6">
        {selectedDesign === 'variant1' && <DesignVariant1 user={user} challenge={activeChallenge} />}
        {selectedDesign === 'variant2' && <DesignVariant2 user={user} challenge={activeChallenge} />}
        {selectedDesign === 'variant3' && <DesignVariant3 user={user} challenge={activeChallenge} />}
        {selectedDesign === 'variant4' && <DesignVariant4 user={user} challenge={activeChallenge} />}
      </div>
    </div>
  )
}
