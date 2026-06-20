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

function getDifficultyClass(category: string) {
  const cat = category.toUpperCase();
  if (cat.includes("BEGINNER")) return "difficulty-beginner";
  if (cat.includes("INTERMEDIATE")) return "difficulty-intermediate";
  if (cat.includes("ADVANCED")) return "difficulty-advanced";
  return "difficulty-intermediate";
}

export default function PlaybooksClient() {
  const [playbooks, setPlaybooks] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?section=PLAYBOOKS&limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPlaybooks(data.data.blogs);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-margin-edge flex flex-col pb-5 pt-[10px] sm:pt-[15px]">
      <div className="grid grid-cols-12 gap-gutter">
        {/* Main Content Area */}
        <section className="col-span-12 lg:col-span-8 space-y-gutter">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1.5 sm:gap-0">
            <h1 className="font-h1 text-[18px] sm:text-[24px] text-on-surface uppercase tracking-tighter">Structured Workflows</h1>
            <span className="font-mono-data text-primary text-[13px] sm:text-[16px] px-1.5 py-0.5 border border-primary/20 rounded bg-primary/5">
              {playbooks.length} ACTIVE PLAYBOOKS
            </span>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2].map((n) => (
                <div key={n} className="h-40 bg-surface-container border border-outline-variant rounded animate-pulse" />
              ))}
            </div>
          ) : playbooks.length > 0 ? (
            playbooks.map((pb) => (
              <Link href={`/blog/${pb.slug}`} key={pb.id} className="bg-surface-container border border-outline-variant rounded overflow-hidden flex flex-col md:flex-row h-auto">
                <div className="md:w-1/4 relative h-32 md:h-auto">
                  <Image className="absolute inset-0 w-full h-full object-cover" alt={pb.title} fill src={pb.coverImage || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PC9zdmc+"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent md:bg-gradient-to-r"></div>
                  <div className="absolute bottom-2 left-2">
                    <span className={`${getDifficultyClass(pb.category)} px-1.5 py-0.5 rounded-sm text-[13px] sm:text-[16px] font-label-caps uppercase tracking-widest`}>
                      {pb.category}
                    </span>
                  </div>
                </div>
                <div className="md:w-3/4 p-2 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-1 h-1 rounded-full bg-primary"></span>
                      <h2 className="font-h2 text-[15px] sm:text-[18px] uppercase">{pb.title}</h2>
                    </div>
                    <p className="text-on-surface-variant text-[12px] sm:text-[14px] line-clamp-1">{pb.excerpt}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-0.5">
                        <span className="text-label-caps text-outline uppercase block">Focus</span>
                        <span className="text-[12px] sm:text-[13px] italic">{pb.category}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-label-caps text-outline uppercase block">Tags</span>
                        <div className="flex gap-1 flex-wrap">
                          {pb.tags.slice(0, 2).map((t) => (
                            <span key={t} className="bg-surface-container-high px-1 py-0.5 rounded text-[13px] sm:text-[15px] font-mono-data">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-outline-variant/30">
                    <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary-container flex items-center justify-center border border-surface">
                        <span className="material-symbols-outlined text-[13px] text-white">check</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center border border-surface">
                        <span className="material-symbols-outlined text-[13px] text-white">download</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-primary hover:gap-1.5 transition-all">
                      <span className="text-[13px] sm:text-[15px] font-label-caps uppercase">View Steps</span>
                      <span className="material-symbols-outlined text-[13px] sm:text-[15px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant text-sm border border-outline-variant rounded bg-surface-container">
              <span className="material-symbols-outlined text-4xl mb-2">menu_book</span>
              <p>No playbooks yet.</p>
              <p className="text-xs mt-1">Publish posts with the Playbooks section to see them here.</p>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-gutter">
          <div className="bg-surface-container-high border border-outline-variant rounded p-2">
            <h3 className="text-[13px] sm:text-[15px] font-label-caps text-outline uppercase mb-2">Precision Mastery Path</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[16px]">analytics</span>
                </div>
                <div>
                  <div className="text-[14px] sm:text-[16px] font-bold leading-none">Workflow Analytics</div>
                  <div className="text-[12px] sm:text-[13px] text-on-surface-variant">Track execution speed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">layers</span>
                </div>
                <div>
                  <div className="text-[14px] sm:text-[16px] font-bold leading-none">Template Vault</div>
                  <div className="text-[12px] sm:text-[13px] text-on-surface-variant">{playbooks.length} structures</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-primary/20 rounded p-2 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-[13px] sm:text-sm font-h2 text-primary uppercase mb-1">Micro-SaaS Blueprint</h3>
              <p className="text-[12px] sm:text-[13px] text-on-surface-variant mb-2 leading-tight">Advanced architecture for technical founders using Claude 3.5.</p>
              <span className="difficulty-advanced px-1 py-0.5 rounded-sm text-[13px] sm:text-[16px] font-label-caps uppercase mb-2 inline-block">Elite Tier</span>
              <button className="w-full bg-primary text-on-primary py-1 rounded text-[12px] sm:text-[13px] font-label-caps uppercase hover:brightness-110 transition-all">Unlock Workflow</button>
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-5">
              <span className="material-symbols-outlined !text-[60px]">precision_manufacturing</span>
            </div>
          </div>

          {/* Steps Quickview */}
          <div className="bg-surface-container border border-outline-variant rounded">
            <div className="p-2 border-b border-outline-variant/30">
              <span className="text-[13px] sm:text-[15px] font-label-caps text-outline uppercase">Next Steps</span>
            </div>
            <div className="divide-y divide-outline-variant/20">
              <div className="p-1.5 zebra-row flex items-center gap-2">
                <span className="font-mono-data text-primary text-[13px]">01</span>
                <span className="text-[12px] sm:text-[13px] uppercase font-medium">Define Niche Market</span>
                <span className="material-symbols-outlined text-[13px] sm:text-[15px] ml-auto text-outline">lock</span>
              </div>
              <div className="p-1.5 zebra-row flex items-center gap-2">
                <span className="font-mono-data text-primary text-[13px]">02</span>
                <span className="text-[12px] sm:text-[13px] uppercase font-medium">Scrape Leads</span>
                <span className="material-symbols-outlined text-[13px] sm:text-[15px] ml-auto text-outline">lock</span>
              </div>
              <div className="p-1.5 zebra-row flex items-center gap-2">
                <span className="font-mono-data text-primary text-[13px]">03</span>
                <span className="text-[12px] sm:text-[13px] uppercase font-medium">Automate Flow</span>
                <span className="material-symbols-outlined text-[13px] sm:text-[15px] ml-auto text-outline">lock</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Technical Cards Grid */}
      <section className="mt-5">
        <h2 className="text-[13px] sm:text-[15px] font-label-caps text-outline uppercase mb-2">Technical Architectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {playbooks.length > 0 ? (
            playbooks.slice(0, 3).map((pb) => (
              <Link href={`/blog/${pb.slug}`} key={pb.id} className="bg-surface-container-low border border-outline-variant p-2 flex flex-col gap-2 hover:border-primary/50 transition-colors group">
                <div className="flex justify-between items-start">
                  <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px]">menu_book</span>
                  </div>
                  <span className="font-mono-data text-[13px] sm:text-[15px] text-outline">{pb.category}</span>
                </div>
                <div>
                  <h4 className="text-[14px] sm:text-[16px] font-h2 uppercase group-hover:text-primary transition-colors">{pb.title}</h4>
                  <p className="text-[12px] sm:text-[13px] text-on-surface-variant leading-tight">{pb.excerpt.slice(0, 60)}...</p>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {pb.tags.slice(0, 2).map((t) => (
                    <span key={t} className="bg-surface-container-highest px-1 py-0.5 rounded text-[13px] sm:text-[16px] font-mono-data text-outline">{t.toUpperCase()}</span>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-8 text-on-surface-variant text-sm">
              No technical architectures yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
