import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/stats — dashboard metrics (admin)
export async function GET(_req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const [
      totalUsers,
      totalBlogs,
      totalCourses,
      totalTools,
      totalPurchases,
      totalRevenue,
      totalSubscribers,
      recentPurchases,
      purchasesByStatus,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.blogPost.count(),
      prisma.course.count(),
      prisma.tool.count(),
      prisma.purchase.count(),
      prisma.purchase.aggregate({
        where: { status: "SUCCESS" },
        _sum: { amount: true },
      }),
      prisma.newsletterSub.count({ where: { isActive: true } }),
      prisma.purchase.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { email: true, name: true } },
          course: { select: { title: true } },
          tool: { select: { name: true } },
        },
      }),
      prisma.purchase.groupBy({
        by: ["status"],
        _count: true,
      }),
    ]);

    return successResponse({
      counts: {
        users: totalUsers,
        blogs: totalBlogs,
        courses: totalCourses,
        tools: totalTools,
        purchases: totalPurchases,
        revenue: totalRevenue._sum.amount || 0,
        subscribers: totalSubscribers,
      },
      purchasesByStatus,
      recentPurchases,
    });
  } catch (err: any) {
    console.error("[ADMIN STATS]", err);
    return errorResponse("Failed to fetch stats", 500);
  }
}
