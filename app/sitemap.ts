import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aisidehustle.ng";

  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  let courses: { slug: string; updatedAt: Date }[] = [];
  let tools: { slug: string; updatedAt: Date }[] = [];

  try {
    [blogPosts, courses, tools] = await Promise.all([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.course.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.tool.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
  } catch {
    // Database unavailable during build — return static routes only
  }

  const staticRoutes = [
    "",
    "/blog",
    "/courses",
    "/tools-db",
    "/ai-radar",
    "/playbooks",
    "/e-books",
    "/support",
    "/saved-articles",
    "/settings",
    "/profile",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools-db/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...courseEntries, ...toolEntries];
}
