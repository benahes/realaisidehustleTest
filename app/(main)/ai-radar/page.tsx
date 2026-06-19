export const metadata = {
    title: 'AI Radar ΓÇö Real AI Side Hustle',
    description: 'Live intelligence feed tracking AI model releases, funding rounds, and breakthrough research. Stay ahead of the curve.',
};

const signals = [
    {
        id: 1,
        urgency: 'BREAKING',
        urgencyColor: 'text-red-400 bg-red-500/10 border-red-500/30',
        category: 'MODEL RELEASE',
        categoryColor: 'text-purple-400',
        headline: 'Google DeepMind Releases Gemini 2.0 Ultra with Native Multimodal Reasoning',
        summary: 'Benchmark scores shatter GPT-4o on every evaluated dimension including math, code, and long-context retrieval at 2M tokens.',
        time: '14 MIN AGO',
        icon: 'auto_awesome',
        iconBg: 'bg-purple-500/10 border-purple-500/20',
        iconColor: 'text-purple-400',
        impact: 'HIGH',
        impactColor: 'text-red-400',
        tags: ['LLM', 'Google', 'Multimodal'],
    },
    {
        id: 2,
        urgency: 'HOT',
        urgencyColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        category: 'FUNDING',
        categoryColor: 'text-amber-400',
        headline: 'Mistral AI Closes $1.1B Series B at $6B Valuation Led by Andreessen Horowitz',
        summary: 'European open-source LLM leader doubles down on enterprise APIs and on-premise deployments for regulated industries.',
        time: '1H AGO',
        icon: 'attach_money',
        iconBg: 'bg-amber-500/10 border-amber-500/20',
        iconColor: 'text-amber-400',
        impact: 'HIGH',
        impactColor: 'text-red-400',
        tags: ['Funding', 'Open Source', 'Europe'],
    },
    {
        id: 3,
        urgency: 'NEW',
        urgencyColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        category: 'RESEARCH',
        categoryColor: 'text-cyan-400',
        headline: 'Stanford HAI Paper Demonstrates LLM Clinical Reasoning Surpassing Specialist Physicians',
        summary: 'A controlled study across 14,000 patient records shows GPT-4 + RAG pipeline outperforms board-certified radiologists by 11.4%.',
        time: '3H AGO',
        icon: 'science',
        iconBg: 'bg-cyan-500/10 border-cyan-500/20',
        iconColor: 'text-cyan-400',
        impact: 'MED',
        impactColor: 'text-amber-400',
        tags: ['Research', 'Healthcare', 'RAG'],
    },
    {
        id: 4,
        urgency: 'HOT',
        urgencyColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        category: 'PRODUCT',
        categoryColor: 'text-emerald-400',
        headline: 'Anthropic Launches Claude.ai Team Tier with Native Artifact Sharing & Collaboration',
        summary: 'Enterprise teams can now collaboratively iterate on Claude artifacts in real-time, a direct play against Microsoft Copilot.',
        time: '5H AGO',
        icon: 'group',
        iconBg: 'bg-emerald-500/10 border-emerald-500/20',
        iconColor: 'text-emerald-400',
        impact: 'MED',
        impactColor: 'text-amber-400',
        tags: ['Anthropic', 'SaaS', 'Enterprise'],
    },
    {
        id: 5,
        urgency: 'SIGNAL',
        urgencyColor: 'text-slate-400 bg-slate-500/10 border-slate-500/30',
        category: 'REGULATION',
        categoryColor: 'text-rose-400',
        headline: 'EU AI Act Enforcement Unit Issues First Formal Warning to High-Risk AI Deployers',
        summary: 'The first wave of compliance warnings targets biometric surveillance systems; penalties up to 3% global annual turnover.',
        time: '8H AGO',
        icon: 'gavel',
        iconBg: 'bg-rose-500/10 border-rose-500/20',
        iconColor: 'text-rose-400',
        impact: 'MED',
        impactColor: 'text-amber-400',
        tags: ['EU AI Act', 'Regulation', 'Compliance'],
    },
    {
        id: 6,
        urgency: 'SIGNAL',
        urgencyColor: 'text-slate-400 bg-slate-500/10 border-slate-500/30',
        category: 'HUSTLE PLAY',
        categoryColor: 'text-primary',
        headline: 'OpenAI GPT Store Hits 3M Custom GPTs ΓÇö Creator Monetization Dashboard Launched',
        summary: 'Featured GPT builders are now earning $400ΓÇô$12,000/month. The top 100 GPTs have generated over $2M in combined access fees.',
        time: '12H AGO',
        icon: 'storefront',
        iconBg: 'bg-purple-500/10 border-purple-500/20',
        iconColor: 'text-purple-400',
        impact: 'LOW',
        impactColor: 'text-slate-400',
        tags: ['OpenAI', 'Monetization', 'Side Hustle'],
    },
];

