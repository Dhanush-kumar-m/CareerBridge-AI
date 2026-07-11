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
      WHEN LOWER(NEW.email) IN ('12k21rakeshkannam@gmail.com', 'admin@careerbridge.com') THEN 'admin'
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
  WHERE LOWER(email) IN ('12k21rakeshkannam@gmail.com', 'admin@careerbridge.com')
);
