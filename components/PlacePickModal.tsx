'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Check, TrendingUp, AlertTriangle } from 'lucide-react'

interface Match {
  id: string
  sport: string
  sportTitle: string
  league: string
  homeTeam: string
  awayTeam: string
  commenceTime: string
  odds: {
    home: number | null
    draw: number | null
    away: number | null
  }
}

interface PlacePickModalProps {
  match: Match | null
  open: boolean
  onClose: () => void
  onPlacePick: (pick: PickData) => Promise<void>
  currentBalance: number
}

export interface PickData {
  matchId: string
  betType: '1x2'
  selection: 'home' | 'draw' | 'away'
  odds: number
  stake: number
}

type Step = 1 | 2 | 3

export function PlacePickModal({ 
  match, 
  open, 
  onClose, 
  onPlacePick,
  currentBalance 
}: PlacePickModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [selection, setSelection] = useState<'home' | 'draw' | 'away' | null>(null)
  const [stake, setStake] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    setStep(1)
    setSelection(null)
    setStake('')
    setError(null)
    onClose()
  }

  const getSelectedOdds = (): number => {
    if (!match || !selection) return 0
    return match.odds[selection] || 0
  }

  const stakeNum = parseFloat(stake) || 0
  const potentialProfit = stakeNum * getSelectedOdds() - stakeNum
  const potentialReturn = stakeNum * getSelectedOdds()

  const stakePercent = currentBalance > 0 ? (stakeNum / currentBalance) * 100 : 0

  const isValidStake = stakeNum >= currentBalance * 0.01 && stakeNum <= currentBalance * 0.05

  const handleSubmit = async () => {
    if (!match || !selection) return

    const pickData: PickData = {
      matchId: match.id,
      betType: '1x2',
      selection,
      odds: getSelectedOdds(),
      stake: stakeNum
    }

    setLoading(true)
    setError(null)

    try {
      await onPlacePick(pickData)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du placement du pick')
    } finally {
      setLoading(false)
    }
  }

  if (!match) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Placer un Pick</DialogTitle>
          <DialogDescription>
            Étape {step} sur 3
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${
                s <= step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Match Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <Badge variant="outline" className="mb-2">{match.league}</Badge>
          <div className="flex items-center justify-between">
            <span className="font-semibold">{match.homeTeam}</span>
            <span className="text-gray-500 text-sm">VS</span>
            <span className="font-semibold">{match.awayTeam}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Step 1: Select Bet */}
        {step === 1 && (
          <div className="space-y-4">
            <Label>Choisissez votre pari (1X2)</Label>
            <div className="grid grid-cols-3 gap-3">
              <BetOption
                label="1"
                team={match.homeTeam}
                odds={match.odds.home}
                selected={selection === 'home'}
                onClick={() => setSelection('home')}
              />
              <BetOption
                label="X"
                team="Nul"
                odds={match.odds.draw}
                selected={selection === 'draw'}
                onClick={() => setSelection('draw')}
              />
              <BetOption
                label="2"
                team={match.awayTeam}
                odds={match.odds.away}
                selected={selection === 'away'}
                onClick={() => setSelection('away')}
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!selection}
              className="w-full"
            >
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Enter Stake */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Mise (1-5% de votre balance)</Label>
              <div className="mt-2 space-y-2">
                <Input
                  type="number"
                  placeholder="Entrez votre mise"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  min={currentBalance * 0.01}
                  max={currentBalance * 0.05}
                  step="0.01"
                />
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Balance actuelle: €{currentBalance.toFixed(2)}</p>
                  <p>Mise min: €{(currentBalance * 0.01).toFixed(2)} (1%)</p>
                  <p>Mise max: €{(currentBalance * 0.05).toFixed(2)} (5%)</p>
                  {stakeNum > 0 && (
                    <p className={isValidStake ? 'text-green-600' : 'text-red-600'}>
                      Votre mise: {stakePercent.toFixed(1)}% {isValidStake ? '✓' : '✗'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {stakeNum > 0 && (
              <div className="bg-blue-50 rounded-lg p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Cote:</span>
                  <span className="font-semibold">{getSelectedOdds().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Profit potentiel:</span>
                  <span className="font-semibold text-green-600">
                    +€{potentialProfit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span>Retour total:</span>
                  <span className="text-green-600">€{potentialReturn.toFixed(2)}</span>
                </div>
              </div>
            )}

            {!isValidStake && stakeNum > 0 && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <span>La mise doit être entre 1% et 5% de votre balance</span>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Retour
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!isValidStake || stakeNum === 0}
                className="flex-1"
              >
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold mb-2">Récapitulatif</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Match:</span>
                  <span className="font-medium">{match.homeTeam} vs {match.awayTeam}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pari:</span>
                  <span className="font-medium">
                    {selection === 'home' ? `1 (${match.homeTeam})` : 
                     selection === 'draw' ? 'X (Nul)' : 
                     `2 (${match.awayTeam})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cote:</span>
                  <span className="font-medium">{getSelectedOdds().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mise:</span>
                  <span className="font-medium">€{stakeNum.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">Profit potentiel:</span>
                  <span className="font-bold text-green-600">+€{potentialProfit.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Retour
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Placement...' : (
                  <>
                    Confirmer <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function BetOption({
  label,
  team,
  odds,
  selected,
  onClick
}: {
  label: string
  team: string
  odds: number | null
  selected: boolean
  onClick: () => void
}) {
  if (!odds) {
    return (
      <button
        disabled
        className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50 cursor-not-allowed"
      >
        <div className="text-sm text-gray-400">Indisponible</div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-lg p-3 transition-all ${
        selected
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="text-lg font-bold mb-1">{label}</div>
      <div className="text-xs text-gray-600 mb-2 truncate">{team}</div>
      <div className="flex items-center justify-center gap-1 text-green-600 font-bold">
        <TrendingUp className="h-3 w-3" />
        {odds.toFixed(2)}
      </div>
    </button>
  )
}
