import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CourseSchema } from "@/lib/zod/schemas";
import {
  successResponse,
  errorResponse,
  validateBody,
  handleZodError,
} from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { ZodError } from "zod";

// GET /api/courses/[id] — single course (public preview, full if purchased)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: { orderBy: { order: "asc" } },
        _count: { select: { purchases: true } },
      },
    });

    if (!course || !course.isPublished) {
      return errorResponse("Course not found", 404);
    }

    // Return preview for non-purchasers (modules stripped of video URLs)
    const { searchParams } = new URL(req.url);
    const preview = searchParams.get("preview") === "true";

    if (preview) {
      return successResponse({
        ...course,
        modules: course.modules.map((m) => ({ ...m, videoUrl: null })),
      });
    }

    return successResponse(course);
  } catch (err: any) {
    console.error("[COURSE GET]", err);
    return errorResponse("Failed to fetch course", 500);
  }
}

// PUT /api/courses/[id] — update course (admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await params;
    const body = await validateBody(req, CourseSchema.partial());

    const updated = await prisma.course.update({
      where: { id },
      data: body,
    });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await logAudit(
      "COURSE_UPDATE",
      { courseId: id, title: updated.title },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse(updated);
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    if (err.code === "P2025") return errorResponse("Course not found", 404);
    console.error("[COURSE PUT]", err);
    return errorResponse("Failed to update course", 500);
  }
}

// DELETE /api/courses/[id] — delete course (admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await params;
    const course = await prisma.course.delete({ where: { id } });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await logAudit(
      "COURSE_DELETE",
      { courseId: id, title: course.title },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse({ deleted: true, id: course.id });
  } catch (err: any) {
    if (err.code === "P2025") return errorResponse("Course not found", 404);
    console.error("[COURSE DELETE]", err);
    return errorResponse("Failed to delete course", 500);
  }
}
