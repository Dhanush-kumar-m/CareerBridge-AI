-- 1. Alter profiles table to add trusted role column with strict check constraints
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'student' NOT NULL;

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS check_role;
ALTER TABLE public.profiles ADD CONSTRAINT check_role CHECK (role IN ('student', 'admin'));

-- 2. Restrict profiles selection to owner only (protects user privacy)
DROP POLICY IF EXISTS "Allow public read of profiles" ON public.profiles;
CREATE POLICY "Allow users to read own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- 3. Define trusted admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 4. Create trigger to prevent students from modifying their own roles
CREATE OR REPLACE FUNCTION public.prevent_profile_role_update()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role AND (NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  )) THEN
    RAISE EXCEPTION 'You are not authorized to modify user roles.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS check_profile_role_update ON public.profiles;
CREATE TRIGGER check_profile_role_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.prevent_profile_role_update();

-- 5. Revoke public execute on system trigger handle_new_user for safety
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;

-- 6. Apply role-based filters to the notifications policies
DROP POLICY IF EXISTS "Allow admin or user to insert notifications" ON public.notifications;
DROP POLICY IF EXISTS "Allow admin or user to delete notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can view relevant notifications" ON public.notifications;
DROP POLICY IF EXISTS "Allow users to insert own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Allow users to delete own notifications" ON public.notifications;

CREATE POLICY "Users can view relevant notifications"
  ON public.notifications FOR SELECT
  USING (
    user_id IS NULL 
    OR user_id = auth.uid() 
    OR public.is_admin()
  );

CREATE POLICY "Allow admin and users to insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (
    user_id = auth.uid() 
    OR public.is_admin()
  );

CREATE POLICY "Allow admin and users to delete notifications"
  ON public.notifications FOR DELETE
  USING (
    user_id = auth.uid() 
    OR public.is_admin()
  );
