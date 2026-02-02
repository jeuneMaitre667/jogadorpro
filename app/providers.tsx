'use client'

import { useEffect } from 'react'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Charger et appliquer la langue sauvegardée
    const applyLanguage = () => {
      const savedLanguage = localStorage.getItem('language') || 'fr'
      document.documentElement.lang = savedLanguage
      document.documentElement.setAttribute('lang', savedLanguage)
      console.log('🌍 Language applied:', savedLanguage)
    }
    
    // Appliquer immédiatement
    applyLanguage()
    
    // Écouter les changements de page
    window.addEventListener('pageshow', applyLanguage)
    window.addEventListener('load', applyLanguage)
    
    return () => {
      window.removeEventListener('pageshow', applyLanguage)
      window.removeEventListener('load', applyLanguage)
    }
  }, [])

  return <>{children}</>
}
