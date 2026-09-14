import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DAY_MR = ["सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार"];
const DAY_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export async function GET() {
  const { data, error } = await supabase
    .from("festival_days")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("day_number", { ascending: true });

  if (error || !data) {
    return NextResponse.json({ items: [], live: false });
  }

  const items = data.map((d: Record<string, unknown>) => {
    const dateStr = d.date as string;
    const dt = new Date(`${dateStr}T00:00:00`);
    const jsDay = Number.isNaN(dt.getTime()) ? ((d.day_number as number) - 1) % 7 : (dt.getDay() + 6) % 7;
    const [y, m, day] = dateStr.split("-").map(Number);
    return {
      day: d.day_number,
      date: dateStr,
      title: d.title,
      description: (d.description as string | null) ?? undefined,
      theme: (d.theme as string | null) ?? null,
      dateMarathi: `${day} ${["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"][m - 1]} ${y}`,
      dayOfWeek: DAY_EN[jsDay],
      dayOfWeekMarathi: DAY_MR[jsDay],
    };
  });

  return NextResponse.json({ items, live: true });
}
