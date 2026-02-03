# JogadorPro - Instructions pour Agents IA

**Plateforme de prop trading pour paris sportifs** avec Next.js 16, React 19, TypeScript, Supabase et The Odds API.

## 🎯 Concept du Projet

JogadorPro fonctionne comme FTMO mais pour les parieurs sportifs. Les utilisateurs passent des challenges de paris avec du capital virtuel (€100-€50K) pour débloquer des comptes financés réels et garder 80% des profits.

**Parcours utilisateur :**
1. Créer un compte (email/password)
2. Choisir un challenge (DEMO gratuit ou payant)
3. Consulter les matchs en direct avec cotes
4. Placer des paris (picks)
5. Atteindre l'objectif de profit
6. Obtenir un compte financé

## 🏗️ Architecture Overview

### Tech Stack Decisions

**Next.js 16 (Turbopack) + React 19**: Using App Router exclusively. All pages are in `/app` with route groups for organization. Server Components by default; add `"use client"` for interactivity (useState, event handlers, useEffect).

**Supabase**: Handles auth AND database. Auth uses both Supabase sessions and localStorage fallback for resilience. Database has Row Level Security (RLS) enabled on all tables. Client instantiated once in `lib/supabase.ts`, imported everywhere.

**The Odds API**: External service for live sports odds (18 active leagues). CRITICAL: Free tier has 500 req/month limit. Always cache responses for 5+ minutes. All calls go through `/api/matches` route, never direct from client. Rate limit tracking and exponential backoff retry logic in `lib/oddsapi.ts`.

**Stratégie de cache**: Cache en mémoire (`lib/cache.ts`) pour les réponses API. Matchs cachés 5min, configs de ligues en cache infini. Invalidation uniquement sur refresh manuel.

**Ligues** : 18 ligues actives fixes (non configurables par utilisateur pour l'instant). Config dans `sportsConfig.ts` → `DEFAULT_DASHBOARD_SPORTS`. Possibilité future de personnalisation par utilisateur.

### Key Directory Patterns

```
app/
  _auth/              # Auth pages (login/signup) - _ prefix hides from nav
  dashboard-pages/    # All authenticated pages (not protected by middleware yet)
  api/                # Backend routes (matches, challenges, picks, stripe)
  
lib/
  *.ts                # Services layer - all business logic lives here
  types.ts            # Single source of truth for TypeScript types
  sportsConfig.ts     # 28 leagues config - DEFAULT_DASHBOARD_SPORTS used in dashboard
  
components/
  sections/           # Landing page sections (Hero, Features, Pricing)
  dashboard/          # Dashboard-specific components
  ui/                 # Shadcn components (40+) - DO NOT modify directly
```

**DO NOT create page.tsx files directly in `/app` - use route groups** (`_auth`, `dashboard-pages`). This keeps structure clean and allows for future middleware protection.

## 🔑 Critical Data Flows

### 1. Authentification (CRITIQUE)

**Système double** : Supabase + localStorage (pour éviter les déconnexions intempestives)

**Flow :**
1. Utilisateur remplit le formulaire login/signup
2. Supabase traite l'authentification
3. Backup automatique dans localStorage
4. Redirection vers `/dashboard-pages/dashboard`

**⚠️ Important** : Pas de middleware Next.js pour l'instant. Chaque page vérifie l'auth côté client dans useEffect.

**Pattern à utiliser PARTOUT :**
```typescript
// Dans chaque page protégée
const [user, setUser] = useState(null)

useEffecréation de Challenge

**Flow :**
1. Utilisateur clique sur un tier (DEMO, 1K, 2.5K, 5K)
2. API `/api/challenges` valide (limite 1 DEMO par user)
3. Insertion dans table `challenges` avec valeurs initiales
4. Retour du `challenge_id`
5. Redirection vers dashboard

**Tier DEMO (GRATUIT) :**
- Capital : €100
- Limite : 1 par utilisateur (à vie)
- Validation : `tier: 'demo'` dans la requête
- Exemple de vérification :
```typescript
// Dans /api/challenges/route.ts
const { data: existingDemo } = await supabase
  .from('challenges')
  .select('id')
  .eq('user_id', userId)
  .eq('tier', 'demo')

if (existingDemo && existingDemo.length > 0) {
  return NextResponse.json(
    { error: 'Demo challenge déjà créé' },
    { status: 400 }
  )
}
```
Chargement des Matchs (PERFORMANCE CRITIQUE)

**Flow :**
1. Dashboard monte → Hook `useMatches` s'active
2. `GET /api/matches` appelé
3. Vérification du cache (TTL: 5 minutes)
4. Si expiré → Fetch Odds API
5. Mise en cache + retour au client

**Auto-refresh** : `useMatches` rafraîchit toutes les 60s. Bouton "Actualiser" force le refresh.
lacement de Pick (EN COURS - PAS COMPLET)

**Flow attendu :**
1. Utilisateur clique sur un match
2. Modal s'ouvre avec détails + formulaire de mise
3. Entre la mise (stake)
4. Validation (cotes min, mise max selon challenge)
5. `POST /api/picks` avec données
6. Mise à jour du `current_balance` du challenge
7. Confirmation visuelle

**État actuel** : 
- ✅ Modal existe et s'affiche
- ❌ Route `/api/picks` incomplète (ne sauvegarde pas en DB)
- ✅ Table `picks` existe dans Supabase
- ❌ Pas de mise à jour du balance challenge

**Exemple de ce qui manque :**
```typescript
// À compléter dans /api/picks/route.ts
export async function POST(request: Request) {
  const { challengeId, matchData, stake, odds, selection } = await request.json()
  
  // 1. Vérifier que stake <= current_balance
  // 2. Insérer dans table picks
  // 3. Déduire stake du current_balance du challenge
  // 4. Retourner confirmation
}
```
// Dans une page dashboard
const { 
  matches,           // Liste des matchs
  loading,           // État de chargement
  error,             // Erreur éventuelle
  refetch            // Fonction pour forcer refresh
} = useMatches({
  autoFetch: true,              // Fetch automatique au mount
  refreshInterval: 60000,       // 60 secondes
  sports: DEFAULT_DASHBOARD_SPORTS  // 18 ligues configurées
})

// Bouton actualiser manuel
<button onClick={() => refetch()}>
  Actualiser les matchs
</button>
```

**Pourquoi le cache ?** Odds API free tier = 500 requêtes/mois. Sans cache → limite atteinte en 3 jours
      setUser(authUser)
    }
  }
  checkAuth()
}, [])
```

### 2. Challenge Creation Flow

```
SelectVariables d'Environnement

