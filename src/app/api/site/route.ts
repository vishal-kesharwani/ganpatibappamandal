import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MARATHI_MONTHS = [
  "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
  "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर",
];

function str(v: unknown, fallback: string): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return fallback;
}

export async function GET() {
  const out = {
    mandalName: "",
    location: "",
    address: "",
    instagram: "",
    mapUrl: "",
    upiId: "",
    about: "",
    mission: "",
    establishedYear: 0,
    contacts: [] as { name: string; phone: string; role: string }[],
    visarjan: {
      date: "",
      dateMarathi: "",
      time: "",
      processionStart: "",
      meetingPoint: "",
      route: [] as string[],
      instructions: [] as string[],
      status: "",
      notes: "",
    },
    live: { settings: false, contacts: false, visarjan: false },
  };

  const { data: settings } = await supabase.from("site_settings").select("key,value");
  if (settings && settings.length > 0) {
    const map: Record<string, unknown> = {};
    for (const row of settings as { key: string; value: unknown }[]) map[row.key] = row.value;
    const val = (k: string, fb: string) => str(map[k], fb);
    out.mandalName = val("mandal_name", "");
    out.location = val("location", "");
    out.address = val("address", "");
    out.instagram = val("instagram", "");
    out.mapUrl = val("map_url", "");
    out.upiId = val("upi_id", "");
    out.about = val("about", "");
    out.mission = val("mission", "");
    out.establishedYear = Number(val("established_year", "0")) || 0;
    out.live.settings = true;
  }

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (contacts) {
    out.contacts = (contacts as { name: string; phone: string }[]).map((c) => ({
      name: c.name,
      phone: c.phone,
      role: "Contact",
    }));
    out.live.contacts = true;
  }

  const { data: visarjan } = await supabase.from("visarjan_info").select("*").eq("id", 1).maybeSingle();
  if (visarjan) {
    const v = visarjan as Record<string, string>;
    const [y, m, d] = v.date.split("-").map(Number);
    out.visarjan = {
      date: v.date,
      dateMarathi: `${d} ${MARATHI_MONTHS[m - 1]} ${y}`,
      time: v.time,
      processionStart: v.procession_start,
      meetingPoint: v.meeting_point,
      route: v.route.split("\n").map((s) => s.trim()).filter(Boolean),
      instructions: v.instructions.split("\n").map((s) => s.trim()).filter(Boolean),
      status: v.status,
      notes: v.notes || "",
    };
    out.live.visarjan = true;
  }

  return NextResponse.json(out);
}
