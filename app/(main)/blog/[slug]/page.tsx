import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import ReadingProgress from "./ReadingProgress";
import TableOfContents from "./TableOfContents";
import ArticleBody from "./ArticleBody";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
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
          select: { id: true, name: true, email: true, avatarUrl: true },
        },
      },
    });
    return blog;
  } catch (err: any) {
    console.error("[BLOG POST GET]", err);
    return null;
  }
}

async function getRelatedPosts(currentId: string, category: string) {
  try {
    return await prisma.blogPost.findMany({
      where: {
        published: true,
        id: { not: currentId },
        category,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        createdAt: true,
        author: { select: { name: true } },
      },
    });
  } catch (err: any) {
    console.error("[RELATED POSTS]", err);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await getBlogPost(slug);
    if (!blog || !blog.published) {
      return { title: "Not Found — AI Side Hustle" };
    }
    return {
      title: `${blog.title} — AI Side Hustle`,
      description: blog.excerpt || blog.title,
      openGraph: blog.coverImage
        ? {
            images: [{ url: blog.coverImage }],
          }
        : undefined,
    };
  } catch {
    return { title: "Error — AI Side Hustle" };
  }
}

function timeAgo(dateStr: string | Date) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function readTime(content: string) {
  const words = content?.split(/\s+/).filter(Boolean).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let blog;
  try {
    blog = await getBlogPost(slug);
  } catch (err: any) {
    return (
      <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-5 pt-[84px] sm:pt-[90px]">
        <div className="bg-error/10 border border-error/30 rounded-xl p-6 text-error">
          <h1 className="font-h1 text-xl mb-2">Failed to load post</h1>
          <p className="text-sm opacity-80">{err?.message || String(err)}</p>
        </div>
      </main>
    );
  }

  if (!blog || !blog.published) {
    notFound();
  }

  const related = await getRelatedPosts(blog.id, blog.category);
  const htmlContent = markdownToHtml(blog.content || "");
  const hasToc = /<h[23]\b/i.test(htmlContent);
  const hasSidebar = hasToc || related.length > 0;
  const rTime = readTime(blog.content || "");
  const postUrl = `${process.env.NEXT_PUBLIC_APP_URL || ""}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || undefined,
    author: {
      "@type": "Person",
      name: blog.author?.name || "AI Side Hustle",
    },
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <main className="max-w-container-max mx-auto px-2 sm:px-3 pb-6 pt-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-2 sm:mb-4 text-[10px] sm:text-body-xs font-mono-data text-outline">
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <Link href={`/blog?category=${encodeURIComponent(blog.category)}`} className="hover:text-primary transition-colors">
          {blog.category}
        </Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="text-on-surface truncate max-w-[180px]">{blog.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-2 sm:gap-gutter">
        {/* Article View */}
        <section className="flex-1 w-full mx-auto lg:mx-0">
          {/* Article Header */}
          <header className="mb-4 sm:mb-6">
            <h1 className="font-h1 text-[22px] sm:text-[32px] lg:text-[40px] leading-tight text-on-surface mb-3 sm:mb-6 tracking-tight">
                {blog.title}
              </h1>
            <div className="flex items-center justify-between border-y border-outline-variant/30 py-2 sm:py-4 flex-wrap gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-outline-variant bg-primary-container/30 flex items-center justify-center text-primary overflow-hidden">
                    {blog.author?.avatarUrl ? (
                      <Image src={blog.author.avatarUrl} alt={blog.author.name || ""} width={40} height={40} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-[10px] sm:text-sm">{blog.author?.name?.charAt(0).toUpperCase() || "A"}</span>
                  )}
                </div>
                <div>
                  <p className="font-h2 text-[10px] sm:text-body-sm text-on-surface">{blog.author?.name || blog.author?.email || "Anonymous"}</p>
                  <p className="text-[9px] sm:text-body-xs text-on-surface-variant">{timeAgo(blog.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-stack-mid">
                <span className="text-[9px] sm:text-body-xs font-mono-data text-outline flex items-center gap-1 mr-2 sm:mr-4">
                  <span className="material-symbols-outlined text-[12px] sm:text-[14px]">schedule</span> {rTime} min read
                </span>
                <button className="p-1 sm:p-1.5 rounded-lg border border-outline-variant hover:bg-surface-variant text-on-surface-variant transition-colors material-symbols-outlined text-[14px] sm:text-[16px]">share</button>
                <button className="p-1 sm:p-1.5 rounded-lg border border-outline-variant hover:bg-surface-variant text-on-surface-variant transition-colors material-symbols-outlined text-[14px] sm:text-[16px]">bookmark</button>
              </div>
            </div>
          </header>

            {/* Cover Image */}
            {blog.coverImage && (
              <div className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-outline-variant/30 mb-4 sm:mb-8 article-shadow">
                <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority unoptimized />
              </div>
            )}

            {/* Article Body */}
            <ArticleBody content={htmlContent} />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-6 mt-4 sm:mt-8 border-t border-outline-variant/30">
                <span className="text-[10px] sm:text-body-xs text-outline font-mono-data uppercase">Tags:</span>
                {blog.tags.map((tag) => (
                <span key={tag} className="bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-body-xs font-medium">
                  {tag}
                </span>
                ))}
              </div>
            )}

            {/* Bottom Post Navigation */}
            <div className="mt-8 sm:mt-16 flex items-stretch border border-outline-variant rounded-lg sm:rounded-xl overflow-hidden bg-surface-container-lowest">
              <div className="flex-1 p-3 sm:p-6 border-r border-outline-variant opacity-50">
                <p className="text-[9px] sm:text-[10px] font-label-caps text-outline uppercase mb-1 sm:mb-2">Previous Entry</p>
                <p className="font-h2 text-[10px] sm:text-body-sm text-on-surface">—</p>
              </div>
              <div className="flex-1 p-3 sm:p-6 opacity-50 text-right">
                <p className="text-[9px] sm:text-[10px] font-label-caps text-outline uppercase mb-1 sm:mb-2">Next Entry</p>
                <p className="font-h2 text-[10px] sm:text-body-sm text-on-surface">—</p>
              </div>
            </div>

            {/* Comments Section */}
            <section className="mt-8 sm:mt-16 pb-4 sm:pb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-8">
                <h2 className="font-h1 text-[16px] sm:text-h1 text-on-surface">Discussion</h2>
                <button className="bg-primary text-on-primary px-2 sm:px-4 py-1 sm:py-1.5 font-label-caps rounded-full text-[10px] sm:text-[12px] flex items-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px]">edit</span> Post Response
                </button>
              </div>
              <p className="text-[10px] sm:text-body-sm text-on-surface-variant">Comments are coming soon.</p>
            </section>
          </section>

        {/* Right Sticky Sidebar */}
        {hasSidebar && (
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 flex flex-col gap-4 sm:gap-8">
              {hasToc && <TableOfContents content={htmlContent} />}

              {/* Related Intelligence */}
              {related.length > 0 && (
                <div className="flex flex-col gap-2 sm:gap-4">
                  <h3 className="text-[10px] font-label-caps text-outline uppercase tracking-widest px-2">Related Intelligence</h3>
                  <div className="space-y-2 sm:space-y-4">
                    {related.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="group cursor-pointer block">
                        <div className="h-24 sm:h-32 w-full rounded-lg overflow-hidden border border-outline-variant mb-1 sm:mb-2 bg-surface-container">
                          {post.coverImage ? (
                            <Image src={post.coverImage} alt={post.title} width={300} height={128} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-on-surface-variant text-[32px]">article</span>
                            </div>
                          )}
                        </div>
                        <h4 className="font-h2 text-body-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                        <p className="text-[10px] font-mono-data text-outline mt-1 uppercase">{post.category} • {timeAgo(post.createdAt)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
