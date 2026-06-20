"use client";

import { useEffect, useState } from "react";

interface ApiToken {
  name: string;
  level: string;
  levelClass: string;
  lastUsed: string;
  rowClass: string;
}

export default function SettingsClient() {
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings/api-keys")
      .then((res) => { if (!res.ok) throw new Error("No API keys endpoint"); return res.json(); })
      .then((data) => { if (data.success) setTokens(data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 pt-[10px] sm:pt-[15px]">
      <div className="flex flex-col md:flex-row gap-2 sm:gap-gutter">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-20 flex flex-col gap-1">
            <div className="px-1.5 sm:px-2 pb-1.5 sm:pb-2 text-primary font-label-caps text-xs sm:text-[13px] uppercase opacity-60 tracking-widest hidden sm:block">Control Center</div>
            <div className="flex md:flex-col gap-1 sm:gap-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <a className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg bg-primary-container text-on-primary-container text-sm sm:text-[15px] font-medium whitespace-nowrap" href="#general">
                <span className="material-symbols-outlined text-base sm:text-[20px]">settings</span>
                <span className="hidden sm:inline">General Preferences</span>
                <span className="sm:hidden">General</span>
              </a>
              <a className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors text-sm sm:text-[15px] whitespace-nowrap" href="#security">
                <span className="material-symbols-outlined text-base sm:text-[20px]">shield</span>
                <span className="hidden sm:inline">Security &amp; Privacy</span>
                <span className="sm:hidden">Security</span>
              </a>
              <a className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors text-sm sm:text-[15px] whitespace-nowrap" href="#api">
                <span className="material-symbols-outlined text-base sm:text-[20px]">terminal</span>
                <span className="hidden sm:inline">API Access</span>
                <span className="sm:hidden">API</span>
                <span className="ml-auto bg-tertiary-container/30 text-tertiary text-xs sm:text-[13px] px-1 sm:px-1.5 py-0.5 rounded-full border border-tertiary/20">v2</span>
              </a>
              <a className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors text-sm sm:text-[15px] whitespace-nowrap" href="#interface">
                <span className="material-symbols-outlined text-base sm:text-[20px]">display_settings</span>
                <span className="hidden sm:inline">Interface Customization</span>
                <span className="sm:hidden">Interface</span>
              </a>
            </div>
            <div className="mt-3 sm:mt-5 px-1.5 sm:px-2 pb-1.5 sm:pb-2 text-primary font-label-caps text-xs sm:text-[13px] uppercase opacity-60 border-t border-outline-variant/30 pt-2 sm:pt-4 tracking-widest hidden sm:block">System</div>
            <div className="hidden md:flex flex-col gap-1">
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors text-[15px]" href="/notifications">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span>Notifications</span>
              </a>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-error hover:bg-error/10 transition-colors w-full text-left text-[15px]">
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Sign Out System</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-grow space-y-3 sm:space-y-5 relative">
          <section className="glass-panel rounded-xl overflow-hidden border border-outline-variant/20" id="general">
            <div className="px-3 sm:px-6 py-2.5 sm:py-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
              <div>
                <h2 className="font-h1 text-lg sm:text-[24px] text-on-surface">General Preferences</h2>
                <p className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5">Global environment configuration and localization.</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(224,182,255,0.6)]"></span>
            </div>
            <div className="p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="font-label-caps text-xs sm:text-[13px] text-on-surface-variant block uppercase tracking-widest">System Language</label>
                <select className="w-full bg-surface-container-high border-0 border-b border-outline text-sm sm:text-[15px] px-0 py-1.5 sm:py-2 focus:ring-0 focus:border-primary outline-none">
                  <option>English (US) - Default</option>
                  <option>German (DE)</option>
                  <option>Japanese (JP)</option>
                </select>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="font-label-caps text-xs sm:text-[13px] text-on-surface-variant block uppercase tracking-widest">Theme Engine</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-primary text-on-primary rounded-sm font-label-caps text-xs sm:text-[13px] text-center uppercase">Dark (OLED)</button>
                  <button className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-surface-container border border-outline-variant text-on-surface-variant rounded-sm font-label-caps text-xs sm:text-[13px] text-center hover:bg-surface-variant transition-colors uppercase">System</button>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-gutter" id="security">
            <div className="lg:col-span-2 glass-panel rounded-xl border border-outline-variant/20 p-3 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                <span className="material-symbols-outlined text-primary text-lg sm:text-[22px]">lock</span>
                <h2 className="font-h1 text-lg sm:text-[24px]">Authentication Security</h2>
              </div>
              <div className="space-y-3 sm:space-y-5">
                <div className="flex justify-between items-center pb-2.5 sm:pb-4 border-b border-outline-variant/10">
                  <div>
                    <div className="text-sm sm:text-[16px] font-semibold text-on-surface">Password Management</div>
                    <div className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5">Last rotated 42 days ago.</div>
                  </div>
                  <button className="px-2.5 sm:px-4 py-1.5 sm:py-2 border border-outline text-xs sm:text-[13px] uppercase hover:bg-surface-variant transition-colors rounded-sm font-label-caps">Rotate Key</button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm sm:text-[16px] font-semibold text-on-surface">Two-Factor Auth (2FA)</div>
                    <div className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5">Enabled via TOTP Authenticator.</div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                    <span className="material-symbols-outlined text-base sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-label-caps text-xs sm:text-[13px] uppercase">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-xl border border-outline-variant/20 bg-surface-container-high/50 p-3 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="font-label-caps text-xs sm:text-[13px] text-tertiary mb-1 sm:mb-2 uppercase tracking-widest">Trust Score</div>
                <div className="text-3xl sm:text-[40px] font-mono-data tracking-tighter">98.4<span className="text-sm sm:text-[18px] opacity-50">%</span></div>
                <p className="text-xs sm:text-[13px] text-on-surface-variant mt-2 sm:mt-4 leading-relaxed">Calculated based on login geography, device fingerprint, and session velocity.</p>
              </div>
              <div className="h-1 sm:h-1.5 bg-surface-container rounded-full overflow-hidden mt-2 sm:mt-4">
                <div className="h-full bg-tertiary w-[98.4%]"></div>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-xl border border-outline-variant/20 overflow-hidden" id="api">
            <div className="px-3 sm:px-6 py-2.5 sm:py-4 flex justify-between items-center bg-surface-container-low">
              <h2 className="font-h1 text-lg sm:text-[24px]">API Access Tokens</h2>
              <button className="bg-primary-container text-on-primary-container px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm font-label-caps text-xs sm:text-[13px] flex items-center gap-1 sm:gap-1.5 hover:bg-primary-container/90 transition-colors uppercase">
                <span className="material-symbols-outlined text-sm sm:text-[16px]">add</span>
                <span className="hidden sm:inline">GENERATE KEY</span>
                <span className="sm:hidden">NEW KEY</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30 border-b border-outline-variant/20">
                    <th className="px-2.5 sm:px-6 py-2 sm:py-3 font-label-caps text-xs sm:text-[13px] text-on-surface-variant tracking-widest uppercase">Token Name</th>
                    <th className="px-2.5 sm:px-6 py-2 sm:py-3 font-label-caps text-xs sm:text-[13px] text-on-surface-variant tracking-widest uppercase">Access Level</th>
                    <th className="px-2.5 sm:px-6 py-2 sm:py-3 font-label-caps text-xs sm:text-[13px] text-on-surface-variant tracking-widest uppercase hidden sm:table-cell">Last Used</th>
                    <th className="px-2.5 sm:px-6 py-2 sm:py-3 font-label-caps text-xs sm:text-[13px] text-on-surface-variant tracking-widest uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {loading ? (
                    [1,2].map(n => (
                      <tr key={n}><td colSpan={4} className="px-2.5 sm:px-6 py-2 sm:py-3"><div className="h-6 bg-surface-container-high rounded animate-pulse" /></td></tr>
                    ))
                  ) : tokens.length > 0 ? (
                    tokens.map((t, i) => (
                      <tr key={i} className={`${t.rowClass || ""} hover:bg-slate-800/30 transition-colors`}>
                        <td className="px-2.5 sm:px-6 py-2 sm:py-3 text-sm sm:text-[15px] text-on-surface font-mono-data">{t.name}</td>
                        <td className="px-2.5 sm:px-6 py-2 sm:py-3"><span className={`${t.levelClass} px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-[13px] font-bold`}>{t.level}</span></td>
                        <td className="px-2.5 sm:px-6 py-2 sm:py-3 text-xs sm:text-[14px] text-outline hidden sm:table-cell">{t.lastUsed}</td>
                        <td className="px-2.5 sm:px-6 py-2 sm:py-3 text-right"><button className="material-symbols-outlined text-outline hover:text-error transition-colors text-base sm:text-[18px]">delete</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="px-2.5 sm:px-6 py-4 sm:py-6 text-center text-on-surface-variant text-sm">No API tokens generated yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="glass-panel rounded-xl border border-outline-variant/20 overflow-hidden" id="interface">
            <div className="px-3 sm:px-6 py-2.5 sm:py-4 border-b border-outline-variant/20 bg-surface-container-low">
              <h2 className="font-h1 text-lg sm:text-[24px]">Interface Customization</h2>
            </div>
            <div className="p-3 sm:p-6">
              <div className="flex items-center justify-between py-1.5 sm:py-2.5 border-b border-outline-variant/10">
                <div>
                  <div className="text-sm sm:text-[16px] font-semibold text-on-surface">High Contrast Mode</div>
                  <div className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5">Amplifies borders and text distinctions.</div>
                </div>
                <div className="w-8 sm:w-10 h-4 sm:h-5 bg-primary-container rounded-full relative cursor-pointer"><div className="absolute right-0.5 sm:right-1 top-0.5 sm:top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
              </div>
              <div className="flex items-center justify-between pt-1.5 sm:pt-2.5">
                <div>
                  <div className="text-sm sm:text-[16px] font-semibold text-on-surface">Compact Data Density</div>
                  <div className="text-xs sm:text-[13px] text-on-surface-variant mt-0.5">Reduces whitespace for max data.</div>
                </div>
                <div className="w-8 sm:w-10 h-4 sm:h-5 bg-outline-variant rounded-full relative cursor-pointer"><div className="absolute left-0.5 sm:left-1 top-0.5 sm:top-1 w-3 h-3 bg-slate-400 rounded-full shadow-sm"></div></div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-2 sm:gap-3 pt-1 sm:pt-2">
            <button className="px-4 sm:px-6 py-1 sm:py-1.5 border border-outline text-xs sm:text-[13px] text-on-surface-variant font-label-caps hover:text-primary transition-colors uppercase">DISCARD</button>
            <button className="bg-primary text-on-primary px-4 sm:px-8 py-1 sm:py-1.5 rounded-full text-xs sm:text-[13px] font-label-caps shadow-[0_0_15px_rgba(224,182,255,0.4)] hover:scale-105 transition-transform uppercase">COMMIT CHANGES</button>
          </div>
        </div>
      </div>
    </main>
  );
}
