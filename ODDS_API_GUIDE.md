# 🎯 Guide d'Intégration Odds API - JogadorPro

## 📋 Vue d'ensemble

Tu as maintenant une intégration complète avec **The Odds API** pour afficher les matchs de football en temps réel sur ton dashboard.

## 🔧 Configuration

### 1. **Ligues disponibles** (`lib/sportsConfig.ts`)

Toutes les ligues sont configurées dans ce fichier. Les ligues par défaut affichées sur le dashboard sont:

```typescript
DEFAULT_DASHBOARD_SPORTS = [
  'soccer_brazil_campeonato'    // Brasileirão
  'soccer_epl'                  // Premier League
  'soccer_spain_la_liga'        // La Liga
  'soccer_france_ligue_1'       // Ligue 1
  'soccer_germany_bundesliga'   // Bundesliga
  'soccer_uefa_champs_league'   // Champions League
]
```

### 2. **Ajouter/Retirer des ligues**

Dans `lib/sportsConfig.ts`, modifie `DEFAULT_DASHBOARD_SPORTS`:

```typescript
// Exemple: Ajouter Serie A et retirer Bundesliga
DEFAULT_DASHBOARD_SPORTS: SportKey[] = [
  'soccer_brazil_campeonato',
  'soccer_epl',
  'soccer_spain_la_liga',
  'soccer_france_ligue_1',
  'soccer_italy_serie_a',        // NOUVEAU
  'soccer_uefa_champs_league',
]
```

### 3. **Ajouter une nouvelle ligue**

Dans `SPORTS_CONFIG` du même fichier:

```typescript
'soccer_netherlands_eredivisie': {
  name: 'Eredivisie',
  country: 'Netherlands',
  icon: '🇳🇱',
  color: 'from-orange-600 to-red-600',
},
```

## 🎨 Options de paris (Markets)

Actuellement, le dashboard affiche les cotes **1X2 (Match Winner)**:
- **1** = Victoria del equipo local (Home)
- **X** = Empate (Draw)  
- **2** = Victoria del equipo visitante (Away)

Pour ajouter d'autres types de paris, ils sont déjà définis dans `lib/sportsConfig.ts`:

```typescript
MARKET_TYPES = {
  'h2h': { name: 'Match Winner (1X2)', ... },      // ✅ Actuellement utilisé
  'spreads': { name: 'Point Spread', ... },        // À implémenter
  'totals': { name: 'Over/Under', ... },           // À implémenter
}
```

## 🔄 Flux de données

```
┌─────────────────────────────────────┐
│   Dashboard Component               │
│   (app/dashboard-pages/dashboard)   │
└────────────┬────────────────────────┘
             │ useMatches() hook
             ▼
┌─────────────────────────────────────┐
│   /api/matches endpoint             │
│   - Récupère depuis Odds API        │
│   - Cache 5 minutes                 │
│   - Filtre 48h prochains matchs     │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   The Odds API                      │
│   https://the-odds-api.com         │
│   - 500 requêtes/mois (gratuit)    │
└─────────────────────────────────────┘
```

## 🪝 Utilisation du hook `useMatches()`

```typescript
const {
  matches,        // Array de matchs
  loading,        // Boolean - chargement en cours
  error,          // String | null - erreur si existe
  lastFetch,      // Date - dernière récupération
  refetch,        // Function - forcer l'actualisation
} = useMatches({
  autoFetch: true,        // Charger automatiquement au mount
  refreshInterval: 60000, // Actualiser chaque minute
  sports: ['soccer_epl'], // Optionnel: sports spécifiques
})
```

## 📊 Structure d'un Match

```typescript
interface Match {
  id: string                    // Identifiant unique
  sport: string                 // Ex: 'soccer_epl'
  sportTitle: string            // Ex: 'Premier League'
  league: string                // Ligue (ex: 'Premier League')
  homeTeam: string              // Équipe domicile
  awayTeam: string              // Équipe visitante
  commenceTime: Date            // Heure du match
  odds: {
    home: number | null         // Cote victoire domicile (ex: 1.95)
    draw: number | null         // Cote match nul (ex: 3.40)
    away: number | null         // Cote victoire extérieur (ex: 3.80)
  }
}
```

## ⚙️ Configuration API

Le fichier `.env.local` doit contenir:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ODDS_API_KEY=your_api_key_here
```

**Obtenir une clé Odds API:**
1. Va sur https://the-odds-api.com/
2. Inscris-toi (gratuit)
3. Copie ta clé API
4. Ajoute-la à `.env.local`

## 🎯 Prochaines étapes

### 1. **Ajouter d'autres markets (spreads, totals)**
Modifier `/api/matches` pour récupérer plusieurs markets:

```typescript
const markets = 'h2h,spreads,totals' // Au lieu de 'h2h'
const url = `${BASE_URL}/sports/${sport}/odds/?markets=${markets}&...`
```

### 2. **Placement de paris (Pick/Bet)**
Créer une route `/api/picks` pour:
- Valider la mise
- Vérifier les limites (1-5% du capital)
- Enregistrer en base de données

### 3. **WebSocket temps réel**
Remplacer le polling par WebSocket pour les mises à jour instantanées

### 4. **Filtres avancés**
- Par ligue
- Par cotes (odds > 2.0)
- Par temps (matchs dans 1h, 6h, 24h)
- Par probabilité (favoris/outsiders)

## 🐛 Dépannage

**Pas de matchs affichés?**
- Vérifie que l'API key est valide dans `.env.local`
- Regarde la console du navigateur pour les erreurs
- Vérifie que The Odds API n'a pas atteint le limit (500 req/mois)

**Cotes non mises à jour?**
- Le cache dure 5 minutes, clique "Actualiser"
- Ou attends que l'intervalle de 1 minute se termine

**Équipes/Ligues manquantes?**
- L'API Odds a peut-être limité la disponibilité
- Essaie une autre ligue test (Premier League)
- Vérifie https://the-odds-api.com/sports-odds-data/sports-apis

## 📞 Support

Pour toute question sur l'API Odds:
- Docs: https://the-odds-api.com/liveapi/guides/v4/
- Email: support@the-odds-api.com
