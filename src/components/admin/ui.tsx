"use client";

/**
 * Admin design primitives — restrained professional CMS aesthetic.
 * Ivory surfaces, deep maroon accents, compact controls.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase, isMissingTableError } from "@/lib/supabase";

export const A_IVORY = "#FAF7F2";
export const A_MAROON = "#7C2D12";
export const A_BORDER = "#E7E5E4";
export const A_INK = "#1C1917";
export const A_BODY = "#57534E";
export const A_MUTED = "#A8A29E";

// ---------- toast ----------

interface Toast {
  id: number;
  kind: "success" | "error";
  message: string;
}

const ToastCtx = createContext<{ push: (kind: Toast["kind"], message: string) => void }>({
  push: () => {},
});

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(1);

  const push = useCallback((kind: Toast["kind"], message: string) => {
    const id = idRef.current++;
    setToasts((t) => [...t, { id, kind, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3500);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="rounded-md border px-4 py-3 text-sm shadow-lg"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: t.kind === "success" ? "#15803D" : "#DC2626",
              color: A_INK,
              borderLeftWidth: 4,
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

// ---------- confirm dialog ----------

export function useConfirm() {
  const [pending, setPending] = useState<{ message: string; resolve: (v: boolean) => void } | null>(null);

  const confirm = useCallback(
    (message: string) =>
      new Promise<boolean>((resolve) => {
        setPending({ message, resolve });
      }),
    []
  );

  const node = pending ? (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xs rounded-lg bg-white p-5 shadow-xl" style={{ border: `1px solid ${A_BORDER}` }}>
        <p className="text-sm font-semibold" style={{ color: A_INK }}>
          Please confirm
        </p>
        <p className="mt-1 text-sm" style={{ color: A_BODY }}>
          {pending.message}
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              pending.resolve(false);
              setPending(null);
            }}
            className="rounded-md px-4 py-2 text-xs font-semibold"
            style={{ backgroundColor: A_IVORY, color: A_BODY, border: `1px solid ${A_BORDER}` }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              pending.resolve(true);
              setPending(null);
            }}
            className="rounded-md px-4 py-2 text-xs font-semibold text-white"
            style={{ backgroundColor: "#DC2626" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, node };
}

// ---------- generic supabase table hook ----------

interface TableState<T> {
  rows: T[];
  loading: boolean;
  error: string | null;
  missingTable: boolean;
  reload: () => Promise<void>;
  create: (values: Record<string, unknown>) => Promise<{ ok: boolean; message: string }>;
  update: (id: number | string, values: Record<string, unknown>) => Promise<{ ok: boolean; message: string }>;
  remove: (id: number | string) => Promise<{ ok: boolean; message: string }>;
}

export function useTable<T>(
  table: string,
  order: { column: string; ascending?: boolean }[] = [{ column: "created_at", ascending: false }],
  filter?: (q: ReturnType<typeof supabase.from>) => ReturnType<typeof supabase.from>
): TableState<T> {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [missingTable, setMissingTable] = useState(false);
  const filterRef = useRef(filter);
  filterRef.current = filter;

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let q = supabase.from(table as never).select("*") as ReturnType<typeof supabase.from>;
      const f = filterRef.current;
      if (f) q = f(q);
      for (const o of order) q = q.order(o.column, { ascending: o.ascending ?? true });
      const { data, error: err } = await q;
      if (err) {
        if (isMissingTableError(err)) {
          setMissingTable(true);
          setRows([]);
        } else {
          setError(err.message);
        }
      } else {
        setMissingTable(false);
        setRows((data || []) as T[]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, JSON.stringify(order)]);

  useEffect(() => {
    reload();
  }, [reload]);

  const create = useCallback(
    async (values: Record<string, unknown>) => {
      const { error: err } = await supabase.from(table as never).insert(values as never);
      if (err) return { ok: false, message: err.message };
      await reload();
      return { ok: true, message: "Created successfully." };
    },
    [table, reload]
  );

  const update = useCallback(
    async (id: number | string, values: Record<string, unknown>) => {
      const { error: err } = await supabase.from(table as never).update(values as never).eq("id", id as never);
      if (err) return { ok: false, message: err.message };
      await reload();
      return { ok: true, message: "Updated successfully." };
    },
    [table, reload]
  );

  const remove = useCallback(
    async (id: number | string) => {
      const { error: err } = await supabase.from(table as never).delete().eq("id", id as never);
      if (err) return { ok: false, message: err.message };
      await reload();
      return { ok: true, message: "Deleted successfully." };
    },
    [table, reload]
  );

  return { rows, loading, error, missingTable, reload, create, update, remove };
}

// ---------- presentational ----------

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm" style={{ color: A_MUTED }}>
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2"
        style={{ borderColor: A_BORDER, borderTopColor: A_MAROON }}
      />
      {label}
    </div>
  );
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="rounded-lg bg-white px-4 py-10 text-center" style={{ border: `1px solid ${A_BORDER}` }}>
      <p className="text-sm font-semibold" style={{ color: A_INK }}>
        {title}
      </p>
      {hint && (
        <p className="mx-auto mt-1 max-w-xs text-xs" style={{ color: A_MUTED }}>
          {hint}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function MissingTableNotice({ tables }: { tables: string }) {
  return (
    <div className="rounded-lg bg-white p-5" style={{ border: `1px solid #D97706` }}>
      <p className="text-sm font-semibold" style={{ color: A_INK }}>
        Database migration pending
      </p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: A_BODY }}>
        The {tables} table does not exist yet. Run <code>supabase-admin-platform.sql</code> in the
        Supabase SQL Editor, then reload this page. Existing content is safe — the migration is
        additive only.
      </p>
    </div>
  );
}

export function Badge({
  tone,
  children,
}: {
  tone: "green" | "red" | "amber" | "maroon" | "gray";
  children: ReactNode;
}) {
  const styles: Record<string, { bg: string; fg: string }> = {
    green: { bg: "#DCFCE7", fg: "#15803D" },
    red: { bg: "#FEE2E2", fg: "#B91C1C" },
    amber: { bg: "#FEF3C7", fg: "#92400E" },
    maroon: { bg: "#7C2D1215", fg: A_MAROON },
    gray: { bg: "#F5F5F4", fg: A_BODY },
  };
  const s = styles[tone];
  return (
    <span
      className="inline-block shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {children}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide" style={{ color: A_MUTED }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 6,
  border: `1px solid ${A_BORDER}`,
  backgroundColor: "#FFFFFF",
  color: A_INK,
  padding: "8px 12px",
  fontSize: 14,
};

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...inputStyle, ...props.style }} className={`admin-input ${props.className || ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...inputStyle, ...props.style }} className={`admin-input ${props.className || ""}`} />;
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} style={{ ...inputStyle, ...props.style }} className={`admin-input ${props.className || ""}`} />;
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-xs font-medium"
      style={{ color: A_BODY }}
    >
      <span
        className="inline-flex h-5 w-9 items-center rounded-full px-0.5 transition-colors"
        style={{ backgroundColor: checked ? A_MAROON : "#D6D3D1", justifyContent: checked ? "flex-end" : "flex-start" }}
      >
        <span className="h-4 w-4 rounded-full bg-white shadow" />
      </span>
      {label}
    </button>
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-md px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 ${props.className || ""}`}
      style={{ backgroundColor: A_MAROON, ...props.style }}
    />
  );
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors hover:opacity-80 disabled:opacity-50 ${props.className || ""}`}
      style={{ backgroundColor: A_IVORY, color: A_BODY, border: `1px solid ${A_BORDER}`, ...props.style }}
    />
  );
}

export function DangerGhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors hover:opacity-80 disabled:opacity-50 ${props.className || ""}`}
      style={{ backgroundColor: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", ...props.style }}
    />
  );
}

export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className={`w-full bg-white p-5 shadow-xl ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"} max-h-[92vh] overflow-y-auto rounded-t-xl sm:rounded-lg`}
        style={{ border: `1px solid ${A_BORDER}` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold" style={{ color: A_INK }}>
            {title}
          </h2>
          <button onClick={onClose} className="rounded px-2 py-1 text-xs font-semibold" style={{ color: A_MUTED }} aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      style={inputStyle}
      className="admin-input"
    />
  );
}

export function RowActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}
