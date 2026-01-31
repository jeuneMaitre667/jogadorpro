# 🔧 SETUP BASE DE DONNÉES SUPABASE

## Instructions Rapides

### Étape 1: Ouvrir SQL Editor
Allez sur: https://supabase.com/dashboard/project/rzedmwvmdvbsaiqbfqxz/sql/new

### Étape 2: Copier le Script
Ouvrez le fichier `setup_database.sql` dans ce projet et copiez TOUT le contenu.

### Étape 3: Exécuter
1. Collez le SQL dans l'éditeur Supabase
2. Cliquez sur **"Run"** (en bas à droite)
3. Attendez que ça se termine (quelques secondes)

### Étape 4: Vérifier
- Allez dans **Table Editor**
- Vous devriez voir 3 tables:
  - `profiles`
  - `challenges`
  - `bets`

## Ce que le Script Fait

✅ Crée la table `profiles` (étend auth.users)
✅ Crée la table `challenges` 
✅ Crée la table `bets`
✅ Configure Row Level Security (RLS)
✅ Crée un trigger pour auto-créer le profil à l'inscription
✅ Ajoute des indexes pour la performance

## Après l'Exécution

Votre signup va fonctionner! L'utilisateur pourra:
1. S'inscrire → Crée un compte dans `auth.users`
2. Automatiquement → Crée un profil dans `profiles`
3. Se connecter → Accède au dashboard
4. Créer des challenges → Insère dans `challenges`

---

**Besoin d'aide? Demande-moi!** 🚀
