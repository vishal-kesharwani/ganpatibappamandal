-- active_visitors: tracks live visitor count via heartbeat pings
-- Each public page visitor sends a heartbeat every 30s.
-- Visitors inactive for 60s are considered gone.

CREATE TABLE IF NOT EXISTS public.active_visitors (
  session_id TEXT PRIMARY KEY,
  last_seen TIMESTAMPTZ DEFAULT now(),
  page TEXT DEFAULT '/',
  user_agent TEXT
);

ALTER TABLE public.active_visitors ENABLE ROW LEVEL SECURITY;

-- Anyone can insert/update their own heartbeat (anon)
CREATE POLICY "active_visitors_upsert_anon"
  ON public.active_visitors FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "active_visitors_update_anon"
  ON public.active_visitors FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Anyone can read (for admin dashboard count)
CREATE POLICY "active_visitors_select_anon"
  ON public.active_visitors FOR SELECT
  TO anon
  USING (true);

-- Clean up old entries periodically (run manually or via pg_cron)
-- DELETE FROM public.active_visitors WHERE last_seen < now() - interval '2 minutes';

-- Index for fast count queries
CREATE INDEX IF NOT EXISTS idx_active_visitors_last_seen ON public.active_visitors (last_seen);
