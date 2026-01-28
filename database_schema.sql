-- Users Table (already exists via Supabase auth)
-- Just add missing columns if needed
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'funded'));
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected'));

-- Challenges Table
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('starter', 'pro', 'elite')),
  price_paid DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'passed', 'failed', 'completed')),
  phase INTEGER DEFAULT 1 CHECK (phase IN (1, 2)),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  initial_balance DECIMAL(10, 2) NOT NULL,
  current_balance DECIMAL(10, 2) NOT NULL,
  target_profit DECIMAL(10, 2) NOT NULL,
  max_daily_loss DECIMAL(10, 2) NOT NULL,
  max_total_loss DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bets Table
CREATE TABLE public.bets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  bet_type TEXT NOT NULL,
  sport TEXT NOT NULL,
  event_description TEXT NOT NULL,
  odds DECIMAL(10, 2) NOT NULL,
  stake DECIMAL(10, 2) NOT NULL,
  potential_win DECIMAL(10, 2) NOT NULL,
  result TEXT DEFAULT 'pending' CHECK (result IN ('pending', 'won', 'lost', 'void')),
  profit_loss DECIMAL(10, 2),
  placed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  settled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funded Accounts Table
CREATE TABLE public.funded_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  capital_allocated DECIMAL(10, 2) NOT NULL,
  current_balance DECIMAL(10, 2) NOT NULL,
  total_profit DECIMAL(10, 2) DEFAULT 0,
  profit_split DECIMAL(3, 2) DEFAULT 0.80,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'terminated')),
  activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payouts Table
CREATE TABLE public.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funded_account_id UUID NOT NULL REFERENCES public.funded_accounts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  trader_share DECIMAL(10, 2) NOT NULL,
  platform_share DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed')),
  payment_method TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('challenge_purchase', 'payout', 'refund')),
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_provider TEXT,
  provider_transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================

CREATE INDEX idx_challenges_user_id ON public.challenges(user_id);
CREATE INDEX idx_challenges_status ON public.challenges(status);
CREATE INDEX idx_bets_challenge_id ON public.bets(challenge_id);
CREATE INDEX idx_bets_user_id ON public.bets(user_id);
CREATE INDEX idx_funded_accounts_user_id ON public.funded_accounts(user_id);
CREATE INDEX idx_payouts_funded_account_id ON public.payouts(funded_account_id);
CREATE INDEX idx_payouts_user_id ON public.payouts(user_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funded_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Users can view own challenges
CREATE POLICY "Users can view own challenges" ON public.challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own challenges" ON public.challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges" ON public.challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can view and create own bets
CREATE POLICY "Users can view own bets" ON public.bets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bets" ON public.bets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bets" ON public.bets
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can view own funded account
CREATE POLICY "Users can view own funded account" ON public.funded_accounts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view own payouts
CREATE POLICY "Users can view own payouts" ON public.payouts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view own transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view everything (via role check in app layer)
-- This will be enforced at application level for now
