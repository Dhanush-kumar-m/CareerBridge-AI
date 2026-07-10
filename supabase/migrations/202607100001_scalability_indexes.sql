-- 1. Index to optimize coding submissions fetching and sorting by submission date
CREATE INDEX IF NOT EXISTS idx_coding_submissions_user_submitted 
  ON public.coding_submissions (user_id, submitted_at DESC);

-- 2. Index to optimize resume analyses fetching and sorting by analysis date
CREATE INDEX IF NOT EXISTS idx_resume_analyses_user_analyzed 
  ON public.resume_analyses (user_id, analyzed_at DESC);

-- 3. Index to optimize user-scoped and global system notifications querying and sorting
CREATE INDEX IF NOT EXISTS idx_notifications_user_created 
  ON public.notifications (user_id, created_at DESC);

-- 4. Index on second column of junction table for fast join operations
CREATE INDEX IF NOT EXISTS idx_read_notifications_notification_id 
  ON public.read_notifications (notification_id);

-- 5. Revoke overly permissive notification table write/delete policies and replace with secure ones
DROP POLICY IF EXISTS "Allow all users to insert notifications" ON public.notifications;
DROP POLICY IF EXISTS "Allow all users to delete notifications" ON public.notifications;

CREATE POLICY "Allow users to insert own notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);
