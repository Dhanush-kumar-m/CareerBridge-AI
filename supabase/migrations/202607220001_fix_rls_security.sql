-- Supabase Security Vulnerability Remediation Migration
-- Fixes: rls_disabled_in_public (Table publicly accessible)

-- 1. Explicitly enable Row Level Security (RLS) on all public tables
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.solved_aptitude ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.solved_coding ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.coding_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.company_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.resume_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.read_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_activity ENABLE ROW LEVEL SECURITY;

-- 2. Dynamic loop to guarantee RLS is enabled on all tables in public schema
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' ENABLE ROW LEVEL SECURITY;';
    END LOOP;
END $$;
