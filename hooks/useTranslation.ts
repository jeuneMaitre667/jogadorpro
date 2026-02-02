import { useState, useEffect } from 'react'
import { translations, type Language } from '@/lib/translations'

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('fr')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedLanguage = (localStorage.getItem('language') || 'fr') as Language
    setLanguage(savedLanguage)
    setIsLoading(false)
  }, [])

  const t = (key: string) => {
    const keys = key.split('.')
    let current: any = translations[language]
    
    for (const k of keys) {
      if (current && typeof current === 'object') {
        current = current[k]
      } else {
        return key
      }
    }
    
    return typeof current === 'string' ? current : key
  }

  return { t, language, isLoading }
}
