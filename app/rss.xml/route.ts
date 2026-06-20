import { prisma } from "@/lib/prisma";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aisidehustle.ng";

  let posts: {
    title: string;
    slug: string;
    excerpt: string;
    createdAt: Date;
    author: { name: string | null; email: string } | null;
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        createdAt: true,
        author: { select: { name: true, email: true } },
      },
    });
  } catch {
    // Database unavailable — return empty RSS feed
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Side Hustle</title>
    <link>${baseUrl}</link>
    <description>Build income streams with AI.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>${escapeXml(post.author?.email || "hello@aisidehustle.ng")}</author>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
