import Image from 'next/image';

export default function EBooksPage() {
    return (
        <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5">

            {/* Digital Library Section */}
            <section className="space-y-2 sm:space-y-4">
                <div className="flex items-end justify-between border-b border-outline-variant/40 pb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-6 bg-primary-container rounded-sm"></div>
                        <h2 className="font-h1 text-[18px] sm:text-[24px] uppercase tracking-tight text-white">Digital Library</h2>
                        <span className="font-mono-data text-primary px-1 sm:px-2 py-0.5 bg-primary-container/10 border border-primary-container/20 rounded-md text-[11px] sm:text-[13px] ml-2">LATEST</span>
                    </div>
                    <button className="font-label-caps text-primary hover:underline text-[13px] sm:text-[15px] font-bold">BROWSE ALL</button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
                    {/* Books Array */}
                    {[
                        { img: 'https://picsum.photos/seed/book1/300/400', tag: 'PREMIUM', category: 'NEURAL ARCHITECTURES', title: 'Vector Embeddings: Master Class', tagColor: 'bg-primary-container text-white' },
                        { img: 'https://picsum.photos/seed/book2/300/400', tag: 'FREE', category: 'BLOCKCHAIN & AI', title: 'Decentralized Intelligence', tagColor: 'bg-slate-800 text-slate-300 border border-slate-700' },
                        { img: 'https://picsum.photos/seed/book3/300/400', tag: 'PREMIUM', category: 'LLM FUNDAMENTALS', title: 'Attention is All You Need', tagColor: 'bg-primary-container text-white' },
                        { img: 'https://picsum.photos/seed/book4/300/400', tag: 'PREMIUM', category: 'AI HARDWARE', title: 'GPU Cluster Guide', tagColor: 'bg-primary-container text-white' },
                        { img: 'https://picsum.photos/seed/book5/300/400', tag: 'FREE', category: 'PROMPT ENGINEERING', title: 'Semantic Framing', tagColor: 'bg-slate-800 text-slate-300 border border-slate-700' },
                        { img: 'https://picsum.photos/seed/book6/300/400', tag: 'PREMIUM', category: 'ENTERPRISE AI', title: 'RAG at Scale', tagColor: 'bg-primary-container text-white' },
                    ].map((book, idx) => (
                        <div key={idx} className="group cursor-pointer flex flex-col">
                            <div className="relative aspect-[3/4] overflow-hidden bg-surface-container rounded-md border border-outline-variant/30 group-hover:border-primary/60 transition-colors shadow-sm">
                                <Image fill className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" src={book.img} alt={book.title} unoptimized />
                                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2">
                                    <span className={`${book.tagColor} font-mono-data text-[11px] sm:text-[13px] px-1 sm:px-2 py-0.5 rounded-sm shadow-sm`}>{book.tag}</span>
                                </div>
                            </div>
                            <div className="mt-2 sm:mt-2.5 flex flex-col gap-1 sm:gap-1.5">
                                <p className="font-label-caps text-slate-500 text-[11px] sm:text-[13px]">{book.category}</p>
                                <h3 className="font-body-sm text-[14px] sm:text-[16px] text-slate-200 leading-tight group-hover:text-primary transition-colors font-medium">{book.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Courses Section */}
            <section className="space-y-2 sm:space-y-4 mt-4 sm:mt-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-outline-variant/40 pb-2 gap-1.5 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-6 bg-primary-container rounded-sm"></div>
                        <h2 className="font-h1 text-[18px] sm:text-[24px] uppercase tracking-tight text-white">Video Courses</h2>
                        <span className="font-mono-data text-primary px-1 sm:px-2 py-0.5 bg-primary-container/10 border border-primary-container/20 rounded-md text-[11px] sm:text-[13px] ml-2">MY LEARNING</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container px-2 py-1 rounded transition-colors">
                        <span className="font-mono-data text-slate-400 text-[13px] sm:text-[15px]">FILTER: DIFFICULTY</span>
                        <span className="material-symbols-outlined text-slate-400 text-[16px] sm:text-[18px]">expand_more</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {/* Course 1 */}
                    <div className="bg-surface-container border border-outline-variant/30 rounded-md overflow-hidden group hover:border-primary/50 transition-colors shadow-sm cursor-pointer flex flex-col">
                        <div className="h-32 sm:h-40 relative">
                            <Image fill className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" src="https://picsum.photos/seed/course1/600/300" alt="Course" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                            <div className="absolute bottom-3 left-3">
                                <span className="bg-primary-container text-white px-1 sm:px-2 py-0.5 text-[11px] sm:text-[13px] font-mono-data uppercase rounded-sm shadow-sm">65% DONE</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-sm">
                                <button className="bg-white text-slate-900 rounded-full p-2 sm:p-2.5 shadow-xl hover:scale-110 transition-transform flex items-center justify-center"><span className="material-symbols-outlined fill-1 text-[20px] sm:text-[24px] ml-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>play_arrow</span></button>
                            </div>
                        </div>
                        <div className="p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 flex-grow">
                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-label-caps text-primary text-[11px] sm:text-[13px] font-bold">ADVANCED MLOPS</p>
                                    <p className="font-mono-data text-slate-500 text-[11px] sm:text-[13px]">12 L / 4.5H</p>
                                </div>
                                <h3 className="font-h2 text-[15px] sm:text-[18px] uppercase text-white leading-tight">Production Transformer Deployments</h3>
                            </div>
                            <div className="mt-auto flex flex-col gap-1.5 sm:gap-2">
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="bg-primary-container h-full rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <p className="font-mono-data text-slate-400 text-[11px] sm:text-[13px]">KUBERNETES ORCHESTRATION</p>
                            </div>
                        </div>
                    </div>

                    {/* Course 2 */}
                    <div className="bg-surface-container border border-outline-variant/30 rounded-md overflow-hidden group hover:border-primary/50 transition-colors shadow-sm cursor-pointer flex flex-col">
                        <div className="h-32 sm:h-40 relative">
                            <Image fill className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" src="https://picsum.photos/seed/course2/600/300" alt="Course" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                            <div className="absolute bottom-3 left-3">
                                <span className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-1 sm:px-2 py-0.5 text-[11px] sm:text-[13px] font-mono-data uppercase rounded-sm shadow-sm backdrop-blur-sm">COMPLETED</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-sm">
                                <button className="bg-white text-slate-900 rounded-full p-2 sm:p-2.5 shadow-xl hover:scale-110 transition-transform flex items-center justify-center"><span className="material-symbols-outlined fill-1 text-[20px] sm:text-[24px] ml-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>play_arrow</span></button>
                            </div>
                        </div>
                        <div className="p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 flex-grow">
                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-label-caps text-primary text-[11px] sm:text-[13px] font-bold">FUNDAMENTALS</p>
                                    <p className="font-mono-data text-slate-500 text-[11px] sm:text-[13px]">8 L / 2.0H</p>
                                </div>
                                <h3 className="font-h2 text-[15px] sm:text-[18px] uppercase text-white leading-tight">Mathematics of Neural Networks</h3>
                            </div>
                            <div className="mt-auto flex flex-col gap-1.5 sm:gap-2">
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-full rounded-full"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-mono-data text-slate-400 text-[11px] sm:text-[13px]">CERTIFICATE ISSUED</p>
                                    <span className="material-symbols-outlined text-emerald-400 text-[14px] sm:text-[16px]">verified_user</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course 3 */}
                    <div className="bg-surface-container border border-outline-variant/30 rounded-md overflow-hidden group hover:border-primary/50 transition-colors shadow-sm cursor-pointer flex flex-col">
                        <div className="h-40 relative opacity-80 group-hover:opacity-100 transition-opacity">
                            <Image fill className="w-full h-full object-cover" src="https://picsum.photos/seed/course3/600/300" alt="Course" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                            <div className="absolute bottom-3 left-3">
                                <span className="bg-slate-800/80 text-slate-300 border border-slate-600/50 px-1 sm:px-2 py-0.5 text-[11px] sm:text-[13px] font-mono-data uppercase rounded-sm shadow-sm backdrop-blur-sm">NOT STARTED</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-sm">
                                <button className="bg-white text-slate-900 rounded-full p-2 sm:p-2.5 shadow-xl hover:scale-110 transition-transform flex items-center justify-center"><span className="material-symbols-outlined fill-1 text-[20px] sm:text-[24px] ml-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>play_arrow</span></button>
                            </div>
                        </div>
                        <div className="p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 flex-grow">
                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-label-caps text-primary text-[11px] sm:text-[13px] font-bold">CYBERSECURITY</p>
                                    <p className="font-mono-data text-slate-500 text-[11px] sm:text-[13px]">15 L / 6.2H</p>
                                </div>
                                <h3 className="font-h2 text-[15px] sm:text-[18px] uppercase text-white leading-tight">AI Red Teaming Protocols</h3>
                            </div>
                            <div className="mt-auto flex flex-col gap-1.5 sm:gap-2">
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="bg-primary-container h-full w-0"></div>
                                </div>
                                <p className="font-mono-data text-slate-400 text-[11px] sm:text-[13px]">0/15 LESSONS COMPLETED</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Updates Section */}
            <section className="glass-panel p-2 sm:p-5 rounded-md mt-3 sm:mt-6 border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <span className="material-symbols-outlined text-primary text-[20px] sm:text-[24px]">analytics</span>
                    <h3 className="font-label-caps text-slate-300 text-[14px] sm:text-[16px] font-bold tracking-widest">LATEST UPDATES</h3>
                </div>
                <div className="divide-y divide-outline-variant/20 flex flex-col">
                    <div className="zebra-row grid grid-cols-4 py-2 sm:py-3.5 px-2 sm:px-4 items-center hover:bg-slate-800/30 transition-colors rounded-sm cursor-pointer group">
                        <span className="font-mono-data text-primary text-[12px] sm:text-[14px]">2024.05.12</span>
                        <span className="font-label-caps col-span-2 text-[12px] sm:text-[14px] text-slate-200 group-hover:text-white transition-colors">RELEASE: NEURAL ARCHITECTURES VOL 2</span>
                        <div className="flex justify-end">
                            <span className="w-2.5 h-2.5 bg-primary-container rounded-full shadow-[0_0_8px_rgba(157,78,221,0.6)]"></span>
                        </div>
                    </div>
                    <div className="zebra-row grid grid-cols-4 py-2 sm:py-3.5 px-2 sm:px-4 items-center hover:bg-slate-800/30 transition-colors rounded-sm cursor-pointer group">
                        <span className="font-mono-data text-primary text-[12px] sm:text-[14px]">2024.05.10</span>
                        <span className="font-label-caps col-span-2 text-[12px] sm:text-[14px] text-slate-200 group-hover:text-white transition-colors">UPDATED: MATH FOR NETWORKS (L3)</span>
                        <div className="flex justify-end">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-400 transition-colors text-[16px] sm:text-[18px]">check_circle</span>
                        </div>
                    </div>
                    <div className="zebra-row grid grid-cols-4 py-2 sm:py-3.5 px-2 sm:px-4 items-center hover:bg-slate-800/30 transition-colors rounded-sm cursor-pointer group">
                        <span className="font-mono-data text-primary text-[12px] sm:text-[14px]">2024.05.08</span>
                        <span className="font-label-caps col-span-2 text-[12px] sm:text-[14px] text-slate-200 group-hover:text-white transition-colors">API DOCS V2.4 STABLE</span>
                        <div className="flex justify-end">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-400 transition-colors text-[16px] sm:text-[18px]">check_circle</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}