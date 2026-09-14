import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ items: [], live: false });
  }

  const now = Date.now();
  const items = (data || [])
    .filter((a: { published?: boolean; expires_at?: string | null }) => {
      if (a.published === false) return false;
      if (a.expires_at && new Date(a.expires_at).getTime() <= now) return false;
      return true;
    })
    .map((a: Record<string, unknown>) => ({
      id: a.id,
      title: a.title,
      titleMarathi: a.title_marathi,
      description: a.description,
      descriptionMarathi: a.description_marathi,
      priority: a.priority,
      date: typeof a.created_at === "string" ? (a.created_at as string).slice(0, 10) : "",
      active: a.active,
    }));

  return NextResponse.json({ items, live: true });
}
