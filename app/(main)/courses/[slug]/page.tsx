import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CourseEnrollClient from "../../_components/CourseEnrollClient";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string) {
  return prisma.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      modules: { orderBy: { order: "asc" } },
    },
  });
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "Not Found — AI Side Hustle" };
  return {
    title: `${course.title} — AI Side Hustle`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const priceDisplay = course.currency === "NGN"
    ? `₦${(course.price / 100).toLocaleString()}`
    : `$${(course.price / 100).toFixed(2)}`;

  const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL || ""}/courses/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    image: course.thumbnail || undefined,
    url: courseUrl,
    provider: {
      "@type": "Organization",
      name: "AI Side Hustle",
      sameAs: process.env.NEXT_PUBLIC_APP_URL || undefined,
    },
    hasCourseInstance: course.price > 0
      ? {
          "@type": "CourseInstance",
          courseMode: "online",
          offers: {
            "@type": "Offer",
            price: (course.price / 100).toFixed(2),
            priceCurrency: course.currency,
            availability: "https://schema.org/InStock",
            url: courseUrl,
          },
        }
      : undefined,
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
        <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface truncate max-w-[200px]">{course.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Content */}
        <section className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-2 sm:space-y-3">
            <span className="bg-primary-container/20 text-primary border border-primary/30 px-2 py-0.5 rounded-sm font-label-caps text-[11px] sm:text-[13px] uppercase tracking-widest">
              COURSE
            </span>
            <h1 className="font-h1 text-xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight">
              {course.title}
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>

          {/* Cover */}
          {course.thumbnail && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-outline-variant/30">
              <Image src={course.thumbnail} alt={course.title} fill className="object-cover" priority unoptimized />
            </div>
          )}

          {/* Modules */}
          <div className="glass-panel rounded-xl border border-outline-variant/20 p-3 sm:p-5">
            <h2 className="font-h2 text-sm sm:text-base text-white uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[16px] sm:text-[18px]">menu_book</span>
              Curriculum
            </h2>
            {course.modules.length > 0 ? (
              <div className="space-y-2 sm:space-y-3">
                {course.modules.map((mod, i) => (
                  <div key={mod.id} className="flex items-start gap-3 p-2 sm:p-3 rounded-lg bg-surface-container-high/50 border border-outline-variant/10">
                    <span className="font-mono-data text-primary text-xs sm:text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-white text-sm sm:text-base font-medium">{mod.title}</h3>
                      <p className="text-on-surface-variant text-xs sm:text-sm">{mod.duration ? `${mod.duration} mins` : "Self-paced"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant text-sm">Modules will be published soon.</p>
            )}
          </div>
        </section>

        {/* Sidebar — Purchase Card */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 glass-panel rounded-xl border border-outline-variant/20 p-3 sm:p-5 space-y-4 sm:space-y-5">
            <div>
              <span className="text-on-surface-variant text-xs sm:text-sm font-label-caps uppercase tracking-widest">Price</span>
              <div className="text-2xl sm:text-3xl font-mono-data text-white tracking-tight mt-1">
                {priceDisplay}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                <span>{course.modules.length} modules</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                <span>Certificate on completion</span>
              </div>
            </div>

            <CourseEnrollClient courseId={course.id} price={course.price} currency={course.currency} title={course.title} />
          </div>
        </aside>
      </div>
    </main>
  );
}
