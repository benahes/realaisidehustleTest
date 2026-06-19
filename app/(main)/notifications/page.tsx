import Link from "next/link";

export const metadata = {
    title: 'Notifications ΓÇö AI Side Hustle',
    description: 'Alerts and Notifications',
};

const FILTERS = [
    { label: "All Activity", icon: "inbox", count: 42, colorClass: "bg-primary-container text-on-primary-container border-primary/30", countClass: "bg-white/20" },
    { label: "Security", icon: "shield", count: 3, hoverClass: "hover:bg-surface-container-high text-on-surface-variant group-hover:text-on-surface", countClass: "bg-error-container text-on-error-container" },
    { label: "System", icon: "settings", count: 12, hoverClass: "hover:bg-surface-container-high text-on-surface-variant group-hover:text-on-surface", countClass: "bg-surface-container-highest" },
    { label: "Academy", icon: "school", count: 27, hoverClass: "hover:bg-surface-container-high text-on-surface-variant group-hover:text-on-surface", countClass: "bg-tertiary-container text-on-tertiary-container" },
];

const TODAY_ALERTS = [
    {
        id: 1,
        type: "Security Alert",
        time: "08:42 AM",
        title: "New login detected from Tokyo, JP (IP: 192.168.1.104)",
        desc: "Please verify if this was you. If not, secure your account immediately via the Security Panel.",
        icon: "warning",
        colorBase: "error",
        borderClass: "border-l-2 border-error",
        iconBgClass: "bg-error-container/20",
        iconFill: true,
    },
    {
        id: 2,
        type: "System Update",
        time: "06:15 AM",
        title: "Platform version 2.4.0 successfully deployed",
        desc: "Improved neural processing speeds for Playbooks. View changelog for full details.",
        icon: "cached",
        colorBase: "primary",
        borderClass: "border-l-2 border-primary",
        iconBgClass: "bg-primary-container/20",
    },
    {
        id: 3,
        type: "Academy Progress",
        time: "02:00 AM",
        title: 'Course Completed: "Advanced Vector Operations"',
        desc: "",
        icon: "auto_stories",
        colorBase: "tertiary",
        borderClass: "border-l-2 border-tertiary",
        iconBgClass: "bg-tertiary-container/20",
        progress: 100,
    },
];

const YESTERDAY_ALERTS = [
    {
        id: 4,
        type: "Academy",
        time: "05:40 PM",
        title: 'New Lesson available: "Transformer Architecture Deep-Dive"',
        icon: "school",
    },
    {
        id: 5,
        type: "Tools DB",
        time: "11:15 AM",
        title: "Weekly database snapshot successfully archived to S3 bucket 'intelligence-backup-v2'",
        icon: "database",
    },
    {
        id: 6,
        type: "Security",
        time: "Yesterday",
        title: "API Key 'Radar_Main' rotated successfully as per your 30-day policy.",
        icon: "key",
    },
];

