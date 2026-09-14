import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return NextResponse.json({ items: [], live: false });
  }

  const items = data.map((g: Record<string, unknown>) => ({
    id: g.id,
    src: g.image_url,
    alt: (g.caption as string | null) || "Mandal photo",
    category: g.category,
  }));

  return NextResponse.json({ items, live: true });
}
