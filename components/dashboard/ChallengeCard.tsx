/**
 * Composant ChallengeCard
 * Carte de challenge réutilisable
 */

import Link from 'next/link'
import { Challenge } from '@/lib/types'

interface ChallengeCardProps {
  challenge: Challenge
  isClickable?: boolean
}

export function ChallengeCard({ challenge, isClickable = true }: ChallengeCardProps) {
  const profit = challenge.current_balance - challenge.initial_balance
  const profitPercent =
    challenge.initial_balance > 0 ? ((profit / challenge.initial_balance) * 100).toFixed(1) : '0'

  const content = (
    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700 hover:border-gray-500 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white capitalize">{challenge.tier} Challenge</h3>
          <p className="text-gray-500 text-sm">Phase {challenge.phase}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            challenge.status === 'active'
              ? 'bg-green-100 text-green-800'
              : challenge.status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Balance</span>
          <span className="text-gray-200 font-semibold">
            €{challenge.current_balance.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Profit</span>
          <span className={`font-semibold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profit >= 0 ? '+' : ''}
            €{profit.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ({profitPercent}%)
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Target</span>
          <span className="text-gray-200 font-semibold">€{challenge.target_profit}</span>
        </div>
      </div>
    </div>
  )

  if (!isClickable) {
    return content
  }

  return <Link href={`/dashboard/challenge/${challenge.id}`}>{content}</Link>
}
