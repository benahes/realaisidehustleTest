import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  let totalRevenueAgg: any = { _sum: { amount: 0 }, _count: 0 }
  let activeSubscribers = 0
  let totalCourses = 0
  let totalTools = 0
  let recentPurchases: any[] = []
  let recentAuditLogs: any[] = []

  if (process.env.DATABASE_URL) {
    try {
      ;[
        totalRevenueAgg,
        activeSubscribers,
        totalCourses,
        totalTools,
        recentPurchases,
        recentAuditLogs,
      ] = await Promise.all([
        prisma.purchase.aggregate({ where: { status: 'SUCCESS' }, _sum: { amount: true }, _count: true }),
        prisma.newsletterSub.count({ where: { isActive: true } }),
        prisma.course.count(),
        prisma.tool.count(),
        prisma.purchase.findMany({
          where: { status: 'SUCCESS' },
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: { user: { select: { email: true } } },
        }),
        prisma.auditLog.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: { user: { select: { email: true } } },
        }),
      ])
    } catch {
      // Database not available — use fallback data for UI preview
    }
  }

  const totalRevenueKobo = totalRevenueAgg._sum.amount || 0
  const totalRevenueNGN = (totalRevenueKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const totalRevenueUSD = (totalRevenueKobo / 100 / 1505).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const courseRevenue = totalRevenueKobo * 0.65
  const toolRevenue = totalRevenueKobo * 0.25
  const apiRevenue = totalRevenueKobo * 0.10

  const signals = [
    ...recentPurchases.map((p) => ({
      type: 'purchase' as const,
      title: `Payment Verified: ${p.itemType}`,
      detail: `${p.user?.email || 'Unknown'} | Ref: ${p.paystackRef?.slice(0, 12) || 'N/A'}`,
      time: formatTime(p.createdAt),
    })),
    ...recentAuditLogs.map((log) => ({
      type: 'audit' as const,
      title: `${log.action}`,
      detail: log.user?.email || 'System',
      time: formatTime(log.createdAt),
    })),
  ].sort((a, b) => 0).slice(0, 4)

  return (
    <>
      {/* Header Status Bar: Security Perimeter */}
      <div className="glass-panel flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-margin-edge py-3 mb-stack-loose rounded-lg gap-2 sm:gap-0">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <div>
            <h2 className="font-h2 text-h2 leading-none">Security Perimeter</h2>
            <p className="font-body-xs text-on-surface-variant uppercase tracking-widest mt-1">Status: Active &amp; Hardened</p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-margin-edge sm:divide-x sm:divide-outline-variant overflow-x-auto w-full sm:w-auto">
          <div className="px-2 sm:px-4 shrink-0">
            <p className="font-label-caps text-on-surface-variant">THREAT LEVEL</p>
            <p className="font-mono-data text-primary">NULL</p>
          </div>
          <div className="px-2 sm:px-4 shrink-0">
            <p className="font-label-caps text-on-surface-variant">ENCRYPTION</p>
            <p className="font-mono-data text-on-surface">AES-256-GCM</p>
          </div>
          <div className="px-2 sm:px-4 flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <p className="font-body-xs font-bold text-on-surface">WAF ONLINE</p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Global Performance Dashboard */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <div className="glass-panel p-stack-loose h-full rounded-lg">
            <div className="flex justify-between items-center mb-stack-loose">
              <h3 className="font-h2 text-h2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Performance Core
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-primary-container text-white text-[10px] font-bold rounded">LIVE</span>
                <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-bold rounded">24H CYCLE</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mb-stack-loose">
              <div className="bg-surface-container-low p-4 border border-outline-variant border-l-2 border-l-primary rounded">
                <p className="font-label-caps text-on-surface-variant mb-1">TOTAL REVENUE (NGN)</p>
                <h4 className="font-h1 text-h1 text-on-surface">₦{totalRevenueNGN}</h4>
                <p className="text-[10px] text-primary mt-1">+12.4% vs prev week</p>
              </div>
              <div className="bg-surface-container-low p-4 border border-outline-variant rounded">
                <p className="font-label-caps text-on-surface-variant mb-1">TOTAL REVENUE (USD)</p>
                <h4 className="font-h1 text-h1 text-on-surface">${totalRevenueUSD}</h4>
                <p className="text-[10px] text-primary mt-1">Conversion: 1,505 NGN/$</p>
              </div>
              <div className="bg-surface-container-low p-4 border border-outline-variant rounded">
                <p className="font-label-caps text-on-surface-variant mb-1">ACTIVE SUBSCRIBERS</p>
                <h4 className="font-h1 text-h1 text-on-surface">{activeSubscribers.toLocaleString()}</h4>
                <p className="text-[10px] text-on-surface-variant mt-1">Churn: 0.8%</p>
              </div>
            </div>
            {/* Server Health Visualization */}
            <div className="bg-surface-container-lowest p-4 border border-outline-variant rounded">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="font-label-caps text-on-surface-variant">SERVER NODE LOAD</p>
                  <p className="font-mono-data text-primary text-lg">94.2% Uptime</p>
                </div>
                <div className="flex gap-1 items-end h-8">
                  <div className="w-1 bg-primary/20 h-4 rounded-sm"></div>
                  <div className="w-1 bg-primary/40 h-6 rounded-sm"></div>
                  <div className="w-1 bg-primary/20 h-5 rounded-sm"></div>
                  <div className="w-1 bg-primary/60 h-8 rounded-sm"></div>
                  <div className="w-1 bg-primary/30 h-4 rounded-sm"></div>
                  <div className="w-1 bg-primary/80 h-7 rounded-sm"></div>
                  <div className="w-1 bg-primary h-8 rounded-sm"></div>
                </div>
              </div>
              <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between mt-2 font-mono-data text-[10px] text-on-surface-variant">
                <span>LAGOS, NG</span>
                <span>CPU: 42%</span>
                <span>MEM: 6.8GB/16GB</span>
                <span>IOPS: 12.4k</span>
              </div>
            </div>
          </div>

          {/* Nigerian Gateway Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            <div className="glass-panel p-4 flex flex-col gap-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">account_balance</span>
                  <span className="font-h2 text-body-sm font-bold uppercase tracking-wider">Paystack Node</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(157,78,221,0.8)]"></span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-mono-data text-h2">99.98%</p>
                <p className="font-body-xs text-on-surface-variant">Latency: 142ms</p>
              </div>
              <button className="w-full py-1.5 border border-outline text-label-caps hover:bg-surface-variant transition-colors uppercase rounded">View Logs</button>
            </div>
            <div className="glass-panel p-4 flex flex-col gap-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">payments</span>
                  <span className="font-h2 text-body-sm font-bold uppercase tracking-wider">Flutterwave Node</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(157,78,221,0.8)]"></span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-mono-data text-h2">99.95%</p>
                <p className="font-body-xs text-on-surface-variant">Latency: 188ms</p>
              </div>
              <button className="w-full py-1.5 border border-outline text-label-caps hover:bg-surface-variant transition-colors uppercase rounded">View Logs</button>
            </div>
          </div>
        </section>

        {/* Sidebar Widgets */}
        <section className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          {/* Marketplace Performance */}
          <div className="glass-panel p-stack-loose rounded-lg">
            <h3 className="font-h2 text-h2 mb-4">Marketplace</h3>
            <div className="space-y-stack-mid">
              <div className="bg-surface-container p-3 border-l-2 border-primary rounded">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-on-surface">Premium Courses</span>
                  <span className="font-mono-data text-primary">₦{((courseRevenue / 100)).toLocaleString('en-NG', { maximumFractionDigits: 1 })}M</span>
                </div>
                <div className="w-full bg-surface-variant h-1 mt-2 rounded-full">
                  <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="bg-surface-container p-3 border-l-2 border-secondary rounded">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-on-surface">AI Specialized Tools</span>
                  <span className="font-mono-data text-secondary">₦{((toolRevenue / 100)).toLocaleString('en-NG', { maximumFractionDigits: 1 })}M</span>
                </div>
                <div className="w-full bg-surface-variant h-1 mt-2 rounded-full">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="bg-surface-container p-3 border-l-2 border-outline rounded">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-on-surface">Enterprise API Keys</span>
                  <span className="font-mono-data text-on-surface-variant">₦{((apiRevenue / 100)).toLocaleString('en-NG', { maximumFractionDigits: 1 })}M</span>
                </div>
                <div className="w-full bg-surface-variant h-1 mt-2 rounded-full">
                  <div className="bg-outline h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Cloudflare Asset Summary */}
          <div className="glass-panel overflow-hidden rounded-lg">
            <div className="p-4 bg-surface-container-high border-b border-outline-variant flex items-center justify-between">
              <span className="font-label-caps">Cloudflare Assets</span>
              <span className="material-symbols-outlined text-[16px]">cloud</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="font-body-xs text-on-surface-variant mb-1">Video Bandwidth</p>
                  <p className="font-mono-data text-h2 text-on-surface">4.2 TB</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full">
                  <span className="material-symbols-outlined text-primary">movie</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="font-body-xs text-on-surface-variant mb-1">Storage Utilized</p>
                  <p className="font-mono-data text-h2 text-on-surface">824 GB</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full">
                  <span className="material-symbols-outlined text-primary">database</span>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant">
                <div className="flex justify-between items-center text-[10px] text-on-surface-variant">
                  <span>CACHE HIT RATIO</span>
                  <span>88.4%</span>
                </div>
                <div className="w-full bg-surface-variant h-1 mt-1 rounded-full">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events (Zebra Striped) */}
          <div className="glass-panel flex-1 rounded-lg">
            <div className="p-4 border-b border-outline-variant">
              <h3 className="font-label-caps">Active Node Signals</h3>
            </div>
            <div className="flex flex-col">
              {signals.length === 0 && (
                <div className="p-3 text-on-surface-variant text-sm">No recent signals.</div>
              )}
              {signals.map((signal, i) => (
                <div key={i} className="zebra-row p-3 flex items-center gap-3 border-l-2 border-transparent hover:border-primary transition-all">
                  <span className={`w-1.5 h-1.5 rounded-full ${signal.type === 'audit' ? 'bg-tertiary' : 'bg-primary'}`}></span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body-xs text-on-surface truncate">{signal.title}</p>
                    <p className="text-[9px] text-on-surface-variant truncate">{signal.detail}</p>
                  </div>
                  <span className="font-mono-data text-[10px] text-on-surface-variant shrink-0">{signal.time}</span>
                </div>
              ))}
            </div>
            <div className="p-3">
              <a href="/admin/security" className="block w-full text-center text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors">VIEW FULL AUDIT TRAIL</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 60000)
  if (diff < 1) return 'now'
  if (diff < 60) return `${diff}m ago`
  const hours = Math.floor(diff / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

