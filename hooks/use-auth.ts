"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();

    let subscription: { unsubscribe: () => void } | undefined;
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      subscription = data.subscription;
    } catch {
      // ignore when supabase is not configured
    }

    return () => subscription?.unsubscribe();
  }, [supabase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Sync user to Prisma
      await fetch("/api/auth/sync", { method: "POST" });
      return data;
    },
    [supabase],
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      metadata?: { full_name?: string },
    ) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, metadata }),
      });

      if (!res.ok) {
        let message = "Registration failed";
        try {
          const data = await res.json();
          message = data?.error || data?.message || message;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      return res.json();
    },
    [],
  );

  const signInWithOAuth = useCallback(
    async (provider: "google" | "github") => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      return data;
    },
    [supabase],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  const resetPassword = useCallback(
    async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    },
    [supabase],
  );

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    resetPassword,
  };
}
