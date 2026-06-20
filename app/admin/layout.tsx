"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const mainNavItems = [
  { label: "Overview", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Content Hub", href: "/admin/blog", icon: "inventory_2" },
  { label: "Marketplace", href: "/admin/marketplace", icon: "shopping_cart" },
  { label: "Media & Storage", href: "/admin/upload", icon: "perm_media" },
  { label: "Monetization", href: "/admin/monetization", icon: "payments" },
  { label: "Security", href: "/admin/security", icon: "security" },
];

const bottomNavItems = [
  { label: "Documentation", href: "/admin/docs", icon: "description" },
  { label: "System Logs", href: "/admin/logs", icon: "terminal" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const isLoginPage = pathname?.replace(/\/$/, "") === "/admin/login";

  // Login page gets a clean centered layout without sidebar/header
  if (isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-surface font-body-sm">
        {children}
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === href || pathname === "/admin";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen flex bg-background text-on-surface font-body-sm overflow-x-hidden selection:bg-primary-container selection:text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 z-[60] bg-surface-container-lowest border-r border-outline-variant flex flex-col h-full py-4 custom-scrollbar overflow-y-auto">
        <div className="px-margin-edge mb-3">
          <h1 className="font-h1 text-xl text-primary tracking-tight leading-tight">
            Synthetic Index
          </h1>
          <p className="font-body-xs text-on-surface-variant opacity-70 leading-none">
            Admin Terminal
          </p>
        </div>
        <nav className="flex-1 px-stack-mid space-y-1">
          {mainNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md group cursor-pointer transition-all duration-150 ${
                  active
                    ? "bg-primary-container text-on-primary-container border-l-2 border-primary font-body-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-body-sm"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  data-icon={item.icon}
                >
                  {item.icon}
                </span>
                <span className="font-body-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-3 border-t border-outline-variant px-stack-mid space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low cursor-pointer transition-all duration-150"
            >
              <span className="material-symbols-outlined text-[18px]" data-icon={item.icon}>
                {item.icon}
              </span>
              <span className="font-body-sm">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={async () => {
              try {
                await signOut();
                router.push("/admin/login");
                router.refresh();
              } catch {
                // no-op
              }
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-error hover:text-error hover:bg-error/10 cursor-pointer transition-all duration-150 w-full text-left"
          >
            <span className="material-symbols-outlined text-[18px]" data-icon="logout">
              logout
            </span>
            <span className="font-body-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* TopAppBar */}
      <header className="fixed top-0 right-0 left-64 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center h-14 px-margin-edge">
        <div className="flex items-center gap-stack-loose flex-1 max-w-xl">
          <div className="relative w-full">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
              data-icon="search"
            >
              search
            </span>
            <input
              className="bg-surface-container-low border-b border-outline hover:border-primary focus:border-primary-container focus:ring-0 w-full pl-10 pr-4 py-1.5 font-body-sm transition-all duration-300 placeholder:text-on-surface-variant/40"
              placeholder="Search system entities..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="material-symbols-outlined text-on-surface-variant hover:bg-surface-variant p-2 rounded transition-colors cursor-pointer"
            data-icon="sensors"
          >
            sensors
          </button>
          <button
            className="material-symbols-outlined text-on-surface-variant hover:bg-surface-variant p-2 rounded transition-colors cursor-pointer relative"
            data-icon="notifications"
          >
            notifications
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-container rounded-full"></span>
          </button>
          <button
            className="material-symbols-outlined text-on-surface-variant hover:bg-surface-variant p-2 rounded transition-colors cursor-pointer"
            data-icon="settings"
          >
            settings
          </button>
          <div className="h-8 w-8 rounded-full bg-secondary-container border border-outline-variant overflow-hidden">
            <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-on-secondary-container text-[18px]">
              person
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-[66px] p-margin-edge min-h-screen bg-surface w-full">
        {children}
      </main>
    </div>
  );
}
