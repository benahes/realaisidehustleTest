"use client";

import { useState, FormEvent } from "react";
import { MoveRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full mt-1 md:mt-0">
      <span className="text-white text-xs font-semibold tracking-wider uppercase hidden md:block">Subscribe to our newsletter</span>
      {status === "success" ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg px-3 py-2">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full group relative shadow-sm">
          <input
            type="email"
            placeholder="Join our newsletter..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 md:px-4 py-2 w-full focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-600 disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            aria-label="Subscribe"
            className="absolute right-1 top-1 bottom-1 bg-purple-600 hover:bg-purple-500 md:bg-purple-600/20 md:hover:bg-purple-600 text-white md:text-purple-400 hover:text-white px-3 rounded-md transition-all flex items-center justify-center shadow-md md:shadow-none disabled:opacity-50"
          >
            <MoveRight className="w-4 h-4 md:group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs mt-1">{message}</p>
      )}
    </div>
  );
}
