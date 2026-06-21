"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  section: string;
  category: string;
  tags: string[];
  createdAt: string;
  author: {
    name: string | null;
    email: string;
    avatarUrl: string | null;
  } | null;
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "JUST NOW";
  if (diffMins < 60) return `${diffMins} MIN AGO`;
  if (diffHours < 24) return `${diffHours}H AGO`;
  if (diffDays < 7) return `${diffDays}D AGO`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getUrgency(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("BREAKING")) return { label: "BREAKING", color: "text-red-400 bg-red-500/10 border-red-500/30" };
  if (cat.includes("MODEL")) return { label: "HOT", color: "text-orange-400 bg-orange-500/10 border-orange-500/30" };
  if (cat.includes("FUNDING")) return { label: "HOT", color: "text-orange-400 bg-orange-500/10 border-orange-500/30" };
  if (cat.includes("RESEARCH")) return { label: "NEW", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" };
  if (cat.includes("PRODUCT")) return { label: "NEW", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" };
  if (cat.includes("REGULATION")) return { label: "SIGNAL", color: "text-slate-400 bg-slate-500/10 border-slate-500/30" };
  return { label: "SIGNAL", color: "text-slate-400 bg-slate-500/10 border-slate-500/30" };
}

function getCategoryColor(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("MODEL")) return "text-purple-400";
  if (cat.includes("FUNDING")) return "text-amber-400";
  if (cat.includes("RESEARCH")) return "text-cyan-400";
  if (cat.includes("PRODUCT")) return "text-emerald-400";
  if (cat.includes("REGULATION")) return "text-rose-400";
  if (cat.includes("HUSTLE")) return "text-primary";
  return "text-outline";
}

function getImpact(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("BREAKING") || cat.includes("MODEL") || cat.includes("FUNDING")) return { label: "HIGH", color: "text-red-400" };
  if (cat.includes("RESEARCH") || cat.includes("PRODUCT") || cat.includes("REGULATION")) return { label: "MED", color: "text-amber-400" };
  return { label: "LOW", color: "text-slate-400" };
}

function getIcon(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("MODEL")) return "auto_awesome";
  if (cat.includes("FUNDING")) return "attach_money";
  if (cat.includes("RESEARCH")) return "science";
  if (cat.includes("PRODUCT")) return "group";
  if (cat.includes("REGULATION")) return "gavel";
  if (cat.includes("HUSTLE")) return "storefront";
  return "radar";
}