**Côté client** (préfixe NEXT_PUBLIC_) :
- `NEXT_PUBLIC_SUPABASE_URL` - URL du projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé publique Supabase
- `NEXT_PUBLIC_APP_URL` - URL de l'app (localhost:3000 en dev)

**Côté serveur uniquement** (sans préfixe) :
- `SUPABASE_SERVICE_ROLE_KEY` - Clé admin pour opérations sensibles
- `ODDS_API_KEY` - API key pour The Odds API (JAMAIS exposer)
- `STRIPE_SECRET_KEY` - Pour checkout Stripe (pas encore configuré)

**Validation obligatoire dans les API routes :**
```typescript
// Exemple dans /api/matches/route.ts
export async function GET(request: Request) {
  if (!process.env.ODDS_API_KEY) {
    return NextResponse.json(
      { error: 'Configuration manquante: ODDS_API_KEY' },
      { status: 500 }
    )
  }
  // ... suite du code
}
```

**JAMAIS** hardcoder de clés API dans le code !ected flow: Select match → Open modal → Enter stake → Validate (min odds, max stake) → POST /api/picks → Update challenge balance → Show confirmation.

**Current status**: Modal exists but API route incomplete. Picks table exists in DB but not populated yet.

## 💻 Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (MUST pass with 0 TS errors)
npm run lint         # ESLint check
npm test             # Run Playwright tests (requires dev server running)
npx playwright test --ui  # Interactive test UI
```

**Before every commit**: Run `npm run build` and ensure 0 TypeScript errors. This is non-negotiable.

## 🎨 Design System (Strict)

Colors ares & Qualité

**Tests E2E Playwright** dans `/tests` :

**Tests actuels :**
- ✅ `demo-challenge.spec.ts` - Flow complet login → création challenge DEMO
- ✅ `language-selection.spec.ts` - Changement de langue

**Commandes :**
```bash
npm run test              # Lancer tous les tests
npx playwright test --ui  # Mode interactif
npx playwright test --debug  # Mode debug
```

**Credentials de test :** `arma@gmail.com` / `armada` (dev/staging uniquement)

**Pattern pour nouveaux tests :**
```typescript
test('should place a pick', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:3000/auth/login')
  await page.fill('input[type="email"]', 'arma@gmail.com')
  await page.fill('input[type="password"]', 'armada')
  await page.click('button[type="submit"]')
  
  // 2. Attendre navigation (PAS de timeout arbitraire)
  await page.waitForURL('**/dashboard')
  
  // 3. Action à tester
  await page.click('[data-testid="first-match"]')
  
  // 4. Vérification
  await expect(page.locator('text=Placer un pari')).toBeVisible()
})
```

**🎯 Tests à ajouter (prioritaires) :**
- [ ] Placement de pick complet (quand API route complète)
- [ ] Validation des limites de mise
- [ ] Mise à jour du balance après pick
- [ ] Flow de création des tiers payants avec Stripe
- [ ] Gestion des erreurs API (rate limit Odds API)
- [ ] Déconnexion et reconnexion (test du localStorage)
- [ ] Responsive mobile (viewport 375px)

**🎯 Tests à ajouter (secondaires) :**
- [ ] Filtres de matchs par ligue
- [ ] Tri des matchs par date/cote
- [ ] Historique des picks
- [ ] Calcul P&L automatique
- [ ] Changement de langue persistant
- Sidebar: 80px wide (icon-only), 240px expanded (with labels)
- Card padding: `p-6` standard
- Border radius: `rounded-lg` (8px) standard
- Shadows: `shadow-lg` for cards

## 🔐 Security & Environment Variables

**Client-side** (NEXT_PUBLIC_ prefix):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

**Server-only** (no prefix):
- `SUPABASE_SERVICE_ROLE_KEY` - Used in API routes for admin operations
- `ODDS_API_KEY` - NEVER expose client-side
- `STRIPE_SECRET_KEY` - For checkout sessions

**NEVER hardcode API keys**. Check for missing env vars on server startup:
```typescript
if (!process.env.ODDS_API_KEY) {
  throw new Error('Missing ODDS_API_KEY')
}
```

## 🧪 Testing Patterns

Playwright E2E tests in `/tests`. Current coverage:
- `demo-challenge.spec.ts`: Full flow from login to challenge creation
- `language-selection.spec.ts`: Multi-language switching

**Writing new tests**: Always use explicit waits (`waitForLoadState`, `waitForURL`) instead of arbitrary timeouts. Target buttons by text content or test IDs (add `data-testid` attributes).

Test user credentials: `arma@gmail.com` / `armada` (dev/staging only)

## 📊 Database Schema Essentials

**challenges table**: Main entity. Fields: `user_id`, `tier`, `status` (active/completed/failed), `current_balance`, `target_profit`, `max_daily_loss`, `max_total_loss`.

**picks table**: User bets. Fields: `challenge_id`, `home_team`, `away_team`, `selection` (home/draw/away), `odds`, `stake`, `status` (pending/won/lost).

**RLS enabled on all tables**. Policies allow users to read/write only their own data. Admin role bypasses (not implemented yet).

## 🐛 Common Pitfalls

1. **"Module not found" errors**: Always use `@/` path alias. Check `tsconfig.json` paths and verify file actually exists before importing.

2. **"useEffect missing dependencies"**: Add to dependency array OR use `useCallback` to stabilize function references.

3. **Hydration mismatches**: Never use `Date.now()` or `Math.random()` directly in render. Use `useState` + `useEffect` to set after mount.

4. **Odds API rate limit**: If you see 429 errors, cache is not working. Check `lib/cache.ts` and ensure TTL is sufficient. Default 5min is minimum safe value.

5. **Supabase connection failures**: Verify env vars are set. In development, check `.env.local`. In production (Vercel), set in dashboard under Environment Variables.

6. **TStyle de Code (Non Négociable)

- **Indentation** : 2 espaces
- **Points-virgules** : Toujours
- **Guillemets** : Doubles pour JSX, simples pour TS/JS
- **Exports** : `export default` pour pages, named exports pour utilitaires
- **Async/await** : Préféré aux chaînes `.then()`
- **Gestion erreurs** : Toujours try/catch pour opérations async

**INTERDIT :**
- `console.log` en production (conditionner selon env)
- Styles inline (`style={{}}`) - utiliser Tailwind
- `<a>` pour liens internes - utiliser `next/link`
- `<img>` - utiliser `next/image`

**Exemple de composant bien formaté :**
```typescript
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function MyPage() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
        
        if (error) throw error
        setData(datasation (i18n)

**3 langues** : 🇧🇷 Portugais (défaut), 🇫🇷 Français, 🇬🇧 Anglais

**Utiliser partout le hook** :
```typescript
const { t, language, changeLanguage } = useTranslation()

// Dans le JSX
<h1>{t('dashboard.title')}</h1>
<p>{t('dashboard.welcome', { name: user.name })}</p>

// Changer de langue
<button onClick={() => changeLanguage('fr')}>
  Français
</button>
```

**Ajouter des traductions** dans `lib/translations.ts` :
```typescript
export const translations = {
  fr: {
    dashboard: {
      title: 'Tableau de Bord',
      welcome: 'Bienvenue {{name}}'
    }
  },
  // ... autres langues
}
```

**JAMAIS** de texte hardcodé visible par l'utilisateur !
        Mon Titre
      </h1>
      <Button className="mt-4">
        Action
      </Button>
    </div>
  )
}
``
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // validation logic
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}Priorités Actuelles (Février 2026)

