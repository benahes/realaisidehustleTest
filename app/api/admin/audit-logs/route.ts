import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuditLogQuerySchema } from "@/lib/zod/schemas";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireSuperAdmin } from "@/lib/auth";

// GET /api/admin/audit-logs — view audit trail (super admin)
export async function GET(req: NextRequest) {
  const auth = await requireSuperAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit")) || 20),
    );
    const action = searchParams.get("action") || undefined;

    const where: any = {};
    if (action) where.action = action;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { email: true, name: true, role: true } },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return successResponse({
      logs,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    console.error("[AUDIT LOGS]", err);
    return errorResponse("Failed to fetch audit logs", 500);
  }
}