function getIconColor(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("MODEL")) return { bg: "bg-purple-500/10 border-purple-500/20", text: "text-purple-400" };
  if (cat.includes("FUNDING")) return { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400" };
  if (cat.includes("RESEARCH")) return { bg: "bg-cyan-500/10 border-cyan-500/20", text: "text-cyan-400" };
  if (cat.includes("PRODUCT")) return { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400" };
  if (cat.includes("REGULATION")) return { bg: "bg-rose-500/10 border-rose-500/20", text: "text-rose-400" };
  if (cat.includes("HUSTLE")) return { bg: "bg-purple-500/10 border-purple-500/20", text: "text-purple-400" };
  return { bg: "bg-slate-500/10 border-slate-500/20", text: "text-slate-400" };
}

export default function AIRadarClient() {
  const [signals, setSignals] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/blog?section=AI_RADAR&limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSignals(data.data.blogs);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredSignals = activeFilter === "ALL"
    ? signals
    : signals.filter((s) => s.category.toUpperCase().includes(activeFilter));

  return (
    <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5 pt-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-0 border-b border-outline-variant/20 gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <h1 className="font-h1 text-[18px] sm:text-[24px] text-white uppercase tracking-tighter">AI Radar</h1>
          <span className="text-[14px] sm:text-[16px] font-bold font-label-caps text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-sm tracking-widest">LIVE</span>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-[13px] sm:text-[15px] font-mono-data text-outline uppercase">Updated: {new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}</span>
          <button className="text-[13px] sm:text-[15px] font-bold text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded-sm tracking-widest uppercase hover:bg-primary/10 transition-colors">
            Set Alerts
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Signal Feed */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-0.5 gap-2 sm:gap-0">
            <h2 className="font-h2 text-[15px] sm:text-[18px] text-white uppercase tracking-tight flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary !text-[16px] sm:!text-[18px]">radar</span>
              Intelligence Signals
            </h2>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {["ALL", "MODELS", "FUNDING", "RESEARCH", "HUSTLE"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[11px] sm:text-[13px] font-bold tracking-widest px-1.5 py-0.5 rounded-sm uppercase transition-colors shrink-0 ${f === activeFilter ? "bg-primary text-on-primary" : "text-outline border border-outline/20 hover:text-white"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-24 bg-surface-container border border-outline-variant/20 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredSignals.length > 0 ? (
              filteredSignals.map((signal) => {
                const urgency = getUrgency(signal.category);
                const impact = getImpact(signal.category);
                const icon = getIcon(signal.category);
                const iconStyle = getIconColor(signal.category);
                const catColor = getCategoryColor(signal.category);
                return (
                  <Link href={`/blog/${signal.slug}`} key={signal.id} className="group bg-surface-container border border-outline-variant/20 rounded-lg p-2 sm:p-3 flex gap-2 sm:gap-3 hover:border-primary/40 transition-all cursor-pointer">
                    <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-md ${iconStyle.bg} border flex items-center justify-center`}>
                      <span className={`material-symbols-outlined !text-[16px] sm:!text-[18px] ${iconStyle.text}`}>{icon}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:gap-1 flex-grow min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[11px] sm:text-[13px] font-bold px-1 sm:px-1.5 py-0.5 border rounded-sm tracking-widest uppercase ${urgency.color}`}>
                          {urgency.label}
                        </span>
                        <span className={`text-[11px] sm:text-[13px] font-bold tracking-widest uppercase ${catColor}`}>
                          {signal.category.toUpperCase()}
                        </span>
                        <span className="text-outline font-mono-data text-[11px] sm:text-[13px]">{timeAgo(signal.createdAt)}</span>
                      </div>
                      <h3 className="font-h2 text-[14px] sm:text-[16px] text-white group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {signal.title}
                      </h3>
                      <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed">
                        {signal.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                        {signal.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[11px] sm:text-[13px] px-1 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold uppercase tracking-tighter">
                            {t}
                          </span>
                        ))}
                        <span className="ml-auto text-[11px] sm:text-[13px] font-bold uppercase tracking-widest text-outline">
                          Impact: <span className={impact.color}>{impact.label}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant text-sm border border-outline-variant/20 rounded-lg bg-surface-container">
                <span className="material-symbols-outlined text-4xl mb-2">radar</span>
                <p>No AI Radar signals yet.</p>
                <p className="text-xs mt-1">Publish posts with the AI Radar section to see them here.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="mt-2 flex justify-center">
            <button className="group flex items-center gap-2 border border-outline-variant/30 px-4 sm:px-5 py-1.5 rounded-sm hover:bg-surface-container-high transition-all active:scale-95">
              <span className="text-[13px] sm:text-[15px] font-bold tracking-widest text-on-surface-variant uppercase">Load More Signals</span>
              <span className="material-symbols-outlined text-primary group-hover:translate-y-0.5 transition-transform !text-[16px] sm:!text-[18px]">keyboard_double_arrow_down</span>
            </button>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-2 sm:gap-4">
          {/* Model Leaderboard — empty state */}
          <div className="bg-surface-container border border-outline-variant/20 rounded-lg overflow-hidden">
            <div className="px-2 sm:px-3 py-2 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high">
              <span className="font-h2 text-[13px] sm:text-[15px] text-white flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-primary !text-[16px] sm:!text-[18px]">leaderboard</span>
                Model Leaderboard
              </span>
              <span className="text-outline font-mono-data text-[13px] sm:text-[15px]">MMLU-PRO</span>
            </div>
            <div className="p-4 text-on-surface-variant text-sm text-center">
              No leaderboard data yet.
            </div>
          </div>

          {/* Funding Tracker — empty state */}
          <div className="bg-surface-container border border-outline-variant/20 rounded-lg overflow-hidden">
            <div className="px-2 sm:px-3 py-2 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high">
              <span className="font-h2 text-[13px] sm:text-[15px] text-white flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-amber-400 !text-[16px] sm:!text-[18px]">trending_up</span>
                Funding Tracker
              </span>
              <span className="text-outline font-mono-data text-[13px] sm:text-[15px]">30-DAY</span>
            </div>
            <div className="p-4 text-on-surface-variant text-sm text-center">
              No funding data yet.
            </div>
          </div>

          {/* Hustle Play of the Day — show latest signal or empty */}
          <div className="bg-primary-container/5 border border-primary/20 rounded-lg p-2 sm:p-4">
            <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
              <span className="text-primary text-[16px] sm:text-[18px]">⚡</span>
              <h2 className="font-h2 text-[15px] sm:text-[18px] text-white uppercase tracking-tight">Hustle Play of the Day</h2>
              <span className="bg-primary px-1.5 py-0.5 text-on-primary font-label-caps text-[9px] sm:text-[10px] rounded-full whitespace-nowrap">AI CURATED</span>
            </div>
            {filteredSignals[0] ? (
              <>
                <p className="text-[12px] sm:text-[13px] text-on-surface-variant leading-relaxed mb-2 sm:mb-3">
                  {filteredSignals[0].excerpt}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-outline-variant/10 gap-1.5 sm:gap-0">
                  <span className="text-[12px] sm:text-[13px] text-outline uppercase tracking-wider flex gap-1 items-center">
                    Category: <span className="bg-primary/20 px-1.5 py-0.5 rounded-sm text-[11px] sm:text-[13px] font-bold">{filteredSignals[0].category.toUpperCase()}</span>
                  </span>
                  <button className="text-[13px] sm:text-[15px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest">
                    FULL BREAKDOWN →
                  </button>
                </div>
              </>
            ) : (
              <p className="text-on-surface-variant text-sm">No hustle plays yet.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
