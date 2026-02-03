-- Fix: Create user record for authenticated user
-- This solves the foreign key constraint violation

-- Insert the user record if it doesn't exist
INSERT INTO users (id, email, created_at, updated_at, role, kyc_status)
SELECT 
  auth.uid(),
  (SELECT email FROM auth.users WHERE id = auth.uid()),
  NOW(),
  NOW(),
  'user',
  'pending'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE id = auth.uid()
);

-- Verify the user was created
SELECT id, email, role, kyc_status, created_at FROM users WHERE id = auth.uid();
