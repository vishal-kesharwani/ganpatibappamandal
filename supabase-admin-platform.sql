-- =====================================================================
-- OM SAI MITRA MANDAL — Admin Platform Migration (ADDITIVE & SAFE)
-- =====================================================================
-- Self-contained: runs in ONE pass on a completely fresh Supabase
-- database AND safely re-runs on the existing production database.
-- It never DROPs tables and never deletes existing rows — only ADDs
-- tables / columns / constraints / indexes / policies / triggers.
--
-- STRICT DEPENDENCY ORDER (do not reorder):
--   1. base tables (aartis, schedule_events, announcements) IF NOT EXISTS
--   2. admin_users table (references auth.users)
--   3. public.is_admin() function (queries admin_users)
--   4. RLS policies (may call public.is_admin())
--   5. alters / indexes / seeds / triggers
--
-- After running:
--   1. Create an admin user in Supabase Dashboard → Authentication → Users
--      (Add user → email + password, confirm email ON).
--   2. Copy that user's UUID and run:
--        INSERT INTO public.admin_users (user_id, email)
--        VALUES ('<uuid-here>', 'admin@example.com');
--   3. Log in at /admin/login with that email + password.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Base tables — created ONLY when missing (fresh database).
--    On production these already exist, so these statements are no-ops
--    and all existing rows are preserved untouched.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.aartis (
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

CREATE TABLE IF NOT EXISTS public.schedule_events (
  id BIGSERIAL PRIMARY KEY,
  day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 7),
  time TEXT NOT NULL,
  time_end TEXT,
  title TEXT NOT NULL,
  title_marathi TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  location TEXT,
  aarti_id BIGINT REFERENCES public.aartis(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.announcements (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_marathi TEXT NOT NULL,
  description TEXT NOT NULL,
  description_marathi TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal',
  active BOOLEAN DEFAULT TRUE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 2. admin_users — MUST exist before is_admin() and before any policy
--    that references it. References auth.users(id) (Supabase Auth).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------
-- 3. public.is_admin() — created AFTER admin_users exists.
--    SECURITY DEFINER lets RLS policies check the role without
--    recursing into admin_users RLS.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------
-- 4. admin_users RLS — users may read ONLY their own row.
--    Rows are managed from the Supabase Dashboard SQL editor,
--    intentionally not writable from client code.
-- ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Users read own admin row" ON public.admin_users;
CREATE POLICY "Users read own admin row"
  ON public.admin_users FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- 5. festival_days — 7-day festival, optional theme (NOT forced)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.festival_days (
  id BIGSERIAL PRIMARY KEY,
  day_number INTEGER NOT NULL UNIQUE CHECK (day_number BETWEEN 1 AND 7),
  date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  theme TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.festival_days ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active festival days" ON public.festival_days;
CREATE POLICY "Public read active festival days"
  ON public.festival_days FOR SELECT TO anon, authenticated
  USING (active = true);

DROP POLICY IF EXISTS "Admins manage festival days" ON public.festival_days;
CREATE POLICY "Admins manage festival days"
  ON public.festival_days FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.festival_days (day_number, date, title, description, theme, active, sort_order) VALUES
  (1, '2026-09-14', 'Sthapana Divas', 'Ganpati Bappa chi sthapana aani kakad aarti.', NULL, true, 1),
  (2, '2026-09-15', 'Dvitiya Divas', 'Dainik puja aani aarti.', NULL, true, 2),
  (3, '2026-09-16', 'Tritiya Divas', 'Mulansathi vishesh karyakram.', NULL, true, 3),
  (4, '2026-09-17', 'Chaturthi Divas', 'Sanskritik karyakram.', NULL, true, 4),
  (5, '2026-09-18', 'Panchami Divas', 'Samajik upakram.', NULL, true, 5),
  (6, '2026-09-19', 'Shashthi Divas', 'Utsahache vatavaran.', NULL, true, 6),
  (7, '2026-09-20', 'Visarjan Divas', 'Visarjanachya divashi Ganpati Bappala vidai.', NULL, true, 7)
ON CONFLICT (day_number) DO NOTHING;

-- ---------------------------------------------------------------------
-- 6. schedule_events — additive columns for existing production table
-- ---------------------------------------------------------------------
ALTER TABLE public.schedule_events
  ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.schedule_events
  ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.schedule_events
  ADD COLUMN IF NOT EXISTS aarti_id BIGINT;
ALTER TABLE public.schedule_events
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Foreign key added separately so re-runs stay idempotent even when the
-- column already existed from a previous partial run.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'schedule_events_aarti_id_fkey'
  ) THEN
    ALTER TABLE public.schedule_events
      ADD CONSTRAINT schedule_events_aarti_id_fkey
      FOREIGN KEY (aarti_id) REFERENCES public.aartis(id) ON DELETE SET NULL;
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_schedule_events_day
  ON public.schedule_events(day, sort_order);
CREATE INDEX IF NOT EXISTS idx_schedule_events_aarti
  ON public.schedule_events(aarti_id);

ALTER TABLE public.schedule_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read schedule_events" ON public.schedule_events;
DROP POLICY IF EXISTS "Admin write schedule_events" ON public.schedule_events;
DROP POLICY IF EXISTS "Public read active schedule_events" ON public.schedule_events;
CREATE POLICY "Public read active schedule_events"
  ON public.schedule_events FOR SELECT TO anon, authenticated
  USING (active = true);
DROP POLICY IF EXISTS "Admins manage schedule_events" ON public.schedule_events;
CREATE POLICY "Admins manage schedule_events"
  ON public.schedule_events FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------
-- 7. aartis — tighten policies (public: published only / admin: admins)
--    NOTE: no data changes here; existing aartis are preserved.
-- ---------------------------------------------------------------------
ALTER TABLE public.aartis ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published aartis" ON public.aartis;
DROP POLICY IF EXISTS "Admin full access on aartis" ON public.aartis;
DROP POLICY IF EXISTS "Public read aartis" ON public.aartis;
DROP POLICY IF EXISTS "Admin write aartis" ON public.aartis;
DROP POLICY IF EXISTS "Admins manage aartis" ON public.aartis;
CREATE POLICY "Public read published aartis"
  ON public.aartis FOR SELECT TO anon, authenticated
  USING (published = true);
CREATE POLICY "Admins manage aartis"
  ON public.aartis FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_aartis_slug ON public.aartis(slug);
CREATE INDEX IF NOT EXISTS idx_aartis_published ON public.aartis(published, sort_order);

-- ---------------------------------------------------------------------
-- 8. announcements — additive columns for existing production table
-- ---------------------------------------------------------------------
ALTER TABLE public.announcements
  ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.announcements
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
ALTER TABLE public.announcements
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read announcements" ON public.announcements;
DROP POLICY IF EXISTS "Admin write announcements" ON public.announcements;
DROP POLICY IF EXISTS "Public read live announcements" ON public.announcements;
CREATE POLICY "Public read live announcements"
  ON public.announcements FOR SELECT TO anon, authenticated
  USING (active = true AND published = true
         AND (expires_at IS NULL OR expires_at > NOW()));
DROP POLICY IF EXISTS "Admins manage announcements" ON public.announcements;
CREATE POLICY "Admins manage announcements"
  ON public.announcements FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------
-- 9. gallery_images
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  caption TEXT,
  category TEXT NOT NULL DEFAULT 'festival'
    CHECK (category IN ('festival','ganpati','aarti','events','mandal','visarjan','other')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published gallery" ON public.gallery_images;
CREATE POLICY "Public read published gallery"
  ON public.gallery_images FOR SELECT TO anon, authenticated
  USING (published = true);

DROP POLICY IF EXISTS "Admins manage gallery" ON public.gallery_images;
CREATE POLICY "Admins manage gallery"
  ON public.gallery_images FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_gallery_published
  ON public.gallery_images(published, sort_order);

-- Gallery storage bucket (public read, admin write)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read gallery bucket" ON storage.objects;
CREATE POLICY "Public read gallery bucket"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admins write gallery bucket" ON storage.objects;
CREATE POLICY "Admins write gallery bucket"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'gallery' AND public.is_admin())
  WITH CHECK (bucket_id = 'gallery' AND public.is_admin());

-- ---------------------------------------------------------------------
-- 10. contacts (Call + WhatsApp only — no email fields)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active contacts" ON public.contacts;
CREATE POLICY "Public read active contacts"
  ON public.contacts FOR SELECT TO anon, authenticated
  USING (active = true);

DROP POLICY IF EXISTS "Admins manage contacts" ON public.contacts;
CREATE POLICY "Admins manage contacts"
  ON public.contacts FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.contacts (name, phone, display_order, active) VALUES
  ('SURAJ GUPTA', '918286328273', 1, true),
  ('SAHIL MALI', '919082412135', 2, true),
  ('ANAND JAISWAL', '917447469741', 3, true),
  ('KRISHNA KESHARWANI', '918788250462', 4, true)
ON CONFLICT (name) DO NOTHING;

-- ---------------------------------------------------------------------
-- 11. visarjan_info (single row, id = 1)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visarjan_info (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  date DATE NOT NULL DEFAULT '2026-09-20',
  time TEXT NOT NULL DEFAULT '15:00',
  procession_start TEXT NOT NULL DEFAULT '11:00',
  meeting_point TEXT NOT NULL DEFAULT 'Triveni Sangam Apartment Main Gate, Kaneri',
  route TEXT NOT NULL DEFAULT 'Triveni Sangam Apartment, Kaneri (Starting Point)',
  instructions TEXT NOT NULL DEFAULT 'Please reach the meeting point on time.',
  status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.visarjan_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read visarjan info" ON public.visarjan_info;
CREATE POLICY "Public read visarjan info"
  ON public.visarjan_info FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins manage visarjan info" ON public.visarjan_info;
CREATE POLICY "Admins manage visarjan info"
  ON public.visarjan_info FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.visarjan_info (id, date, time, procession_start, meeting_point, route, instructions, status)
VALUES (1, '2026-09-20', '15:00', '11:00',
        'Triveni Sangam Apartment Main Gate, Kaneri',
        'Triveni Sangam Apartment, Kaneri (Starting Point)' || chr(10) ||
        'Main Road' || chr(10) ||
        'Temple Chowk' || chr(10) ||
        'Market Area' || chr(10) ||
        'River Bank (Visarjan Point)',
        'Please reach the meeting point by 10:30 AM' || chr(10) ||
        'Carry water bottles and stay hydrated' || chr(10) ||
        'Follow the volunteer instructions' || chr(10) ||
        'Keep children supervised at all times' || chr(10) ||
        'Help keep the route clean',
        'scheduled')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------
-- 12. site_settings (mandal info key/value — no email keys)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site settings" ON public.site_settings;
CREATE POLICY "Public read site settings"
  ON public.site_settings FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins manage site settings" ON public.site_settings;
CREATE POLICY "Admins manage site settings"
  ON public.site_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.site_settings (key, value) VALUES
  ('mandal_name', '"OM SAI MITRA MANDAL"'),
  ('location', '"Triveni Sangam Apartment"'),
  ('address', '"Triveni Sangam Apartment, Kaneri, Bhiwandi, Maharashtra 421302"'),
  ('instagram', '"https://www.instagram.com/omsaimitramandalbhiwandi/"'),
  ('about', '"OM SAI MITRA MANDAL is a community organization in Triveni Sangam Apartment, Kaneri, Bhiwandi, celebrating Ganesh Chaturthi with devotion and community participation."'),
  ('mission', '"To foster community spirit through religious celebrations, cultural activities, and social initiatives under the blessings of Lord Ganesha."'),
  ('established_year', '"2010"'),
  ('map_url', '"https://www.google.com/maps/search/?api=1&query=19.292411993266107,73.05723546694804"'),
  ('upi_id', '"omsaimitramandal@upi"')
ON CONFLICT (key) DO NOTHING;

-- ---------------------------------------------------------------------
-- 13. updated_at auto-touch triggers
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_touch_festival_days ON public.festival_days;
CREATE TRIGGER trg_touch_festival_days
  BEFORE UPDATE ON public.festival_days
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_touch_schedule_events ON public.schedule_events;
CREATE TRIGGER trg_touch_schedule_events
  BEFORE UPDATE ON public.schedule_events
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_touch_announcements ON public.announcements;
CREATE TRIGGER trg_touch_announcements
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_touch_gallery ON public.gallery_images;
CREATE TRIGGER trg_touch_gallery
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_touch_contacts ON public.contacts;
CREATE TRIGGER trg_touch_contacts
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_touch_visarjan ON public.visarjan_info;
CREATE TRIGGER trg_touch_visarjan
  BEFORE UPDATE ON public.visarjan_info
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_touch_site_settings ON public.site_settings;
CREATE TRIGGER trg_touch_site_settings
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
