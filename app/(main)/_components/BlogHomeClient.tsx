"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, TrendingUp, LayoutGrid, List, Star, ArrowRight } from "lucide-react";

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

function getInitials(name: string | null, email: string) {
  if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return email.slice(0, 2).toUpperCase();
}

function getDisplayName(name: string | null, email: string) {
  if (name) return name;
  const [local] = email.split("@");
  return local.toUpperCase();
}

export default function BlogHomeClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPosts(data.data.blogs);
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const trending = posts.slice(1, 4);
  const latest = posts.slice(1, 4);
  const editorsPicks = posts.slice(4, 7);

  return (
    <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5">
      {/* Featured & Trending Section */}
      <div className="grid grid-cols-12 gap-gutter">
        {loading ? (
          <section className="col-span-12 lg:col-span-8 bg-surface-container border border-outline-variant/30 rounded min-h-[200px] sm:min-h-[350px] animate-pulse" />
        ) : featured ? (
          <section className="col-span-12 lg:col-span-8 group relative overflow-hidden bg-surface-container border border-outline-variant/30 rounded cursor-pointer min-h-[200px] sm:min-h-[350px] shadow-lg">
            <Image fill alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={featured.coverImage || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PC9zdmc+"} referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end w-full lg:w-3/4 z-20">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="bg-primary-container px-2 py-0.5 text-white font-label-caps text-[16px] rounded-sm">FEATURED</span>
                <span className="text-outline font-mono-data text-[15px]">{timeAgo(featured.createdAt)}</span>
              </div>
              <h1 className="font-h1 text-lg sm:text-2xl text-white mb-2 leading-tight group-hover:text-primary transition-colors">{featured.title}</h1>
              <p className="font-body-sm text-on-surface-variant line-clamp-2 max-w-xl text-xs sm:text-sm">{featured.excerpt}</p>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-primary text-[18px]">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </section>
        ) : (
          <section className="col-span-12 lg:col-span-8 flex items-center justify-center bg-surface-container border border-outline-variant/30 rounded min-h-[200px] sm:min-h-[350px]">
            <p className="text-on-surface-variant text-sm">No featured posts yet.</p>
          </section>
        )}

        {/* Trending Sidebar */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col border border-outline-variant/30 rounded bg-surface-container overflow-hidden">
          <div className="px-3 py-1 sm:py-2 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high">
            <span className="font-h2 text-[15px] text-primary flex items-center gap-1.5 uppercase tracking-wide">
              <TrendingUp className="w-4 h-4" /> Trending
            </span>
            <span className="text-outline font-mono-data text-[15px]">REAL-TIME</span>
          </div>
          <div className="flex flex-col">
            {loading ? (
              <div className="p-4 space-y-2">
                {[1,2,3].map(n => <div key={n} className="h-12 bg-surface-container-high rounded animate-pulse" />)}
              </div>
            ) : trending.length > 0 ? (
              trending.map((post, i) => (
                <div key={post.id} className="zebra-row px-2 py-1 sm:px-3 sm:py-3 border-b border-outline-variant/10 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                  <div className="flex gap-2 sm:gap-3">
                    <span className="font-mono-data text-base sm:text-lg text-outline/30 group-hover:text-primary/50 transition-colors">0{i + 1}</span>
                    <div>
                      <h3 className="font-body-sm font-bold text-white group-hover:text-primary transition-colors text-sm sm:text-base mb-0 sm:mb-1">{post.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">{post.category}</span>
                        <span className="w-1 h-1 bg-outline/40 rounded-full" />
                        <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">{timeAgo(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-on-surface-variant text-sm">No trending posts yet.</div>
            )}
          </div>
          <div className="mt-auto py-1.5 sm:py-2.5 text-center border-t border-outline-variant/20 hover:bg-slate-800/20 cursor-pointer transition-colors">
            <button className="text-xs sm:text-sm font-label-caps text-primary cursor-pointer w-full tracking-wider">VIEW FULL LEADERBOARD</button>
          </div>
        </aside>
      </div>

      {/* Latest Posts Grid */}
      <section className="mt-stack-mid">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-h2 text-base sm:text-lg text-white uppercase tracking-tight">Latest Feed</h2>
          <div className="flex gap-1.5">
            <button aria-label="Grid View" className="p-0.5 hover:bg-surface-container-high rounded transition-colors cursor-pointer text-[15px]">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button aria-label="List View" className="p-0.5 hover:bg-surface-container-high rounded transition-colors cursor-pointer text-[15px]">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {loading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col bg-surface-container border border-outline-variant/20 rounded animate-pulse">
                <div className="h-28 sm:aspect-video sm:h-auto w-full bg-surface-container-high" />
                <div className="p-2 sm:p-4 flex-grow flex flex-col gap-2">
                  <div className="h-4 bg-surface-container-high rounded w-3/4" />
                  <div className="h-3 bg-surface-container-high rounded w-full" />
                  <div className="h-3 bg-surface-container-high rounded w-2/3" />
                </div>
              </div>
            ))
          ) : latest.length > 0 ? (
            latest.map((post) => (
              <div key={post.id} className="flex flex-col bg-surface-container border border-outline-variant/20 rounded hover:border-primary/50 transition-all group cursor-pointer">
                <div className="h-28 sm:aspect-video sm:h-auto w-full overflow-hidden relative">
                  <Image fill alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={post.coverImage || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PC9zdmc+"} referrerPolicy="no-referrer" />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-1.5 py-0.5 rounded-sm">
                    <span className="text-xs sm:text-sm font-label-caps text-primary uppercase">{post.category}</span>
                  </div>
                </div>
                <div className="p-2 sm:p-4 flex-grow flex flex-col">
                  <h3 className="font-h2 text-sm sm:text-base text-white group-hover:text-primary transition-colors line-clamp-2 mb-1 uppercase tracking-tight">{post.title}</h3>
                  <p className="font-body-xs text-on-surface-variant line-clamp-2 mb-2 sm:mb-3 text-xs sm:text-sm">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-outline-variant/10">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-mono-data text-primary">{getInitials(post.author?.name || null, post.author?.email || "AU")}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-mono-data text-outline">{getDisplayName(post.author?.name || null, post.author?.email || "AUTHOR")}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono-data text-outline">{timeAgo(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12 text-on-surface-variant text-sm">
              No posts yet. Publish your first post from the admin dashboard.
            </div>
          )}
        </div>
      </section>

      {/* Editor's Selection */}
      <section className="mt-stack-mid p-2 sm:p-4 border border-primary/20 bg-primary-container/5 rounded">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 fill-primary text-primary" />
          <h2 className="font-h2 text-base sm:text-lg text-white uppercase tracking-tight">Editor&apos;s Selection</h2>
          <span className="bg-primary px-1.5 py-0.5 text-on-primary font-label-caps text-xs sm:text-sm rounded-full">AI CURATED</span>
        </div>
        {loading ? (
          <div className="space-y-2">
            {[1,2,3].map(n => <div key={n} className="h-10 bg-surface-container-high rounded animate-pulse" />)}
          </div>
        ) : editorsPicks.length > 0 ? (
          <div className="flex flex-col gap-1">
            {editorsPicks.map((post, i) => (
              <div key={post.id} className="zebra-row flex items-center justify-between p-1.5 sm:p-2 rounded group cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${i < 2 ? "bg-primary" : "bg-outline/20"}`} />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="font-body-sm font-bold text-white group-hover:text-primary text-sm sm:text-base transition-colors truncate">{post.title}</h4>
                      {i < 2 && <span className="bg-primary/20 text-primary px-1 py-0.5 rounded-[2px] text-xs sm:text-sm font-bold uppercase tracking-widest hidden sm:inline-block shrink-0">NEW</span>}
                    </div>
                    <span className="text-xs sm:text-sm text-outline uppercase tracking-wider">{timeAgo(post.createdAt)} &bull; BY {getDisplayName(post.author?.name || null, post.author?.email || "AUTHOR")}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-stack-loose shrink-0">
                  <span className="text-outline group-hover:text-primary transition-colors text-xs sm:text-sm ml-2"><ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-on-surface-variant text-sm py-4">No editor&apos;s picks yet.</p>
        )}
      </section>
    </main>
  );
}
