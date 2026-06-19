export default function ToolsDBPage() {
    return (
        <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5 pt-[10px] sm:pt-[15px]">
            <section className="w-full">
                {/* Ultra-High Density Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 mt-2 sm:mt-4">
                    {/* Tool Card Template: ChatGPT */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500/10 rounded flex items-center justify-center border border-emerald-500/20">
                                <span className="material-symbols-outlined text-emerald-400 !text-[16px] sm:!text-[18px]">chat_bubble</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-primary bg-primary/5 px-1 sm:px-1.5 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">WRITING</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface leading-tight mb-1">ChatGPT</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-tight">Conversational AI for reasoning, complex coding, and creative draft generation.</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">FREEMIUM</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">ENTERPRISE</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">ALT: CLAUDE</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2 sm:pt-2.5">
                            <a className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest" href="#">
                                <span className="material-symbols-outlined !text-[14px] sm:!text-[15px]">menu_book</span> TUTORIAL
                            </a>
                            <button className="text-on-surface-variant hover:text-primary">
                                <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">north_east</span>
                            </button>
                        </div>
                    </div>
                    {/* Card: Claude */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500/10 rounded flex items-center justify-center border border-orange-500/20">
                                <span className="material-symbols-outlined text-orange-400 !text-[16px] sm:!text-[18px]">psychology</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-primary bg-primary/5 px-1 sm:px-1.5 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">CODING</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface leading-tight mb-1">Claude 3.5</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-tight">Advanced reasoning model with exceptional nuance and large context windows.</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">SUB</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">INDIVIDUAL</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">ALT: GPT-4O</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2 sm:pt-2.5">
                            <a className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest" href="#">
                                <span className="material-symbols-outlined !text-[14px] sm:!text-[15px]">menu_book</span> TUTORIAL
                            </a>
                            <button className="text-on-surface-variant hover:text-primary">
                                <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">north_east</span>
                            </button>
                        </div>
                    </div>
                    {/* Card: Runway */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500/10 rounded flex items-center justify-center border border-blue-500/20">
                                <span className="material-symbols-outlined text-blue-400 !text-[16px] sm:!text-[18px]">movie</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-primary bg-primary/5 px-1 sm:px-1.5 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">VIDEO</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface leading-tight mb-1">Runway Gen-3</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-tight">Professional cinematic video generation with advanced motion control.</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">CREDITS</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">STUDIO</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">ALT: LUMA</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2 sm:pt-2.5">
                            <a className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest" href="#">
                                <span className="material-symbols-outlined !text-[14px] sm:!text-[15px]">menu_book</span> TUTORIAL
                            </a>
                            <button className="text-on-surface-variant hover:text-primary">
                                <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">north_east</span>
                            </button>
                        </div>
                    </div>
                    {/* Card: Midjourney */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500/10 rounded flex items-center justify-center border border-purple-500/20">
                                <span className="material-symbols-outlined text-purple-400 !text-[16px] sm:!text-[18px]">palette</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-primary bg-primary/5 px-1 sm:px-1.5 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">IMAGE</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface leading-tight mb-1">Midjourney v6</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-tight">State of the art photorealistic image synthesis for creatives.</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">SUB</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">PRO</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">ALT: DALL-E</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2 sm:pt-2.5">
                            <a className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest" href="#">
                                <span className="material-symbols-outlined !text-[14px] sm:!text-[15px]">menu_book</span> TUTORIAL
                            </a>
                            <button className="text-on-surface-variant hover:text-primary">
                                <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">north_east</span>
                            </button>
                        </div>
                    </div>
                    {/* Card: Perplexity */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-amber-500/10 rounded flex items-center justify-center border border-amber-500/20">
                                <span className="material-symbols-outlined text-amber-400 !text-[16px] sm:!text-[18px]">search_insights</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-primary bg-primary/5 px-1 sm:px-1.5 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">RESEARCH</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface leading-tight mb-1">Perplexity</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-tight">Real-time cited search engine using LLMs for deep web indexing.</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">FREE</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">GLOBAL</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">ALT: GOOGLE</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2 sm:pt-2.5">
                            <a className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest" href="#">
                                <span className="material-symbols-outlined !text-[14px] sm:!text-[15px]">menu_book</span> TUTORIAL
                            </a>
                            <button className="text-on-surface-variant hover:text-primary">
                                <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">north_east</span>
                            </button>
                        </div>
                    </div>
                    {/* Card: Zapier */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/10 rounded flex items-center justify-center border border-cyan-500/20">
                                <span className="material-symbols-outlined text-cyan-400 !text-[16px] sm:!text-[18px]">bolt</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-primary bg-primary/5 px-1 sm:px-1.5 py-0.5 border border-primary/20 rounded-sm tracking-widest uppercase">AUTOMATION</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface leading-tight mb-1">Zapier Central</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-tight">Build persistent AI agents to automate cross-platform business workflows.</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">BETA</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">SME</span>
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold tracking-tighter uppercase">ALT: MAKE</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2 sm:pt-2.5">
                            <a className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest" href="#">
                                <span className="material-symbols-outlined !text-[14px] sm:!text-[15px]">menu_book</span> TUTORIAL
                            </a>
                            <button className="text-on-surface-variant hover:text-primary">
                                <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">north_east</span>
                            </button>
                        </div>
                    </div>
                    {/* Simulated Card: ElevenLabs */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 opacity-60 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-surface-container-high rounded flex items-center justify-center border border-outline-variant/20">
                                <span className="material-symbols-outlined text-outline !text-[16px] sm:!text-[18px]">hearing</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-outline bg-outline/5 px-1 sm:px-1.5 py-0.5 border border-outline/20 rounded-sm tracking-widest uppercase">AUDIO</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface/50 leading-tight mb-1">ElevenLabs</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant/50 line-clamp-2 leading-tight">High-fidelity voice cloning and realistic speech generation.</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="text-[11px] sm:text-[13px] px-1 sm:px-1.5 py-0.5 bg-surface-container-high/50 text-outline border border-outline-variant/10 rounded-sm font-bold tracking-tighter uppercase">PAY-GO</span>
                        </div>
                    </div>
                    {/* Simulated Card: Pinecone */}
                    <div className="tool-card group bg-surface-container/30 border border-outline-variant/20 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 opacity-60 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-surface-container-high rounded flex items-center justify-center border border-outline-variant/20">
                                <span className="material-symbols-outlined text-outline !text-[16px] sm:!text-[18px]">database</span>
                            </div>
                            <span className="text-[11px] sm:text-[13px] font-bold text-outline bg-outline/5 px-1 sm:px-1.5 py-0.5 border border-outline/20 rounded-sm tracking-widest uppercase">OPS</span>
                        </div>
                        <div>
                            <h3 className="font-h2 text-[15px] sm:text-[18px] text-on-surface/50 leading-tight mb-1">Pinecone</h3>
                            <p className="text-[12px] sm:text-[14px] text-on-surface-variant/50 line-clamp-2 leading-tight">Vector database for managed semantic search and RAG data pipelines.</p>
                        </div>
                    </div>
                </div>
                {/* More Results Indicator */}
                <div className="mt-4 sm:mt-8 flex justify-center">
                    <button className="group flex items-center gap-2 border border-outline-variant/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-sm hover:bg-surface-container-high transition-all active:scale-95">
                        <span className="text-[12px] sm:text-[14px] font-bold tracking-widest text-on-surface-variant uppercase">LOAD INDEX (20-40)</span>
                        <span className="material-symbols-outlined text-primary group-hover:translate-y-0.5 transition-transform !text-[16px] sm:!text-[18px]">keyboard_double_arrow_down</span>
                    </button>
                </div>
            </section>
        </main>
    );
}