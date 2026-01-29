'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen bg-white space-y-4 p-4">
      {/* OPTION 1: Dark Mode Premium */}
      <div className="rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-96 p-8 text-white">
          {/* Navbar */}
          <nav className="mb-12 pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                JogadorPro
              </h1>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                Login
              </Button>
            </div>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Tradez avec du Capital Réel</h2>
            <p className="text-gray-300 mb-8">La plateforme complète pour traders professionnels</p>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              Commencer Maintenant
            </Button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition">
                <h3 className="text-lg font-bold mb-2 text-white">Feature {i}</h3>
                <p className="text-gray-400 text-sm">Description courte de la feature</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-4 text-center">
          <p className="font-bold text-gray-800">OPTION 1: Dark Mode Premium</p>
          <p className="text-sm text-gray-600">Fond: gray-950 | Accents: green-400 + blue-400 | Style: Finance Pro</p>
        </div>
      </div>

      {/* OPTION 2: Gradient Bleu Profond */}
      <div className="rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-96 p-8 text-white">
          {/* Navbar */}
          <nav className="mb-12 pb-6 border-b border-blue-700">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                JogadorPro
              </h1>
              <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white">
                Login
              </Button>
            </div>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Tradez avec du Capital Réel</h2>
            <p className="text-blue-200 mb-8">La plateforme complète pour traders professionnels</p>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white">
              Commencer Maintenant
            </Button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gradient-to-br from-blue-800 to-slate-800 p-6 rounded-lg border border-blue-600 hover:border-cyan-400 transition">
                <h3 className="text-lg font-bold mb-2 text-white">Feature {i}</h3>
                <p className="text-blue-200 text-sm">Description courte de la feature</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-4 text-center">
          <p className="font-bold text-gray-800">OPTION 2: Gradient Bleu Profond</p>
          <p className="text-sm text-gray-600">Fond: slate-900 via blue-900 | Accents: cyan-400 + emerald-400 | Style: Modern SaaS</p>
        </div>
      </div>

      {/* OPTION 3: Gradient Dynamique Violet */}
      <div className="rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 min-h-96 p-8 text-white">
          {/* Navbar */}
          <nav className="mb-12 pb-6 border-b border-purple-700">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                JogadorPro
              </h1>
              <Button className="bg-gradient-to-r from-violet-500 to-emerald-500 hover:from-violet-600 hover:to-emerald-600 text-white">
                Login
              </Button>
            </div>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Tradez avec du Capital Réel</h2>
            <p className="text-purple-200 mb-8">La plateforme complète pour traders professionnels</p>
            <Button className="bg-gradient-to-r from-violet-500 to-emerald-500 text-white">
              Commencer Maintenant
            </Button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gradient-to-br from-purple-800 to-slate-800 p-6 rounded-lg border border-purple-600 hover:border-violet-400 transition">
                <h3 className="text-lg font-bold mb-2 text-white">Feature {i}</h3>
                <p className="text-purple-200 text-sm">Description courte de la feature</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-4 text-center">
          <p className="font-bold text-gray-800">OPTION 3: Gradient Dynamique Violet</p>
          <p className="text-sm text-gray-600">Fond: slate-950 via purple-900 | Accents: violet-400 + pink-400 + emerald-400 | Style: Premium Energy</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">🎨 Choisis l'option que tu préfères !</h3>
        <p className="text-gray-600 mb-4">Dis-moi simplement : OPTION 1, OPTION 2, ou OPTION 3</p>
        <p className="text-sm text-gray-500">Je vais appliquer le design choisi à tout le site</p>
      </div>
    </div>
  )
}
