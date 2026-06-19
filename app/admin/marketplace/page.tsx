'use client'

import { useState } from 'react'

const ASSETS = [
  {
    name: 'Neural Trading Patterns',
    id: 'EDU-204-NT',
    type: 'Course',
    typeColor: 'bg-secondary-container/30 text-secondary border-secondary/20',
    icon: 'school',
    iconColor: 'bg-primary/10 text-primary border-primary/20',
    price: '₦125,000',
    sales: 14,
    revenue: '₦1.75M',
    revenueUsd: '$1,120 USD',
  },
  {
    name: 'Market Scraper v4.2',
    id: 'TOOL-109-MS',
    type: 'Software',
    typeColor: 'bg-tertiary-container/30 text-tertiary border-tertiary/20',
    icon: 'construction',
    iconColor: 'bg-tertiary/10 text-tertiary border-tertiary/20',
    price: '₦45,000 / mo',
    sales: 48,
    revenue: '₦2.16M',
    revenueUsd: '$1,380 USD',
  },
  {
    name: 'Prompt Eng. Mastery',
    id: 'EDU-301-PEM',
    type: 'Course',
    typeColor: 'bg-secondary-container/30 text-secondary border-secondary/20',
    icon: 'school',
    iconColor: 'bg-primary/10 text-primary border-primary/20',
    price: '₦75,000',
    sales: 5,
    revenue: '₦375K',
    revenueUsd: '$240 USD',
  },
]

const CHART_BARS = [45, 60, 55, 80, 40, 65, 95, 50, 35, 75, 55, 60, 45, 100, 50, 40, 70, 60]

