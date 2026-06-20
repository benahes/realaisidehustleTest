"use client";

import { useEffect, useState } from "react";

interface Ticket {
  id: string;
  title: string;
  lastResponse: string;
  status: string;
  icon: string;
  colorBase: string;
}

interface DocItem {
  title: string;
  desc: string;
  icon: string;
}

export default function SupportClient() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/support/tickets")
      .then((res) => { if (!res.ok) throw new Error("No tickets API"); return res.json(); })
      .then((data) => { if (data.success) setTickets(data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch("/api/support/docs")
      .then((res) => { if (!res.ok) throw new Error("No docs API"); return res.json(); })
      .then((data) => { if (data.success) setDocs(data.data || []); })
      .catch(() => {});
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 pt-[10px] sm:pt-[15px]">
      <section className="py-4 sm:py-8 flex flex-col items-center text-center">
        <h1 className="font-h1 text-xl sm:text-[32px] md:text-[40px] text-on-surface mb-2 sm:mb-3 tracking-tighter uppercase">SUPPORT HUB</h1>
        <p className="text-xs sm:text-[14px] text-on-surface-variant max-w-2xl mb-4 sm:mb-8 leading-relaxed px-2 sm:px-0">Documentation and technical assistance.</p>
        <div className="w-full max-w-3xl glass-panel p-1 rounded-sm flex items-center shadow-2xl border border-outline-variant/20">
          <span className="material-symbols-outlined px-2 sm:px-4 text-outline text-lg sm:text-[22px]">search</span>
          <input className="w-full bg-transparent border-none focus:ring-0 text-on-surface text-sm sm:text-[15px] py-2 sm:py-3 outline-none" placeholder="Search Knowledge Base..." type="text" />
          <button className="bg-primary-container text-white font-label-caps text-xs sm:text-[13px] px-3 sm:px-6 py-2 sm:py-3 rounded-sm mr-1 hover:brightness-110 transition-all uppercase tracking-widest whitespace-nowrap">Find Solution</button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 sm:gap-3 mb-4 sm:mb-8">
        <div className="md:col-span-2 md:row-span-2 glass-panel p-3 sm:p-6 hover:border-primary/50 transition-colors group cursor-pointer border border-outline-variant/20 rounded-lg">
          <div className="flex justify-between items-start mb-4 sm:mb-8">
            <span className="material-symbols-outlined text-primary text-2xl sm:text-[40px]">engineering</span>
            <span className="bg-primary-container/20 text-primary font-mono-data text-xs sm:text-[13px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">PRIORITY LINE</span>
          </div>
          <h2 className="font-h2 text-lg sm:text-[24px] text-on-surface mb-1 sm:mb-2 uppercase">Technical Support</h2>
          <p className="text-xs sm:text-[14px] text-on-surface-variant mb-4 sm:mb-8 leading-relaxed">Direct access to systems engineers for complex debugging.</p>
          <button className="flex items-center gap-2 text-primary font-label-caps text-xs sm:text-[13px] uppercase group-hover:gap-4 transition-all">Open Ticket <span className="material-symbols-outlined text-base sm:text-[18px]">arrow_forward</span></button>
        </div>
        <div className="md:col-span-1 glass-panel p-3 sm:p-5 hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/20 rounded-lg">
          <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-lg sm:text-[24px] block mb-2 sm:mb-4">api</span>
          <h3 className="font-h2 text-base sm:text-[18px] text-on-surface mb-0.5 sm:mb-1 uppercase">API Docs</h3>
          <p className="text-xs sm:text-[13px] text-on-surface-variant">V3.4 Reference &amp; SDKs</p>
        </div>
        <div className="md:col-span-1 glass-panel p-3 sm:p-5 hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/20 rounded-lg">
          <span className="material-symbols-outlined text-outline text-lg sm:text-[24px] block mb-2 sm:mb-4">person</span>
          <h3 className="font-h2 text-base sm:text-[18px] text-on-surface mb-0.5 sm:mb-1 uppercase">Account</h3>
          <p className="text-xs sm:text-[13px] text-on-surface-variant">Profile &amp; Security Settings</p>
        </div>
        <div className="md:col-span-2 glass-panel p-3 sm:p-5 flex flex-row items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/20 rounded-lg">
          <div>
            <span className="material-symbols-outlined text-tertiary mb-2 sm:mb-3 block text-lg sm:text-[24px]">receipt_long</span>
            <h3 className="font-h2 text-base sm:text-[18px] text-on-surface mb-0.5 sm:mb-1 uppercase">Billing &amp; Usage</h3>
            <p className="text-xs sm:text-[13px] text-on-surface-variant">Invoices, Credit management &amp; Limits</p>
          </div>
          <div className="text-right">
            <span className="font-mono-data text-xs sm:text-[13px] text-on-surface-variant block uppercase opacity-50 mb-0.5 sm:mb-1">Current Tier</span>
            <span className="font-h2 text-base sm:text-[18px] text-primary uppercase">Free</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="font-h1 text-base sm:text-[22px] text-on-surface uppercase flex items-center gap-2 sm:gap-3">
              Active Support Tickets
              <span className="bg-primary-container text-white text-xs sm:text-[13px] w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full">{tickets.length}</span>
            </h2>
            <button className="font-label-caps text-xs sm:text-[13px] tracking-widest text-primary hover:underline uppercase">View Archive</button>
          </div>
          <div className="space-y-2">
            {loading ? (
              <div className="space-y-2">
                {[1,2].map(n => <div key={n} className="h-16 bg-surface-container border border-outline-variant/20 rounded-r-lg animate-pulse" />)}
              </div>
            ) : tickets.length > 0 ? (
              tickets.map((ticket, i) => (
                <div key={i} className={`glass-panel border-l-4 border-l-${ticket.colorBase} p-2.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4 border border-outline-variant/20 rounded-r-lg`}>
                  <div className="flex items-start gap-2.5 sm:gap-4">
                    <span className={`material-symbols-outlined text-${ticket.colorBase} text-lg sm:text-[22px] mt-0.5`}>{ticket.icon}</span>
                    <div>
                      <h4 className="text-sm sm:text-[16px] font-medium text-on-surface">{ticket.title}</h4>
                      <p className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5">Ticket ID: {ticket.id} · Last response: {ticket.lastResponse}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-6">
                    <span className={`font-mono-data text-xs sm:text-[13px] text-${ticket.colorBase} uppercase bg-${ticket.colorBase}-container/10 px-2 sm:px-2.5 py-0.5 rounded-sm`}>{ticket.status}</span>
                    <span className="material-symbols-outlined text-base sm:text-[20px] text-outline-variant hover:text-white cursor-pointer">more_vert</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-on-surface-variant text-sm border border-outline-variant/20 rounded bg-surface-container">
                <span className="material-symbols-outlined text-3xl mb-2">check_circle</span>
                <p>No active support tickets.</p>
                <p className="text-xs mt-1">All systems operational.</p>
              </div>
            )}
          </div>
        </section>

        <section className="lg:col-span-1">
          <div className="relative overflow-hidden glass-panel rounded-lg p-4 sm:p-8 h-full flex flex-col justify-between border border-primary/30 group cursor-pointer">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary text-3xl sm:text-[48px] mb-2 sm:mb-4 block">groups</span>
              <h2 className="font-h1 text-lg sm:text-[24px] text-on-surface mb-2 sm:mb-3 uppercase">Architect Forum</h2>
              <p className="text-xs sm:text-[14px] text-on-surface-variant mb-4 sm:mb-6 leading-relaxed">Join the community. Share playbooks, solve edge cases.</p>
            </div>
            <button className="relative z-10 w-full bg-white text-slate-950 font-label-caps text-xs sm:text-[13px] py-2.5 sm:py-3.5 rounded-sm hover:bg-primary transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
              Join Community <span className="material-symbols-outlined text-base sm:text-[18px]">open_in_new</span>
            </button>
          </div>
        </section>
      </div>

      <section className="mt-4 sm:mt-8 border-t border-slate-900 pt-4 sm:pt-6">
        <h2 className="font-label-caps text-sm sm:text-[15px] text-primary mb-3 sm:mb-5 uppercase tracking-widest">Featured Resources</h2>
        {docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
            {docs.map((doc, i) => (
              <div key={i} className="glass-panel p-2.5 sm:p-4 flex gap-3 sm:gap-4 items-center group cursor-pointer border border-transparent hover:border-primary/20 transition-all rounded-lg">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-surface-container-high rounded flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-lg sm:text-[22px]">{doc.icon}</span>
                </div>
                <div>
                  <h5 className="text-sm sm:text-[16px] font-medium text-on-surface">{doc.title}</h5>
                  <p className="text-xs sm:text-[13px] text-outline mt-0.5">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-on-surface-variant text-sm">
            <p>No featured resources yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
