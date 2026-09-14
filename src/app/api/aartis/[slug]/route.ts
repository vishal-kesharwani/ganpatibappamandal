import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  return NextResponse.json(data);
}
