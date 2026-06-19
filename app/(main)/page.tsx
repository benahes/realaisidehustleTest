import Image from 'next/image';
import { ArrowUpRight, TrendingUp, LayoutGrid, List, Star, ArrowRight } from 'lucide-react';

export default function BlogHome() {
  return (
    <>
      <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5">

        {/* Featured & Trending Section (Bento Style) */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Featured Story */}
          <section className="col-span-12 lg:col-span-8 group relative overflow-hidden bg-surface-container border border-outline-variant/30 rounded cursor-pointer min-h-[200px] sm:min-h-[350px] shadow-lg">
            <Image fill alt="Neural Networks Visualization" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://picsum.photos/seed/featured/1200/600" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent pointer-events-none z-10"></div>

            <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end w-full lg:w-3/4 z-20">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="bg-primary-container px-2 py-0.5 text-white font-label-caps text-[16px] rounded-sm">FEATURED</span>
                <span className="text-outline font-mono-data text-[15px]">24 MIN AGO</span>
              </div>
              <h1 className="font-h1 text-lg sm:text-2xl text-white mb-2 leading-tight group-hover:text-primary transition-colors">The Architect of Sentience: How LLMs are Redefining Logic Gates</h1>
              <p className="font-body-sm text-on-surface-variant line-clamp-2 max-w-xl text-xs sm:text-sm">Exploring the fundamental shift in computational linguistics as large language models move beyond predictive text into autonomous reasoning cycles.</p>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-primary text-[18px]">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </section>

          {/* Trending Sidebar */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col border border-outline-variant/30 rounded bg-surface-container overflow-hidden">
            <div className="px-3 py-1 sm:py-2 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high">
              <span className="font-h2 text-[15px] text-primary flex items-center gap-1.5 uppercase tracking-wide">
                <TrendingUp className="w-4 h-4" /> Trending
              </span>
              <span className="text-outline font-mono-data text-[15px]">REAL-TIME</span>
            </div>
            <div className="flex flex-col">
              {/* Trending Item 1 */}
              <div className="zebra-row px-2 py-1 sm:px-3 sm:py-3 border-b border-outline-variant/10 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-mono-data text-base sm:text-lg text-outline/30 group-hover:text-primary/50 transition-colors">01</span>
                  <div>
                    <h3 className="font-body-sm font-bold text-white group-hover:text-primary transition-colors text-sm sm:text-base mb-0 sm:mb-1">OpenAI Sora: The Death of the Stock Footage Industry?</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">8.4k Reads</span>
                      <span className="w-1 h-1 bg-outline/40 rounded-full"></span>
                      <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">Video Gen</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Trending Item 2 */}
              <div className="zebra-row px-2 py-1 sm:px-3 sm:py-3 border-b border-outline-variant/10 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-mono-data text-base sm:text-lg text-outline/30 group-hover:text-primary/50 transition-colors">02</span>
                  <div>
                    <h3 className="font-body-sm font-bold text-white group-hover:text-primary transition-colors text-sm sm:text-base mb-0 sm:mb-1">Nvidia H200 Benchmarks: Breaking the 100T Parameter Barrier</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">6.1k Reads</span>
                      <span className="w-1 h-1 bg-outline/40 rounded-full"></span>
                      <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">Hardware</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Trending Item 3 */}
              <div className="zebra-row px-2 py-1 sm:px-3 sm:py-3 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <div className="flex gap-2 sm:gap-3">
                  <span className="font-mono-data text-base sm:text-lg text-outline/30 group-hover:text-primary/50 transition-colors">03</span>
                  <div>
                    <h3 className="font-body-sm font-bold text-white group-hover:text-primary transition-colors text-sm sm:text-base mb-0 sm:mb-1">Vector Databases: Selecting the Right Latency for Scale</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">5.9k Reads</span>
                      <span className="w-1 h-1 bg-outline/40 rounded-full"></span>
                      <span className="text-xs sm:text-sm text-outline font-mono-data uppercase">DevOps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto py-1.5 sm:py-2.5 text-center border-t border-outline-variant/20 hover:bg-slate-800/20 cursor-pointer transition-colors">
              <button className="text-xs sm:text-sm font-label-caps text-primary cursor-pointer w-full tracking-wider">VIEW FULL LEADERBOARD</button>
            </div>
          </aside>
        </div>

        {/* Latest Posts Grid */}
        <section className="mt-stack-mid">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-h2 text-base sm:text-lg text-white uppercase tracking-tight">Latest Feed</h2>
            <div className="flex gap-1.5">
              <button aria-label="Grid View" className="p-0.5 hover:bg-surface-container-high rounded transition-colors cursor-pointer text-[15px]">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button aria-label="List View" className="p-0.5 hover:bg-surface-container-high rounded transition-colors cursor-pointer text-[15px]">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Post Card 1 */}
            <div className="flex flex-col bg-surface-container border border-outline-variant/20 rounded hover:border-primary/50 transition-all group cursor-pointer">
              <div className="h-28 sm:aspect-video sm:h-auto w-full overflow-hidden relative">
                <Image fill alt="AI Art Illustration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://picsum.photos/seed/post1/600/400" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-1.5 py-0.5 rounded-sm">
                  <span className="text-xs sm:text-sm font-label-caps text-primary uppercase">AI NEWS</span>
                </div>
              </div>
              <div className="p-2 sm:p-4 flex-grow flex flex-col">
                <h3 className="font-h2 text-sm sm:text-base text-white group-hover:text-primary transition-colors line-clamp-2 mb-1 uppercase tracking-tight">The Ethics of Synthetic Training Data in Foundation Models</h3>
                <p className="font-body-xs text-on-surface-variant line-clamp-2 mb-2 sm:mb-3 text-xs sm:text-sm">Deep dive into why high-quality synthetic data is becoming the primary fuel for the next generation of generative intelligence...</p>
                <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-outline-variant/10">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-mono-data text-primary">JD</span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono-data text-outline">J. DORIAN</span>
                  </div>
                  <span className="text-xs sm:text-sm font-mono-data text-outline">6 MIN</span>
                </div>
              </div>
            </div>

            {/* Post Card 2 */}
            <div className="flex flex-col bg-surface-container border border-outline-variant/20 rounded hover:border-primary/50 transition-all group cursor-pointer">
              <div className="h-28 sm:aspect-video sm:h-auto w-full overflow-hidden relative">
                <Image fill alt="Coding Interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://picsum.photos/seed/post2/600/400" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-1.5 py-0.5 rounded-sm">
                  <span className="text-xs sm:text-sm font-label-caps text-primary uppercase">TUTORIALS</span>
                </div>
              </div>
              <div className="p-2 sm:p-4 flex-grow flex flex-col">
                <h3 className="font-h2 text-sm sm:text-base text-white group-hover:text-primary transition-colors line-clamp-2 mb-1 uppercase tracking-tight">Building a Local RAG Pipeline with LangChain and Llama 3</h3>
                <p className="font-body-xs text-on-surface-variant line-clamp-2 mb-2 sm:mb-3 text-xs sm:text-sm">A technical walkthrough on establishing a Retrieval-Augmented Generation system using only open-source components on local hardware...</p>
                <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-outline-variant/10">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-mono-data text-primary">AM</span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono-data text-outline">A. MILLER</span>
                  </div>
                  <span className="text-xs sm:text-sm font-mono-data text-outline">12 MIN</span>
                </div>
              </div>
            </div>

            {/* Post Card 3 */}
            <div className="flex flex-col bg-surface-container border border-outline-variant/20 rounded hover:border-primary/50 transition-all group cursor-pointer">
              <div className="h-28 sm:aspect-video sm:h-auto w-full overflow-hidden relative">
                <Image fill alt="Cybersecurity Visual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://picsum.photos/seed/post3/600/400" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-1.5 py-0.5 rounded-sm">
                  <span className="text-xs sm:text-sm font-label-caps text-primary uppercase">REVIEWS</span>
                </div>
              </div>
              <div className="p-2 sm:p-4 flex-grow flex flex-col">
                <h3 className="font-h2 text-sm sm:text-base text-white group-hover:text-primary transition-colors line-clamp-2 mb-1 uppercase tracking-tight">Enterprise AI Security Tools: The 2024 Comparison</h3>
                <p className="font-body-xs text-on-surface-variant line-clamp-2 mb-2 sm:mb-3 text-xs sm:text-sm">Comparing Microsoft Copilot for Security against Google Threat Intelligence in a head-to-head battle for enterprise dominance...</p>
                <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-outline-variant/10">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-mono-data text-primary">SC</span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono-data text-outline">S. CHEN</span>
                  </div>
                  <span className="text-xs sm:text-sm font-mono-data text-outline">8 MIN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editor's Picks / Curated List */}
        <section className="mt-stack-mid p-2 sm:p-4 border border-primary/20 bg-primary-container/5 rounded">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <h2 className="font-h2 text-base sm:text-lg text-white uppercase tracking-tight">Editor&apos;s Selection</h2>
            <span className="bg-primary px-1.5 py-0.5 text-on-primary font-label-caps text-xs sm:text-sm rounded-full">AI CURATED</span>
          </div>
          <div className="flex flex-col gap-1">
            {/* Pick 1 */}
            <div className="zebra-row flex items-center justify-between p-1.5 sm:p-2 rounded group cursor-pointer hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="font-body-sm font-bold text-white group-hover:text-primary text-sm sm:text-base transition-colors">Quantization 101: Reducing Model Size Without Accuracy Loss</h4>
                    <span className="bg-primary/20 text-primary px-1 py-0.5 rounded-[2px] text-xs sm:text-sm font-bold uppercase tracking-widest hidden sm:inline-block">NEW</span>
                  </div>
                  <span className="text-xs sm:text-sm text-outline uppercase tracking-wider">4H AGO &bull; BY DEV_CORE</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-stack-loose">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full border border-surface bg-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold">12</div>
                  <div className="w-6 h-6 rounded-full border border-surface bg-slate-700 flex items-center justify-center text-xs sm:text-sm font-bold">8</div>
                </div>
                <span className="text-outline group-hover:text-primary transition-colors text-xs sm:text-sm ml-2"><ArrowRight className="w-4 h-4" /></span>
              </div>
            </div>

            {/* Pick 2 */}
            <div className="zebra-row flex items-center justify-between p-1.5 sm:p-2 rounded group cursor-pointer hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="font-body-sm font-bold text-white group-hover:text-primary text-sm sm:text-base transition-colors">Prompt Injection Vulnerabilities in Multi-Modal Interfaces</h4>
                    <span className="bg-primary/20 text-primary px-1 py-0.5 rounded-[2px] text-xs sm:text-sm font-bold uppercase tracking-widest hidden sm:inline-block">NEW</span>
                  </div>
                  <span className="text-xs sm:text-sm text-outline uppercase tracking-wider">6H AGO &bull; BY SEC_OPS</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-stack-loose">
                <span className="text-outline group-hover:text-primary transition-colors text-xs sm:text-sm"><ArrowRight className="w-4 h-4" /></span>
              </div>
            </div>

            {/* Pick 3 */}
            <div className="zebra-row flex items-center justify-between p-1.5 sm:p-2 rounded group cursor-pointer hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2 h-2 bg-outline/20 rounded-full"></span>
                <div className="flex flex-col">
                  <h4 className="font-body-sm font-bold text-white group-hover:text-primary text-sm sm:text-base transition-colors">The Rise of Agentic Frameworks: AutoGPT vs BabyAGI in 2024</h4>
                  <span className="text-xs sm:text-sm text-outline uppercase tracking-wider">12H AGO &bull; BY AI_LABS</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-stack-loose">
                <span className="text-outline group-hover:text-primary transition-colors text-xs sm:text-sm"><ArrowRight className="w-4 h-4" /></span>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}