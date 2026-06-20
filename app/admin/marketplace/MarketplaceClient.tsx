'use client'

import { useState } from 'react'
import CreateAssetModal from '../_components/CreateAssetModal'

interface Asset {
  id: string
  name: string
  slug: string
  type: 'Course' | 'Tool'
  price: number
  currency: string
  sales: number
  published: boolean
  createdAt: string
  thumbnail?: string | null
}

export default function MarketplaceClient({
  assets,
  totalRevenue,
  totalSales,
}: {
  assets: Asset[]
  totalRevenue: number
  totalSales: number
}) {
  const [filter, setFilter] = useState<'ALL' | 'COURSE' | 'TOOL'>('ALL')
  const [showModal, setShowModal] = useState(false)

  const filtered = assets.filter((a) => {
    if (filter === 'ALL') return true
    return a.type.toUpperCase() === filter
  })

  const formatMoney = (amount: number, currency: string) => {
    const symbol = currency === 'USD' ? '$' : '₦'
    const major = Math.floor(amount / 100)
    return `${symbol}${major.toLocaleString()}`
  }

  return (
    <div className="space-y-gutter">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-primary">
          <p className="font-label-caps text-on-surface-variant mb-2 uppercase text-xs tracking-wider">Total Revenue</p>
          <div className="flex items-baseline gap-2">
            <span className="font-h1 text-h1 text-on-surface">{formatMoney(totalRevenue, 'NGN')}</span>
          </div>
          <p className="text-body-xs text-on-surface-variant mt-1">From successful purchases</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-tertiary">
          <p className="font-label-caps text-on-surface-variant mb-2 uppercase text-xs tracking-wider">Total Sales</p>
          <div className="flex items-baseline gap-2">
            <span className="font-h1 text-h1 text-on-surface">{totalSales.toLocaleString()}</span>
          </div>
          <p className="text-body-xs text-on-surface-variant mt-1">Successful transactions</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-secondary">
          <p className="font-label-caps text-on-surface-variant mb-2 uppercase text-xs tracking-wider">Assets</p>
          <div className="flex items-baseline gap-2">
            <span className="font-h1 text-h1 text-on-surface">{assets.length}</span>
          </div>
          <p className="text-body-xs text-on-surface-variant mt-1">{assets.filter(a => a.type === 'Course').length} courses · {assets.filter(a => a.type === 'Tool').length} tools</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="px-4 py-4 border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-surface-container-low/50">
          <h3 className="font-h2 text-h2 uppercase text-[14px] tracking-wider">Asset Inventory</h3>
          <div className="flex gap-2">
            <div className="flex border border-outline-variant rounded p-0.5 overflow-hidden">
              {(['ALL', 'COURSES', 'TOOLS'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f === 'COURSES' ? 'COURSE' : f === 'TOOLS' ? 'TOOL' : 'ALL')}
                  className={`px-2 py-0.5 text-[10px] font-label-caps transition-all ${
                    (f === 'ALL' && filter === 'ALL') ||
                    (f === 'COURSES' && filter === 'COURSE') ||
                    (f === 'TOOLS' && filter === 'TOOL')
                      ? 'bg-surface-variant text-on-surface'
                      : 'text-on-surface-variant hover:bg-surface-variant/50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/30 text-on-surface-variant border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-3 font-label-caps text-[10px]">Asset Name</th>
                <th className="px-6 py-3 font-label-caps text-[10px]">Type</th>
                <th className="px-6 py-3 font-label-caps text-[10px]">Price</th>
                <th className="px-6 py-3 font-label-caps text-[10px]">Sales</th>
                <th className="px-6 py-3 font-label-caps text-[10px]">Status</th>
                <th className="px-6 py-3 font-label-caps text-[10px]">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.map((asset) => (
                <tr key={asset.id} className="zebra-row group transition-colors hover:bg-surface-container-high/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center border ${
                        asset.type === 'Course'
                          ? 'bg-primary/10 text-primary border-primary/20'
                          : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                      }`}>
                        <span className="material-symbols-outlined text-sm">
                          {asset.type === 'Course' ? 'school' : 'construction'}
                        </span>
                      </div>
                      <div>
                        <p className="font-h2 text-[14px] leading-tight">{asset.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-mono-data opacity-60">/{asset.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-label-caps ${
                      asset.type === 'Course'
                        ? 'bg-secondary-container/30 text-secondary border-secondary/20'
                        : 'bg-tertiary-container/30 text-tertiary border-tertiary/20'
                    }`}>
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono-data text-body-sm">
                    {asset.price === 0 ? 'Free' : formatMoney(asset.price, asset.currency)}
                  </td>
                  <td className="px-6 py-4 font-mono-data text-body-sm">{asset.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium uppercase tracking-wider ${
                      asset.published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/20'
                    }`}>
                      {asset.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-xs">
                    {new Date(asset.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-on-surface-variant text-sm">
            No assets found. Create your first course or tool.
          </div>
        )}
        <div className="px-6 py-3 border-t border-outline-variant/20 flex items-center justify-between text-on-surface-variant">
          <p className="text-body-xs italic">Showing {filtered.length} of {assets.length} entries</p>
        </div>
      </div>

      {/* Sticky Floating Action */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button
          onClick={() => setShowModal(true)}
          className="w-12 h-12 bg-primary text-on-primary rounded-full shadow-[0_0_20px_rgba(224,182,255,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      {showModal && (
        <CreateAssetModal onClose={() => setShowModal(false)} onCreated={() => window.location.reload()} />
      )}
    </div>
  )
}
