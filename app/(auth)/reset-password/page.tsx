"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hashReady, setHashReady] = useState(false);

  useEffect(() => {
    const initRecovery = async () => {
      try {
        const code = searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          setHashReady(true);
          return;
        }

        // Supabase may send recovery links with #access_token=...
        const hash = window.location.hash;
        if (hash && hash.includes("access_token")) {
          const params = new URLSearchParams(hash.replace("#", ""));
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");
          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (error) throw error;
          }
        }

        setHashReady(true);
      } catch (err: any) {
        setError(err.message || "Invalid or expired reset link");
        setHashReady(true);
      }
    };

    initRecovery();
  }, [supabase, searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-on-background font-body-sm selection:bg-primary/30">
      {/* Technical Visualization Side */}
      <section className="hidden lg:flex w-1/2 relative overflow-hidden bg-surface-container-lowest border-r border-outline-variant">
        <div className="absolute inset-0 w-full h-full object-cover opacity-60 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn3IHZ1OPyS6xWx0s2Baz_Q4tWj6L1FdOUpTZ0d-q84-ArpO1AqUf2Xnxl0d7NgqWWIaBLNYVIMhuBTZUGGAsqcHq8D2YZG1z1EmbraLGdhXmaNJ7O9plkTobpmRxKvvbBJTORci6b1gQHKm75MG1uuyVuDMIZxyFDLHrTdhgnIKKEBbkkuA3sCuzOJ2qOg6vAl1Wn0Kx0kGvwH9P6uY7JDjTWLAvkn9SjC_6MLEyLAndATSVqFUd1zvMPcEeOpLd5FPlr7g2gg6fI')] bg-cover bg-center"></div>
        <div className="relative z-10 p-margin-edge flex flex-col justify-start w-full h-full">
          {/* Branding Anchor */}
          <div>
            <div className="flex items-center gap-stack-mid">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  psychology
                </span>
              </div>
              <h1 className="font-h1 text-h1 tracking-tight text-primary">
                IntellectOS
              </h1>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-stack-tight opacity-70">
              Synthetic Intelligence Index v2.4.0-stable
            </p>
          </div>
        </div>
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #998d9e 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
      </section>

      {/* Reset Password Form Side */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-margin-edge bg-surface">
        <div className="w-full max-w-[400px] flex flex-col gap-stack-loose">
          {/* Mobile Branding */}
          <div className="lg:hidden mb-stack-loose">
            <div className="flex items-center gap-stack-mid mb-stack-tight">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  psychology
                </span>
              </div>
              <h1 className="font-h1 text-h1 tracking-tight text-primary">
                IntellectOS
              </h1>
            </div>
          </div>

          <div className="space-y-stack-tight">
            <h2 className="font-h1 text-h1 text-on-surface">
              Reset Access Key
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Establish a new secure access protocol for your entity.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-error-container/10 border border-error/30 text-on-error-container text-sm font-mono-data">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-stack-loose" onSubmit={handleSubmit}>
            <div className="space-y-stack-mid">
              {/* New Password Field */}
              <div className="group">
                <label
                  className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-unit block"
                  htmlFor="password"
                >
                  New Access Key
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 bottom-stack-tight text-[18px] text-outline group-focus-within:text-primary transition-colors">
                    key
                  </span>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-stack-tight pl-7 text-on-surface font-body-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant"
                    id="password"
                    placeholder="••••••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              {/* Confirm Password Field */}
              <div className="group">
                <label
                  className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-unit block"
                  htmlFor="confirm-password"
                >
                  Confirm Access Key
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 bottom-stack-tight text-[18px] text-outline group-focus-within:text-primary transition-colors">
                    verified_user
                  </span>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-stack-tight pl-7 text-on-surface font-body-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant"
                    id="confirm-password"
                    placeholder="••••••••••••"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
            {/* CTA Actions */}
            <div className="pt-stack-mid space-y-stack-mid">
              <button
                className="w-full bg-primary-container text-on-primary-container h-10 rounded-lg font-label-caps text-label-caps uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-stack-mid shadow-lg shadow-primary/10"
                type="submit"
                disabled={loading}
              >
                {loading ? "UPDATING..." : "Update Access Key"}
                <span className="material-symbols-outlined text-[16px]">
                  bolt
                </span>
              </button>
            </div>
          </form>
          {/* Footer Links */}
          <div className="pt-stack-loose mt-auto">
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
              Remember your credentials?
              <a
                className="text-primary font-semibold hover:underline"
                href="/login"
              >
                {" "}
                Initialize Session
              </a>
            </p>
          </div>
          {/* Legal/System Info */}
          <div className="mt-stack-loose pt-stack-loose border-t border-outline-variant/30 flex justify-between items-center opacity-40">
            <span className="font-mono-data text-mono-data">
              ENCRYPTION: AES-256-GCM
            </span>
            <span className="font-mono-data text-mono-data">
              © 2024 INTELLECTOS
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-on-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-body-sm text-on-surface-variant">Loading...</span>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
