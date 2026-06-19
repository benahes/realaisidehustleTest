import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/newsletter/stats — subscriber count + last campaign
export async function GET(_req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const [totalSubscribers, lastCampaign, campaigns] = await Promise.all([
      prisma.newsletterSub.count({ where: { isActive: true } }),
      prisma.newsletterCampaign.findFirst({
        orderBy: { sentAt: "desc" },
        select: {
          id: true,
          subject: true,
          segment: true,
          recipientCount: true,
          sentAt: true,
          status: true,
        },
      }),
      prisma.newsletterCampaign.findMany({
        take: 10,
        orderBy: { sentAt: "desc" },
        select: {
          id: true,
          subject: true,
          segment: true,
          recipientCount: true,
          sentAt: true,
          status: true,
        },
      }),
    ]);

    return successResponse({
      totalSubscribers,
      lastCampaign,
      campaigns,
    });
  } catch (err: any) {
    console.error("[ADMIN NEWSLETTER STATS]", err);
    return errorResponse("Failed to fetch newsletter stats", 500);
  }
}
