-- gallery_requests: user-submitted photos pending admin approval
CREATE TABLE IF NOT EXISTS public.gallery_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  caption TEXT,
  category TEXT NOT NULL DEFAULT 'other',
  image_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.gallery_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (submit a request)
CREATE POLICY "gallery_requests_insert_anon"
  ON public.gallery_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anyone can read (admin panel uses anon client)
CREATE POLICY "gallery_requests_select_anon"
  ON public.gallery_requests FOR SELECT
  TO anon
  USING (true);

-- Anyone can read (authenticated)
CREATE POLICY "gallery_requests_select_auth"
  ON public.gallery_requests FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admin can update (approve/reject)
CREATE POLICY "gallery_requests_update_admin"
  ON public.gallery_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (true);

-- Only authenticated admin can delete
CREATE POLICY "gallery_requests_delete_admin"
  ON public.gallery_requests FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );

-- Allow anon INSERT on gallery_images (for approve flow — API route inserts approved photos)
-- This is safe because gallery_images only stores public photo metadata
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'gallery_images_insert_anon' AND tablename = 'gallery_images'
  ) THEN
    CREATE POLICY "gallery_images_insert_anon"
      ON public.gallery_images FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

-- Index
CREATE INDEX IF NOT EXISTS idx_gallery_requests_status ON public.gallery_requests (status);
