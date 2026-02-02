'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, User, Globe, Settings as SettingsIcon, FileText, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { useTranslation } from '@/hooks/useTranslation'

type TabType = 'infos' | 'personal' | 'social' | 'language' | 'format' | 'documents'

interface UserSettings {
  fullName: string
  email: string
  country: string
  language: string
  oddsFormat: string
}

export default function SettingsPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<TabType>('infos')
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('fr')
  const [settings, setSettings] = useState<UserSettings>({
    fullName: '',
    email: '',
    country: 'PT',
    language: 'FR',
    oddsFormat: 'decimal',
  })

  useEffect(() => {
    // Charger la langue sauvegardée et l'appliquer au HTML
    const savedLanguage = localStorage.getItem('language') || 'fr'
    setSelectedLanguage(savedLanguage)
    document.documentElement.lang = savedLanguage
  }, [])

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
    
    // Force une recharge complète du navigateur
    setTimeout(() => {
      location.reload()
    }, 100)
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (!authUser) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const parsed = JSON.parse(storedUser)
          setUser(parsed)
          setSettings(prev => ({
            ...prev,
            email: parsed.email || '',
            fullName: parsed.fullName || '',
          }))
        } else {
          router.push('/auth/login')
          return
        }
      } else {
        setUser(authUser)
        setSettings(prev => ({
          ...prev,
          email: authUser.email || '',
        }))
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'infos', label: t('settings.infosDefi'), icon: SettingsIcon },
    { id: 'personal', label: t('settings.infosPersonnelles'), icon: User },
    { id: 'social', label: t('settings.reseauxSociaux'), icon: Globe },
    { id: 'language', label: t('settings.langue'), icon: Mail },
    { id: 'format', label: t('settings.formatCotes'), icon: FileText },
    { id: 'documents', label: t('settings.documents'), icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/dashboard-pages/dashboard')}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-3xl font-bold text-white">{t('settings.title')}</h1>
          <p className="text-gray-400 ml-auto">{t('settings.description')}</p>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Tabs */}
        <div className="w-64 bg-gray-950 border-r border-gray-800 p-6">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Infos Défi */}
          {activeTab === 'infos' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">{t('settings.infosDefi')}</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-2">📊 {t('settings.statsGenerales')}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">{t('settings.total')}</p>
                        <p className="text-2xl font-bold text-white">1</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">{t('settings.actifs')}</p>
                        <p className="text-2xl font-bold text-emerald-400">0</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">{t('settings.echoues')}</p>
                        <p className="text-2xl font-bold text-red-400">1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Infos Personnelles */}
          {activeTab === 'personal' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Informations Personnelles</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    type="email"
                    value={settings.email}
                    disabled
                    className="bg-gray-900 border-gray-700 text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom Complet</label>
                  <Input
                    type="text"
                    value={settings.fullName}
                    onChange={(e) => setSettings(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="João Silva"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pays</label>
                  <Input
                    type="text"
                    value={settings.country}
                    onChange={(e) => setSettings(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Portugal"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-4">
                  Enregistrer les modifications
                </Button>
              </div>
            </div>
          )}

          {/* Réseaux Sociaux */}
          {activeTab === 'social' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Réseaux Sociaux</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
                {['Twitter', 'Instagram', 'TikTok', 'Discord'].map((social) => (
                  <div key={social}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{social}</label>
                    <Input
                      type="text"
                      placeholder={`@votre_${social.toLowerCase()}`}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>
                ))}
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-4">
                  Enregistrer les réseaux
                </Button>
              </div>
            </div>
          )}

          {/* Langue */}
          {activeTab === 'language' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">{t('settings.langue')}</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <label className="block text-sm font-medium text-gray-300 mb-4">{t('settings.selectLanguage')}</label>
                <div className="space-y-3">
                  {[
                    { code: 'fr', name: t('dashboard.french'), flag: '🇫🇷' },
                    { code: 'en', name: t('dashboard.english'), flag: '🇬🇧' },
                    { code: 'pt-BR', name: t('dashboard.portuguese'), flag: '🇧🇷' },
                    { code: 'es', name: t('dashboard.spanish'), flag: '🇪🇸' },
                  ].map((lang) => (
                    <label key={lang.code} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition">
                      <input
                        type="radio"
                        name="language"
                        value={lang.code}
                        checked={selectedLanguage === lang.code}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-gray-300 font-medium">{lang.name}</span>
                      {selectedLanguage === lang.code && (
                        <span className="ml-auto text-emerald-400 text-sm font-semibold">✓ {t('dashboard.active')}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Format des Cotes */}
          {activeTab === 'format' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Format des Cotes</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
                <p className="text-gray-400 text-sm mb-4">Choisissez le format d'affichage des cotes</p>
                {[
                  { id: 'decimal', label: 'Décimal', example: '2.50' },
                  { id: 'fractional', label: 'Fractionnaire', example: '3/2' },
                  { id: 'american', label: 'Américain', example: '+150' },
                ].map((format) => (
                  <label key={format.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      defaultChecked={format.id === 'decimal'}
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <div>
                      <span className="text-gray-300">{format.label}</span>
                      <span className="text-gray-500 text-sm ml-2">({format.example})</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-white mb-2">Documents</h2>
              <p className="text-gray-400 text-sm mb-8">Gérez votre compte et consultez vos défis</p>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-blue-400 text-sm">
                    Veuillez télécharger votre pièce d'identité, justificatif de domicile et documents bancaires pour vérification.
                  </p>
                </div>

                {/* Justificatif d'Identité */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Justificatif d'Identité</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 mb-3 focus:border-emerald-500 focus:outline-none">
                    <option>Sélectionner le type de document</option>
                    <option>Carte d'identité</option>
                    <option>Passeport</option>
                    <option>Permis de conduire</option>
                  </select>
                  <button className="w-full border-2 border-dashed border-blue-500/50 rounded-lg p-6 hover:bg-blue-500/5 transition text-center">
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Télécharger Document d'Identité</span>
                    </div>
                  </button>
                </div>

                {/* Justificatif de Domicile */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Justificatif de Domicile</label>
                  <button className="w-full border-2 border-dashed border-blue-500/50 rounded-lg p-6 hover:bg-blue-500/5 transition text-center">
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Télécharger Justificatif de Domicile</span>
                    </div>
                  </button>
                  <p className="text-gray-500 text-xs mt-2">Facture, avis d'imposition ou relevé bancaire</p>
                </div>

                {/* RIB / Coordonnées Bancaires */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">RIB / Coordonnées Bancaires</label>
                  <button className="w-full border-2 border-dashed border-blue-500/50 rounded-lg p-6 hover:bg-blue-500/5 transition text-center">
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Télécharger RIB / Document Bancaire</span>
                    </div>
                  </button>
                </div>

                {/* Warning */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
                  <p className="text-amber-400 text-sm font-medium">
                    Veuillez sélectionner au moins un document à télécharger
                  </p>
                </div>

                {/* Submit Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                  Soumettre KYC
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
