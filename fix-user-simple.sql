-- Create user record for authenticated user (simplified)
INSERT INTO public.users (id, created_at, updated_at, role, kyc_status)
SELECT 
  id,
  NOW(),
  NOW(),
  'user',
  'pending'
FROM auth.users
WHERE id = auth.uid()
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT id, email, role, kyc_status FROM public.users WHERE id = auth.uid();
