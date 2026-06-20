import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import MarketplaceClient from "./MarketplaceClient";

export default async function AdminMarketplacePage() {
  const auth = await requireAdmin();
  if ("error" in auth) redirect("/admin/login");

  let courses: any[] = [];
  let tools: any[] = [];
  let purchaseStats: any = { _sum: { amount: 0 }, _count: 0 };

  try {
    [courses, tools, purchaseStats] = await Promise.all([
      prisma.course.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          currency: true,
          thumbnail: true,
          isPublished: true,
          createdAt: true,
          _count: { select: { purchases: true } },
        },
      }),
      prisma.tool.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          priceType: true,
          category: true,
          icon: true,
          isPublished: true,
          createdAt: true,
          _count: { select: { purchases: true } },
        },
      }),
      prisma.purchase.aggregate({
        _sum: { amount: true },
        _count: true,
        where: { status: "SUCCESS" },
      }),
    ]);
  } catch {
    // Database unavailable — return empty state
  }

  const totalRevenue = purchaseStats._sum.amount || 0;
  const totalSales = purchaseStats._count || 0;

  const assets = [
    ...courses.map((c) => ({
      id: c.id,
      name: c.title,
      slug: c.slug,
      type: "Course" as const,
      price: c.price,
      currency: c.currency,
      sales: c._count.purchases,
      published: c.isPublished,
      createdAt: c.createdAt.toISOString(),
      thumbnail: c.thumbnail,
    })),
    ...tools.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      type: "Tool" as const,
      price: t.price,
      currency: "NGN",
      sales: t._count.purchases,
      published: t.isPublished,
      createdAt: t.createdAt.toISOString(),
      thumbnail: t.icon,
    })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <MarketplaceClient
      assets={assets}
      totalRevenue={totalRevenue}
      totalSales={totalSales}
    />
  );
}
