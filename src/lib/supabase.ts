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
          created_at: string;
        };
        Insert: Omit<{ id?: number; created_at?: string }, "id" | "created_at">;
        Update: Partial<Omit<{ id: number; day: number; time: string; title: string; title_marathi: string; category: string; sort_order: number }, "id">>;
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
        Insert: Omit<{ id?: number; created_at?: string }, "id" | "created_at">;
        Update: Partial<Omit<{ id: number; slug: string; title: string; title_devanagari: string; deity: string; category: string; language: string; type: string; lyrics: string; transliteration: string | null; description: string | null; source: string; source_url: string | null; content_status: string; verified: boolean; published: boolean; sort_order: number }, "id">>;
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
          created_at: string;
        };
        Insert: Omit<{ id?: number; created_at?: string }, "id" | "created_at">;
        Update: Partial<Omit<{ id: number; title: string; description: string }, "id">>;
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

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
