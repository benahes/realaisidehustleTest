import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/blog — list ALL blog posts (drafts + published) with author
export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 10));
    const status = searchParams.get("status"); // 'published', 'draft', or null for all
    const search = searchParams.get("search");
    const section = searchParams.get("section"); // BLOG, AI_RADAR, TOOLS_DB, PLAYBOOKS, COURSES

    const where: any = {};
    if (status === "published") where.published = true;
    if (status === "draft") where.published = false;
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
          authorId: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              name: true,
              email: true,
            },
          },
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
    console.error("[ADMIN BLOG GET]", err);
    return errorResponse("Failed to fetch blogs", 500);
  }
}
