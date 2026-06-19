import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

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

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user };
}
