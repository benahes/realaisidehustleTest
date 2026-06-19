"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`,
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`,
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (otpValue.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const type = (searchParams.get("type") || "signup") as any;
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpValue,
        type,
      });
      if (error) throw error;
      await fetch("/api/auth/sync", { method: "POST" });
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Verification failed");
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

      {/* OTP Verification Form Side */}
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
            <h2 className="font-h1 text-h1 text-on-surface">Verify Identity</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Enter the 6-digit verification code sent to your network identity.
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
              <div className="group">
                <label
                  className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-unit block"
                  htmlFor="email"
                >
                  Network Identity
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 bottom-stack-tight text-[18px] text-outline group-focus-within:text-primary transition-colors">
                    alternate_email
                  </span>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-stack-tight pl-7 text-on-surface font-body-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant"
                    id="email"
                    placeholder="operator@nexus.io"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* OTP Input Grid */}
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 bg-surface-container border border-outline-variant rounded-lg text-center font-mono-data text-lg text-on-surface focus:border-primary focus:ring-0 focus:outline-none transition-all"
                    required
                  />
                ))}
              </div>
            </div>
            {/* CTA Actions */}
            <div className="pt-stack-mid space-y-stack-mid">
              <button
                className="w-full bg-primary-container text-on-primary-container h-10 rounded-lg font-label-caps text-label-caps uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-stack-mid shadow-lg shadow-primary/10"
                type="submit"
                disabled={loading}
              >
                {loading ? "VERIFYING..." : "Verify Code"}
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
              </button>
              <div className="relative flex items-center py-stack-tight">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="flex-shrink mx-4 font-label-caps text-label-caps text-outline-variant">
                  Resend Code
                </span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>
              <button
                type="button"
                className="w-full text-primary font-label-caps text-label-caps uppercase hover:underline"
              >
                Send New Code
              </button>
            </div>
          </form>
          {/* Footer Links */}
          <div className="pt-stack-loose mt-auto">
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
              Code not received?
              <a
                className="text-primary font-semibold hover:underline"
                href="/forgot-password"
              >
                {" "}
                Request New Protocol
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

export default function VerifyOTPPage() {
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
      <VerifyOTPForm />
    </Suspense>
  );
}
