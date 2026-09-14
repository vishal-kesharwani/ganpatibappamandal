"use client";

/** Mandal information editor (site_settings key/value). No email fields. */
import { useEffect, useState } from "react";
import { supabase, isMissingTableError } from "@/lib/supabase";
import {
  useToast, Spinner, MissingTableNotice,
  Field, TextInput, TextArea, PrimaryButton,
  A_BORDER, A_MUTED,
} from "@/components/admin/ui";

const FIELDS = [
  { key: "mandal_name", label: "Mandal name", multiline: false },
  { key: "location", label: "Location", multiline: false },
  { key: "address", label: "Full address", multiline: false },
  { key: "about", label: "About", multiline: true },
  { key: "mission", label: "Mission", multiline: true },
  { key: "established_year", label: "Established year", multiline: false },
  { key: "instagram", label: "Instagram URL", multiline: false },
  { key: "map_url", label: "Google Maps URL", multiline: false },
  { key: "upi_id", label: "UPI ID (donations)", multiline: false },
];

function settingToString(v: unknown): string {
  if (typeof v === "string") return v;
  if (v === null || v === undefined) return "";
  return JSON.stringify(v);
}

export default function MandalSection() {
  const { push } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (cancelled) return;
      if (error) {
        if (isMissingTableError(error)) setMissing(true);
        else push("error", error.message);
      } else {
        const map: Record<string, string> = {};
        for (const row of (data || []) as { key: string; value: unknown }[]) {
          map[row.key] = settingToString(row.value);
        }
        setValues(map);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    if (!values.mandal_name?.trim()) {
      push("error", "Mandal name is required.");
      return;
    }
    if (values.instagram && !/^https?:\/\//.test(values.instagram.trim())) {
      push("error", "Instagram must be a full https:// URL.");
      return;
    }
    setBusy(true);
    const rows = FIELDS.map((f) => ({ key: f.key, value: (values[f.key] || "").trim() }));
    const { error } = await supabase.from("site_settings").upsert(rows as never);
    setBusy(false);
    push(error ? "error" : "success", error ? error.message : "Mandal information saved.");
  };

  if (loading) return <Spinner />;
  if (missing) return <MissingTableNotice tables="site_settings" />;

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-4" style={{ border: `1px solid ${A_BORDER}` }}>
        <div className="space-y-3">
          {FIELDS.map((f) => (
            <Field key={f.key} label={f.label}>
              {f.multiline ? (
                <TextArea
                  rows={3}
                  value={values[f.key] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              ) : (
                <TextInput
                  value={values[f.key] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              )}
            </Field>
          ))}
          <p className="text-[11px]" style={{ color: A_MUTED }}>
            Changes appear on the public Mandal, Location and Donation pages automatically.
          </p>
        </div>
      </div>
      <div>
        <PrimaryButton onClick={save} disabled={busy}>{busy ? "Saving…" : "Save mandal info"}</PrimaryButton>
      </div>
    </div>
  );
}
