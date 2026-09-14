import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export type Database = {
  public: {
    Tables: {
      schedule_events: {
        Row: {
          id: number;
          day: number;
          time: string;
          time_end: string | null;
          title: string;
          title_marathi: string;
          category: string;
          description: string | null;
          sort_order: number;
          active: boolean;
          location: string | null;
          aarti_id: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          day: number;
          time: string;
          time_end?: string | null;
          title: string;
          title_marathi: string;
          category: string;
          description?: string | null;
          sort_order?: number;
          active?: boolean;
          location?: string | null;
          aarti_id?: number | null;
        };
        Update: Partial<{
          day: number;
          time: string;
          time_end: string | null;
          title: string;
          title_marathi: string;
          category: string;
          description: string | null;
          sort_order: number;
          active: boolean;
          location: string | null;
          aarti_id: number | null;
        }>;
      };
      aartis: {
        Row: {
          id: number;
          slug: string;
          title: string;
          title_devanagari: string;
          deity: string;
          category: string;
          language: string;
          type: string;
          lyrics: string;
          transliteration: string | null;
          description: string | null;
          source: string;
          source_url: string | null;
          content_status: string;
          verified: boolean;
          published: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          title_devanagari: string;
          deity: string;
          category: string;
          language: string;
          type: string;
          lyrics: string;
          transliteration?: string | null;
          description?: string | null;
          source: string;
          source_url?: string | null;
          content_status?: string;
          verified?: boolean;
          published?: boolean;
          sort_order?: number;
        };
        Update: Partial<{
          slug: string;
          title: string;
          title_devanagari: string;
          deity: string;
          category: string;
          language: string;
          type: string;
          lyrics: string;
          transliteration: string | null;
          description: string | null;
          source: string;
          source_url: string | null;
          content_status: string;
          verified: boolean;
          published: boolean;
          sort_order: number;
        }>;
      };
      announcements: {
        Row: {
          id: number;
          title: string;
          title_marathi: string;
          description: string;
          description_marathi: string;
          priority: string;
          active: boolean;
          published: boolean;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          title_marathi: string;
          description: string;
          description_marathi: string;
          priority?: string;
          active?: boolean;
          published?: boolean;
          expires_at?: string | null;
        };
        Update: Partial<{
          title: string;
          title_marathi: string;
          description: string;
          description_marathi: string;
          priority: string;
          active: boolean;
          published: boolean;
          expires_at: string | null;
        }>;
      };
      festival_days: {
        Row: {
          id: number;
          day_number: number;
          date: string;
          title: string;
          description: string | null;
          theme: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          day_number: number;
          date: string;
          title: string;
          description?: string | null;
          theme?: string | null;
          active?: boolean;
          sort_order?: number;
        };
        Update: Partial<{
          day_number: number;
          date: string;
          title: string;
          description: string | null;
          theme: string | null;
          active: boolean;
          sort_order: number;
        }>;
      };
      gallery_images: {
        Row: {
          id: number;
          image_url: string;
          storage_path: string | null;
          caption: string | null;
          category: string;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          image_url: string;
          storage_path?: string | null;
          caption?: string | null;
          category?: string;
          sort_order?: number;
          published?: boolean;
        };
        Update: Partial<{
          image_url: string;
          storage_path: string | null;
          caption: string | null;
          category: string;
          sort_order: number;
          published: boolean;
        }>;
      };
      contacts: {
        Row: {
          id: number;
          name: string;
          phone: string;
          display_order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          phone: string;
          display_order?: number;
          active?: boolean;
        };
        Update: Partial<{
          name: string;
          phone: string;
          display_order: number;
          active: boolean;
        }>;
      };
      visarjan_info: {
        Row: {
          id: number;
          date: string;
          time: string;
          procession_start: string;
          meeting_point: string;
          route: string;
          instructions: string;
          status: string;
          notes: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          date: string;
          time: string;
          procession_start: string;
          meeting_point: string;
          route: string;
          instructions: string;
          status?: string;
          notes?: string | null;
        };
        Update: Partial<{
          date: string;
          time: string;
          procession_start: string;
          meeting_point: string;
          route: string;
          instructions: string;
          status: string;
          notes: string | null;
        }>;
      };
      site_settings: {
        Row: { key: string; value: unknown; updated_at: string };
        Insert: { key: string; value: unknown };
        Update: { value?: unknown };
      };
      admin_users: {
        Row: {
          user_id: string;
          email: string;
          role: string;
          created_at: string;
        };
        Insert: { user_id: string; email: string; role?: string };
        Update: { email?: string; role?: string };
      };
    };
  };
};

export type AartiRow = {
  id: number;
  slug: string;
  title: string;
  titleDevanagari: string;
  deity: string;
  category: string;
  language: string;
  type: string;
  lyrics: string;
  transliteration: string | null;
  description: string | null;
  source: string;
  sourceUrl: string | null;
  contentStatus: string;
  verified: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
};

export type AartiInsert = Database["public"]["Tables"]["aartis"]["Insert"];
export type AartiUpdate = Database["public"]["Tables"]["aartis"]["Update"];

/** Shared browser client (anon key). Admin writes go through this same
 *  client with the authenticated user's JWT — Supabase RLS enforces
 *  authorization server-side via public.is_admin(). */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/** Untyped escape hatch for one-off admin mutations where the generated
 *  Database type cannot express the call. RLS still enforced server-side. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as unknown as { from: (table: string) => any };

/** True when a Supabase error means "table/column does not exist yet"
 *  (i.e. the admin-platform migration has not been run). */
export function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  if (error.code === "42P01" || error.code === "42703") return true;
  const msg = (error.message || "").toLowerCase();
  return (
    msg.includes("does not exist") ||
    msg.includes("could not find the table") ||
    msg.includes("schema cache")
  );
}
