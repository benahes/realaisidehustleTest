"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getSubNavSection } from "@/lib/navigation";

function buildHref(
  base: string,
  query?: Record<string, string>
): string {
  if (!query || Object.keys(query).length === 0) return base;
  const params = new URLSearchParams(query);
  return `${base}?${params.toString()}`;
}

export function SubNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const section = getSubNavSection(pathname ?? "/");

  // Hide SubNav when there are no tabs defined for the current section
  if (!section.tabs.length) return null;

  const currentQuery = searchParams?.toString() ?? "";

  const isActive = (tabHref: string, tabQuery?: Record<string, string>) => {
    // Exact path match for root tabs
    if (tabHref === "/" && pathname === "/") {
      // On home, check query params if any
      if (!tabQuery) return currentQuery === "";
      const expected = new URLSearchParams(tabQuery).toString();
      return currentQuery === expected;
    }

    // For non-root tabs, first check path starts with tabHref
    if (!pathname?.startsWith(tabHref)) return false;

    // If tab has query params, they must all match current search params
    if (tabQuery) {
      const expected = new URLSearchParams(tabQuery);
      for (const [key, value] of expected.entries()) {
        if (searchParams?.get(key) !== value) return false;
      }
      // Also ensure no extra expected params are missing
      return true;
    }

    // Tab with no query params: active when path matches AND no conflicting query params
    // (i.e., the "all" tab is active when no filter query is present)
    if (tabHref !== "/") {
      const hasFilter = searchParams?.toString().length > 0;
      return !hasFilter;
    }

    return false;
  };

  const resourceText = section.resourceCount
    ? `${section.resourceCount} ${section.resourceLabel ?? "RESOURCES"}`
    : section.resourceLabel ?? "";

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-edge pt-0">
      {/* Desktop: single-row sticky with horizontal scroll */}
      <div className="hidden sm:flex relative sm:sticky top-0 sm:top-[72px] z-30 py-1.5 glass-panel -mx-margin-edge px-margin-edge border-y border-outline-variant/20 mb-[15px] overflow-x-auto custom-scrollbar items-center justify-between bg-transparent">
        <div className="flex items-center gap-3">
          {section.tabs.map((tab) => {
            const active = isActive(tab.href, tab.query);
            const href = buildHref(tab.href, tab.query);
            return (
              <Link
                key={tab.label}
                href={href}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border ${active
                  ? "bg-purple-900/40 text-purple-200 border-purple-500/30 shadow-inner"
                  : "bg-secondary-container/30 text-slate-400 border-transparent hover:bg-secondary-container/50 hover:text-slate-200"
                  }`}
              >
                {active && (
                  <span className="w-1.5 h-1.5 bg-purple-300 rounded-full"></span>
                )}
                {tab.label}
              </Link>
            );
          })}
        </div>
        {resourceText && (
          <div className="flex items-center gap-3 font-mono-data text-slate-500 text-sm shrink-0 ml-4">
            <span>{resourceText}</span>
            <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-white">
              filter_list
            </span>
          </div>
        )}
      </div>

      {/* Mobile: single-row scrollable, light background */}
      <div className="flex sm:hidden -mx-margin-edge px-0 border-b border-outline-variant/20 bg-slate-800/40 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] mb-[10px]">
        <div className="flex items-center shrink-0 w-max divide-x divide-slate-700/50">
          {section.tabs.map((tab) => {
            const active = isActive(tab.href, tab.query);
            const href = buildHref(tab.href, tab.query);
            return (
              <Link
                key={tab.label}
                href={href}
                className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${active
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
                  }`}
              >
                {active && (
                  <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                )}
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
