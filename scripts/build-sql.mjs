import { writeFileSync, appendFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "supabase-aartis-seed.sql");

const header = `-- Ganpati Mandal - Complete Aarti Seed Data (50 aartis)
-- Run this ENTIRE file in Supabase SQL Editor

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

ALTER TABLE aartis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published aartis" ON aartis
  FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "Admin full access on aartis" ON aartis
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

ALTER TABLE schedule_events ADD COLUMN IF NOT EXISTS time_end TIME;

`;

writeFileSync(out, header, "utf8");

// Now import and run both generators
await import("./gen-part1.mjs");
await import("./gen-part2.mjs");

appendFileSync(out, "\n-- Done! 50 aartis seeded.\n", "utf8");
console.log("Complete SQL file generated!");
