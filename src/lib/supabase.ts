import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
          title_marathi: string;
          title_hindi: string;
          title_hinglish: string;
          category: string;
          category_marathi: string;
          category_hindi: string;
          category_hinglish: string;
          lyrics: string;
          lyrics_hindi: string;
          lyrics_hinglish: string;
          description: string | null;
          description_hindi: string | null;
          description_hinglish: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<{ id?: number; created_at?: string }, "id" | "created_at">;
        Update: Partial<Omit<{ id: number; slug: string; title: string; title_marathi: string; lyrics: string; category: string; sort_order: number }, "id">>;
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
