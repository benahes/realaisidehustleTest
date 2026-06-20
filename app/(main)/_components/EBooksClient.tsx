"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

export default function EBooksClient() {
  const [books, setBooks] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBooks(data.data.blogs);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5">
      {/* Digital Library Section */}
      <section className="space-y-2 sm:space-y-4">
        <div className="flex items-end justify-between border-b border-outline-variant/40 pb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 h-6 bg-primary-container rounded-sm"></div>
            <h2 className="font-h1 text-[18px] sm:text-[24px] uppercase tracking-tight text-white">Digital Library</h2>
            <span className="font-mono-data text-primary px-1 sm:px-2 py-0.5 bg-primary-container/10 border border-primary-container/20 rounded-md text-[11px] sm:text-[13px] ml-2">LATEST</span>
          </div>
          <button className="font-label-caps text-primary hover:underline text-[13px] sm:text-[15px] font-bold">BROWSE ALL</button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="aspect-[3/4] bg-surface-container rounded-md animate-pulse" />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {books.slice(0, 6).map((book) => {
              const isFree = book.category.toUpperCase().includes("FREE");
              return (
                <Link href={`/blog/${book.slug}`} key={book.id} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-container rounded-md border border-outline-variant/30 group-hover:border-primary/60 transition-colors shadow-sm">
                    <Image
                      fill
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                      src={book.coverImage || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PC9zdmc+"}
                      alt={book.title}
                      unoptimized
                    />
                    <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2">
                      <span className={`font-mono-data text-[11px] sm:text-[13px] px-1 sm:px-2 py-0.5 rounded-sm shadow-sm ${isFree ? "bg-slate-800 text-slate-300 border border-slate-700" : "bg-primary-container text-white"}`}>
                        {isFree ? "FREE" : "PREMIUM"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-2.5 flex flex-col gap-1 sm:gap-1.5">
                    <p className="font-label-caps text-slate-500 text-[11px] sm:text-[13px]">{book.category.toUpperCase()}</p>
                    <h3 className="font-body-sm text-[14px] sm:text-[16px] text-slate-200 leading-tight group-hover:text-primary transition-colors font-medium">{book.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant text-sm border border-outline-variant/40 rounded bg-surface-container">
            <span className="material-symbols-outlined text-4xl mb-2">auto_stories</span>
            <p>No e-books available yet.</p>
            <p className="text-xs mt-1">Publish posts to populate the digital library.</p>
          </div>
        )}
      </section>

      {/* Video Courses Section */}
      <section className="space-y-2 sm:space-y-4 mt-4 sm:mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-outline-variant/40 pb-2 gap-1.5 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 h-6 bg-primary-container rounded-sm"></div>
            <h2 className="font-h1 text-[18px] sm:text-[24px] uppercase tracking-tight text-white">Video Courses</h2>
            <span className="font-mono-data text-primary px-1 sm:px-2 py-0.5 bg-primary-container/10 border border-primary-container/20 rounded-md text-[11px] sm:text-[13px] ml-2">MY LEARNING</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container px-2 py-1 rounded transition-colors">
            <span className="font-mono-data text-slate-400 text-[13px] sm:text-[15px]">FILTER: DIFFICULTY</span>
            <span className="material-symbols-outlined text-slate-400 text-[16px] sm:text-[18px]">expand_more</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-surface-container border border-outline-variant/30 rounded-md animate-pulse" />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {books.slice(0, 3).map((course, idx) => {
              const progress = idx === 0 ? 65 : idx === 1 ? 100 : 0;
              const status = idx === 0 ? "65% DONE" : idx === 1 ? "COMPLETED" : "NOT STARTED";
              const statusColor = idx === 0
                ? "bg-primary-container text-white"
                : idx === 1
                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm"
                : "bg-slate-800/80 text-slate-300 border border-slate-600/50 backdrop-blur-sm";
              return (
                <Link href={`/blog/${course.slug}`} key={course.id} className="bg-surface-container border border-outline-variant/30 rounded-md overflow-hidden group hover:border-primary/50 transition-colors shadow-sm cursor-pointer flex flex-col">
                  <div className="h-32 sm:h-40 relative">
                    <Image fill className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" src={course.coverImage || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PC9zdmc+"} alt={course.title} unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <span className={`${statusColor} px-1 sm:px-2 py-0.5 text-[11px] sm:text-[13px] font-mono-data uppercase rounded-sm shadow-sm`}>{status}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-sm">
                      <button className="bg-white text-slate-900 rounded-full p-2 sm:p-2.5 shadow-xl hover:scale-110 transition-transform flex items-center justify-center">
                        <span className="material-symbols-outlined fill-1 text-[20px] sm:text-[24px] ml-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>play_arrow</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 flex-grow">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-label-caps text-primary text-[11px] sm:text-[13px] font-bold">{course.category.toUpperCase()}</p>
                        <p className="font-mono-data text-slate-500 text-[11px] sm:text-[13px]">{course.tags.slice(0, 2).join(", ").toUpperCase()}</p>
                      </div>
                      <h3 className="font-h2 text-[15px] sm:text-[18px] uppercase text-white leading-tight">{course.title}</h3>
                    </div>
                    <div className="mt-auto flex flex-col gap-1.5 sm:gap-2">
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${progress === 100 ? "bg-emerald-500 w-full" : "bg-primary-container"}`} style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="font-mono-data text-slate-400 text-[11px] sm:text-[13px]">{progress === 100 ? "CERTIFICATE ISSUED" : `${progress}/100 LESSONS`}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant text-sm border border-outline-variant/40 rounded bg-surface-container">
            <span className="material-symbols-outlined text-4xl mb-2">smart_display</span>
            <p>No video courses yet.</p>
          </div>
        )}
      </section>

      {/* Updates Section — static UI element, no data needed */}
      <section className="glass-panel p-2 sm:p-5 rounded-md mt-3 sm:mt-6 border border-outline-variant/20 shadow-sm">
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <span className="material-symbols-outlined text-primary text-[20px] sm:text-[24px]">analytics</span>
          <h3 className="font-label-caps text-slate-300 text-[14px] sm:text-[16px] font-bold tracking-widest">LATEST UPDATES</h3>
        </div>
        <div className="divide-y divide-outline-variant/20 flex flex-col">
          <div className="zebra-row grid grid-cols-4 py-2 sm:py-3.5 px-2 sm:px-4 items-center hover:bg-slate-800/30 transition-colors rounded-sm cursor-pointer group">
            <span className="font-mono-data text-primary text-[12px] sm:text-[14px]">{new Date().toISOString().slice(0, 10).replace(/-/g, ".")}</span>
            <span className="font-label-caps col-span-2 text-[12px] sm:text-[14px] text-slate-200 group-hover:text-white transition-colors">PLATFORM LIVE WITH REAL DATA</span>
            <div className="flex justify-end">
              <span className="w-2.5 h-2.5 bg-primary-container rounded-full shadow-[0_0_8px_rgba(157,78,221,0.6)]"></span>
            </div>
          </div>
          <div className="zebra-row grid grid-cols-4 py-2 sm:py-3.5 px-2 sm:px-4 items-center hover:bg-slate-800/30 transition-colors rounded-sm cursor-pointer group">
            <span className="font-mono-data text-primary text-[12px] sm:text-[14px]">{new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10).replace(/-/g, ".")}</span>
            <span className="font-label-caps col-span-2 text-[12px] sm:text-[14px] text-slate-200 group-hover:text-white transition-colors">CONTENT HUB ADMIN PANEL DEPLOYED</span>
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-400 transition-colors text-[16px] sm:text-[18px]">check_circle</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
