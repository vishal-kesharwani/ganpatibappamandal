"use client";

/**
 * Admin design primitives — Apple HIG-inspired, premium CMS aesthetic.
 * Clean surfaces, refined shadows, precise typography, fluid motion.
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

// ── Design Tokens ──────────────────────────────────────────────
export const A_IVORY = "#FAF8F5";
export const A_MAROON = "#7C2D12";
export const A_BORDER = "#E5E2DD";
export const A_INK = "#1A1814";
export const A_BODY = "#57534E";
export const A_MUTED = "#A8A29E";
export const A_SURFACE = "#FFFFFF";
export const A_ELEVATED = "#FDFCFA";
export const A_FOCUS = "rgba(124, 45, 18, 0.12)";
export const A_RADIUS = 10;
export const A_RADIUS_SM = 7;
export const A_RADIUS_LG = 14;
export const A_SHADOW_SM = "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)";
export const A_SHADOW_MD = "0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)";
export const A_SHADOW_LG = "0 4px 12px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)";
export const A_TRANSITION = "all 180ms cubic-bezier(0.32, 0.72, 0, 1)";

// ── Toast ──────────────────────────────────────────────────────

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
      <div className="fixed bottom-5 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="overflow-hidden rounded-xl px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              border: `1px solid ${t.kind === "success" ? "#BBF7D0" : "#FECACA"}`,
              color: A_INK,
              boxShadow: A_SHADOW_LG,
              animation: "toast-in 300ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: t.kind === "success" ? "#16A34A" : "#DC2626" }}
              >
                {t.kind === "success" ? "✓" : "!"}
              </span>
              <span>{t.message}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </ToastCtx.Provider>
  );
}

// ── Confirm Dialog ─────────────────────────────────────────────

export function useConfirm(opts?: {
  title?: string;
  confirmLabel?: string;
  danger?: boolean;
}) {
  const [pending, setPending] = useState<{ message: string; resolve: (v: boolean) => void } | null>(null);
  const title = opts?.title ?? "Confirm";
  const confirmLabel = opts?.confirmLabel ?? "Delete";
  const danger = opts?.danger ?? true;

  const confirm = useCallback(
    (message: string) =>
      new Promise<boolean>((resolve) => {
        setPending({ message, resolve });
      }),
    []
  );

  const node = pending ? (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "confirm-bg-in 200ms ease-out",
      }}
    >
      <div
        className="w-full max-w-sm overflow-hidden"
        style={{
          backgroundColor: A_SURFACE,
          borderRadius: A_RADIUS_LG,
          boxShadow: A_SHADOW_LG,
          animation: "confirm-card-in 250ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-4">
          <p className="text-[15px] font-semibold" style={{ color: A_INK }}>
            {title}
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: A_BODY }}>
            {pending.message}
          </p>
        </div>
        <div
          className="flex border-t"
          style={{ borderColor: A_BORDER }}
        >
          <button
            onClick={() => {
              pending.resolve(false);
              setPending(null);
            }}
            className="flex-1 py-3 text-[13px] font-medium transition-colors"
            style={{ color: A_MAROON }}
          >
            Cancel
          </button>
          <div style={{ width: 1, backgroundColor: A_BORDER }} />
          <button
            onClick={() => {
              pending.resolve(true);
              setPending(null);
            }}
            className="flex-1 py-3 text-[13px] font-semibold transition-colors"
            style={{ color: danger ? "#DC2626" : A_MAROON }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes confirm-bg-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes confirm-card-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  ) : null;

  return { confirm, node };
}

// ── Generic Supabase Table Hook ────────────────────────────────

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

// ── Presentational Components ──────────────────────────────────

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-10 text-[13px]" style={{ color: A_MUTED }}>
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full"
        style={{ border: `2px solid ${A_BORDER}`, borderTopColor: A_MAROON }}
      />
      {label}
    </div>
  );
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div
      className="rounded-2xl bg-white px-6 py-12 text-center"
      style={{ border: `1px solid ${A_BORDER}`, boxShadow: A_SHADOW_SM }}
    >
      <p className="text-[15px] font-semibold" style={{ color: A_INK }}>
        {title}
      </p>
      {hint && (
        <p className="mx-auto mt-1.5 max-w-[280px] text-[13px] leading-relaxed" style={{ color: A_MUTED }}>
          {hint}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function MissingTableNotice({ tables }: { tables: string }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: "#FFFBEB", border: `1px solid #FDE68A` }}
    >
      <p className="text-[13px] font-semibold" style={{ color: "#92400E" }}>
        Database migration pending
      </p>
      <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "#A16207" }}>
        The <span className="font-mono font-semibold">{tables}</span> table does not exist yet. Run{" "}
        <code className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-mono font-semibold">supabase-admin-platform.sql</code> in the
        Supabase SQL Editor, then reload this page.
      </p>
    </div>
  );
}

export function Badge({
  tone,
  children,
  style,
}: {
  tone: "green" | "red" | "amber" | "maroon" | "gray";
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const styles: Record<string, { bg: string; fg: string }> = {
    green: { bg: "#DCFCE7", fg: "#15803D" },
    red: { bg: "#FEE2E2", fg: "#B91C1C" },
    amber: { bg: "#FEF3C7", fg: "#92400E" },
    maroon: { bg: "#7C2D1212", fg: A_MAROON },
    gray: { bg: "#F5F5F4", fg: A_BODY },
  };
  const s = styles[tone];
  return (
    <span
      className="inline-block shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide"
      style={{ backgroundColor: s.bg, color: s.fg, ...style }}
    >
      {children}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider"
        style={{ color: A_MUTED }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

// ── Form Inputs ────────────────────────────────────────────────

const inputBase: React.CSSProperties = {
  width: "100%",
  borderRadius: A_RADIUS,
  border: `1px solid ${A_BORDER}`,
  backgroundColor: A_SURFACE,
  color: A_INK,
  padding: "9px 13px",
  fontSize: 13,
  lineHeight: "1.4",
  transition: A_TRANSITION,
  outline: "none",
};

const inputFocusClass = `
  focus:border-[#7C2D12] focus:ring-[3px] focus:ring-[rgba(124,45,18,0.08)]
  hover:border-[#D6D3D1]
`;

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ ...inputBase, ...props.style }}
      className={`${inputFocusClass} ${props.className || ""}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ ...inputBase, ...props.style, minHeight: 80, resize: "vertical" }}
      className={`${inputFocusClass} ${props.className || ""}`}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{ ...inputBase, ...props.style, cursor: "pointer" }}
      className={`${inputFocusClass} ${props.className || ""}`}
    />
  );
}

// ── Toggle (iOS-style) ────────────────────────────────────────

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 text-[13px] font-medium"
      style={{ color: A_BODY }}
    >
      <span
        className="relative inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-full px-[3px] transition-all duration-200"
        style={{
          backgroundColor: checked ? "#16A34A" : "#D1D5DB",
          justifyContent: checked ? "flex-end" : "flex-start",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <span
          className="inline-block h-[20px] w-[20px] rounded-full bg-white transition-all duration-200"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.06)",
          }}
        />
      </span>
      {label}
    </button>
  );
}

// ── Buttons ────────────────────────────────────────────────────

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-lg px-4 py-2 text-[13px] font-semibold text-white
        transition-all duration-150
        hover:brightness-110 hover:shadow-md
        active:scale-[0.98]
        disabled:opacity-40 disabled:pointer-events-none
        ${props.className || ""}
      `}
      style={{
        backgroundColor: A_MAROON,
        boxShadow: "0 1px 2px rgba(124,45,18,0.2), 0 1px 3px rgba(124,45,18,0.1)",
        ...props.style,
      }}
    />
  );
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-lg px-3.5 py-2 text-[13px] font-medium
        transition-all duration-150
        hover:bg-stone-100 hover:border-stone-300
        active:scale-[0.98]
        disabled:opacity-40 disabled:pointer-events-none
        ${props.className || ""}
      `}
      style={{
        backgroundColor: A_SURFACE,
        color: A_BODY,
        border: `1px solid ${A_BORDER}`,
        ...props.style,
      }}
    />
  );
}

export function DangerGhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-lg px-3.5 py-2 text-[13px] font-medium
        transition-all duration-150
        hover:bg-red-50 hover:border-red-300 hover:text-red-700
        active:scale-[0.98]
        disabled:opacity-40 disabled:pointer-events-none
        ${props.className || ""}
      `}
      style={{
        backgroundColor: "#FEF2F2",
        color: "#B91C1C",
        border: "1px solid #FECACA",
        ...props.style,
      }}
    />
  );
}

// ── Modal ──────────────────────────────────────────────────────

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
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "modal-bg-in 200ms ease-out",
      }}
      onClick={onClose}
    >
      <div
        className={`
          w-full bg-white shadow-2xl
          max-h-[92vh] overflow-y-auto
          rounded-t-2xl sm:rounded-2xl
          ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"}
        `}
        style={{
          boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          animation: "modal-card-in 280ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-5 py-4" style={{ borderColor: A_BORDER, backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" }}>
          <h2 className="text-[15px] font-semibold" style={{ color: A_INK }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
            style={{ color: A_MUTED }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes modal-bg-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-card-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Search Input ───────────────────────────────────────────────

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
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={A_MUTED}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        style={{ ...inputBase, paddingLeft: 36 }}
        className={`${inputFocusClass}`}
      />
    </div>
  );
}

// ── Row Actions ────────────────────────────────────────────────

export function RowActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}

// ── Skeleton ───────────────────────────────────────────────────

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{ backgroundColor: "#E7E5E4" }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: A_SURFACE, border: `1px solid ${A_BORDER}` }}
    >
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-[18px] font-semibold" style={{ color: A_INK }}>
          {title}
        </h1>
        {description && (
          <p className="mt-0.5 text-[13px]" style={{ color: A_MUTED }}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

// ── Card Row (mobile-friendly list item) ──────────────────────

export function CardRow({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl p-4 transition-all duration-150 ${
        onClick ? "cursor-pointer active:scale-[0.99]" : ""
      } ${className}`}
      style={{
        backgroundColor: A_SURFACE,
        border: `1px solid ${A_BORDER}`,
        boxShadow: A_SHADOW_SM,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ── Filter Bar ─────────────────────────────────────────────────

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-4 rounded-2xl p-3"
      style={{
        backgroundColor: A_SURFACE,
        border: `1px solid ${A_BORDER}`,
        boxShadow: A_SHADOW_SM,
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        {children}
      </div>
    </div>
  );
}

// ── Status Dot ─────────────────────────────────────────────────

export function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ backgroundColor: active ? "#16A34A" : "#D1D5DB" }}
    />
  );
}
