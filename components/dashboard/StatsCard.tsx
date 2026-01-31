/**
 * Composant StatsCard
 * Carte de statistiques réutilisable
 */

interface StatsCardProps {
  label: string
  value: string | number
  icon?: string
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  subtext?: string
}

export function StatsCard({
  label,
  value,
  icon,
  color = 'blue',
  subtext,
}: StatsCardProps) {
  const colorMap = {
    blue: 'text-blue-600 border-blue-700',
    green: 'text-green-600 border-green-600',
    red: 'text-red-600 border-red-600',
    yellow: 'text-yellow-600 border-yellow-600',
    purple: 'text-purple-600 border-purple-600',
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
      <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {label}
      </p>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
    </div>
  )
}
