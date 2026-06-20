"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

function LogoutButton() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-all duration-150 text-left"
    >
      <span className="material-symbols-outlined" data-icon="logout">
        logout
      </span>
      <span className="font-body-sm">{loggingOut ? "Logging out..." : "Logout"}</span>
    </button>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        const role = data?.data?.user?.role;
        if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
          router.replace("/admin/login");
          return;
        }
        setCheckingAccess(false);
      } catch {
        router.replace("/admin/login");
      }
    };

    checkAccess();
  }, [router]);

  const isLoginPage = pathname?.replace(/\/$/, "") === "/admin/login";

  if (checkingAccess && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-body-sm">
        Checking access...
      </div>
    );
  }

  // Login page gets a clean centered layout without sidebar/header
  if (isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-body-sm">
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
    <div className="min-h-screen flex bg-gray-50 text-gray-900 font-body-sm overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 z-[60] bg-white border-r border-gray-200 flex flex-col h-full py-stack-loose custom-scrollbar overflow-y-auto">
        <div className="px-margin-edge mb-stack-loose">
          <h1 className="font-h1 text-h1 text-gray-900 tracking-tight">
            Synthetic Index
          </h1>
          <p className="font-body-xs text-gray-500 opacity-70">
            Admin Terminal
          </p>
        </div>
        <nav className="flex-1 px-stack-mid space-y-unit">
          {mainNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 group cursor-pointer transition-all duration-150 rounded-md ${
                  active
                    ? "bg-purple-100 text-purple-900 border-l-2 border-purple-600 font-body-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-body-sm"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  data-icon={item.icon}
                >
                  {item.icon}
                </span>
                <span className="font-body-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-stack-loose border-t border-gray-200 px-stack-mid space-y-unit">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition-all duration-150 rounded-md"
            >
              <span className="material-symbols-outlined" data-icon={item.icon}>
                {item.icon}
              </span>
              <span className="font-body-sm">{item.label}</span>
            </Link>
          ))}
          <LogoutButton />
        </div>
      </aside>

      {/* TopAppBar */}
      <header className="fixed top-0 right-0 left-64 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 flex justify-between items-center h-14 px-margin-edge">
        <div className="flex items-center gap-stack-loose flex-1 max-w-xl">
          <div className="relative w-full">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]"
              data-icon="search"
            >
              search
            </span>
            <input
              className="bg-gray-100 border-b border-gray-300 hover:border-gray-400 focus:border-purple-600 focus:ring-0 w-full pl-10 pr-4 py-1.5 font-body-sm transition-all duration-300 placeholder:text-gray-400"
              placeholder="Search system entities..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="material-symbols-outlined text-gray-500 hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer"
            data-icon="sensors"
          >
            sensors
          </button>
          <button
            className="material-symbols-outlined text-gray-500 hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer relative"
            data-icon="notifications"
          >
            notifications
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
          </button>
          <button
            className="material-symbols-outlined text-gray-500 hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer"
            data-icon="settings"
          >
            settings
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
            <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-gray-600 text-[18px]">
              person
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-[66px] p-margin-edge min-h-screen bg-gray-50 w-full">
        {children}
      </main>
    </div>
  );
}
