export function getAuthErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  const normalized = message.toLowerCase();

  if (normalized.includes("email not confirmed")) {
    return "Please confirm your email address before signing in.";
  }
  if (normalized.includes("invalid login credentials")) {
    return "The email or password is incorrect.";
  }
  if (normalized.includes("user already registered")) {
    return "An account with this email already exists.";
  }
  if (normalized.includes("password should be")) {
    return "Use a stronger password with at least 8 characters.";
  }
  if (normalized.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (normalized.includes("supabase is not configured")) {
    return message;
  }
  return message;
}

export function getSafeClientRedirect(value: string | null, fallback = "/dashboard") {
  return value?.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