export default function NotificationsPage() {
    return (
        <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 pt-[10px] sm:pt-[15px] grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-gutter">
            {/* Sidebar / Filters */}
            <aside className="md:col-span-3 space-y-2 sm:space-y-4">
                <div className="glass-panel rounded-lg p-2.5 sm:p-4 md:sticky md:top-20 border border-outline-variant/20">
                    <h1 className="font-h1 text-lg sm:text-[24px] text-on-surface mb-2 sm:mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg sm:text-[24px]">notifications</span>
                        Notifications
                    </h1>
                    <div className="flex flex-row md:flex-col gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {FILTERS.map((f, i) => {
                            const isFirst = i === 0;
                            return (
                                <button key={i} className={`flex items-center justify-between w-full p-2 sm:p-2.5 rounded-sm transition-colors whitespace-nowrap ${isFirst ? f.colorClass + " border" : "group " + f.hoverClass}`}>
                                    <span className={`font-label-caps text-xs sm:text-[13px] uppercase flex items-center gap-1.5 sm:gap-2 ${!isFirst && "text-on-surface-variant group-hover:text-on-surface"}`}>
                                        <span className="material-symbols-outlined text-base sm:text-[18px]">{f.icon}</span>
                                        {f.label}
                                    </span>
                                    <span className={`font-mono-data text-xs sm:text-[13px] px-1 sm:px-1.5 py-0.5 rounded ${f.countClass}`}>
                                        {f.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-outline-variant/30">
                        <button className="text-primary hover:text-white font-label-caps text-xs sm:text-[13px] uppercase flex items-center gap-1.5 sm:gap-2 w-full justify-center py-1.5 sm:py-2 transition-colors">
                            <span className="material-symbols-outlined text-base sm:text-[18px]">done_all</span>
                            Mark all as read
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Feed */}
            <section className="md:col-span-9 space-y-2 sm:space-y-4">
                {/* Top Actions Bar */}
                <div className="glass-panel rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border border-outline-variant/20">
                    <div className="flex gap-3 sm:gap-4">
                        <span className="text-xs sm:text-[14px] font-label-caps uppercase text-on-surface-variant border-b-2 border-primary pb-1">Unread (18)</span>
                        <span className="text-xs sm:text-[14px] font-label-caps uppercase text-outline cursor-pointer hover:text-on-surface transition-colors pb-1 border-b-2 border-transparent">Archived</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-xs sm:text-[13px] text-outline hidden sm:inline">Search alerts</span>
                        <div className="h-6 w-[1px] bg-outline-variant mx-1 sm:mx-2 hidden sm:block"></div>
                        <span className="material-symbols-outlined text-lg sm:text-[20px] text-outline cursor-pointer hover:text-primary transition-colors">filter_list</span>
                    </div>
                </div>

                {/* Chronological List */}
                <div className="space-y-[1px] bg-outline-variant/20 rounded overflow-hidden">
                    {/* Today Header */}
                    <div className="bg-surface-container-low px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-4">
                        <span className="text-xs sm:text-[13px] font-label-caps text-primary uppercase tracking-widest">Today</span>
                        <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
                    </div>

                    {/* Today Alerts */}
                    {TODAY_ALERTS.map((alert) => (
                        <div key={alert.id} className={`bg-surface-container px-3 sm:px-4 py-2 sm:py-3 hover:bg-surface-container-high transition-colors flex items-start gap-2.5 sm:gap-4 ${alert.borderClass}`}>
                            <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded flex items-center justify-center ${alert.iconBgClass}`}>
                                    <span className={`material-symbols-outlined text-${alert.colorBase} text-base sm:text-[20px]`} style={alert.iconFill ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                        {alert.icon}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                                    <span className={`font-mono-data text-xs sm:text-[13px] text-${alert.colorBase} uppercase tracking-widest`}>{alert.type}</span>
                                    <span className="text-xs sm:text-[13px] text-outline">{alert.time}</span>
                                </div>
                                <p className="text-sm sm:text-[15px] text-on-surface font-medium leading-snug">{alert.title}</p>
                                {alert.desc && <p className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5 sm:mt-1 leading-relaxed">{alert.desc}</p>}
                                {alert.progress === 100 && (
                                    <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-4">
                                        <div className="flex-1 h-1 sm:h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                            <div className={`bg-${alert.colorBase} w-full h-full`}></div>
                                        </div>
                                        <span className={`text-xs sm:text-[13px] font-mono-data text-${alert.colorBase}`}>100%</span>
                                    </div>
                                )}
                            </div>
                            <button className="material-symbols-outlined text-lg sm:text-[20px] text-outline hover:text-white transition-colors">more_vert</button>
                        </div>
                    ))}

                    {/* Yesterday Header */}
                    <div className="bg-surface-container-low px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-4 mt-1">
                        <span className="text-xs sm:text-[13px] font-label-caps text-outline uppercase tracking-widest">Yesterday</span>
                        <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
                    </div>

                    {/* Yesterday Alerts */}
                    {YESTERDAY_ALERTS.map((alert) => (
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
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center pt-1 sm:pt-2">
                    <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-surface-container border border-outline-variant hover:border-primary transition-colors text-xs sm:text-[13px] font-label-caps uppercase text-on-surface-variant hover:text-primary rounded-md">
                        Load older notifications
                    </button>
                </div>
            </section>
        </main>
    );
}