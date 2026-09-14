"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AdminAuthState {
  loading: boolean;
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  role: string | null;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; message: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

async function resolveRole(userId: string): Promise<{ isAdmin: boolean; role: string | null }> {
  const { data, error } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return { isAdmin: false, role: null };
  return { isAdmin: true, role: (data as { role: string }).role };
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const nextSession = data.session;
      setSession(nextSession);
      if (nextSession?.user) {
        const resolved = await resolveRole(nextSession.user.id);
        setIsAdmin(resolved.isAdmin);
        setRole(resolved.role);
      } else {
        setIsAdmin(false);
        setRole(null);
      }
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Session check failed");
      setSession(null);
      setIsAdmin(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        const resolved = await resolveRole(nextSession.user.id);
        setIsAdmin(resolved.isAdmin);
        setRole(resolved.role);
      } else {
        setIsAdmin(false);
        setRole(null);
      }
      setLoading(false);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [refresh]);

  const signIn = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      return { ok: false, message: error.message };
    }
    if (!data.session?.user) {
      return { ok: false, message: "Sign-in failed. Please try again." };
    }
    const resolved = await resolveRole(data.session.user.id);
    setSession(data.session);
    setIsAdmin(resolved.isAdmin);
    setRole(resolved.role);
    if (!resolved.isAdmin) {
      await supabase.auth.signOut();
      setSession(null);
      return {
        ok: false,
        message: "This account is not an admin. Contact the mandal committee.",
      };
    }
    return { ok: true, message: "Welcome back." };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
    setRole(null);
  }, []);

  const value = useMemo<AdminAuthState>(
    () => ({
      loading,
      session,
      user: session?.user ?? null,
      isAdmin,
      role,
      authError,
      signIn,
      signOut,
      refresh,
    }),
    [loading, session, isAdmin, role, authError, signIn, signOut, refresh]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
