"use client";

import { useEffect, useState } from "react";

interface CertificateItem {
  id: string;
  title: string;
  image: string;
  tag: string;
  tagColor: string;
  issued: string;
  level: string;
  desc: string;
}

interface RegistryRow {
  spec: string;
  issueDate: string;
  validUntil: string;
  score: string;
  credentialId: string;
  bgClass: string;
}

export default function CertificatesClient() {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [registry, setRegistry] = useState<RegistryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => {
        if (!res.ok) throw new Error("No certificates API");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setCerts(data.data?.certs || []);
          setRegistry(data.data?.registry || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 pt-[10px] sm:pt-[15px]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 sm:mb-5 gap-2 sm:gap-4">
        <div>
          <h1 className="font-h1 text-lg sm:text-[24px] text-white mb-0.5 sm:mb-1 uppercase tracking-tighter">Credential Vault</h1>
          <p className="text-on-surface-variant text-xs sm:text-[14px]">Issued credentials validated on-chain.</p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button className="bg-primary text-on-primary px-2 sm:px-3 py-1 sm:py-1.5 font-label-caps text-xs sm:text-[13px] uppercase rounded-sm">Export All</button>
          <button className="bg-surface-container-high border border-outline-variant px-2 sm:px-3 py-1 sm:py-1.5 font-label-caps text-xs sm:text-[13px] uppercase rounded-sm hover:bg-surface-variant transition-colors">Verify</button>
        </div>
      </div>

      <nav className="mb-3 sm:mb-6 py-2 sm:py-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <button className="bg-primary text-on-primary px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-caps text-xs sm:text-[13px] whitespace-nowrap uppercase tracking-widest">All Credentials</button>
          <button className="bg-surface-container text-on-surface px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-caps text-xs sm:text-[13px] whitespace-nowrap hover:bg-surface-container-high transition-colors uppercase tracking-widest">Neural Architects</button>
          <button className="bg-surface-container text-on-surface px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-caps text-xs sm:text-[13px] whitespace-nowrap hover:bg-surface-container-high transition-colors uppercase tracking-widest">Ethics &amp; Compliance</button>
        </div>
      </nav>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-gutter">
          {[1,2,3].map(n => <div key={n} className="h-56 bg-surface-container border border-outline-variant/30 rounded-sm animate-pulse" />)}
        </div>
      ) : certs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-gutter">
          {certs.map((cert) => (
            <article key={cert.id} className="bg-surface-container-low border border-outline-variant/30 group hover:border-primary/50 transition-colors flex flex-col h-full rounded-sm">
              <div className="relative aspect-[1.414/1] overflow-hidden bg-slate-900 border-b border-outline-variant">
                <img className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src={cert.image} alt={cert.title} />
                <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 bg-${cert.tagColor} text-on-${cert.tagColor} rounded-full px-2 py-0.5 text-xs sm:text-[13px] font-bold tracking-widest uppercase`}>
                  {cert.tag}
                </div>
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm">
                    <span className="text-white font-mono-data text-xs sm:text-[13px]">ID: {cert.id}</span>
                  </div>
                </div>
              </div>
              <div className="p-2.5 sm:p-5 flex-grow">
                <div className="flex justify-between items-start mb-1.5 sm:mb-2.5">
                  <h3 className="font-h2 text-base sm:text-[20px] text-white leading-tight">{cert.title}</h3>
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-${cert.tagColor} mt-1 shrink-0`}></div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 text-on-surface-variant font-label-caps text-xs sm:text-[13px] uppercase tracking-widest mb-2 sm:mb-4 flex-wrap">
                  <span>ISSUED: {cert.issued}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant hidden sm:inline"></span>
                  <span>LEVEL: {cert.level}</span>
                </div>
                <p className="text-xs sm:text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed">{cert.desc}</p>
              </div>
              <div className="grid grid-cols-2 border-t border-outline-variant">
                <button className="py-2 sm:py-3.5 font-label-caps text-[10px] sm:text-[13px] tracking-widest uppercase border-r border-outline-variant hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-sm sm:text-[18px]">download</span>
                  <span className="hidden sm:inline">DOWNLOAD PDF</span>
                  <span className="sm:hidden">PDF</span>
                </button>
                <button className="py-2 sm:py-3.5 font-label-caps text-[10px] sm:text-[13px] tracking-widest uppercase hover:bg-on-secondary-fixed hover:text-white transition-colors flex items-center justify-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-sm sm:text-[18px]">share</span>
                  <span className="hidden sm:inline">SHARE</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant text-sm border border-outline-variant/30 rounded bg-surface-container">
          <span className="material-symbols-outlined text-4xl mb-2">workspace_premium</span>
          <p>No certificates issued yet.</p>
          <p className="text-xs mt-1">Complete courses to earn verified credentials.</p>
        </div>
      )}

      {/* Registry History */}
      <section className="mt-4 sm:mt-8">
        <div className="flex items-center justify-between mb-2 sm:mb-5">
          <h2 className="font-h2 text-base sm:text-[22px] text-white flex items-center gap-1.5 sm:gap-2">
            <span className="material-symbols-outlined text-primary text-lg sm:text-[24px]">analytics</span>
            Registry History &amp; Validation
          </h2>
          <div className="bg-surface-container px-2 sm:px-3 py-1 sm:py-1.5 border border-outline-variant rounded-sm">
            <span className="text-xs sm:text-[13px] font-mono-data text-on-surface-variant uppercase tracking-widest">Sync: Live</span>
          </div>
        </div>
        <div className="overflow-x-auto border border-outline-variant rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant">
                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px]">SPECIALIZATION</th>
                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-center">ISSUE DATE</th>
                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-center hidden sm:table-cell">VALID UNTIL</th>
                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-center">SCORE</th>
                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-right">CREDENTIAL ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {loading ? (
                [1,2].map(n => (
                  <tr key={n} className="bg-surface-container"><td colSpan={5} className="p-2 sm:p-4"><div className="h-6 bg-surface-container-high rounded animate-pulse" /></td></tr>
                ))
              ) : registry.length > 0 ? (
                registry.map((row, index) => (
                  <tr key={index} className={`${row.bgClass || "bg-surface-container"} hover:bg-slate-800/30 transition-colors group`}>
                    <td className="p-2 sm:p-4 text-sm sm:text-[15px] text-white font-medium border-l-2 border-transparent group-hover:border-primary">{row.spec}</td>
                    <td className="p-2 sm:p-4 text-xs sm:text-[14px] text-on-surface-variant text-center font-mono-data">{row.issueDate}</td>
                    <td className="p-2 sm:p-4 text-xs sm:text-[14px] text-on-surface-variant text-center font-mono-data hidden sm:table-cell">{row.validUntil}</td>
                    <td className="p-2 sm:p-4 text-center">
                      <span className="bg-primary-container/20 text-primary px-1.5 sm:px-2.5 py-0.5 rounded text-xs sm:text-[13px] font-bold">{row.score}</span>
                    </td>
                    <td className="p-2 sm:p-4 text-right font-mono-data text-xs sm:text-[13px] text-on-surface-variant">{row.credentialId}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-surface-container">
                  <td colSpan={5} className="p-4 sm:p-6 text-center text-on-surface-variant text-sm">
                    No registry entries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
