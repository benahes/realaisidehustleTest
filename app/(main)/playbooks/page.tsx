import Image from 'next/image';

export default function PlaybooksPage() {
    return (
        <>
            <main className="max-w-container-max mx-auto px-margin-edge flex flex-col pb-5 pt-[10px] sm:pt-[15px]">

                <div className="grid grid-cols-12 gap-gutter">
                    {/* Main Content Area */}
                    <section className="col-span-12 lg:col-span-8 space-y-gutter">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1.5 sm:gap-0">
                            <h1 className="font-h1 text-[18px] sm:text-[24px] text-on-surface uppercase tracking-tighter">Structured Workflows</h1>
                            <span className="font-mono-data text-primary text-[13px] sm:text-[16px] px-1.5 py-0.5 border border-primary/20 rounded bg-primary/5">32 ACTIVE PLAYBOOKS</span>
                        </div>

                        {/* Workflow Card 1 */}
                        <div className="bg-surface-container border border-outline-variant rounded overflow-hidden flex flex-col md:flex-row h-auto">
                            <div className="md:w-1/4 relative h-32 md:h-auto">
                                <Image className="absolute inset-0 w-full h-full object-cover" alt="Office" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuC49BVYLgoyTpuQ4EvlxyJVR_VAiXNvtt_ZmuOqj1yVjaKF6dIFibpmJLeC1ex7KVAwfOIwq5YT08Tw5-swcLDwvM6Y4SOaN54eJ3VrW8IxEugNYONPop8ytn6F5ruAFBgEcE8kbA2R1QjtqSOcKJmmP6OvXA9rAOw7dwON3GoGALnPgjdgdQc0K8GbqIT9IUqHMAtLuVScW0D3aAFF2OYT3d9XJRmiqrB_-DdMsDk4uJsJ4NYJEkk7M-mQ5bmoARROejv9BEeueeH4" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent md:bg-gradient-to-r"></div>
                                <div className="absolute bottom-2 left-2">
                                    <span className="difficulty-beginner px-1.5 py-0.5 rounded-sm text-[13px] sm:text-[16px] font-label-caps uppercase tracking-widest">Beginner</span>
                                </div>
                            </div>
                            <div className="md:w-3/4 p-2 flex flex-col justify-between gap-2">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                        <h2 className="font-h2 text-[15px] sm:text-[18px] uppercase">High-Ticket Freelance Pipeline</h2>
                                    </div>
                                    <p className="text-on-surface-variant text-[12px] sm:text-[14px] line-clamp-1">Scale a solo agency to $10k MRR using AI-assisted outreach systems.</p>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <div className="space-y-0.5">
                                            <span className="text-label-caps text-outline uppercase block">Problem</span>
                                            <span className="text-[12px] sm:text-[13px] italic">Inconsistent lead flow.</span>
                                        </div>
                                        <div className="space-y-0.5">
                                            <span className="text-label-caps text-outline uppercase block">Tools</span>
                                            <div className="flex gap-1">
                                                <span className="bg-surface-container-high px-1 py-0.5 rounded text-[13px] sm:text-[15px] font-mono-data">LinkedIn</span>
                                                <span className="bg-surface-container-high px-1 py-0.5 rounded text-[13px] sm:text-[15px] font-mono-data">GPT-4o</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-1.5 border-t border-outline-variant/30">
                                    <div className="flex -space-x-1.5">
                                        <div className="w-5 h-5 rounded-full bg-primary-container flex items-center justify-center border border-surface">
                                            <span className="material-symbols-outlined text-[13px] text-white">check</span>
                                        </div>
                                        <div className="w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center border border-surface">
                                            <span className="material-symbols-outlined text-[13px] text-white">download</span>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-1 text-primary hover:gap-1.5 transition-all">
                                        <span className="text-[13px] sm:text-[15px] font-label-caps uppercase">View Steps</span>
                                        <span className="material-symbols-outlined text-[13px] sm:text-[15px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Workflow Card 2 */}
                        <div className="bg-surface-container border border-outline-variant rounded overflow-hidden flex flex-col md:flex-row h-auto">
                            <div className="md:w-1/4 relative h-32 md:h-auto">
                                <Image className="absolute inset-0 w-full h-full object-cover" alt="Content" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfCQJUJigkGNHaDFBouFgljz1Qot8nUMfGCCac2uOE7UARa6mN1pf_Gv_S0lEllwcNOhgrROqGtNBShVyzo5HG1dKTFWgweiB3uQ549tSIcVzxaqthSocJynQSzaoVfJSHppCKGAyvcFNX9HgDOlmXlK9HgIEClX2rTarqcSF1137F01kXYZVtIW6EG4lVl_AhILvFXzTgsbFFepXAlvcjH62gT5y6v7L1x7OfL1lHW-qx8duQRhKjDgfhAyHMb8XC5Io4PWAr5miH" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent md:bg-gradient-to-r"></div>
                                <div className="absolute bottom-2 left-2">
                                    <span className="difficulty-intermediate px-1.5 py-0.5 rounded-sm text-[13px] sm:text-[16px] font-label-caps uppercase tracking-widest">Intermediate</span>
                                </div>
                            </div>
                            <div className="md:w-3/4 p-2 flex flex-col justify-between gap-2">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                        <h2 className="font-h2 text-[15px] sm:text-[18px] uppercase">Faceless Content Engine</h2>
                                    </div>
                                    <p className="text-on-surface-variant text-[12px] sm:text-[14px] line-clamp-1">30 days of high-retention video content in under 4 hours.</p>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <div className="space-y-0.5">
                                            <span className="text-label-caps text-outline uppercase block">Problem</span>
                                            <span className="text-[12px] sm:text-[13px] italic">Creative burnout.</span>
                                        </div>
                                        <div className="space-y-0.5">
                                            <span className="text-label-caps text-outline uppercase block">Tools</span>
                                            <div className="flex gap-1">
                                                <span className="bg-surface-container-high px-1 py-0.5 rounded text-[13px] sm:text-[15px] font-mono-data">HeyGen</span>
                                                <span className="bg-surface-container-high px-1 py-0.5 rounded text-[13px] sm:text-[15px] font-mono-data">ElevenLabs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-1.5 border-t border-outline-variant/30">
                                    <span className="text-mono-data text-secondary text-[11px] sm:text-[13px]">482 STUDENTS COMPLETED</span>
                                    <button className="flex items-center gap-1 text-primary hover:gap-1.5 transition-all">
                                        <span className="text-[13px] sm:text-[15px] font-label-caps uppercase">View Steps</span>
                                        <span className="material-symbols-outlined text-[13px] sm:text-[15px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside className="col-span-12 lg:col-span-4 space-y-gutter">
                        <div className="bg-surface-container-high border border-outline-variant rounded p-2">
                            <h3 className="text-[13px] sm:text-[15px] font-label-caps text-outline uppercase mb-2">Precision Mastery Path</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-slate-950 border border-slate-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-[16px]">analytics</span>
                                    </div>
                                    <div>
                                        <div className="text-[14px] sm:text-[16px] font-bold leading-none">Workflow Analytics</div>
                                        <div className="text-[12px] sm:text-[13px] text-on-surface-variant">Track execution speed</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-slate-950 border border-slate-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-tertiary text-[16px]">layers</span>
                                    </div>
                                    <div>
                                        <div className="text-[14px] sm:text-[16px] font-bold leading-none">Template Vault</div>
                                        <div className="text-[12px] sm:text-[13px] text-on-surface-variant">154 structures</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-950 border border-primary/20 rounded p-2 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-[13px] sm:text-sm font-h2 text-primary uppercase mb-1">Micro-SaaS Blueprint</h3>
                                <p className="text-[12px] sm:text-[13px] text-on-surface-variant mb-2 leading-tight">Advanced architecture for technical founders using Claude 3.5.</p>
                                <span className="difficulty-advanced px-1 py-0.5 rounded-sm text-[13px] sm:text-[16px] font-label-caps uppercase mb-2 inline-block">Elite Tier</span>
                                <button className="w-full bg-primary text-on-primary py-1 rounded text-[12px] sm:text-[13px] font-label-caps uppercase hover:brightness-110 transition-all">Unlock Workflow</button>
                            </div>
                            <div className="absolute -right-2 -bottom-2 opacity-5">
                                <span className="material-symbols-outlined !text-[60px]">precision_manufacturing</span>
                            </div>
                        </div>

                        {/* Steps Quickview */}
                        <div className="bg-surface-container border border-outline-variant rounded">
                            <div className="p-2 border-b border-outline-variant/30">
                                <span className="text-[13px] sm:text-[15px] font-label-caps text-outline uppercase">Next Steps</span>
                            </div>
                            <div className="divide-y divide-outline-variant/20">
                                <div className="p-1.5 zebra-row flex items-center gap-2">
                                    <span className="font-mono-data text-primary text-[13px]">01</span>
                                    <span className="text-[12px] sm:text-[13px] uppercase font-medium">Define Niche Market</span>
                                    <span className="material-symbols-outlined text-[13px] sm:text-[15px] ml-auto text-outline">lock</span>
                                </div>
                                <div className="p-1.5 zebra-row flex items-center gap-2">
                                    <span className="font-mono-data text-primary text-[13px]">02</span>
                                    <span className="text-[12px] sm:text-[13px] uppercase font-medium">Scrape Leads</span>
                                    <span className="material-symbols-outlined text-[13px] sm:text-[15px] ml-auto text-outline">lock</span>
                                </div>
                                <div className="p-1.5 zebra-row flex items-center gap-2">
                                    <span className="font-mono-data text-primary text-[13px]">03</span>
                                    <span className="text-[12px] sm:text-[13px] uppercase font-medium">Automate Flow</span>
                                    <span className="material-symbols-outlined text-[13px] sm:text-[15px] ml-auto text-outline">lock</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Technical Cards Grid */}
                <section className="mt-5">
                    <h2 className="text-[13px] sm:text-[15px] font-label-caps text-outline uppercase mb-2">Technical Architectures</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                        <div className="bg-surface-container-low border border-outline-variant p-2 flex flex-col gap-2 hover:border-primary/50 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px]">database</span>
                                </div>
                                <span className="font-mono-data text-[13px] sm:text-[15px] text-outline">12H SETUP</span>
                            </div>
                            <div>
                                <h4 className="text-[14px] sm:text-[16px] font-h2 uppercase group-hover:text-primary transition-colors">AI Wrapper Deployment</h4>
                                <p className="text-[12px] sm:text-[13px] text-on-surface-variant leading-tight">Next.js + OpenAI integration blueprint.</p>
                            </div>
                            <div className="flex gap-1 flex-wrap">
                                <span className="bg-surface-container-highest px-1 py-0.5 rounded text-[13px] sm:text-[16px] font-mono-data text-outline">NEXTJS</span>
                                <span className="bg-surface-container-highest px-1 py-0.5 rounded text-[13px] sm:text-[16px] font-mono-data text-outline">OPENAI</span>
                            </div>
                        </div>
                        <div className="bg-surface-container-low border border-outline-variant p-2 flex flex-col gap-2 hover:border-primary/50 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px]">shield_person</span>
                                </div>
                                <span className="font-mono-data text-[13px] sm:text-[15px] text-outline">4H SETUP</span>
                            </div>
                            <div>
                                <h4 className="text-[14px] sm:text-[16px] font-h2 uppercase group-hover:text-primary transition-colors">Auth &amp; RBAC</h4>
                                <p className="text-[12px] sm:text-[13px] text-on-surface-variant leading-tight">Clerk and Supabase for security.</p>
                            </div>
                            <div className="flex gap-1 flex-wrap">
                                <span className="bg-surface-container-highest px-1 py-0.5 rounded text-[13px] sm:text-[16px] font-mono-data text-outline">CLERK</span>
                                <span className="bg-surface-container-highest px-1 py-0.5 rounded text-[13px] sm:text-[16px] font-mono-data text-outline">SUPABASE</span>
                            </div>
                        </div>
                        <div className="bg-surface-container-low border border-outline-variant p-2 flex flex-col gap-2 hover:border-primary/50 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px]">hub</span>
                                </div>
                                <span className="font-mono-data text-[13px] sm:text-[15px] text-outline">8H SETUP</span>
                            </div>
                            <div>
                                <h4 className="text-[14px] sm:text-[16px] font-h2 uppercase group-hover:text-primary transition-colors">No-Code Logic</h4>
                                <p className="text-[12px] sm:text-[13px] text-on-surface-variant leading-tight">Bridge LLM with Bubble apps.</p>
                            </div>
                            <div className="flex gap-1 flex-wrap">
                                <span className="bg-surface-container-highest px-1 py-0.5 rounded text-[13px] sm:text-[16px] font-mono-data text-outline">BUBBLE</span>
                                <span className="bg-surface-container-highest px-1 py-0.5 rounded text-[13px] sm:text-[16px] font-mono-data text-outline">MAKE</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
}