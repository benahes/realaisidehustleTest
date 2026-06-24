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

// GET /api/courses — list published courses (public)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get("limit")) || 10),
    );

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          price: true,
          currency: true,
          thumbnail: true,
          pdfUrl: true,
          isPublished: true,
          createdAt: true,
        },
      }),
      prisma.course.count({ where: { isPublished: true } }),
    ]);

    return successResponse({
      courses,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    console.error("[COURSES GET]", err);
    return errorResponse("Failed to fetch courses", 500);
  }
}

// POST /api/courses — create course (admin)
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await validateBody(req, CourseSchema);
    const course = await prisma.course.create({ data: body });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await logAudit(
      "COURSE_CREATE",
      { courseId: course.id, title: course.title },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse(course, 201);
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    if (err.code === "P2002") return errorResponse("Slug already exists", 409);
    console.error("[COURSES POST]", err);
    return errorResponse("Failed to create course", 500);
  }
}
