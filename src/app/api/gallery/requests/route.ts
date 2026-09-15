import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function getClient(request: NextRequest) {
  // Use the user's access token if available — allows RLS to pass for admin ops
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (token) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
  }
  // Fallback to anon client (for GET which doesn't need auth)
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, caption, category, image_url } = body;

  if (!name?.trim() || !image_url) {
    return NextResponse.json({ error: "Name and image are required" }, { status: 400 });
  }

  const supabase = getClient(request);
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
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
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

  const supabase = getClient(request);

  // Update the request status
  const { error } = await supabase
    .from("gallery_requests")
    .update({ status, admin_note: admin_note || null, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (status === "approved") {
    const { data: req } = await supabase
      .from("gallery_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (req) {
      // Check if this image_url already exists in gallery_images
      const { data: existing } = await supabase
        .from("gallery_images")
        .select("id")
        .eq("image_url", req.image_url)
        .limit(1);

      if (!existing || existing.length === 0) {
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
  }

  if (status === "rejected") {
    // Delete from gallery_images if it was previously approved
    const { data: req } = await supabase
      .from("gallery_requests")
      .select("image_url")
      .eq("id", id)
      .single();

    if (req) {
      await supabase
        .from("gallery_images")
        .delete()
        .eq("image_url", req.image_url);
    }

    // Delete the request itself from gallery_requests
    await supabase
      .from("gallery_requests")
      .delete()
      .eq("id", id);
  }

  return NextResponse.json({ ok: true });
}
