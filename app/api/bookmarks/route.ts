import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const BookmarkSchema = z.object({
  blogPostId: z.string().min(1),
});

// GET /api/bookmarks — list user's bookmarks
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: { id: true },
    });
    if (!dbUser) return errorResponse("User not found", 404);

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      include: {
        blogPost: {
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            section: true,
            category: true,
            tags: true,
            createdAt: true,
          },
        },
      },
    });

    const data = bookmarks.map((b) => ({
      id: b.blogPost.id,
      title: b.blogPost.title,
      slug: b.blogPost.slug,
      excerpt: b.blogPost.excerpt,
      coverImage: b.blogPost.coverImage,
      section: b.blogPost.section,
      category: b.blogPost.category,
      tags: b.blogPost.tags,
      createdAt: b.blogPost.createdAt,
      bookmarkId: b.id,
    }));

    return successResponse({ bookmarks: data });
  } catch (err: any) {
    console.error("[BOOKMARKS GET]", err);
    return errorResponse("Failed to fetch bookmarks", 500);
  }
}

// POST /api/bookmarks — create a bookmark
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: { id: true },
    });
    if (!dbUser) return errorResponse("User not found", 404);

    const body = await req.json();
    const parsed = BookmarkSchema.safeParse(body);
    if (!parsed.success) return errorResponse("Invalid blogPostId", 400);

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_blogPostId: {
          userId: dbUser.id,
          blogPostId: parsed.data.blogPostId,
        },
      },
    });
    if (existing) return errorResponse("Already bookmarked", 409);

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: dbUser.id,
        blogPostId: parsed.data.blogPostId,
      },
    });

    return successResponse({ bookmark }, 201);
  } catch (err: any) {
    console.error("[BOOKMARKS POST]", err);
    return errorResponse("Failed to create bookmark", 500);
  }
}

// DELETE /api/bookmarks — remove a bookmark by blogPostId
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: { id: true },
    });
    if (!dbUser) return errorResponse("User not found", 404);

    const { searchParams } = new URL(req.url);
    const blogPostId = searchParams.get("blogPostId");
    if (!blogPostId) return errorResponse("blogPostId required", 400);

    await prisma.bookmark.deleteMany({
      where: {
        userId: dbUser.id,
        blogPostId,
      },
    });

    return successResponse({ deleted: true });
  } catch (err: any) {
    console.error("[BOOKMARKS DELETE]", err);
    return errorResponse("Failed to remove bookmark", 500);
  }
}
