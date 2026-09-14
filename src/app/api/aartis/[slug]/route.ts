import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function mapToCamelCase(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleDevanagari: row.title_devanagari,
    deity: row.deity,
    category: row.category,
    language: row.language,
    type: row.type,
    lyrics: row.lyrics,
    transliteration: row.transliteration,
    description: row.description,
    source: row.source,
    sourceUrl: row.source_url,
    contentStatus: row.content_status,
    verified: row.verified,
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("aartis")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return NextResponse.json({ error: "Aarti not found" }, { status: 404 });
  return NextResponse.json(mapToCamelCase(data));
}
