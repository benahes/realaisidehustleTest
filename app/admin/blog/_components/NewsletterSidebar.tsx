'use client'

import { useEffect, useState } from 'react'

interface NewsletterData {
  totalSubscribers: number
  lastCampaign: {
    subject: string
    segment: string
    recipientCount: number
    sentAt: string
    status: string
  } | null
  campaigns: Array<{
    id: string
    subject: string
    segment: string
    recipientCount: number
    sentAt: string
    status: string
  }>
}

export default function NewsletterSidebar() {
  const [data, setData] = useState<NewsletterData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/newsletter/stats/')
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setData(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const subs = data?.totalSubscribers ?? 0
  const last = data?.lastCampaign
  const openRate = last && last.recipientCount > 0 ? Math.round((last.recipientCount * 0.428)) : 0 // mock open rate based on recipient count
  const ctr = last && last.recipientCount > 0 ? Math.round((last.recipientCount * 0.121)) : 0

  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
      <div className="bg-surface-container rounded-lg border border-outline-variant p-stack-loose flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-label-caps text-primary">NEWSLETTER_DISPATCH</p>
            <h3 className="text-h1 font-h1">{loading ? '—' : subs.toLocaleString()}</h3>
            <p className="text-body-xs text-on-surface-variant">Active Subscribers</p>
          </div>
          <span className="material-symbols-outlined text-outline">mail</span>
        </div>
        <div className="space-y-3">
          <div className="bg-surface-container-low p-2 rounded">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] font-label-caps">LAST CAMPAIGN</span>
              <span className="text-[10px] font-mono-data text-primary">
                {loading ? '—' : `${openRate}% OPEN`}
              </span>
            </div>
            <div className="w-full bg-outline-variant h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all" style={{ width: `${Math.min(openRate, 100)}%` }}></div>
            </div>
            {last && (
              <p className="text-[10px] text-on-surface-variant mt-1 truncate">{last.subject}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container-high p-2 text-center border border-outline-variant/30">
              <p className="text-[10px] font-label-caps text-outline">CTR</p>
              <p className="font-mono-data text-body-sm text-on-surface">{loading ? '—' : `${ctr}%`}</p>
            </div>
            <div className="bg-surface-container-high p-2 text-center border border-outline-variant/30">
              <p className="text-[10px] font-label-caps text-outline">BOUNCE</p>
              <p className="font-mono-data text-body-sm text-on-surface">0.4%</p>
            </div>
          </div>
          {data && data.campaigns.length > 0 && (
            <div className="border-t border-outline-variant/30 pt-2">
              <p className="text-[10px] font-label-caps text-outline mb-1">RECENT CAMPAIGNS</p>
              <div className="space-y-1 max-h-24 overflow-y-auto custom-scrollbar">
                {data.campaigns.slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-[10px]">
                    <span className="text-on-surface-variant truncate max-w-[120px]">{c.subject}</span>
                    <span className="font-mono-data text-primary">{c.recipientCount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button className="mt-4 w-full h-[32px] font-label-caps border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all">
          COMPOSE BROADCAST
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden">
        <img
          className="w-full h-24 object-cover opacity-50"
          alt="Microprocessor"
          src="https://picsum.photos/seed/monetization/400/100"
        />
        <div className="p-3">
          <p className="font-label-caps text-on-surface mb-1">MONETIZATION LINK</p>
          <p className="text-body-xs text-on-surface-variant leading-tight">
            Current content is linked to premium funnel. Enable monetization toggle on posts to activate.
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-tertiary font-mono-data">STATUS: READY</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">trending_up</span>
          </div>
        </div>
      </div>
    </div>
  )
}
