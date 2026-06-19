'use client'

import { useState } from 'react'

export default function AdminMonetizationPage() {
  const [autoPlay, setAutoPlay] = useState(true)
  const [closeDelay, setCloseDelay] = useState(15)

  return (
    <>
      <div className="grid grid-cols-12 gap-gutter">
        {/* SECTION 1: ASSET INVENTORY (BENTO LARGE) */}
        <section className="col-span-12 lg:col-span-8 space-y-gutter">
          <div className="flex items-center justify-between">
            <h2 className="font-h2 text-h2 text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">inventory_2</span> Asset Inventory
            </h2>
            <div className="flex gap-2">
              <button className="px-3 h-[28px] bg-secondary text-on-secondary font-label-caps rounded-lg hover:opacity-90 transition-opacity">EXPORT CSV</button>
              <button className="px-3 h-[28px] bg-primary text-on-primary font-label-caps rounded-lg hover:opacity-90 transition-opacity">ADD ASSET</button>
            </div>
          </div>
          <div className="glass overflow-hidden">
            <div className="grid grid-cols-12 bg-surface-container-high px-4 py-2 border-b border-outline-variant text-on-surface-variant font-label-caps">
              <div className="col-span-4">RESOURCE NAME</div>
              <div className="col-span-3">TYPE / LICENSE</div>
              <div className="col-span-3">REVENUE (L30D)</div>
              <div className="col-span-2 text-right">STATUS</div>
            </div>
            <div className="divide-y divide-outline-variant/30">
              {/* Row 1 */}
              <div className="grid grid-cols-12 px-4 py-3 items-center zebra-row hover:border-l-2 hover:border-primary transition-all group">
                <div className="col-span-4">
                  <p className="font-body-sm font-bold text-on-surface">Advanced Neural Networks Course</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">ONSITE • EDU-0942</p>
                </div>
                <div className="col-span-3">
                  <span className="bg-surface-variant px-2 py-0.5 rounded-full font-mono-data text-on-surface-variant">LIFETIME</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono-data text-on-surface">₦4,250,000.00</p>
                  <p className="text-[10px] text-primary">↑ 12.4%</p>
                </div>
                <div className="col-span-2 text-right">
                  <div className="w-2 h-2 rounded-full bg-tertiary inline-block mr-1"></div>
                  <span className="font-label-caps text-on-surface-variant">ACTIVE</span>
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-12 px-4 py-3 items-center zebra-row hover:border-l-2 hover:border-primary transition-all group">
                <div className="col-span-4">
                  <p className="font-body-sm font-bold text-on-surface">Predictive Analysis Suite Pro</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">EXTERNAL • TOOL-881</p>
                </div>
                <div className="col-span-3">
                  <span className="bg-outline-variant/40 px-2 py-0.5 rounded-full font-mono-data text-on-surface-variant">SUBSCRIPTION</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono-data text-on-surface">₦812,400.00</p>
                  <p className="text-[10px] text-error">↓ 2.1%</p>
                </div>
                <div className="col-span-2 text-right">
                  <div className="w-2 h-2 rounded-full bg-primary inline-block mr-1"></div>
                  <span className="font-label-caps text-on-surface-variant">ACTIVE</span>
                </div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-12 px-4 py-3 items-center zebra-row hover:border-l-2 hover:border-primary transition-all group">
                <div className="col-span-4">
                  <p className="font-body-sm font-bold text-on-surface">Auto-ML Refactoring Plugin</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">ONSITE • TOOL-004</p>
                </div>
                <div className="col-span-3">
                  <span className="bg-surface-variant px-2 py-0.5 rounded-full font-mono-data text-on-surface-variant">SINGLE-USE</span>
                </div>
                <div className="col-span-3">
                  <p className="font-mono-data text-on-surface">₦155,000.00</p>
                  <p className="text-[10px] text-primary">↑ 44.8%</p>
                </div>
                <div className="col-span-2 text-right">
                  <div className="w-2 h-2 rounded-full bg-error inline-block mr-1"></div>
                  <span className="font-label-caps text-on-surface-variant">PENDING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PAYMENT GATEWAY (BENTO SMALL) */}
        <section className="col-span-12 lg:col-span-4 space-y-gutter">
          <h2 className="font-h2 text-h2 text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">account_balance_wallet</span> Gateway Config
          </h2>
          <div className="glass p-margin-edge space-y-4">
            {/* Paystack Card */}
            <div className="p-3 border border-outline-variant bg-surface-container rounded-lg flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#00BBF5] rounded-full flex items-center justify-center text-[10px] font-bold text-white">P</div>
                  <span className="font-bold text-on-surface">Paystack</span>
                </div>
                <span className="bg-primary/20 text-primary px-2 py-0.5 font-label-caps rounded">CONNECTED</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-body-xs">
                  <span className="text-on-surface-variant">API Status</span>
                  <span className="text-tertiary">Live Mode</span>
                </div>
                <div className="flex justify-between text-body-xs">
                  <span className="text-on-surface-variant">Settlement</span>
                  <span className="text-on-surface">T+1 (Daily)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-outline-variant flex justify-end gap-2">
                <button className="px-2 h-[24px] border border-outline-variant font-label-caps text-on-surface-variant rounded hover:bg-surface-variant">KEYS</button>
              </div>
            </div>
            {/* Flutterwave Card */}
            <div className="p-3 border border-outline-variant bg-surface-container rounded-lg flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#F5A623] rounded-full flex items-center justify-center text-[10px] font-bold text-white">F</div>
                  <span className="font-bold text-on-surface">Flutterwave</span>
                </div>
                <span className="bg-error/20 text-error px-2 py-0.5 font-label-caps rounded">KEY EXPIRED</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-body-xs">
                  <span className="text-on-surface-variant">API Status</span>
                  <span className="text-error">Unauthorized</span>
                </div>
                <div className="flex justify-between text-body-xs">
                  <span className="text-on-surface-variant">Settlement</span>
                  <span className="text-on-surface">T+2 (Manual)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-outline-variant flex justify-end gap-2">
                <button className="px-2 h-[24px] border border-outline-variant font-label-caps text-on-surface-variant rounded hover:bg-surface-variant">RE-AUTH</button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MONETIZATION ENGINE (BENTO FULL) */}
        <section className="col-span-12 space-y-gutter">
          <h2 className="font-h2 text-h2 text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">dynamic_feed</span> Monetization Engine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* CTR Chart / Metrics */}
            <div className="glass p-margin-edge flex flex-col justify-between">
              <div>
                <div className="flex justify-between">
                  <span className="font-label-caps text-on-surface-variant">GLOBAL CPM</span>
                  <span className="font-mono-data text-primary">₦1,420.00</span>
                </div>
                <p className="font-h1 text-h1 mt-2">12.5% <span className="text-body-xs text-on-surface-variant font-normal">AVG CTR</span></p>
              </div>
              <div className="h-16 flex items-end gap-1 mt-4">
                <div className="flex-1 bg-primary/20 h-[20%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary/40 h-[45%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary/60 h-[70%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary h-[100%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary/80 h-[85%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary/50 h-[60%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary/30 h-[30%] rounded-t-sm"></div>
              </div>
            </div>
            {/* Pop-up Video Config */}
            <div className="glass p-margin-edge relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary">play_circle</span>
                <span className="font-body-sm font-bold">Pop-up Video Units</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-body-xs">Auto-play on Load</span>
                  <button
                    onClick={() => setAutoPlay((v) => !v)}
                    className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${autoPlay ? 'bg-primary' : 'bg-surface-container-high'}`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${autoPlay ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body-xs">Close Delay (sec)</span>
                  <input
                    className="w-12 bg-surface-container-low border-b border-outline-variant text-center font-mono-data py-0.5"
                    type="number"
                    value={closeDelay}
                    onChange={(e) => setCloseDelay(Number(e.target.value))}
                  />
                </div>
                <div className="pt-2">
                  <p className="text-[10px] text-on-surface-variant mb-1">CAMPAIGN WEIGHTING</p>
                  <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-[65%]"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Banner Ad Config */}
            <div className="glass p-margin-edge">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-secondary">featured_video</span>
                <span className="font-body-sm font-bold">Banner Ad Injection</span>
              </div>
              <div className="space-y-3">
                <div className="p-2 bg-surface-container-low border border-dashed border-outline-variant rounded flex justify-between items-center">
                  <span className="text-[11px]">Primary Header Banner</span>
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                </div>
                <div className="p-2 bg-surface-container-low border border-dashed border-outline-variant rounded flex justify-between items-center">
                  <span className="text-[11px]">Sidebar Sticky Units</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">toggle_off</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROMOTED QUEUE (ASKEW / OVERLAY STYLE) */}
        <section className="col-span-12 lg:col-span-12 space-y-gutter pb-10">
          <div className="flex items-center justify-between">
            <h2 className="font-h2 text-h2 text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">rocket_launch</span> Promoted Content Queue
              <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] font-bold text-on-primary">6 WAITING</span>
            </h2>
          </div>
          <div className="flex overflow-x-auto gap-gutter pb-4 snap-x">
            {/* Queue Card 1 */}
            <div className="min-w-[320px] glass p-margin-edge snap-start border-l-4 border-l-primary hover:bg-surface-variant/40 transition-colors">
              <div className="flex justify-between mb-3">
                <span className="font-label-caps text-on-surface-variant">SLOT #1 - TOP TIER</span>
                <span className="font-mono-data text-tertiary">₦50,000/Day</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                </div>
                <div>
                  <h3 className="font-body-sm font-bold">DeepMind API Wrapper</h3>
                  <p className="text-body-xs text-on-surface-variant">By DevPulse Lagos</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-[28px] bg-primary text-on-primary font-label-caps rounded hover:brightness-110">APPROVE</button>
                <button className="flex-1 h-[28px] border border-outline-variant font-label-caps rounded hover:bg-surface-variant">DECLINE</button>
              </div>
            </div>
            {/* Queue Card 2 */}
            <div className="min-w-[320px] glass p-margin-edge snap-start border-l-4 border-l-secondary/50 hover:bg-surface-variant/40 transition-colors">
              <div className="flex justify-between mb-3">
                <span className="font-label-caps text-on-surface-variant">SLOT #2 - SIDEBAR</span>
                <span className="font-mono-data text-tertiary">₦12,500/Day</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">database</span>
                </div>
                <div>
                  <h3 className="font-body-sm font-bold">VectorDB Nigerian Nodes</h3>
                  <p className="text-body-xs text-on-surface-variant">By CloudRoute</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-[28px] bg-primary text-on-primary font-label-caps rounded hover:brightness-110">APPROVE</button>
                <button className="flex-1 h-[28px] border border-outline-variant font-label-caps rounded hover:bg-surface-variant">DECLINE</button>
              </div>
            </div>
            {/* Queue Card 3 */}
            <div className="min-w-[320px] glass p-margin-edge snap-start border-l-4 border-l-secondary/50 hover:bg-surface-variant/40 transition-colors">
              <div className="flex justify-between mb-3">
                <span className="font-label-caps text-on-surface-variant">SLOT #3 - IN-LINE</span>
                <span className="font-mono-data text-tertiary">₦8,000/Day</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">code_blocks</span>
                </div>
                <div>
                  <h3 className="font-body-sm font-bold">SQL Optimizer AI</h3>
                  <p className="text-body-xs text-on-surface-variant">By QueryMaster</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-[28px] bg-primary text-on-primary font-label-caps rounded hover:brightness-110">APPROVE</button>
                <button className="flex-1 h-[28px] border border-outline-variant font-label-caps rounded hover:bg-surface-variant">DECLINE</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center group hover:scale-105 transition-transform z-50">
        <span className="material-symbols-outlined text-[28px]">add</span>
        <span className="absolute right-16 bg-surface-container px-3 py-1 rounded text-body-xs font-label-caps opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">NEW CAMPAIGN</span>
      </button>
    </>
  )
}
