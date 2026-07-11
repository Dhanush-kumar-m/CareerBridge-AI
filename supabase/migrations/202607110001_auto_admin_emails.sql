-- Ensure the role column exists on public.profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'student' NOT NULL;

-- Ensure check_role constraint exists
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS check_role;
ALTER TABLE public.profiles ADD CONSTRAINT check_role CHECK (role IN ('student', 'admin'));

-- Update handle_new_user function to automatically assign admin role to designated emails
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, xp, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    0,
    CASE 
      WHEN LOWER(NEW.email) IN ('12k21rakeshkannam@gmail.com', 'admin@careerbridge.com', 'kumardhanush6494@gmail.com') THEN 'admin'
      ELSE 'student'
    END
  );
  RETURN NEW;
END;
$$;

-- Update existing profiles that match the admin emails
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users
  WHERE LOWER(email) IN ('12k21rakeshkannam@gmail.com', 'admin@careerbridge.com', 'kumardhanush6494@gmail.com')
);

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Insert 'admin@careerbridge.com' into auth.users if not exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@careerbridge.com',
  extensions.crypt('Dhanush@1417', extensions.gen_salt('bf', 10)),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Admin Rakesh"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@careerbridge.com'
);

-- Insert '12k21rakeshkannam@gmail.com' into auth.users if not exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  '12k21rakeshkannam@gmail.com',
  extensions.crypt('Dhanush@1417', extensions.gen_salt('bf', 10)),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Admin Dhanush"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = '12k21rakeshkannam@gmail.com'
);

-- Ensure their passwords are set to 'Dhanush@1417' even if they already exist
UPDATE auth.users
SET encrypted_password = extensions.crypt('Dhanush@1417', extensions.gen_salt('bf', 10))
WHERE LOWER(email) IN ('12k21rakeshkannam@gmail.com', 'admin@careerbridge.com');
