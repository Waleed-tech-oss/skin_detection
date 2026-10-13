import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/types";
import type {
  AuthCredentials,
  AuthService,
  AuthSession,
  RegistrationInput,
} from "./index";

function toUserProfile(user: User): UserProfile {
  const name =
    (typeof user.user_metadata?.full_name === "string" &&
      user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata?.name === "string" &&
      user.user_metadata.name.trim()) ||
    user.email?.split("@")[0] ||
    "DermaAI User";

  return {
    id: user.id,
    name,
    email: user.email ?? "",
    createdAt: user.created_at,
  };
}

function toAuthSession(session: Session): AuthSession {
  return {
    accessToken: session.access_token,
    expiresAt: new Date((session.expires_at ?? 0) * 1000).toISOString(),
    user: toUserProfile(session.user),
  };
}

function callbackUrl(next: string) {
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

export const authService: AuthService = {
  async getCurrentUser() {
    const { data, error } = await createClient().auth.getUser();
    if (error) return null;
    return data.user ? toUserProfile(data.user) : null;
  },

  async signIn(credentials: AuthCredentials) {
    const { data, error } = await createClient().auth.signInWithPassword(credentials);
    if (error) throw error;
    if (!data.session) throw new Error("No session was created.");
    return toAuthSession(data.session);
  },

  async register(input: RegistrationInput) {
    const { data, error } = await createClient().auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: callbackUrl("/dashboard"),
        data: { full_name: input.name.trim() },
      },
    });
    if (error) throw error;
    return data.session ? toAuthSession(data.session) : null;
  },

  async signOut() {
    const { error } = await createClient().auth.signOut();
    if (error) throw error;
  },

  async requestPasswordReset(email: string) {
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: callbackUrl("/update-password"),
    });
    if (error) throw error;
  },

  async updateProfile(input: Pick<UserProfile, "name">) {
    const name = input.name.trim();
    if (!name) throw new Error("Name is required.");
    const { data, error } = await createClient().auth.updateUser({
      data: { full_name: name },
    });
    if (error) throw error;
    return toUserProfile(data.user);
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user?.email) {
      throw userError ?? new Error("Unable to verify the current user.");
    }

    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: userData.user.email,
      password: currentPassword,
    });
    if (verifyError) throw new Error("The current password is incorrect.");

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  async updateRecoveredPassword(newPassword: string) {
    const { error } = await createClient().auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },
};
