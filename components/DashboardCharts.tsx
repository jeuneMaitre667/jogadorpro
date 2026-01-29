'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface ChartData {
  bets: any[]
  challenges: any[]
}

export function DashboardCharts({ bets, challenges }: ChartData) {
  // Préparer les données pour le P&L chart
  const plData = challenges.map((ch) => ({
    name: ch.tier.toUpperCase(),
    profit: ch.current_balance - ch.initial_balance,
    balance: ch.current_balance,
  }))

  // Préparer les données pour le Bets chart
  const betsData = bets
    .slice(0, 10)
    .reverse()
    .map((bet, idx) => ({
      id: `Bet ${idx + 1}`,
      stake: bet.stake || 0,
      profit: bet.profit_loss || 0,
    }))

  // Calculer les stats
  const totalBets = bets.length
  const winningBets = bets.filter((b) => b.profit_loss > 0).length
  const losingBets = bets.filter((b) => b.profit_loss < 0).length
  const winRate = totalBets > 0 ? ((winningBets / totalBets) * 100).toFixed(1) : 0
  const totalProfit = bets.reduce((sum, b) => sum + (b.profit_loss || 0), 0)
  const avgProfit = totalBets > 0 ? (totalProfit / totalBets).toFixed(2) : 0

  const betsStatusData = [
    { name: 'Wins', value: winningBets, fill: '#10b981' },
    { name: 'Losses', value: losingBets, fill: '#ef4444' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <p className="text-sm font-semibold text-gray-600">Total Bets</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalBets}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
          <p className="text-sm font-semibold text-gray-600">Win Rate</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{winRate}%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <p className="text-sm font-semibold text-gray-600">Avg Profit/Bet</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">€{avgProfit}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
          <p className="text-sm font-semibold text-gray-600">Total Profit</p>
          <p className={`text-3xl font-bold mt-2 ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            €{totalProfit.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* P&L Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Profit par Challenge</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bets Status Pie Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Victoires vs Pertes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={betsStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {betsStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bets Chart */}
      {betsData.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-800">10 Derniers Paris</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={betsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="id" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="stake" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
