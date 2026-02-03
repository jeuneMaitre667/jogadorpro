-- Script SQL de correction - À exécuter dans Supabase SQL Editor

-- 1. DÉSACTIVER RLS temporairement pour diagnostiquer
ALTER TABLE public.bets DISABLE ROW LEVEL SECURITY;

-- 2. TROUVER VOTRE USER ID et créer un challenge
DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Récupérer le premier utilisateur de auth.users
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
    
    -- Afficher l'ID (pour vérification)
    RAISE NOTICE 'User ID trouvé: %', v_user_id;
    
    -- Créer un challenge pour cet utilisateur s'il n'en a pas
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
        v_user_id,
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
        WHERE user_id = v_user_id AND status = 'active'
    );
    
    RAISE NOTICE 'Challenge créé ou déjà existant';
END $$;

-- 3. VÉRIFIER les challenges actifs
SELECT 
    id,
    user_id,
    tier,
    status,
    current_balance,
    created_at
FROM public.challenges 
WHERE status = 'active'
ORDER BY created_at DESC;

-- 4. VÉRIFIER les utilisateurs
SELECT 
    id,
    email,
    created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- NOTE: Après le test, vous pourrez réactiver RLS avec:
-- ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;