1. **Compléter Placement de Picks** 🔴 URGENT
   - Finir la route `/api/picks`
   - Validation des mises (min/max selon tier)
   - Mise à jour du `current_balance` du challenge
   - Confirmation visuelle après placement

2. **Calcul P&L** 🔴 URGENT
   - Cron job pour settlement des picks gagnants/perdants
   - Calcul profit/loss automatique
   - Mise à jour des balances
   - Historique des picks avec résultats

3. **Charts Performance** 🟡 MOYEN
   - Graphique balance over time (recharts)
   - KPIs visuels (win rate, ROI, profit total)
   - Export des données

4. **Intégration Stripe** 🟡 MOYEN
   - Flow checkout complet pour tiers payants
   - Webhooks pour confirmation paiement
   - Création auto du challenge après paiement

**💡 Conseil** : Pose des questions si un point n'est pas clair - mieux vaut clarifier que faire des suppositions 
4. Import layout components from `components/dashboard`
5. Use `useRouter()` from `next/navigation` for navigation

### Adding a New Shadcn Component

**DO NOT modify files in `components/ui/` directly** - they are auto-generated. To customize:
1. Wrap in a new component in `components/dashboard/` or `components/sections/`
2. Override className props for styling
3. Use composition pattern over modification

### Extending the Type System

