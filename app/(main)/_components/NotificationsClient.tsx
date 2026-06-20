"use client";

import { useEffect, useState } from "react";

interface NotificationItem {
  id: string;
  type: string;
  time: string;
  title: string;
  desc?: string;
  icon: string;
  colorBase: string;
  borderClass: string;
  iconBgClass: string;
  iconFill?: boolean;
  progress?: number;
}

export default function NotificationsClient() {
  const [today, setToday] = useState<NotificationItem[]>([]);
  const [yesterday, setYesterday] = useState<NotificationItem[]>([]);
  const [filters, setFilters] = useState([
    { label: "All Activity", icon: "inbox", count: 0, colorClass: "bg-primary-container text-on-primary-container border-primary/30", countClass: "bg-white/20" },
    { label: "Security", icon: "shield", count: 0, hoverClass: "hover:bg-surface-container-high text-on-surface-variant group-hover:text-on-surface", countClass: "bg-error-container text-on-error-container" },
    { label: "System", icon: "settings", count: 0, hoverClass: "hover:bg-surface-container-high text-on-surface-variant group-hover:text-on-surface", countClass: "bg-surface-container-highest" },
    { label: "Academy", icon: "school", count: 0, hoverClass: "hover:bg-surface-container-high text-on-surface-variant group-hover:text-on-surface", countClass: "bg-tertiary-container text-on-tertiary-container" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications?limit=20")
      .then((res) => {
        if (!res.ok) throw new Error("No notification API");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setToday(data.data.today || []);
          setYesterday(data.data.yesterday || []);
          setFilters((prev) =>
            prev.map((f) => ({ ...f, count: data.data.counts?.[f.label] || 0 }))
          );
        }
      })
      .catch(() => {
        // No notification API yet — empty state
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 pt-[10px] sm:pt-[15px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-5 gap-2 sm:gap-0">
        <div>
          <h1 className="font-h1 text-lg sm:text-[24px] text-on-surface uppercase mb-0.5 sm:mb-1">Alerts &amp; Notifications</h1>
          <p className="text-xs sm:text-[13px] text-outline">System events, security alerts, and academy updates.</p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button className="flex items-center gap-1.5 sm:gap-2 bg-surface-container-high border border-outline-variant px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm hover:bg-surface-variant transition-colors text-xs sm:text-[13px]">
            <span className="material-symbols-outlined text-sm sm:text-[18px]">done_all</span>
            <span className="hidden sm:inline">MARK ALL READ</span>
          </button>
          <button className="flex items-center gap-1.5 sm:gap-2 bg-error-container/20 border border-error/30 text-error px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm hover:bg-error-container/40 transition-colors text-xs sm:text-[13px]">
            <span className="material-symbols-outlined text-sm sm:text-[18px]">delete_sweep</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-5">
        {filters.map((f) => (
          <button
            key={f.label}
            className={`group flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm border text-xs sm:text-[13px] font-medium transition-all ${f.label === "All Activity" ? f.colorClass : "border-outline-variant/30 text-on-surface-variant hover:text-on-surface"}`}
          >
            <span className="material-symbols-outlined text-sm sm:text-[16px]">{f.icon}</span>
            {f.label}
            <span className={`ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 rounded-full text-[11px] sm:text-[13px] font-mono-data ${f.countClass}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Feed */}
      <section className="bg-surface-container border border-outline-variant/30 rounded-lg overflow-hidden">
        <div className="bg-surface-container-low px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-[13px] font-label-caps text-outline uppercase tracking-widest">Today</span>
          <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
        </div>

        <div className="flex flex-col">
          {loading ? (
            <div className="space-y-0">
              {[1, 2].map((n) => (
                <div key={n} className="h-20 bg-surface-container animate-pulse border-b border-outline-variant/10" />
              ))}
            </div>
          ) : today.length > 0 ? (
            today.map((alert) => (
              <div key={alert.id} className={`bg-surface-container px-3 sm:px-4 py-2 sm:py-3 hover:bg-surface-container-high transition-colors flex items-start gap-2.5 sm:gap-4 ${alert.borderClass || ""}`}>
                <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded flex items-center justify-center ${alert.iconBgClass || "bg-surface-container-highest"}`}>
                    <span className={`material-symbols-outlined text-base sm:text-[20px] ${alert.iconFill ? "font-variation-fill" : ""}`}>{alert.icon}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <span className={`font-mono-data text-xs sm:text-[13px] text-${alert.colorBase} uppercase tracking-widest`}>{alert.type}</span>
                    <span className="text-xs sm:text-[13px] text-outline">{alert.time}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-on-surface font-medium leading-snug">{alert.title}</p>
                  {alert.desc && <p className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5 sm:mt-1 leading-relaxed">{alert.desc}</p>}
                </div>
                <button className="material-symbols-outlined text-lg sm:text-[20px] text-outline hover:text-white transition-colors">more_vert</button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-3xl mb-2">notifications_off</span>
              <p>No new notifications today.</p>
            </div>
          )}
        </div>

        <div className="bg-surface-container-low px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-4 mt-1">
          <span className="text-xs sm:text-[13px] font-label-caps text-outline uppercase tracking-widest">Yesterday</span>
          <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
        </div>

        <div className="flex flex-col">
          {yesterday.length > 0 ? (
            yesterday.map((alert) => (
              <div key={alert.id} className="bg-surface-container px-3 sm:px-4 py-2 sm:py-3 hover:bg-surface-container-high transition-colors flex items-start gap-2.5 sm:gap-4 opacity-70">
                <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline text-base sm:text-[20px]">{alert.icon}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <span className="font-mono-data text-xs sm:text-[13px] text-outline uppercase tracking-widest">{alert.type}</span>
                    <span className="text-xs sm:text-[13px] text-outline">{alert.time}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-on-surface leading-snug">{alert.title}</p>
                </div>
                <button className="material-symbols-outlined text-lg sm:text-[20px] text-outline hover:text-white transition-colors">more_vert</button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-on-surface-variant text-sm">
              <p>No notifications from yesterday.</p>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-center pt-1 sm:pt-2">
        <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-surface-container border border-outline-variant hover:border-primary transition-colors text-xs sm:text-[13px] font-label-caps uppercase text-on-surface-variant hover:text-primary rounded-md">
          Load older notifications
        </button>
      </div>
    </main>
  );
}
