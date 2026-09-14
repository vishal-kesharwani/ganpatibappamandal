"use client";

/**
 * Unobtrusive admin action bar on the public Aarti reading page.
 * Visible only to authenticated admins; reading experience is identical
 * for everyone else.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminAartiBar({ slug, aartiId }: { slug: string; aartiId: number }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data.session?.user?.id;
      if (!uid) return;
      const { data: row } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", uid)
        .maybeSingle();
      if (!cancelled && row) setIsAdmin(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isAdmin) return null;

  const duplicate = async () => {
    setBusy(true);
    const { data, error } = await supabase.from("aartis").select("*").eq("id", aartiId).single();
    if (error || !data) {
      alert("Could not load aarti for duplication.");
      setBusy(false);
      return;
    }
    const { id: _omit, created_at: _omit2, ...rest } = data as Record<string, unknown>;
    void _omit;
    void _omit2;
    const { error: insErr } = await supabase
      .from("aartis")
      .insert({ ...(rest as object), slug: `${slug}-copy-${Date.now().toString(36)}`, published: false } as never);
    setBusy(false);
    alert(insErr ? `Duplicate failed: ${insErr.message}` : "Duplicated as an unpublished copy.");
  };

  const remove = async () => {
    if (!window.confirm("Delete this aarti permanently?")) return;
    setBusy(true);
    const { error } = await supabase.from("aartis").delete().eq("id", aartiId);
    setBusy(false);
    if (error) {
      alert(`Delete failed: ${error.message}`);
    } else {
      router.push("/aarti");
    }
  };

  return (
    <div className="border-b border-[#D6D3D1] bg-[#FFF8EE]">
      <div className="mx-auto flex max-w-lg flex-wrap items-center gap-2 px-4 py-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C2D12]">
          Admin
        </span>
        <Link
          href={`/admin/aartis?edit=${encodeURIComponent(slug)}`}
          className="rounded px-2.5 py-1 text-[11px] font-semibold text-white"
          style={{ backgroundColor: "#7C2D12" }}
        >
          Edit
        </Link>
        <button
          onClick={duplicate}
          disabled={busy}
          className="rounded border border-[#D6D3D1] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#44403C] disabled:opacity-50"
        >
          Duplicate
        </button>
        <button
          onClick={remove}
          disabled={busy}
          className="rounded border border-[#FECACA] bg-[#FEF2F2] px-2.5 py-1 text-[11px] font-semibold text-[#B91C1C] disabled:opacity-50"
        >
          Delete
        </button>
        <Link
          href="/admin/events"
          className="rounded border border-[#D6D3D1] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#44403C]"
        >
          Manage timing
        </Link>
      </div>
    </div>
  );
}
