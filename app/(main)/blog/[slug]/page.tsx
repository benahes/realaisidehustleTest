import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true, avatarUrl: true },
        },
      },
    });
    return blog;
  } catch (err: any) {
    console.error("[BLOG POST GET]", err);
    throw new Error(err?.message || String(err));
  }
}

async function getRelatedPosts(currentId: string, category: string, section: string) {
  return prisma.blogPost.findMany({
    where: {
      published: true,
      id: { not: currentId },
      OR: [{ category }, { section }],
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

function timeAgo(dateStr: string) {
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

function shareUrl(platform: "twitter" | "linkedin" | "whatsapp", url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  }
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

  const related = await getRelatedPosts(blog.id, blog.category, blog.section);
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
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-5 pt-[84px] sm:pt-[90px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant mb-3 sm:mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href={`/${blog.section.toLowerCase().replace("_", "-")}`} className="hover:text-primary transition-colors uppercase">
          {blog.section.replace("_", " ")}
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface truncate max-w-[200px]">{blog.title}</span>
      </nav>

      {/* Article Header */}
      <article className="space-y-4 sm:space-y-6">
        {/* Title & Meta */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-primary-container/20 text-primary border border-primary/30 px-2 py-0.5 rounded-sm font-label-caps text-[11px] sm:text-[13px] uppercase tracking-widest">
              {blog.category}
            </span>
            <span className="text-on-surface-variant text-xs sm:text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {rTime} min read
            </span>
            <span className="text-on-surface-variant text-xs sm:text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {new Date(blog.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h1 className="font-h1 text-xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight">
            {blog.title}
          </h1>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-3xl">
            {blog.excerpt}
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-outline-variant/30">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary-container/30 flex items-center justify-center text-primary font-bold text-sm sm:text-base overflow-hidden">
            {blog.author?.avatarUrl ? (
              <Image src={blog.author.avatarUrl} alt={blog.author.name || ""} width={44} height={44} className="w-full h-full object-cover" />
            ) : (
              blog.author?.name?.charAt(0).toUpperCase() || "A"
            )}
          </div>
          <div>
            <p className="text-white text-sm sm:text-base font-medium">{blog.author?.name || blog.author?.email || "Anonymous"}</p>
            <p className="text-on-surface-variant text-xs sm:text-sm">{timeAgo(blog.createdAt)}</p>
          </div>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-outline-variant/30">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 space-y-6">
            <div
              className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-white prose-headings:font-h2 prose-p:text-on-surface-variant prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-primary prose-pre:bg-surface-container prose-pre:border prose-pre:border-outline-variant/30 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/30">
                <span className="text-on-surface-variant text-xs sm:text-sm font-medium">Tags:</span>
                {blog.tags.map((tag) => (
                  <span key={tag} className="bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm px-2 py-0.5 text-xs sm:text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
              <span className="text-on-surface-variant text-xs sm:text-sm font-medium">Share:</span>
              <a
                href={shareUrl("twitter", postUrl, blog.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={shareUrl("linkedin", postUrl, blog.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={shareUrl("whatsapp", postUrl, blog.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.59 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(postUrl)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-colors"
                aria-label="Copy link"
                title="Copy link"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] sm:text-[18px]">link</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-gutter">
            {/* Related Posts */}
            {related.length > 0 && (
              <div className="glass-panel rounded-xl p-3 sm:p-5 border border-outline-variant/20">
                <h3 className="font-h2 text-sm sm:text-base text-white uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] sm:text-[18px]">auto_stories</span>
                  Related
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {related.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                        {post.coverImage ? (
                          <Image src={post.coverImage} alt={post.title} width={80} height={80} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">article</span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white text-xs sm:text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-on-surface-variant text-[11px] sm:text-xs mt-1">{timeAgo(post.createdAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="bg-primary-container/5 border border-primary/20 rounded-xl p-3 sm:p-5">
              <h3 className="font-h2 text-sm sm:text-base text-white uppercase tracking-wider mb-2 sm:mb-3">
                Stay Updated
              </h3>
              <p className="text-on-surface-variant text-xs sm:text-sm mb-3 sm:mb-4">
                Get the latest AI tools, playbooks, and radar signals delivered to your inbox.
              </p>
              <Link
                href="/"
                className="w-full bg-primary text-on-primary py-2 rounded-lg font-label-caps text-xs sm:text-sm uppercase text-center block hover:brightness-110 transition-all"
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
