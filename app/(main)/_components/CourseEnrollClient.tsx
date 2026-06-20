"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CourseEnrollClientProps {
  courseId: string;
  price: number;
  currency: string;
  title: string;
}

export default function CourseEnrollClient({ courseId, price, currency, title }: CourseEnrollClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priceDisplay = currency === "NGN"
    ? `₦${(price / 100).toLocaleString()}`
    : `$${(price / 100).toFixed(2)}`;

  const handleEnroll = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType: "COURSE", itemId: courseId }),
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
        Secure payment via Paystack. You will be redirected to complete your purchase.
      </p>
    </div>
  );
}
