import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function missing(e: { message?: string; code?: string } | null): boolean {
  if (!e) return false;
  const m = (e.message || "").toLowerCase();
  return e.code === "42P01" || e.code === "42703" || m.includes("does not exist") || m.includes("schema cache");
}

export async function GET() {
  const { data, error } = await supabase
    .from("schedule_events")
    .select("*")
    .eq("active", true)
    .order("day", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    return NextResponse.json({ items: [], live: false });
  }

  let slugById: Record<number, string> = {};
  try {
    const ids = [...new Set((data || []).map((e: { aarti_id: number | null }) => e.aarti_id).filter(Boolean))] as number[];
    if (ids.length > 0) {
      const { data: aartis } = await supabase.from("aartis").select("id,slug").in("id", ids);
      for (const a of aartis || []) slugById[(a as { id: number }).id] = (a as { slug: string }).slug;
    }
  } catch {
    slugById = {};
  }

  const items = (data || []).map((e: Record<string, unknown>) => ({
    id: e.id,
    day: e.day,
    time: e.time,
    timeEnd: e.time_end ?? undefined,
    title: e.title,
    titleMarathi: e.title_marathi,
    category: e.category,
    description: e.description ?? undefined,
    location: (e.location as string | null) ?? undefined,
    aartiSlug: (e.aarti_id as number | null) ? slugById[e.aarti_id as number] ?? null : null,
  }));

  return NextResponse.json({ items, live: !missing(error) });
}
