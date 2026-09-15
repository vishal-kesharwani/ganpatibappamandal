import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, caption, category, image_url } = body;

  if (!name?.trim() || !image_url) {
    return NextResponse.json({ error: "Name and image are required" }, { status: 400 });
  }

  const { error } = await supabase.from("gallery_requests").insert({
    name: name.trim(),
    phone: phone?.trim() || null,
    caption: caption?.trim() || null,
    category: category || "other",
    image_url,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const { data, error } = await supabase
    .from("gallery_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ items: [], error: error.message });
  }

  return NextResponse.json({ items: data });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, status, admin_note } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  // Update the request status
  const { error } = await supabase
    .from("gallery_requests")
    .update({ status, admin_note: admin_note || null, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If approved, also insert into gallery_images so it appears in public gallery
  if (status === "approved") {
    const { data: req } = await supabase
      .from("gallery_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (req) {
      await supabase.from("gallery_images").insert({
        image_url: req.image_url,
        caption: req.caption || `Photo by ${req.name}`,
        category: req.category,
        sort_order: 0,
        published: true,
        storage_path: null,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
