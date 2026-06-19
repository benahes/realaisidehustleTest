import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  const fallbackUrl = "https://aouwmhlcbndongcmaeht.supabase.co";
  const fallbackKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvdXdtaGxjYm5kb25nY21hZWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDE3NDcsImV4cCI6MjA5NjY3Nzc0N30.qEzL9d0hyHLKkH1ALLPh9Dm7M2b99sDj3AjH5qSLHnM";

  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isProd = process.env.NODE_ENV === "production";
  const hasValidEnv =
    !!envUrl &&
    !!envKey &&
    !envUrl.includes("your-project.supabase.co") &&
    !envUrl.includes("/rest/v1") &&
    !envKey.includes("your-anon-key") &&
    !envKey.startsWith("sb_publishable_") &&
    !envKey.includes("service_role");

  const url =
    !isProd && !hasValidEnv ? fallbackUrl : hasValidEnv ? envUrl : fallbackUrl;
  const key =
    !isProd && !hasValidEnv ? fallbackKey : hasValidEnv ? envKey : fallbackKey;

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  });
}
