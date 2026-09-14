import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const language = searchParams.get("language") || "all";
  const type = searchParams.get("type") || "all";

  let query = supabase
    .from("aartis")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (search) {
    query = query.or(`title.ilike.%${search}%,title_devanagari.ilike.%${search}%`);
  }
  if (category !== "all") {
    query = query.eq("category", category);
  }
  if (language !== "all") {
    query = query.eq("language", language);
  }
  if (type !== "all") {
    query = query.eq("type", type);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
