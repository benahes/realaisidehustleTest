"use client";

import { useEffect, useState } from "react";
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

function getCategoryIcon(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("WRITING")) return "chat_bubble";
  if (cat.includes("CODING")) return "psychology";
  if (cat.includes("VIDEO")) return "movie";
  if (cat.includes("IMAGE")) return "palette";
  if (cat.includes("AUDIO")) return "hearing";
  if (cat.includes("PRODUCTIVITY")) return "bolt";
  if (cat.includes("RESEARCH")) return "search_insights";
  return "build";
}

function getCategoryColor(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("WRITING")) return { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" };
  if (cat.includes("CODING")) return { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" };
  if (cat.includes("VIDEO")) return { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" };
  if (cat.includes("IMAGE")) return { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" };
  if (cat.includes("AUDIO")) return { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400" };
  if (cat.includes("PRODUCTIVITY")) return { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" };
  if (cat.includes("RESEARCH")) return { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400" };
  return { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" };
}

export default function ToolsDBClient() {
  const [tools, setTools] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?section=TOOLS_DB&limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTools(data.data.blogs);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5 pt-[10px] sm:pt-[15px]">
      <section className="w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 mt-2 sm:mt-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-48 bg-surface-container/30 border border-outline-variant/20 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : tools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 mt-2 sm:mt-4">
              {tools.map((tool) => {
                const colors = getCategoryColor(tool.category);
                const icon = getCategoryIcon(tool.category);
                return (
                  <Link href={`/blog/${tool.slug}`} key={tool.id} className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 ${colors.bg} rounded flex items-center justify-center border ${colors.border}`}>
                        <span className={`material-symbols-outlined ${colors.text} !text-[16px] sm:!text-[18px]`}>{icon}</span>
                      </div>
                      <span className="text-[11px] sm:text-[13px] font-bold text-primary bg-primary/5 px-1 sm:px-1.5 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">
                        {tool.category.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface leading-tight mb-1">{tool.title}</h3>
                      <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-tight">{tool.excerpt}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {tool.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2 sm:pt-2.5">
                      <a className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest" href="#">
                        <span className="material-symbols-outlined !text-[14px] sm:!text-[15px]">menu_book</span> TUTORIAL
                      </a>
                      <button className="text-on-surface-variant hover:text-primary">
                        <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">north_east</span>
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 sm:mt-8 flex justify-center">
              <button className="group flex items-center gap-2 border border-outline-variant/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-sm hover:bg-surface-container-high transition-all active:scale-95">
                <span className="text-[12px] sm:text-[14px] font-bold tracking-widest text-on-surface-variant uppercase">LOAD MORE</span>
                <span className="material-symbols-outlined text-primary group-hover:translate-y-0.5 transition-transform !text-[16px] sm:!text-[18px]">keyboard_double_arrow_down</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant text-sm border border-outline-variant/20 rounded-lg bg-surface-container">
            <span className="material-symbols-outlined text-4xl mb-2">build</span>
            <p>No tools in the database yet.</p>
            <p className="text-xs mt-1">Publish posts with the Tools DB section to see them here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
