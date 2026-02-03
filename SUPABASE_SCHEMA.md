# 🗄️ SUPABASE SCHEMA REFERENCE
**Projet:** JogadorPro  
**Dernière mise à jour:** 3 février 2026  
**Source:** Confirmé via Supabase SQL Editor  

⚡ Ce fichier est lu par GitHub Copilot pour corriger automatiquement les erreurs de colonnes.  
⚠️ Ne JAMAIS utiliser une colonne qui n'est pas listée ici.  
⚠️ Toujours en snake_case.

---

## 📌 RÈGLES GLOBALES

- `id` est toujours `uuid` et **auto-généré** → ne jamais l'inclure dans un INSERT
- `created_at` et `updated_at` sont **auto-gérés** → ne jamais les inclure dans un INSERT
- Toujours utiliser `supabase.from('table_name').insert({...})` avec les colonnes EXACTES ci-dessous
- Les colonnes sont en **snake_case** (exemple: `home_team`, pas `homeTeam`)

---

## 📊 TABLE: picks

**Usage:** Stocker les paris placés par les utilisateurs

| Colonne        | Type                     | Requis dans INSERT | Description                              |
|----------------|--------------------------|---------------------|------------------------------------------|
| id             | uuid                     | ❌ AUTO             | Primary key auto-généré                  |
| user_id        | uuid                     | ✅ OUI              | ID de l'utilisateur (from auth session)  |
| challenge_id   | uuid                     | ✅ OUI              | ID du challenge actif                    |
| home_team      | text                     | ✅ OUI              | Nom de l'équipe à domicile               |
| away_team      | text                     | ✅ OUI              | Nom de l'équipe visitante                |
| selection      | text                     | ✅ OUI              | "Home" \| "Away" \| "Draw"               |
| league         | text                     | ✅ OUI              | Nom de la ligue (ex: "Brasileirão")      |
| odds           | numeric                  | ✅ OUI              | Cote sélectionnée (ex: 3.15)            |
| stake          | numeric                  | ✅ OUI              | Mise en R$ (ex: 10)                     |
| potential_win  | numeric                  | ✅ OUI              | Gain potentiel = stake × odds            |
| status         | text                     | ✅ OUI              | "pending" \| "won" \| "lost" \| "void"   |
| created_at     | timestamp with time zone | ❌ AUTO             | Date de création                         |
| updated_at     | timestamp with time zone | ❌ AUTO             | Date de mise à jour                      |

### ✅ Exemple INSERT picks
```typescript
await supabase.from('picks').insert({
  user_id: userId,
  challenge_id: challengeId,
  home_team: "Bragantino-SP",
  away_team: "Atletico Mineiro",
  selection: "Draw",
  league: "Brasileirão",
  odds: 3.15,
  stake: 10,
  potential_win: 31.50,  // stake * odds
  status: "pending"
});
```

### ❌ Colonnes qui N'EXISTENT PAS dans picks
- `match_id` ← DOES NOT EXIST
- `event_id` ← DOES NOT EXIST
- `matchId` ← DOES NOT EXIST
- `match_status` ← DOES NOT EXIST (use `status`)
- `team_home` ← DOES NOT EXIST (use `home_team`)
- `team_away` ← DOES NOT EXIST (use `away_team`)
- `outcome` ← DOES NOT EXIST (use `selection`)
- `amount` ← DOES NOT EXIST (use `stake`)
- `price` ← DOES NOT EXIST (use `odds`)
- `bet_type` ← DOES NOT EXIST (use `selection`)
- `sport` ← DOES NOT EXIST (use `league`)
- `event_description` ← DOES NOT EXIST

---

## 📊 TABLE: challenges

**Usage:** Stocker les challenges créés par les utilisateurs

| Colonne        | Type                     | Requis dans INSERT | Description                                    |
|----------------|--------------------------|---------------------|------------------------------------------------|
| id             | uuid                     | ❌ AUTO             | Primary key auto-généré                       |
| user_id        | uuid                     | ✅ OUI              | ID de l'utilisateur                            |
| tier           | text                     | ✅ OUI              | "demo" \| "starter" \| "standard" \| "pro" \| "elite" |
| status         | text                     | ✅ OUI              | "active" \| "passed" \| "failed"               |
| initial_balance| numeric                  | ✅ OUI              | Capital de départ (ex: 100, 10000, 25000...)   |
| current_balance| numeric                  | ✅ OUI              | Balance actuelle du challenge                  |
| target_profit  | numeric                  | ✅ OUI              | Target de profit à atteindre                   |
| max_drawdown   | numeric                  | ✅ OUI              | Drawdown maximum autorisé                      |
| created_at     | timestamp with time zone | ❌ AUTO             | Date de création                               |
| updated_at     | timestamp with time zone | ❌ AUTO             | Date de mise à jour                            |

### ✅ Exemple INSERT challenges
```typescript
await supabase.from('challenges').insert({
  user_id: userId,
  tier: "demo",
  status: "active",
  initial_balance: 100,
  current_balance: 100,
  target_profit: 10,
  max_drawdown: 5
});
```

---

## 📊 TABLE: bets

**Usage:** Alternative/legacy — stocker les paris

| Colonne        | Type | Requis | Description           |
|----------------|------|--------|----------------------|
| id             | uuid | ❌     | Primary key           |
| challenge_id   | uuid | ✅     | ID du challenge       |
| user_id        | uuid | ✅     | ID de l'utilisateur   |
| bet_type       | text | ✅     | Type de paris         |
| sport          | text | ✅     | Sport                 |
| event_description | text | ✅    | Description          |
| odds           | numeric | ✅   | Cotes                |
| stake          | numeric | ✅   | Mise                 |
| potential_win  | numeric | ✅   | Gain potentiel       |
| result         | text | ✅     | "pending"/"won"/"lost"|

⚠️ Cette table a RLS DISABLED - À ÉVITER si possible

---

## 📊 TABLE: users

**Usage:** Profils utilisateurs (auth.users)

| Colonne | Type | Description |
|---------|------|------------|
| id      | uuid | Auth ID    |
| email   | text | Email      |

---

## 🔐 RLS (Row Level Security)

| Table       | RLS Status     | Remarque                          |
|-------------|----------------|-----------------------------------|
| picks       | ENABLED        | Politique: `auth.uid() = user_id` |
| challenges  | ENABLED        | Politique: `auth.uid() = user_id` |
| bets        | DISABLED       | Pas de protection                 |

---

## 🚨 ERREURS COURANTES & SOLUTIONS

### PGRST204 — "Could not find column X"
**Cause:** Le nom de colonne ne match pas  
**Solution:** Vérifier cette liste et utiliser les noms EXACTEMENT comme écrits

### 42501 — "new row violates row-level security"
**Cause:** RLS bloque l'insertion  
**Solution:** Vérifier `auth.uid()` = `user_id` envoyé

### 23503 — "foreign key constraint"
**Cause:** La référence (ex: challenge_id) n'existe pas  
**Solution:** Vérifier que le challenge existe avant d'insérer

### 23505 — "duplicate key value"
**Cause:** Violation de contrainte UNIQUE  
**Solution:** Vérifier si l'enregistrement existe déjà

---

*🤖 GitHub Copilot lit ce fichier automatiquement pour corriger les erreurs*  
*🔄 Mettre à jour à chaque changement de schema*