export default function AdminCoursesPage() {
  const [autoRenew, setAutoRenew] = useState(true)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  return (
    <div className="space-y-gutter">
      {/* Dashboard Header / Telemetry Section */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Telemetry Chart */}
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl p-4 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-h2 text-h2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Global Sales Telemetry
              </h2>
              <p className="text-body-xs text-on-surface-variant">Real-time throughput across all license nodes</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-primary text-on-primary font-label-caps h-[28px]">LIVE</button>
              <button className="px-3 py-1 rounded border border-outline-variant text-on-surface-variant font-label-caps h-[28px] hover:bg-surface-variant">
                HISTORY
              </button>
            </div>
          </div>
          <div className="h-48 w-full flex items-end gap-1 px-2 relative">
            {/* SVG Chart Background Pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #998d9e 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>
            {/* Simulated Data Bars */}
            <div className="flex-grow h-full flex items-end justify-between">
              {CHART_BARS.map((height, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-t-sm transition-all ${
                    hoveredBar === i ? 'bg-primary' : `bg-primary/${[20, 20, 20, 40, 20, 20, 60, 30, 20, 50, 20, 20, 20, 80, 20, 20, 40, 20][i]}`
                  }`}
                  style={{ height: `${height}%` }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <div className="glass-panel rounded-xl p-4 flex-grow border-l-4 border-l-primary">
            <p className="font-label-caps text-on-surface-variant mb-2">GROSS REVENUE (MTD)</p>
            <div className="flex items-baseline gap-2">
              <span className="font-h1 text-h1 text-on-surface">₦4.2M</span>
              <span className="text-primary text-body-xs font-mono-data">↑ 12.4%</span>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <div>
                <p className="text-body-xs text-on-surface-variant">Converted Balance</p>
                <p className="font-mono-data text-body-sm text-on-surface">$2,540.21 USD</p>
              </div>
              <span className="material-symbols-outlined text-primary/40">currency_exchange</span>
            </div>
          </div>
          <div className="glass-panel rounded-xl p-4 flex-grow border-l-4 border-l-tertiary">
            <p className="font-label-caps text-on-surface-variant mb-2">ACTIVE LICENSES</p>
            <div className="flex items-baseline gap-2">
              <span className="font-h1 text-h1 text-on-surface">1,842</span>
              <span className="text-tertiary text-body-xs font-mono-data">92 Active Now</span>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/20 flex gap-4">
              <div className="flex-1 text-center border-r border-outline-variant/20">
                <p className="text-[9px] font-label-caps text-on-surface-variant">LIFETIME</p>
                <p className="font-mono-data">412</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[9px] font-label-caps text-on-surface-variant">SUB</p>
                <p className="font-mono-data">1,430</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Inventory & Licensing Config */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Inventory Table */}
        <div className="col-span-12 xl:col-span-9 glass-panel rounded-xl overflow-hidden">
          <div className="px-4 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
            <h3 className="font-h2 text-h2 uppercase text-[14px] tracking-wider">Asset Inventory</h3>
            <div className="flex gap-2">
              <div className="flex border border-outline-variant rounded p-0.5 overflow-hidden">
                <button className="px-2 py-0.5 bg-surface-variant text-[10px] font-label-caps">ALL</button>
                <button className="px-2 py-0.5 text-[10px] font-label-caps hover:bg-surface-variant/50">COURSES</button>
                <button className="px-2 py-0.5 text-[10px] font-label-caps hover:bg-surface-variant/50">TOOLS</button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low/30 text-on-surface-variant border-b border-outline-variant/30">
                <tr>
                  <th className="px-6 py-3 font-label-caps text-[10px]">Asset Name / Identifier</th>
                  <th className="px-6 py-3 font-label-caps text-[10px]">Type</th>
                  <th className="px-6 py-3 font-label-caps text-[10px]">Unit Price</th>
                  <th className="px-6 py-3 font-label-caps text-[10px]">Sales (MTD)</th>
                  <th className="px-6 py-3 font-label-caps text-[10px]">Revenue</th>
                  <th className="px-6 py-3 font-label-caps text-[10px] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {ASSETS.map((asset) => (
                  <tr key={asset.id} className="zebra-row group transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center border ${asset.iconColor}`}>
                          <span className="material-symbols-outlined text-sm">{asset.icon}</span>
                        </div>
                        <div>
                          <p className="font-h2 text-[14px] leading-tight">{asset.name}</p>
                          <p className="text-[10px] text-on-surface-variant font-mono-data opacity-60">ID: {asset.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-label-caps ${asset.typeColor}`}>
                        {asset.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono-data text-body-sm">{asset.price}</td>
                    <td className="px-6 py-4 font-mono-data text-body-sm">{asset.sales}</td>
                    <td className="px-6 py-4">
                      <p className="font-mono-data text-body-sm">{asset.revenue}</p>
                      <p className="text-[9px] text-on-surface-variant">{asset.revenueUsd}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                        more_vert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-outline-variant/20 flex items-center justify-between text-on-surface-variant">
            <p className="text-body-xs italic">Showing 3 of 42 entries</p>
            <div className="flex gap-4 items-center">
              <button className="material-symbols-outlined text-sm opacity-50 cursor-not-allowed">chevron_left</button>
              <span className="font-mono-data text-body-sm text-primary">01 / 14</span>
              <button className="material-symbols-outlined text-sm hover:text-primary">chevron_right</button>
            </div>
          </div>
        </div>

        {/* Licensing Configuration Module */}
        <div className="col-span-12 xl:col-span-3 space-y-gutter">
          <div className="glass-panel rounded-xl p-4 relative">
            <div className="absolute top-4 right-4">
              <span className="w-2 h-2 bg-error rounded-full animate-pulse inline-block"></span>
            </div>
            <h3 className="font-h2 text-[14px] uppercase tracking-wider mb-4">License Config</h3>
            <div className="space-y-4">
              <div className="p-3 rounded bg-surface-container-low border border-outline-variant/30">
                <label className="font-label-caps text-[9px] text-on-surface-variant block mb-2">MODE SELECTION</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 bg-primary text-on-primary rounded font-label-caps text-[10px] transition-all">
                    LIFETIME
                  </button>
                  <button className="py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-variant rounded font-label-caps text-[10px] transition-all">
                    SUBSCRIPTION
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant block mb-1">REV-SHARE %</label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-variant/30 border-b border-outline rounded-none px-2 py-1.5 focus:border-primary text-body-sm"
                      type="number"
                      defaultValue={15}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono-data opacity-40 text-xs">%</span>
                  </div>
                </div>
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant block mb-1">EXPIRY LOGIC</label>
                  <select className="w-full bg-surface-variant/30 border-b border-outline rounded-none px-2 py-1.5 focus:border-primary text-body-sm appearance-none">
                    <option>Never (Forever)</option>
                    <option>12 Months Hard-lock</option>
                    <option>Floating Token</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <div
                    className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${
                      autoRenew ? 'bg-primary-container' : 'bg-surface-variant'
                    }`}
                    onClick={() => setAutoRenew(!autoRenew)}
                  >
                    <div
                      className={`w-3 h-3 bg-on-primary-container rounded-full shadow-sm transition-transform ${
                        autoRenew ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                  <span className="text-body-xs">Auto-Renew Notification</span>
                </div>
              </div>
              <button className="w-full py-3 bg-secondary-container text-secondary rounded font-label-caps text-body-sm mt-4 hover:brightness-110 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">save</span>
                Apply Global Policy
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 overflow-hidden">
            <h3 className="font-h2 text-[14px] uppercase tracking-wider mb-4">Ad Performance</h3>
            <div className="relative h-24 w-full bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent rounded flex items-center justify-center border border-dashed border-outline-variant/30">
              <div className="text-center">
                <p className="font-h1 text-h2 text-on-surface">98.4%</p>
                <p className="font-label-caps text-[9px] text-on-surface-variant">CTR OPTIMIZATION</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px]">
                <span>Impression Reach</span>
                <span className="font-mono-data">142k</span>
              </div>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[72%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Floating Action */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button className="w-12 h-12 bg-primary text-on-primary rounded-full shadow-[0_0_20px_rgba(224,182,255,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-tertiary/5 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  )
}
