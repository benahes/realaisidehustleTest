"use client";

import { useEffect, useState } from "react";

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
  author: { name: string | null; email: string; avatarUrl: string | null; } | null;
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
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function SavedArticlesClient() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((res) => {
        if (!res.ok) throw new Error("No bookmarks API");
        return res.json();
      })
      .then((data) => { if (data.success) setArticles(data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 pt-[10px] sm:pt-[15px]">
      <div className="flex items-center justify-between mb-2 sm:mb-5">
        <div>
          <h1 className="font-h1 text-lg sm:text-[24px] text-on-surface uppercase flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 h-5 sm:h-7 bg-primary"></span>Saved Library
          </h1>
          <p className="text-xs sm:text-[13px] text-outline mt-0.5 sm:mt-1 uppercase tracking-widest">{articles.length} Entries Synchronized</p>
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <button className="bg-surface-container-high border border-outline-variant px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 hover:bg-surface-variant transition-colors rounded-sm">
            <span className="material-symbols-outlined text-sm sm:text-[18px]">filter_list</span>
            <span className="font-label-caps text-xs sm:text-[13px] uppercase hidden sm:inline">Filter</span>
          </button>
          <button className="bg-surface-container-high border border-outline-variant px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 hover:bg-surface-variant transition-colors rounded-sm">
            <span className="material-symbols-outlined text-sm sm:text-[18px]">sort</span>
            <span className="font-label-caps text-xs sm:text-[13px] uppercase hidden sm:inline">Sort</span>
          </button>
        </div>
      </div>

      <div className="sticky top-[52px] z-40 bg-background/80 backdrop-blur-md py-2 sm:py-3 mb-2 sm:mb-5 border-b border-outline-variant/30 flex gap-1.5 sm:gap-2 overflow-x-auto">
        <button className="bg-primary text-on-primary font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase whitespace-nowrap">All Archives</button>
        <button className="bg-secondary-container text-on-secondary-container font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase hover:bg-surface-variant transition-all whitespace-nowrap">Analysis</button>
        <button className="bg-secondary-container text-on-secondary-container font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase hover:bg-surface-variant transition-all whitespace-nowrap">Radars</button>
        <button className="bg-secondary-container text-on-secondary-container font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase hover:bg-surface-variant transition-all whitespace-nowrap">Technical</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-gutter">
          {[1,2,3,4].map(n => <div key={n} className="h-64 bg-surface-container border border-outline-variant animate-pulse" />)}
        </div>
      ) : articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-gutter">
            {articles.map((article) => (
              <article key={article.id} className="bg-surface-container border border-outline-variant flex flex-col group hover:border-primary/50 transition-all rounded-sm">
                <div className="relative h-28 sm:h-36 overflow-hidden border-b border-outline-variant">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" src={article.coverImage || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PC9zdmc+"} alt={article.title} />
                  <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-slate-950/80 px-1.5 sm:px-2 py-0.5 backdrop-blur-sm border border-white/10">
                    <span className="font-mono-data text-xs sm:text-[13px] text-white">{article.id.slice(0,4)}</span>
                  </div>
                </div>
                <div className="p-2.5 sm:p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                    <span className="font-label-caps text-xs sm:text-[13px] text-primary uppercase">{article.section} / {article.category}</span>
                  </div>
                  <h3 className="font-h2 text-sm sm:text-[18px] text-on-surface mb-2 sm:mb-3 leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                  <div className="mt-auto pt-2.5 sm:pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                    <span className="font-mono-data text-xs sm:text-[13px] text-outline uppercase">{timeAgo(article.createdAt)}</span>
                    <button className="p-1.5 sm:p-2 border border-outline-variant hover:bg-error-container hover:text-on-error-container hover:border-error transition-all">
                      <span style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }} className="material-symbols-outlined text-base sm:text-[20px]">bookmark_remove</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-outline-variant pt-3 sm:pt-5 gap-2 sm:gap-4">
            <span className="font-mono-data text-xs sm:text-[14px] text-outline uppercase">Showing {articles.length} saved entries</span>
            <div className="flex gap-1">
              <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-primary text-primary font-mono-data text-xs sm:text-[14px]">1</button>
              <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-outline-variant text-on-surface font-mono-data text-xs sm:text-[14px] hover:bg-surface-variant transition-colors">2</button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant text-sm border border-outline-variant rounded bg-surface-container">
          <span className="material-symbols-outlined text-4xl mb-2">bookmark_border</span>
          <p>No saved articles yet.</p>
          <p className="text-xs mt-1">Bookmark posts from any section to see them here.</p>
        </div>
      )}
    </main>
  );
}
