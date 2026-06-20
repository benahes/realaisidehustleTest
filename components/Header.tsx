"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const menuGroups = [
    {
        label: "Account",
        items: [
            { icon: "account_circle", label: "My Account", href: "/profile" },
            { icon: "workspace_premium", label: "Subscription", href: "/profile/edit", badge: "PRO" },
        ],
    },
    {
        label: "Learning",
        items: [
            { icon: "school", label: "My Courses", href: "/courses" },
            { icon: "bookmark", label: "Saved Articles", href: "/saved-articles" },
            { icon: "emoji_events", label: "Certificates", href: "/certificates" },
        ],
    },
    {
        label: "System",
        items: [
            { icon: "settings", label: "Settings", href: "/settings" },
            { icon: "notifications", label: "Notifications", href: "/notifications" },
            { icon: "help_outline", label: "Help & Support", href: "/support" },
        ],
    },
];

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [blogCount, setBlogCount] = useState(0);
    const { user, signOut } = useAuth();
    const isLoggedIn = !!user;

    useEffect(() => {
      fetch("/api/blog?limit=1")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setBlogCount(data.data.total || 0);
        })
        .catch(() => {});
    }, []);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
    const email = user?.email || '';
    const avatarUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=9d4edd&color=fff`;

    const handleSignOut = async () => {
        setOpen(false);
        await signOut();
    };

    const getLinkClasses = (path: string) => {
        const isActive = path === "/" ? pathname === "/" : pathname?.startsWith(path);
        // Desktop uses rounded pills; mobile uses flat square tab style
        if (isActive) return "font-display text-sm font-medium tracking-tight whitespace-nowrap shrink-0 transition-all duration-150 uppercase sm:rounded-md sm:px-3 sm:py-1.5 sm:border sm:border-purple-400/30 text-white bg-purple-700 sm:bg-purple-600 px-2 py-1.5 border-b-2 border-purple-400 sm:border-b-0";
        return "font-display text-sm font-medium tracking-tight whitespace-nowrap shrink-0 transition-all duration-150 sm:rounded-md sm:px-3 sm:py-1.5 text-slate-400 hover:text-white sm:hover:bg-slate-800/50 sm:border sm:border-transparent px-2 py-1.5 bg-purple-900/15";
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    useEffect(() => {
        if (open) {
            const original = document.documentElement.style.overflow;
            document.documentElement.style.overflow = "hidden";
            return () => { document.documentElement.style.overflow = original; };
        }
    }, [open]);

    return (
        <header className="fixed top-0 w-full z-50 flex flex-col sm:bg-transparent backdrop-blur-xl sm:border-b sm:border-purple-600 h-[78px] sm:h-[72px] justify-center transition-all">
            <div className="flex flex-col w-full h-full justify-between">
                {/* Top Row: Brand & Profile */}
                <div className="flex items-center justify-between w-full h-[42px] sm:h-[72px] px-4 sm:px-6 border-b border-purple-600/80 sm:border-none">
                    <div className="flex items-center gap-8">
                        <Link href="/">
                            <span className="text-lg sm:text-xl font-black tracking-tighter text-white dark:text-white font-mono-data">AI SIDE HUSTLE</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-2">
                            <Link href="/" className={getLinkClasses("/")}>Blog ({blogCount})</Link>
                            <Link href="/ai-radar" className={getLinkClasses("/ai-radar")}>AI Radar</Link>
                            <Link href="/tools-db" className={getLinkClasses("/tools-db")}>Tools DB</Link>
                            <Link href="/playbooks" className={getLinkClasses("/playbooks")}>Playbooks</Link>
                            <Link href="/e-books" className={getLinkClasses("/e-books")}>E-Books</Link>
                            <Link href="/courses" className={getLinkClasses("/courses")}>Courses</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {isLoggedIn ? (
                            /* Profile Avatar + Dropdown */
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setOpen((v) => !v)}
                                    aria-label="Open profile menu"
                                    aria-expanded={open}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 overflow-hidden shrink-0 transition-all duration-150 ${open ? "border-primary-container shadow-[0_0_12px_2px_rgba(157,78,221,0.4)]" : "border-outline-variant hover:border-primary-container/60"}`}
                                >
                                    <Image alt="User profile" width={40} height={40} className="w-full h-full object-cover" src={avatarUrl} referrerPolicy="no-referrer" />
                                </button>

                                <div
                                    className={`dropdown-menu absolute right-[-20px] top-[calc(100%+10px)] w-64 rounded-xl border border-outline-variant/30 overflow-hidden shadow-2xl shadow-black/60 ${open ? "open" : ""}`}
                                    style={{ background: "rgba(22,17,26,0.97)", backdropFilter: "blur(20px)" }}
                                >
                                        {/* User Info */}
                                        <div className="px-3 sm:px-4 py-1.5 sm:py-3 border-b border-outline-variant/20 flex items-center gap-2">
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-primary-container/40 overflow-hidden shrink-0">
                                                <Image alt="User" width={36} height={36} className="w-full h-full object-cover" src={avatarUrl} referrerPolicy="no-referrer" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-h2 text-[13px] text-white truncate">{displayName}</span>
                                                <span className="font-mono-data text-[9px] text-outline truncate">{email}</span>
                                            </div>
                                            <span className="ml-auto shrink-0 text-[7px] font-bold bg-primary-container/20 text-primary border border-primary/20 px-1.5 py-0.5 rounded-full tracking-widest">PRO</span>
                                        </div>

                                        {/* Menu Groups */}
                                        <div className="py-0.5 sm:py-1.5">
                                            {menuGroups.map((group, gi) => (
                                                <div key={gi}>
                                                    <div className="px-3 sm:px-4 pt-1.5 sm:pt-2.5 pb-0.5 sm:pb-1">
                                                        <span className="font-label-caps text-[8px] text-outline/50 uppercase tracking-widest">{group.label}</span>
                                                    </div>
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href}
                                                            onClick={() => setOpen(false)}
                                                            className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 hover:bg-primary-container/10 transition-colors group"
                                                        >
                                                            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors !text-[16px]">
                                                                {item.icon}
                                                            </span>
                                                            <span className="font-body-sm text-[12px] text-on-surface-variant group-hover:text-white transition-colors flex-grow">
                                                                {item.label}
                                                            </span>
                                                            {item.badge && (
                                                                <span className="text-[7px] font-bold bg-primary-container/20 text-primary border border-primary/20 px-1 py-0.5 rounded-full tracking-widest">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))}
                                                    {gi < menuGroups.length - 1 && (
                                                        <div className="mx-3 sm:mx-4 my-0.5 sm:my-1.5 border-t border-outline-variant/10" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Sign Out */}
                                        <div className="border-t border-outline-variant/20 px-1 sm:px-2 py-1 sm:py-2">
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                                            >
                                                <span className="material-symbols-outlined text-outline group-hover:text-red-400 transition-colors !text-[16px]">
                                                    logout
                                                </span>
                                                <span className="font-body-sm text-[12px] text-on-surface-variant group-hover:text-red-400 transition-colors">
                                                    Sign Out
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 font-medium text-sm rounded-md transition-all duration-150 hover:bg-slate-800/50">
                                    Log In
                                </Link>
                                <Link href="/register" className="bg-primary-container text-on-primary-container px-4 py-2 font-medium text-sm rounded-md hover:bg-primary-container/90 transition-colors">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Nav Row — flat square tabs, full-height, bottom-border indicator */}
                <nav className="flex md:hidden items-stretch gap-0 px-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-webkit-overflow-scrolling:touch] w-full bg-transparent divide-x divide-purple-600/20">
                    <Link href="/" className={getLinkClasses("/")}>Blog ({blogCount})</Link>
                    <Link href="/ai-radar" className={getLinkClasses("/ai-radar")}>AI Radar</Link>
                    <Link href="/tools-db" className={getLinkClasses("/tools-db")}>Tools DB</Link>
                    <Link href="/playbooks" className={getLinkClasses("/playbooks")}>Playbooks</Link>
                    <Link href="/e-books" className={getLinkClasses("/e-books")}>E-Books</Link>
                    <Link href="/courses" className={getLinkClasses("/courses")}>Courses</Link>
                </nav>
            </div>
        </header>
    );
}