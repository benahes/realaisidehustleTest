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
import { aiRateLimit } from "@/lib/rate-limit";
import { ZodError } from "zod";

// GET /api/blog — list published blogs (public)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get("limit")) || 10),
    );
    const category = searchParams.get("category");
    const section = searchParams.get("section"); // BLOG, AI_RADAR, TOOLS_DB, PLAYBOOKS, COURSES
    const search = searchParams.get("search");

    const where: any = { published: true };
    if (category) where.category = category;
    if (section) where.section = section;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const [blogs, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          section: true,
          category: true,
          tags: true,
          published: true,
          aiGenerated: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return successResponse({
      blogs,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    console.error("[BLOG GET]", err);
    return errorResponse("Failed to fetch blogs", 500);
  }
}

// POST /api/blog — create blog (admin)
export async function POST(req: NextRequest) {
  let auth;
  try {
    auth = await requireAdmin();
  } catch (err: any) {
    console.error("[BLOG POST AUTH]", err);
    return errorResponse("Authentication check failed", 500);
  }
  if ("error" in auth) return auth.error;

  try {
    // Rate limit AI generation if flagged
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed } = await aiRateLimit(clientIp);
    if (!allowed) {
      return errorResponse("Rate limit exceeded", 429);
    }

    const body = await validateBody(req, BlogPostSchema);

    const blog = await prisma.blogPost.create({
      data: {
        ...body,
        authorId: auth.dbUser.id,
      },
    });

    await logAudit(
      "BLOG_CREATE",
      { blogId: blog.id, title: blog.title },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse(blog, 201);
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    if (err.code === "P2002") return errorResponse("Slug already exists", 409);
    console.error("[BLOG POST]", err);
    const details = err?.message || String(err);
    return errorResponse("Failed to create blog", 500, details);
  }
}
