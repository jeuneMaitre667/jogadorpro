-- Script de correction pour les paris
-- Exécuter dans Supabase SQL Editor

-- 1. Désactiver temporairement RLS sur bets pour diagnostiquer
ALTER TABLE public.bets DISABLE ROW LEVEL SECURITY;

-- 2. Créer un challenge de test si l'utilisateur n'en a pas
-- Remplacer 'VOTRE_USER_ID' par votre vrai user_id de auth.users
INSERT INTO public.challenges (
  user_id,
  tier,
  price_paid,
  status,
  phase,
  initial_balance,
  current_balance,
  target_profit,
  max_daily_loss,
  max_total_loss
)
SELECT 
  auth.uid(),
  'starter',
  50.00,
  'active',
  1,
  10000.00,
  10000.00,
  1000.00,
  500.00,
  1000.00
WHERE NOT EXISTS (
  SELECT 1 FROM public.challenges 
  WHERE user_id = auth.uid() AND status = 'active'
);

-- 3. Vérifier les challenges actifs
SELECT id, user_id, tier, current_balance, status 
FROM public.challenges 
WHERE status = 'active';

-- 4. Après test, réactiver RLS
-- ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;
