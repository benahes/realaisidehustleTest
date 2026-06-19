"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const navSections = [
  {
    label: "Content",
    items: [
      { icon: "home", label: "Home", href: "/" },
      { icon: "radar", label: "AI Radar", href: "/ai-radar" },
      { icon: "construction", label: "Tools DB", href: "/tools-db" },
      { icon: "menu_book", label: "Playbooks", href: "/playbooks" },
      { icon: "auto_stories", label: "E-Books", href: "/e-books" },
      { icon: "school", label: "Courses", href: "/courses" },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: "account_circle", label: "Profile", href: "/profile" },
      { icon: "bookmark", label: "Saved", href: "/saved-articles" },
      {
        icon: "workspace_premium",
        label: "Certificates",
        href: "/certificates",
      },
      { icon: "settings", label: "Settings", href: "/settings" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: "notifications", label: "Notifications", href: "/notifications" },
      { icon: "help_outline", label: "Support", href: "/support" },
    ],
  },
];

export function RightSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
      router.refresh();
    } catch {
      // no-op
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-[72px] bottom-0 w-[220px] flex-col border-r border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-xl z-40 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
      <div className="p-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <h3 className="font-label-caps text-[9px] text-outline/50 uppercase tracking-widest mb-2 px-2">
              {section.label}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 group ${
                      active
                        ? "text-white bg-primary-container/15 border border-primary/20"
                        : "text-on-surface-variant/70 hover:text-white hover:bg-surface-variant/40 border border-transparent"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] transition-colors ${active ? "text-primary" : "text-outline group-hover:text-primary"}`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {active && (
                      <span className="ml-auto w-1 h-1 rounded-full bg-primary shrink-0"></span>
                    )}
                  </Link>
                );
              })}

              {section.label === "System" && user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 group text-red-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30"
                >
                  <span className="material-symbols-outlined text-[16px] text-red-400 group-hover:text-red-300">
                    logout
                  </span>
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom status */}
      <div className="mt-auto p-4 border-t border-outline-variant/10">
        <div className="flex items-center gap-2 px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="font-mono-data text-[9px] text-outline tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </aside>
  );
}
