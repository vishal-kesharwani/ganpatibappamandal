DROP TABLE IF EXISTS aartis CASCADE;

CREATE TABLE IF NOT EXISTS aartis (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_devanagari TEXT NOT NULL,
  deity TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL,
  type TEXT NOT NULL,
  lyrics TEXT NOT NULL,
  transliteration TEXT,
  description TEXT,
  source TEXT NOT NULL,
  source_url TEXT,
  content_status TEXT NOT NULL DEFAULT 'needs_verification',
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE POLICY "Public read on aartis" ON aartis
  FOR SELECT TO authenticated
  USING (published = true);

CREATE POLICY "Admin full access on aartis" ON aartis
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

ALTER TABLE schedule_events ADD COLUMN IF NOT EXISTS time_end TIME;
