export const metadata = {
    title: 'My Courses ΓÇö AI Side Hustle',
    description: 'Learning Repository',
};

const STATS = {
    accuracy: '92.4%',
    trainingTime: '128h',
    certifications: '04',
    rank: 'TOP 0.4%',
};

const COURSES = [
    {
        id: 1,
        title: 'Neural Architecture & LLM Scaling Laws',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-1CmY1IzYWmKQU1hRJXPJCVXuFyTylbie4N3qDQh2O3HWnWCGFct3DXhInvsUTnJ7eRr9UYgdQ8FHDD16yJ8u_k08t1uyfi5OTzLj-39GaG0hAyolrycDRV7JDp7BJ7p8MakjZbnpzWak5iYEHRAazCVNFkVSCZV29Nd4L956sVPH7lEgkOqmdkWnN1BgvM_TZEtdbqJb5PfeQyaHMdiZtfQpjTgDj59bEOLLZeVpELR2Ryxs98esyd-tbRYJim5HIw7wXZWLXbjw',
        imageAlt: 'Abstract digital rendering of a neural network...',
        badge: 'L3 ΓÇó ADVANCED',
        timeRemaining: '04h 22m',
        nextMilestone: 'Module 07',
        progress: 68,
    },
    {
        id: 2,
        title: 'Prompt Engineering for Enterprise RAG',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA89lNDxQOj6Ub8HW9YYuY95MUcVB0irzKRX7z5htfWl6ge9QHo9pAA3IXY1HzYe9YCnnMeRSlIJpm9_vNo156n7e51i5L0k4OAOqAiz3736ZBJJKg4Cxdvt3H93HZLKHWyJV2KQG_-PxZMpU2JAQEes-a25qIVz9dAo08UTbbKXf0Iy6lvi5u8u3pzn0UgN3JBWr8nit-TGbXpCqf3z9_qwoBA5-Tio20QghxL59964yDJZ42wHaItQ-2o8yBxaOshNQ9nQQLWX3sY',
        imageAlt: 'Macro photography of a high-tech processor chip...',
        badge: 'L2 ΓÇó INTERMEDIATE',
        timeRemaining: '12h 45m',
        nextMilestone: 'Lab 03',
        progress: 12,
    },
    {
        id: 3,
        title: 'Vector Database Optimization Protocols',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBflp34g1esCre_U4dfTR5JtV0dXXYj_SnIB3hpnJbj3KQpI4Nc7rtIOp5Yqf8Y4bPetGtbG8nE-yHLk_FVtf0XaCLYBiTVIb1D16kxQZCeQnLaTE3Tpj6JXRJW-XprdP1rDZJ08597m3x6Fg1usfq57FyXU5tyugz-nxpZ7Yyxm04TOfM3RRlIL6d7xknke6y0992E4OrzGQia7wkSlkd7m3QFU0ixzaFFp5Me7KL9mKmhnrJbXgBrWtE95kgpxIWoEQkLhFeXmE6u',
        imageAlt: 'Digital art representing data streams flowing...',
        badge: 'L4 ΓÇó EXPERT',
        timeRemaining: '01h 10m',
        nextMilestone: 'Final Exam',
        progress: 94,
    },
    {
        id: 4,
        title: 'AI Deployment Pipelines with Docker',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiRtMdlAPPlR7FqYqK9D8QT2WFtZh2-sbxwPbOsefJTE9ydyIjeR7l2RkMwgpvB8auQ-6zSnaZ9Y4RE23no2rz4TazofuF1UE0YypI4UeNto1xxw_anHw4wlEI2yk6igHxz4QZdD4WEFGp9ATznhMf7O5J4AJf_0FGSl9uju6MDjrxLarsVqkqBgiXi2pG3t0EC7GhqfNzvNYXeY1QNT2tMB6j0N2zDiaoSKiT_KvfaeQDPRWlnbvChMgGUyI9Rm6mxpWKeMJF-9qS',
        imageAlt: 'A futuristic server room environment...',
        badge: 'L1 ΓÇó BEGINNER',
        timeRemaining: '08h 00m',
        nextMilestone: 'Module 02',
        progress: 35,
    },
    {
        id: 5,
        title: 'Multi-Modal Latent Space Diffusion',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArq7coTxuLMLrX-qRRiCEafISCh00qcWRee4EL_784W5tWl5o5FF5odX5blKMX15hj9Oq6pdMpjthCvbS8d-DBJ_vvzaHk5Ft8t-_QxUXQgbMNX20pXKgMQBfWVc4OL4NE2dfeB1hyQXAgneGP2nH6UcaYO53-jgyFzwtgdsnQ5HaXNdzj_vOuUVx0XZFN3N_6cqJ0qtCBhxJIbfl0f1fB0ewJx9XUP6bXIGXDE39QLaNAkcqIj4K5w8t7mRk2KLnptxg8X2wIuU_V',
        imageAlt: 'Close-up of a 3D glass cube structure...',
        badge: 'L5 ΓÇó RESEARCH',
        timeRemaining: '48h 00m',
        nextMilestone: 'Thesis',
        progress: 5,
    },
    {
        id: 6,
        title: 'Adversarial Attacks on LLM Systems',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUie-fgkmGzB2XAmj_MAn9_G4cCCuz0sQCBNrtOziahvg7TjO0tkcqwuBnUE7ls0UoT6AG_uiWo7feFmdNNWU4mDqclZyFM0KE1hDJhZPxkUVNyTrshFKUjBVqtbtJA6lIdaBJsBdEzfJu7TJdWcEWNablvVJ6hHtlS9HI_KwIDhPczywz409z5cFn1fMLIS9Bks_18OcqpKC_o7DkZY6hSHz67wcTKvGjcSlDjLbvkDH_d6L-h-enzojtXC88jdGu3EbsYD-wdPBc',
        imageAlt: 'Digital encryption interface...',
        badge: 'L3 ΓÇó ADVANCED',
        timeRemaining: '03h 40m',
        nextMilestone: 'Lab 05',
        progress: 72,
    },
];

