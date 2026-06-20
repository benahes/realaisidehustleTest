import { prisma } from "@/lib/prisma";

async function getMonetizationData() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const [courses, tools, purchases, adSlots, campaigns] = await Promise.all([
      prisma.course.findMany({
        where: { isPublished: true },
        select: { id: true, title: true, slug: true, price: true, currency: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.tool.findMany({
        where: { isPublished: true },
        select: { id: true, title: true, slug: true, price: true, currency: true, priceType: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.purchase.findMany({
        where: { status: "SUCCESS", createdAt: { gte: thirtyDaysAgo } },
        select: { amount: true, currency: true, itemType: true },
      }),
      prisma.adSlot.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.newsletterCampaign.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    const totalRevenue = purchases.reduce((sum, p) => sum + (p.amount || 0), 0);
    const courseRevenue = purchases
      .filter((p) => p.itemType === "COURSE")
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    const toolRevenue = purchases
      .filter((p) => p.itemType === "TOOL")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return { courses, tools, purchases, adSlots, campaigns, totalRevenue, courseRevenue, toolRevenue };
  } catch {
    return { courses: [], tools: [], purchases: [], adSlots: [], campaigns: [], totalRevenue: 0, courseRevenue: 0, toolRevenue: 0 };
  }
}

function formatCurrency(amount: number, currency: string) {
  if (currency === "NGN") return `₦${(amount / 100).toLocaleString()}`;
  return `$${(amount / 100).toFixed(2)}`;
}

export default async function AdminMonetizationPage() {
  const { courses, tools, purchases, adSlots, campaigns, totalRevenue, courseRevenue, toolRevenue } =
    await getMonetizationData();

  const assets = [
    ...courses.map((c) => ({
      id: c.id,
      name: c.title,
      slug: c.slug,
      type: "COURSE" as const,
      priceType: "ONE_TIME" as const,
      price: c.price,
      currency: c.currency,
    })),
    ...tools.map((t) => ({
      id: t.id,
      name: t.title,
      slug: t.slug,
      type: "TOOL" as const,
      priceType: t.priceType,
      price: t.price,
      currency: t.currency,
    })),
  ];

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
              <span className="text-on-surface-variant font-mono-data text-sm self-center">{assets.length} assets</span>
            </div>
          </div>
          <div className="glass overflow-hidden">
            <div className="grid grid-cols-12 bg-surface-container-high px-4 py-2 border-b border-outline-variant text-on-surface-variant font-label-caps">
              <div className="col-span-4">RESOURCE NAME</div>
              <div className="col-span-3">TYPE / PRICE</div>
              <div className="col-span-3">REVENUE (L30D)</div>
              <div className="col-span-2 text-right">STATUS</div>
            </div>
            <div className="divide-y divide-outline-variant/30">
              {assets.length === 0 ? (
                <div className="px-4 py-6 text-on-surface-variant text-sm text-center">
                  No published assets yet. Create courses or tools in the marketplace.
                </div>
              ) : (
                assets.map((asset) => {
                  const assetRevenue = purchases
                    .filter((p) => p.itemType === asset.type)
                    .reduce((sum, p) => sum + (p.amount || 0), 0);
                  return (
                    <div key={asset.id} className="grid grid-cols-12 px-4 py-3 items-center zebra-row hover:border-l-2 hover:border-primary transition-all group">
                      <div className="col-span-4">
                        <p className="font-body-sm font-bold text-on-surface">{asset.name}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{asset.type} • {asset.slug}</p>
                      </div>
                      <div className="col-span-3">
                        <span className="bg-surface-variant px-2 py-0.5 rounded-full font-mono-data text-on-surface-variant text-[11px]">
                          {asset.priceType.replace("_", "-")}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <p className="font-mono-data text-on-surface">{formatCurrency(assetRevenue, asset.currency)}</p>
                      </div>
                      <div className="col-span-2 text-right">
                        <div className="w-2 h-2 rounded-full bg-primary inline-block mr-1"></div>
                        <span className="font-label-caps text-on-surface-variant">ACTIVE</span>
                      </div>
                    </div>
                  );
                })
              )}
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
            {/* Revenue Metrics */}
            <div className="glass p-margin-edge flex flex-col justify-between">
              <div>
                <div className="flex justify-between">
                  <span className="font-label-caps text-on-surface-variant">TOTAL REVENUE (L30D)</span>
                  <span className="font-mono-data text-primary">{formatCurrency(totalRevenue, "NGN")}</span>
                </div>
                <p className="font-h1 text-h1 mt-2">{purchases.length} <span className="text-body-xs text-on-surface-variant font-normal">SUCCESSFUL SALES</span></p>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Courses</span>
                  <span className="font-mono-data text-primary">{formatCurrency(courseRevenue, "NGN")}</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: totalRevenue > 0 ? `${(courseRevenue / totalRevenue) * 100}%` : "0%" }}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Tools</span>
                  <span className="font-mono-data text-secondary">{formatCurrency(toolRevenue, "NGN")}</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: totalRevenue > 0 ? `${(toolRevenue / totalRevenue) * 100}%` : "0%" }}></div>
                </div>
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
                  <span className="font-mono-data text-[11px] text-primary">ENABLED</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body-xs">Close Delay (sec)</span>
                  <span className="font-mono-data text-[11px] text-on-surface">5</span>
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

        {/* SECTION 4: AD SLOTS & CAMPAIGNS */}
        <section className="col-span-12 lg:col-span-12 space-y-gutter pb-10">
          <div className="flex items-center justify-between">
            <h2 className="font-h2 text-h2 text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">rocket_launch</span> Ad Slots & Campaigns
              <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] font-bold text-on-primary">{adSlots.length} slots</span>
            </h2>
          </div>
          {adSlots.length === 0 && campaigns.length === 0 ? (
            <div className="glass p-6 text-on-surface-variant text-sm text-center">
              No ad slots or campaigns configured yet.
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-gutter pb-4 snap-x">
              {adSlots.map((slot) => (
                <div key={slot.id} className="min-w-[280px] glass p-margin-edge snap-start border-l-4 border-l-primary hover:bg-surface-variant/40 transition-colors">
                  <div className="flex justify-between mb-3">
                    <span className="font-label-caps text-on-surface-variant">{slot.section.replace("_", "-")} • {slot.type}</span>
                    <span className="font-mono-data text-tertiary">{slot.price ? `₦${slot.price.toLocaleString()}/Day` : "FREE"}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">ads_click</span>
                    </div>
                    <div>
                      <h3 className="font-body-sm font-bold">{slot.title || "Untitled Slot"}</h3>
                      <p className="text-body-xs text-on-surface-variant">{slot.advertiserEmail || "No advertiser"}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className={`flex-1 h-[28px] flex items-center justify-center font-label-caps rounded text-[11px] ${slot.isActive ? "bg-primary text-on-primary" : "bg-surface-variant text-on-surface-variant"}`}>
                      {slot.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                    <span className="flex-1 h-[28px] flex items-center justify-center font-label-caps rounded text-[11px] bg-surface-variant text-on-surface-variant">
                      {slot.startDate ? new Date(slot.startDate).toLocaleDateString() : "NO DATE"}
                    </span>
                  </div>
                </div>
              ))}
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="min-w-[280px] glass p-margin-edge snap-start border-l-4 border-l-secondary/50 hover:bg-surface-variant/40 transition-colors">
                  <div className="flex justify-between mb-3">
                    <span className="font-label-caps text-on-surface-variant">CAMPAIGN</span>
                    <span className="font-mono-data text-tertiary">{campaign.sentAt ? "SENT" : "DRAFT"}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary">mail</span>
                    </div>
                    <div>
                      <h3 className="font-body-sm font-bold">{campaign.subject}</h3>
                      <p className="text-body-xs text-on-surface-variant">{campaign.recipientCount || 0} recipients</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="flex-1 h-[28px] flex items-center justify-center font-label-caps rounded text-[11px] bg-surface-variant text-on-surface-variant">
                      {campaign.openRate ? `${campaign.openRate}% open` : "N/A"}
                    </span>
                    <span className="flex-1 h-[28px] flex items-center justify-center font-label-caps rounded text-[11px] bg-surface-variant text-on-surface-variant">
                      {campaign.clickRate ? `${campaign.clickRate}% click` : "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
