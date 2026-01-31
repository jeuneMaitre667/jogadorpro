'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
  { name: 'Jan', value: 4200, profit: 240 },
  { name: 'Fév', value: 3800, profit: -221 },
  { name: 'Mar', value: 2000, profit: 229 },
  { name: 'Avr', value: 2780, profit: 200 },
  { name: 'Mai', value: 1890, profit: 229 },
  { name: 'Jun', value: 2390, profit: 200 },
  { name: 'Jul', value: 3490, profit: 321 },
]

const pieData = [
  { name: 'Demo', value: 30 },
  { name: '1k', value: 40 },
  { name: '5k', value: 20 },
  { name: 'Elite', value: 10 },
]

const COLORS = ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B']

export default function DashboardDesignsPage() {
  const [selectedDesign, setSelectedDesign] = useState<1 | 2 | 3>(1)

  // DESIGN 1 - Minimaliste Épuré
  const Design1 = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
            JogadorPro
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">user@email.com</span>
            <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-slate-100 mb-12">Tableau de Bord</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Solde Total', value: '€5,000', trend: '+8%', color: 'from-emerald-500 to-teal-500' },
            { label: 'Profit/Perte', value: '+€1,200', trend: '+15%', color: 'from-blue-500 to-cyan-500' },
            { label: 'Challenges Actifs', value: '3', trend: '1 Running', color: 'from-purple-500 to-pink-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} p-[1px] rounded-lg`}
            >
              <div className="bg-slate-900 p-6 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-100 mb-2">{stat.value}</p>
                <p className="text-emerald-400 text-sm">↗ {stat.trend}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-12"
        >
          <h3 className="text-xl font-bold text-slate-100 mb-6">Performance (30J)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-slate-100 mb-6">Mes Challenges</h3>
          <div className="space-y-4">
            {['Challenge 1k', 'Challenge 5k', 'Challenge Elite'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
                <span className="text-slate-200">{name}</span>
                <span className="text-emerald-400">+5%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )

  // DESIGN 2 - Futuriste/Gaming
  const Design2 = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Glowing background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Navbar */}
      <nav className="relative border-b border-purple-500/30 bg-slate-950/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">⚡ JogadorPro</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-cyan-300">user@email.com</span>
            <button className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 hover:border-purple-500 text-cyan-300 transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">✨ Dashboard Trader</span>
        </h2>

        {/* Stats Cards with Glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'SOLDE', value: '€5,000', icon: '💰' },
            { label: 'PROFIT', value: '+€1,200', icon: '📈' },
            { label: 'RANK', icon: '🏆', value: '#47 Gold' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-50 blur transition duration-300" />
              <div className="relative bg-slate-900/80 backdrop-blur border border-purple-500/30 group-hover:border-cyan-500/50 p-6 rounded-lg transition">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-purple-300 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mt-2">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-slate-900/50 backdrop-blur border border-purple-500/30 rounded-lg p-6 mb-12"
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-6">🎮 PERFORMANCE 30J</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6B21A8" />
              <XAxis stroke="#A78BFA" />
              <YAxis stroke="#A78BFA" />
              <Tooltip contentStyle={{ backgroundColor: '#1E1B4B', border: '1px solid #A78BFA', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#00FF88" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-slate-900/50 backdrop-blur border border-purple-500/30 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-6">⚔️ CHALLENGES ACTIFS</h3>
          <div className="space-y-3">
            {[
              { name: '🎯 Challenge 1k', progress: 70, profit: '+€50 (+5%)' },
              { name: '📈 Challenge 5k', progress: 50, profit: '-€100 (-2%)' },
              { name: '💎 Challenge Elite', progress: 40, profit: '+€500 (+8%)' },
            ].map((ch, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300 font-semibold">{ch.name}</span>
                  <span className={ch.profit.includes('+') ? 'text-cyan-400' : 'text-pink-400'}>{ch.profit}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-purple-500/30">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${ch.progress}%` }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )

  // DESIGN 3 - Dashboard Pro
  const Design3 = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            JogadorPro
          </h1>
          <div className="text-center flex-1 mx-4">
            <p className="text-gray-300">Solde: <span className="font-bold text-emerald-400">€5,000</span></p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">user@email.com</span>
            <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition">
              Déconnecter
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-100 mb-2">Bienvenue João ! 👋</h2>
        <p className="text-gray-500 mb-12">Voici vos statistiques et vos challenges</p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: '💰 Portefeuille', value: '€5,000', desc: '3 actifs' },
            { label: '📊 P&L Total', value: '+€1,200', desc: '+24% /mois' },
            { label: '⚡ Wins Rate', value: '65%', desc: '19/29 trades' },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-gray-800/70 transition"
            >
              <p className="text-gray-400 text-sm mb-3">{kpi.label}</p>
              <p className="text-3xl font-bold text-gray-100 mb-1">{kpi.value}</p>
              <p className="text-gray-500 text-sm">{kpi.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-100">📈 Courbe de Performance</h3>
              <div className="flex gap-2">
                {['Daily', 'Weekly', 'All'].map((period) => (
                  <button
                    key={period}
                    className="px-3 py-1 text-sm rounded-lg bg-gray-700/50 hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-400 transition"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-100 mb-6">🎯 Allocation par Tier</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Challenges Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-100">🚀 CHALLENGES</h3>
            <div className="flex gap-2">
              {['Actifs', 'Complétés', 'Échoués'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 text-sm rounded-lg bg-gray-700/50 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: '🎯', name: '1k Challenge', solde: '€1,050', rendement: '+5%' },
              { icon: '📈', name: '5k Challenge', solde: '€3,950', rendement: '-2%' },
              { icon: '💎', name: 'Elite Challenge', solde: '€5,000', rendement: '+8%' },
            ].map((challenge, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <span className="text-gray-200 font-semibold">{challenge.name}</span>
                </div>
                <div className="flex items-center gap-12">
                  <span className="text-gray-400">Compte: {challenge.solde}</span>
                  <span className={challenge.rendement.includes('+') ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                    Rendement: {challenge.rendement}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold transition">
            + CRÉER UN CHALLENGE
          </button>
        </motion.div>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Selector */}
      <div className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">🎨 Dashboard Design Comparison</h1>
          <div className="flex gap-4">
            {[
              { id: 1, name: '✨ Minimaliste', color: 'from-slate-500 to-slate-600' },
              { id: 2, name: '⚡ Futuriste', color: 'from-purple-500 to-pink-500' },
              { id: 3, name: '💼 Pro', color: 'from-emerald-500 to-cyan-500' },
            ].map((design) => (
              <button
                key={design.id}
                onClick={() => setSelectedDesign(design.id as 1 | 2 | 3)}
                className={`px-6 py-2 rounded-lg font-semibold transition transform ${
                  selectedDesign === design.id
                    ? `bg-gradient-to-r ${design.color} text-white shadow-lg scale-105`
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {design.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="min-h-screen">
        {selectedDesign === 1 && <Design1 />}
        {selectedDesign === 2 && <Design2 />}
        {selectedDesign === 3 && <Design3 />}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-300 text-center py-6 border-t border-gray-800">
        <p>📌 Clique sur les boutons en haut pour changer de design</p>
      </div>
    </div>
  )
}