export default function CoursesPage() {
    return (
        <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge flex flex-col gap-2 sm:gap-gutter pb-3 sm:pb-5">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 sm:mb-4 gap-2 sm:gap-4">
                <div>
                    <h1 className="font-h1 text-base sm:text-[24px] text-white mb-0.5 sm:mb-1">Learning Repository</h1>
                    <p className="text-on-surface-variant text-xs sm:text-[14px]">Tracking 14 concurrent intelligence training modules</p>
                </div>
                {/* Sticky Tab Nav Simulation */}
                <div className="flex gap-1 sm:gap-2 p-1 sm:p-1.5 glass-panel rounded-lg">
                    <button className="bg-primary-container text-on-primary-container px-2 sm:px-3 py-0.5 sm:py-1 font-label-caps uppercase text-[10px] sm:text-[13px] rounded-sm">In Progress</button>
                    <button className="bg-surface-container text-on-surface-variant px-2 sm:px-3 py-0.5 sm:py-1 font-label-caps text-[10px] sm:text-[13px] uppercase rounded-sm hover:text-primary transition-colors">Completed</button>
                    <button className="bg-surface-container text-on-surface-variant px-2 sm:px-3 py-0.5 sm:py-1 font-label-caps text-[10px] sm:text-[13px] uppercase rounded-sm hover:text-primary transition-colors">Not Started</button>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-gutter">
                {COURSES.slice(0, 4).map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}

                {/* Bento Card: Intelligence Stats */}
                <div className="lg:col-span-2 glass-panel p-2.5 sm:p-5 flex flex-col justify-between rounded-xl border border-outline-variant/30">
                    <div>
                        <h4 className="font-label-caps text-on-surface-variant uppercase tracking-widest text-xs sm:text-[15px] mb-2 sm:mb-5">Knowledge Retention Analytics</h4>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                            <div>
                                <div className="text-base sm:text-[24px] font-mono-data text-primary">{STATS.accuracy}</div>
                                <div className="text-xs sm:text-[13px] font-label-caps uppercase text-outline mt-0.5 sm:mt-1! ">Accuracy Rate</div>
                            </div>
                            <div>
                                <div className="text-base sm:text-[24px] font-mono-data text-white">{STATS.trainingTime}</div>
                                <div className="text-xs sm:text-[13px] font-label-caps uppercase text-outline mt-0.5 sm:mt-1! ">Training Time</div>
                            </div>
                            <div>
                                <div className="text-base sm:text-[24px] font-mono-data text-tertiary">{STATS.certifications}</div>
                                <div className="text-xs sm:text-[13px] font-label-caps uppercase text-outline mt-0.5 sm:mt-1! ">Certifications</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-outline-variant/30">
                        <div className="flex items-center justify-between font-mono-data">
                            <span className="text-on-surface-variant text-xs sm:text-[13px]">Global Performance Rank</span>
                            <span className="text-primary text-right font-bold text-xs sm:text-[15px]">{STATS.rank}</span>
                        </div>
                    </div>
                </div>

                {COURSES.slice(4).map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </main>
    );
}

function CourseCard({ course }: { course: typeof COURSES[0] }) {
    return (
        <div className="glass-panel group overflow-hidden flex flex-col rounded-xl border border-outline-variant/30">
            <div className="h-24 sm:h-40 w-full relative overflow-hidden">
                <img
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    alt={course.imageAlt}
                    src={course.imageSrc}
                />
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                    <div className="bg-slate-950/80 px-1.5 py-0.5 sm:px-2.5 rounded-sm border border-purple-500/30 text-primary font-mono-data text-[10px] sm:text-[13px]">
                        {course.badge}
                    </div>
                </div>
            </div>
            <div className="p-2 sm:p-4 flex flex-col flex-grow">
                <div className="flex items-start gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"></div>
                    <h3 className="font-h2 text-sm sm:text-[18px] font-bold leading-tight text-white">{course.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2 sm:mb-5">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] sm:text-[13px] text-on-surface-variant uppercase tracking-widest font-label-caps">Time Remaining</span>
                        <span className="font-mono-data text-xs sm:text-[15px] text-slate-300">{course.timeRemaining}</span>
                    </div>
                    <div className="flex flex-col text-right gap-0.5">
                        <span className="text-[11px] sm:text-[13px] text-on-surface-variant uppercase tracking-widest font-label-caps">Next Milestone</span>
                        <span className="font-mono-data text-xs sm:text-[15px] text-primary">{course.nextMilestone}</span>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-label-caps text-[11px] sm:text-[13px] uppercase text-outline">Progress</span>
                        <span className="font-mono-data text-xs sm:text-[15px] text-primary font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1 sm:h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container transition-all" style={{ width: `${course.progress}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="border-t border-outline-variant/30 grid grid-cols-2">
                <button className="py-1.5 sm:py-3 text-center font-label-caps text-[10px] sm:text-[13px] uppercase border-r border-outline-variant/30 hover:bg-primary-container hover:text-white transition-colors">Course Deck</button>
                <button className="py-1.5 sm:py-3 text-center font-label-caps text-[10px] sm:text-[13px] uppercase bg-primary-container/10 text-primary hover:bg-primary-container hover:text-white transition-colors font-bold">Resume</button>
            </div>
        </div>
    );
}