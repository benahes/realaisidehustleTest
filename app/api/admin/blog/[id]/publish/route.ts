import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

// PATCH /api/admin/blog/[id]/publish — toggle publish status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const published = typeof body.published === "boolean" ? body.published : undefined;

    if (published === undefined) {
      return errorResponse("Missing 'published' field in body", 400);
    }

    const blog = await prisma.blogPost.update({
      where: { id },
      data: { published },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
      },
    });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await logAudit(
      published ? "BLOG_PUBLISH" : "BLOG_UNPUBLISH",
      { blogId: blog.id, title: blog.title, slug: blog.slug },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      }
    );

    return successResponse({
      blog,
      message: published ? "Blog published successfully" : "Blog unpublished",
    });
  } catch (err: any) {
    if (err.code === "P2025") return errorResponse("Blog not found", 404);
    console.error("[ADMIN BLOG PUBLISH]", err);
    return errorResponse("Failed to update publish status", 500);
  }
}