const modelLeaderboard = [
    { rank: 1, name: 'Gemini 2.0 Ultra', org: 'Google', score: 98.2, delta: '+12.1', positive: true },
    { rank: 2, name: 'GPT-4o (May)', org: 'OpenAI', score: 91.7, delta: '+2.4', positive: true },
    { rank: 3, name: 'Claude 3.5 Sonnet', org: 'Anthropic', score: 90.1, delta: '+0.8', positive: true },
    { rank: 4, name: 'Llama 3.1 405B', org: 'Meta', score: 85.4, delta: '-1.2', positive: false },
    { rank: 5, name: 'Mistral Large 2', org: 'Mistral', score: 81.6, delta: '+3.3', positive: true },
];

const fundingRounds = [
    { company: 'Mistral AI', amount: '$1.1B', round: 'Series B', sector: 'Foundation Model', date: 'TODAY' },
    { company: 'Cohere', amount: '$500M', round: 'Series D', sector: 'Enterprise NLP', date: '3D AGO' },
    { company: 'Scale AI', amount: '$1B', round: 'Series F', sector: 'Data Infrastructure', date: '1W AGO' },
    { company: 'Perplexity', amount: '$250M', round: 'Series C', sector: 'AI Search', date: '2W AGO' },
];

export default function AIRadarPage() {
    return (
        <main className="max-w-container-max mx-auto px-margin-edge flex flex-col gap-gutter pb-5 pt-[10px] sm:pt-[15px]">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 pb-1 border-b border-outline-variant/20 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <h1 className="font-h1 text-[18px] sm:text-[24px] text-white uppercase tracking-tighter">AI Radar</h1>
                    <span className="text-[14px] sm:text-[16px] font-bold font-label-caps text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-sm tracking-widest">LIVE</span>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-[13px] sm:text-[15px] font-mono-data text-outline uppercase">Updated: 01:38 UTC+1</span>
                    <button className="text-[13px] sm:text-[15px] font-bold text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded-sm tracking-widest uppercase hover:bg-primary/10 transition-colors">
                        Set Alerts
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-gutter">

                {/* Signal Feed ΓÇö Left Column */}
                <section className="col-span-12 lg:col-span-8 flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-0.5 gap-2 sm:gap-0">
                        <h2 className="font-h2 text-[15px] sm:text-[18px] text-white uppercase tracking-tight flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary !text-[16px] sm:!text-[18px]">radar</span>
                            Intelligence Signals
                        </h2>
                        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                            {['ALL', 'MODELS', 'FUNDING', 'RESEARCH', 'HUSTLE'].map((f) => (
                                <button
                                    key={f}
                                    className={`text-[11px] sm:text-[13px] font-bold tracking-widest px-1.5 py-0.5 rounded-sm uppercase transition-colors shrink-0 ${f === 'ALL' ? 'bg-primary text-on-primary' : 'text-outline border border-outline/20 hover:text-white'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {signals.map((signal) => (
                            <article
                                key={signal.id}
                                className="group bg-surface-container border border-outline-variant/20 rounded-lg p-2 sm:p-3 flex gap-2 sm:gap-3 hover:border-primary/40 transition-all cursor-pointer"
                            >
                                {/* Icon */}
                                <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-md ${signal.iconBg} border flex items-center justify-center`}>
                                    <span className={`material-symbols-outlined !text-[16px] sm:!text-[18px] ${signal.iconColor}`}>{signal.icon}</span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-0.5 sm:gap-1 flex-grow min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className={`text-[11px] sm:text-[13px] font-bold px-1 sm:px-1.5 py-0.5 border rounded-sm tracking-widest uppercase ${signal.urgencyColor}`}>
                                            {signal.urgency}
                                        </span>
                                        <span className={`text-[11px] sm:text-[13px] font-bold tracking-widest uppercase ${signal.categoryColor}`}>
                                            {signal.category}
                                        </span>
                                        <span className="text-outline font-mono-data text-[11px] sm:text-[13px]">{signal.time}</span>
                                    </div>
                                    <h3 className="font-h2 text-[14px] sm:text-[16px] text-white group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                        {signal.headline}
                                    </h3>
                                    <p className="text-[12px] sm:text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed">
                                        {signal.summary}
                                    </p>
                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                                        {signal.tags.map((t) => (
                                            <span key={t} className="text-[11px] sm:text-[13px] px-1 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm font-bold uppercase tracking-tighter">
                                                {t}
                                            </span>
                                        ))}
                                        <span className="ml-auto text-[11px] sm:text-[13px] font-bold uppercase tracking-widest text-outline">
                                            Impact: <span className={signal.impactColor}>{signal.impact}</span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="mt-2 flex justify-center">
                        <button className="group flex items-center gap-2 border border-outline-variant/30 px-4 sm:px-5 py-1.5 rounded-sm hover:bg-surface-container-high transition-all active:scale-95">
                            <span className="text-[13px] sm:text-[15px] font-bold tracking-widest text-on-surface-variant uppercase">Load More Signals</span>
                            <span className="material-symbols-outlined text-primary group-hover:translate-y-0.5 transition-transform !text-[16px] sm:!text-[18px]">keyboard_double_arrow_down</span>
                        </button>
                    </div>
                </section>

                {/* Right Sidebar */}
                <aside className="col-span-12 lg:col-span-4 flex flex-col gap-2 sm:gap-4">

                    {/* Model Leaderboard */}
                    <div className="bg-surface-container border border-outline-variant/20 rounded-lg overflow-hidden">
                        <div className="px-2 sm:px-3 py-2 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high">
                            <span className="font-h2 text-[13px] sm:text-[15px] text-white flex items-center gap-1.5 uppercase tracking-wide">
                                <span className="material-symbols-outlined text-primary !text-[16px] sm:!text-[18px]">leaderboard</span>
                                Model Leaderboard
                            </span>
                            <span className="text-outline font-mono-data text-[13px] sm:text-[15px]">MMLU-PRO</span>
                        </div>
                        <div className="flex flex-col">
                            {modelLeaderboard.map((m) => (
                                <div key={m.rank} className="zebra-row flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border-b border-outline-variant/10 last:border-b-0 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                    <span className="font-mono-data text-[16px] sm:text-[18px] text-outline/40 group-hover:text-primary/50 transition-colors w-6 text-center shrink-0">
                                        {m.rank}
                                    </span>
                                    <div className="flex flex-col gap-0.5 flex-grow min-w-0">
                                        <span className="font-h2 text-[14px] sm:text-[16px] text-white truncate group-hover:text-primary transition-colors">{m.name}</span>
                                        <span className="text-[12px] sm:text-[13px] text-outline uppercase tracking-wider">{m.org}</span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                                        <span className="font-mono-data text-[13px] sm:text-[15px] text-on-surface">{m.score}</span>
                                        <span className={`text-[12px] sm:text-[13px] font-bold font-mono-data ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {m.delta}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="py-2 sm:py-2.5 text-center border-t border-outline-variant/20 hover:bg-slate-800/20 cursor-pointer transition-colors">
                            <button className="text-[11px] sm:text-[13px] font-label-caps text-primary cursor-pointer w-full tracking-wider">
                                FULL BENCHMARK TABLE ΓåÆ
                            </button>
                        </div>
                    </div>

                    {/* Funding Tracker */}
                    <div className="bg-surface-container border border-outline-variant/20 rounded-lg overflow-hidden">
                        <div className="px-2 sm:px-3 py-2 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high">
                            <span className="font-h2 text-[13px] sm:text-[15px] text-white flex items-center gap-1.5 uppercase tracking-wide">
                                <span className="material-symbols-outlined text-amber-400 !text-[16px] sm:!text-[18px]">trending_up</span>
                                Funding Tracker
                            </span>
                            <span className="text-outline font-mono-data text-[13px] sm:text-[15px]">30-DAY</span>
                        </div>
                        <div className="flex flex-col">
                            {fundingRounds.map((f, i) => (
                                <div key={i} className="zebra-row flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 border-b border-outline-variant/10 last:border-b-0 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                    <div className="flex flex-col gap-0.5 flex-grow min-w-0">
                                        <span className="font-h2 text-[14px] sm:text-[16px] text-white truncate group-hover:text-primary transition-colors">{f.company}</span>
                                        <span className="text-[12px] sm:text-[13px] text-outline uppercase tracking-wider">{f.sector} ┬╖ {f.round}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5 shrink-0 ml-2">
                                        <span className="font-mono-data text-[13px] sm:text-[15px] text-amber-400 font-bold">{f.amount}</span>
                                        <span className="text-[12px] sm:text-[13px] text-outline uppercase tracking-wider">{f.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hustle Play of the Day */}
                    <div className="bg-primary-container/5 border border-primary/20 rounded-lg p-2 sm:p-4">
                        <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                            <span className="text-primary text-[16px] sm:text-[18px]">ΓÜí</span>
                            <h2 className="font-h2 text-[15px] sm:text-[18px] text-white uppercase tracking-tight">Hustle Play of the Day</h2>
                            <span className="bg-primary px-1.5 py-0.5 text-on-primary font-label-caps text-[14px] sm:text-[16px] rounded-full">AI CURATED</span>
                        </div>
                        <p className="text-[12px] sm:text-[13px] text-on-surface-variant leading-relaxed mb-2 sm:mb-3">
                            With the GPT Store creator dashboard now live, the fastest path to $500+/month is building a niche GPT for a specific profession ΓÇö e.g. contract lawyers, e-commerce operators, or HR managers.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-outline-variant/10 gap-1.5 sm:gap-0">
                            <span className="text-[12px] sm:text-[13px] text-outline uppercase tracking-wider flex gap-1 items-center">Difficulty: <span className="difficulty-intermediate px-1.5 py-0.5 rounded-sm text-[11px] sm:text-[13px] font-bold">INTERMEDIATE</span></span>
                            <button className="text-[13px] sm:text-[15px] font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-widest">
                                FULL BREAKDOWN ΓåÆ
                            </button>
                        </div>
                    </div>

                </aside>
            </div>

        </main>
    );
}