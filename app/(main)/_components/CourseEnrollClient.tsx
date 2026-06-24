"use client";

import { useState } from "react";

interface CourseEnrollClientProps {
  courseId: string;
  price: number;
  currency: string;
}

export default function CourseEnrollClient({ courseId, price, currency }: CourseEnrollClientProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priceDisplay = currency === "NGN"
    ? `₦${(price / 100).toLocaleString()}`
    : `$${(price / 100).toFixed(2)}`;

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEnroll = async () => {
    setError("");
    if (!email.trim() || !isValidEmail(email.trim())) {
      setError("Please enter a valid email address for PDF delivery.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType: "COURSE", itemId: courseId, email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.data?.authorizationUrl) {
        window.location.href = data.data.authorizationUrl;
      } else {
        setError(data.error || "Checkout failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-error-container/10 border border-error/30 text-on-error-container text-xs sm:text-sm rounded-lg px-3 py-2">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="course-email" className="text-[10px] sm:text-xs font-label-caps uppercase text-on-surface-variant block mb-1.5">
          Email for PDF delivery
        </label>
        <input
          id="course-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-3 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none transition-colors"
        />
      </div>
      <button
        onClick={handleEnroll}
        disabled={loading}
        className="w-full bg-primary-container text-on-primary-container py-2.5 sm:py-3 rounded-lg font-label-caps text-xs sm:text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
            Processing...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
            Enroll Now — {priceDisplay}
          </>
        )}
      </button>
      <p className="text-on-surface-variant text-[10px] sm:text-xs text-center">
        Secure payment via Paystack. The course PDF will be emailed to you after successful payment.
      </p>
    </div>
  );
}
