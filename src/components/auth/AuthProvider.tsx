"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { UserProfile } from "@/types";
import { authService } from "@/services/auth";
import { createClient } from "@/lib/supabase/client";

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      setUser(await authService.getCurrentUser());
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoadTimer = window.setTimeout(() => void refreshUser(), 0);

    try {
      const { data } = createClient().auth.onAuthStateChange(() => {
        window.setTimeout(() => void refreshUser(), 0);
      });
      return () => {
        window.clearTimeout(initialLoadTimer);
        data.subscription.unsubscribe();
      };
    } catch {
      window.setTimeout(() => setLoading(false), 0);
      return () => window.clearTimeout(initialLoadTimer);
    }
  }, [refreshUser]);

  const value = useMemo(
    () => ({ user, loading, refreshUser }),
    [user, loading, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}