Add new interfaces to `lib/types.ts`. Follow existing patterns:
- Suffix collection types with plural: `Match[]` not `Matches`
- Use `ApiResponse<T>` wrapper for API responses
- Export all types for use across codebase
- Use string literal unions for enums: `type Status = 'active' | 'pending'`

## 📝 Code Style (Non-Negotiable)

- **Indentation**: 2 spaces
- **Semicolons**: Always
- **Quotes**: Double for JSX, single for TS/JS
- **Exports**: `export default` for page components, named exports for utilities
- **Async/await**: Preferred over `.then()` chains
- **Error handling**: Always try/catch async operations

**DO NOT use**:
- `console.log` in production code (use conditionally based on env)
- Inline styles (`style={{}}`) - use Tailwind
- `<a>` tags for internal links - use `next/link`
- `<img>` tags - use `next/image`

## 🔄 State Management

**No Redux/Zustand/Jotai**. Use React built-ins:
- Local state: `useState`
- Derived state: `useMemo`
- Async data: Custom hooks in `/hooks` with `useEffect`
- URL state: `useSearchParams` from `next/navigation`

For shared state across components: Lift to common parent or use React Context (see `app/providers.tsx` for LanguageProvider example).

## 🌐 Internationalization (i18n)

Three languages supported: 🇧🇷 Portuguese (default), 🇫🇷 French, 🇬🇧 English.

Use `useTranslation()` hook everywhere:
```typescript
const { t } = useTranslation()
return <h1>{t('dashboard.title')}</h1>
```

Translations defined in `lib/translations.ts`. Add new keys following nested structure. **DO NOT hardcode user-facing text** in any language.

## 🎯 Current Sprint Priorities (as of Feb 2026)

1. **Complete Pick Placement**: Finish `/api/picks` route, validate stakes, update challenge balance
2. **P&L Calculation**: Cron job to settle picks, calculate profit/loss, update balances
3. **Performance Tracking**: Charts for balance over time using recharts
4. **Stripe Integration**: Complete checkout flow for paid tiers (1K, 2.5K, 5K)

Ask questions about any unclear areas - better to clarify than make assumptions!
