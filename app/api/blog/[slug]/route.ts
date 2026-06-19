import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { BlogPostSchema } from "@/lib/zod/schemas";
import {
  successResponse,
  errorResponse,
  validateBody,
  handleZodError,
} from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { ZodError } from "zod";

// GET /api/blog/[slug] — single blog (public)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blog || !blog.published) {
      return errorResponse("Blog not found", 404);
    }

    return successResponse(blog);
  } catch (err: any) {
    console.error("[BLOG SLUG GET]", err);
    return errorResponse("Failed to fetch blog", 500);
  }
}

// PUT /api/blog/[slug] — update blog (admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { slug } = await params;
    const body = await validateBody(req, BlogPostSchema.partial());

    const updated = await prisma.blogPost.update({
      where: { slug },
      data: body,
    });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await logAudit(
      "BLOG_UPDATE",
      { blogId: updated.id, slug },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse(updated);
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    if (err.code === "P2025") return errorResponse("Blog not found", 404);
    console.error("[BLOG SLUG PUT]", err);
    return errorResponse("Failed to update blog", 500);
  }
}

// DELETE /api/blog/[slug] — delete blog (admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { slug } = await params;
    const blog = await prisma.blogPost.delete({
      where: { slug },
    });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await logAudit(
      "BLOG_DELETE",
      { blogId: blog.id, slug },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse({ deleted: true, id: blog.id });
  } catch (err: any) {
    if (err.code === "P2025") return errorResponse("Blog not found", 404);
    console.error("[BLOG SLUG DELETE]", err);
    return errorResponse("Failed to delete blog", 500);
  }
}
