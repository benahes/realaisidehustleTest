"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  thumbnail: string | null;
  isPublished: boolean;
  createdAt: string;
}

export default function CoursesClient() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");

  useEffect(() => {
    fetch("/api/courses?limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCourses(data.data.courses);
      })
      .finally(() => setLoading(false));
  }, []);

  const displayed = activeTab === "ALL" ? courses.slice(0, 6) : [];

  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge flex flex-col gap-2 sm:gap-gutter pb-3 sm:pb-5">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 sm:mb-4 gap-2 sm:gap-4">
        <div>
          <h1 className="font-h1 text-base sm:text-[24px] text-white mb-0.5 sm:mb-1">Learning Repository</h1>
          <p className="text-on-surface-variant text-xs sm:text-[14px]">Tracking {courses.length} concurrent intelligence training modules</p>
        </div>
        <div className="flex gap-1 sm:gap-2 p-1 sm:p-1.5 glass-panel rounded-lg">
          <button onClick={() => setActiveTab("ALL")} className={`${activeTab === "ALL" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-primary"} px-2 sm:px-3 py-0.5 sm:py-1 font-label-caps uppercase text-[10px] sm:text-[13px] rounded-sm transition-colors`}>All Courses</button>
          <button onClick={() => setActiveTab("IN_PROGRESS")} className={`${activeTab === "IN_PROGRESS" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-primary"} px-2 sm:px-3 py-0.5 sm:py-1 font-label-caps uppercase text-[10px] sm:text-[13px] rounded-sm transition-colors`}>In Progress</button>
          <button onClick={() => setActiveTab("COMPLETED")} className={`${activeTab === "COMPLETED" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-primary"} px-2 sm:px-3 py-0.5 sm:py-1 font-label-caps uppercase text-[10px] sm:text-[13px] rounded-sm transition-colors`}>Completed</button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-gutter">
        {loading ? (
          <>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-surface-container border border-outline-variant/30 rounded-xl animate-pulse" />
            ))}
          </>
        ) : displayed.length > 0 ? (
          <>
            {displayed.map((course) => {
              const priceDisplay = course.currency === "NGN"
                ? `₦${(course.price / 100).toLocaleString()}`
                : `$${(course.price / 100).toFixed(2)}`;
              return (
                <div key={course.id} className="glass-panel group overflow-hidden flex flex-col rounded-xl border border-outline-variant/30">
                  <Link href={`/courses/${course.slug}`} className="flex flex-col flex-grow">
                    <div className="h-24 sm:h-40 w-full relative overflow-hidden">
                      <Image
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        alt={course.title}
                        fill
                        src={course.thumbnail || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM0MTU1Ii8+PC9zdmc+"}
                      />
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                        <div className="bg-slate-950/80 px-1.5 py-0.5 sm:px-2.5 rounded-sm border border-primary/30 text-primary font-mono-data text-[10px] sm:text-[13px]">
                          {course.price === 0 ? "FREE" : priceDisplay}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 sm:p-4 flex flex-col flex-grow">
                      <div className="flex items-start gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"></div>
                        <h3 className="font-h2 text-sm sm:text-[18px] font-bold leading-tight text-white">{course.title}</h3>
                      </div>
                      <p className="text-on-surface-variant text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">{course.description}</p>
                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-1 sm:mb-2">
                          <span className="font-label-caps text-[11px] sm:text-[13px] uppercase text-outline">Delivery</span>
                          <span className="font-mono-data text-xs sm:text-[15px] text-primary font-bold">PDF via Email</span>
                        </div>
                        <div className="w-full h-1 sm:h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary-container transition-all" style={{ width: "0%" }}></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-outline-variant/30 grid grid-cols-2">
                    <Link href={`/courses/${course.slug}`} className="py-1.5 sm:py-3 text-center font-label-caps text-[10px] sm:text-[13px] uppercase border-r border-outline-variant/30 hover:bg-primary-container hover:text-white transition-colors">View Course</Link>
                    <Link href={`/courses/${course.slug}`} className="py-1.5 sm:py-3 text-center font-label-caps text-[10px] sm:text-[13px] uppercase bg-primary-container/10 text-primary hover:bg-primary-container hover:text-white transition-colors font-bold">Enroll</Link>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-on-surface-variant text-sm border border-outline-variant/30 rounded-xl bg-surface-container">
            <span className="material-symbols-outlined text-4xl mb-2">school</span>
            <p>
              {activeTab === "ALL"
                ? "No courses available yet."
                : activeTab === "IN_PROGRESS"
                ? "No courses in progress."
                : "No completed courses yet."}
            </p>
            <p className="text-xs mt-1">
              {activeTab === "ALL"
                ? "Create a course in the admin dashboard to see it here."
                : "Enroll in a course to track your progress here."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
