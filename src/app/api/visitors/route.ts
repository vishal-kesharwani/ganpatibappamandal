import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// POST — send heartbeat (visitor is alive)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { session_id, page } = body;

  if (!session_id) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") || "";

  const { error } = await supabase
    .from("active_visitors")
    .upsert(
      {
        session_id,
        last_seen: new Date().toISOString(),
        page: page || "/",
        user_agent: userAgent.slice(0, 200),
      },
      { onConflict: "session_id" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// GET — count active visitors (last 60 seconds)
export async function GET() {
  const sixtySecondsAgo = new Date(Date.now() - 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("active_visitors")
    .select("session_id", { count: "exact", head: true })
    .gte("last_seen", sixtySecondsAgo);

  if (error) {
    return NextResponse.json({ count: 0, error: error.message });
  }

  // Also get page breakdown
  const { data: pages } = await supabase
    .from("active_visitors")
    .select("page")
    .gte("last_seen", sixtySecondsAgo);

  const pageCounts: Record<string, number> = {};
  if (pages) {
    for (const p of pages) {
      pageCounts[p.page] = (pageCounts[p.page] || 0) + 1;
    }
  }

  return NextResponse.json({ count: count || 0, pages: pageCounts });
}
