/**
 * Composant ProgressBar
 * Barre de progression réutilisable
 */

interface ProgressBarProps {
  current: number
  target: number
  label?: string
  showPercentage?: boolean
}

export function ProgressBar({
  current,
  target,
  label,
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = target > 0 ? (current / target) * 100 : 0
  const displayPercentage = Math.min(Math.round(percentage), 100)

  return (
    <div className="bg-gray-800 rounded-lg shadow p-8 border border-gray-700">
      {label && <h2 className="text-xl font-bold mb-4 text-white">{label}</h2>}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-400">Progress</p>
          {showPercentage && <p className="font-semibold text-gray-200">{displayPercentage}%</p>}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-400 h-4 rounded-full transition-all"
            style={{ width: `${displayPercentage}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-400">
        {Math.round(current)} € of {target} € target
      </p>
    </div>
  )
}
