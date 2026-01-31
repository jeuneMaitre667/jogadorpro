/**
 * Composant LoadingSpinner
 * Afficheur de chargement réutilisable
 */

export function LoadingSpinner({
  message = 'Chargement...',
}: {
  message?: string
} = {}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 text-lg">{message}</p>
      </div>
    </div>
  )
}
