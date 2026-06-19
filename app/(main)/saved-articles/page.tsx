import Image from "next/image";

export const metadata = {
    title: 'Saved Articles | AI Intelligence',
    description: 'Your saved articles and library',
};

const ARTICLES = [
    {
        id: "001",
        category: "Blog / LLM Architecture",
        title: "Optimization Patterns for Multi-Agent Orchestration",
        date: "OCT 24, 2023",
        readTime: "12 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmFfn92xtF-yeWB7EwkAX_AvgGcKxQugU8SrkGEWlmxtqpA_jx8F1YZl-IqSIBElS826_5-xbch16hnLgjaRq0CJomW25JasD3WH7mhjBUETKxhCdV6ZQjAYQQ8XJdm7wqACLjP2DM5iYsnpqg4VqoCws51WppJAUmkQ9e8lhbQt7Tl9AAMVsdbTA2XOSeoIC1SWRdbwa4zpzDMjebrWOlGz-k6d6Z8679323uf7dybGWf6nIx6BeOjWhyfjp7bC1PJnctVcNiTWQ4",
    },
    {
        id: "002",
        category: "Radar / Market Shift",
        title: "The H100 Supply Chain: 2024 Inventory Analysis",
        date: "OCT 22, 2023",
        readTime: "8 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBdJ01nRVRIuo_TVrQ8q_OA8QCxYi1X_86X44Y_6NKq5-qmSX2oT31OjRvcAnxq9e8PRWVGv032XBGfzo5_YGf65FjoGWeeAGdJMu--ReNH2G8PLWASS2nfHX_xoIVxkuW9xE-K44tBBgdACy6FQd1KwHANpAEGGhzPS3qs-hcGN2kofQB8qs3BtBFqHacGVXysi-jssdF4JhySshFEc-NkOJ6-lnwRRqaB3bg748NxlIQ93-dhXO_C9rNlAZIN5UA6XEcLQxbGamm",
    },
    {
        id: "003",
        category: "Tools / Dev Ops",
        title: "Vector Database Comparison: Milvus vs Pinecone vs Weaviate",
        date: "OCT 19, 2023",
        readTime: "15 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1-ewz0wEbL6YRV-yCckMr2vStubG4KmAc-3U37DB1BxiLd_-NDLQ5mlsCAfwvy-ENtpR3aPu3dpBvjkEQhiRvMbfrHGdOYBwZB6IL-RhEVeW0oRi7BG6msWUwJ-l1G0QQNn2R4qfBv0Ir_4F1faYzODuaV3aDgp5Uky0G9JMMPRctFUo95gWN7vBrPxkQ_-tpF1WAH8GssHKkcbPwYHrBn4S4CSV8wR3XL086g6qRoYyviem9gXcjQlFVslVa8HHPCgstnA-YJ0SZ",
    },
    {
        id: "004",
        category: "Radar / Privacy",
        title: "Zero-Knowledge Proofs in Generative AI Training",
        date: "OCT 15, 2023",
        readTime: "22 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEsTyQj3v6muCczmBJrEgMhhKlMvSc5E0i1q4meVbheBchVO2U76FdSEiZxl_JyTQF8uetbmzDwQTU9diatKXD6pmqgcMV0aGIx0FPOsOLvmWKI36YbgwzpV7QNMIS9axf-D8F0fOu7HUPx9sxxQBxu_S6wJHrxnsyRu3nYz7QDeemdxBnyGm4oTps_X9Ub5KdvV--VlNvmcq-jC3jSw8oPyC8R8_guQjUQdrytr-Gsd8rJWoJAv9KABaUBdA0btQQIR7M67BTqycm",
    },
    {
        id: "005",
        category: "Courses / Advanced",
        title: "Mastering LoRA: Fine-Tuning Efficiency Strategies",
        date: "OCT 12, 2023",
        readTime: "45 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKnYnz7SSiOJl2LmdYPMNM9061Vm7KecLa7_o6np6O7OrcKKE09mMcyQS15zz_vIHFT_rfgmn4Z_t17sk4EsfUe0ysDasfilBxhqdxxOszS--0i0d_Uv3DqAvEUA49j7WRR8Vp7le3fKL-XX7CIoT3ha1FShevemvPGfp4O9rccfA-ixxBX1y1X08CvexxTjxXC0E5m5Psit98X-5v7TJGaelMjPAgN1SLCDkXNiIFcxqF692_FuOGn6XduJaTNmUz40gYRQvYvJI-",
    },
    {
        id: "006",
        category: "Blog / Interface",
        title: "Cognitive Load Theory in High-Density AI Dashboards",
        date: "OCT 10, 2023",
        readTime: "6 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7vXkiggG8ZmcjoKV0loT1qqUL5gfBh2CBeZCCDIxev3nlbnCBzD702hz6BdeKg0Mh_wZpk5vKcu8crsIvm-izKBQEXWMxs0YYy020ZrfxAMZdFIJjoe4i5zY4chPmJ0zGv_NP6GZE-UeZzx5wau2s97jFnBBOJI-ALMGno4eLmFJBJ9B1dS-b-cuSJnnmBcUMCoY97YfugeGiCu4tCQ9jFxZk02c0Jv2CvQZvpju3JzMODa-zLQ0Lek0KUDhBKEqk6DtibXbf64Gg",
    },
    {
        id: "007",
        category: "Radar / Edge Computing",
        title: "Decentralized Inference: The Rise of Local LLMs",
        date: "OCT 05, 2023",
        readTime: "11 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuqyz9SG4G40H0CM9oSBbgTFICdS9iRw4RMa9rkGUPGt0dvhZQOheTshcUWX8HUyZ2jkrrfaF-DHB4i73912Ee4rh7yw4Tb1ssV5ApnXrvdlF6QxAV6HeqbiVvfdzHOvkpA_wGU9Z0pw12Pu2efLg3UKxkUyuFroNPhyigcbfO2HJBkERFgXlnCCq_E793mgNxkneTPTBzo-A15RddAfyO2dqVqs_4h3_7Qs8C3jLwcBmiffsZOSnCKJr5hORNu1W5mCOr5RJyqw-9",
    },
    {
        id: "008",
        category: "Playbooks / Scale",
        title: "Architecture for 100M+ Monthly AI Generations",
        date: "SEP 30, 2023",
        readTime: "19 MIN READ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPrrjGvUKrxLIxVKopVvKD1YtyCLJlogUVrY1XjEe_WUuCVjKZBINA-7n14DyvECsqWVfmEsc_Vkhdr8rcCJhVqvyx1C47CDx1rnc7tpPFeHZXbkAcNc71yBkJd3uw6BO3L0zMXMADsD1ZY7PlNhVlLk_Hwl5g0Tr01y10GA5pd9jgywub77Ryw4oMvJ6H-ypLEyh5LlZpjkaSMDm3gQ9KqZP7EW3amuLToityQfQJ36PeenJsgWt2p1slKhfA01M7Z2kMQMmZenY0",
    },
];

export default function SavedArticlesPage() {
    return (
        <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 pt-[10px] sm:pt-[15px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 sm:mb-5">
                <div>
                    <h1 className="font-h1 text-lg sm:text-[24px] text-on-surface uppercase flex items-center gap-2 sm:gap-3">
                        <span className="w-1.5 h-5 sm:h-7 bg-primary"></span>
                        Saved Library
                    </h1>
                    <p className="text-xs sm:text-[13px] text-outline mt-0.5 sm:mt-1 uppercase tracking-widest">32 Entries Synchronized</p>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                    <button className="bg-surface-container-high border border-outline-variant px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 hover:bg-surface-variant transition-colors rounded-sm">
                        <span className="material-symbols-outlined text-sm sm:text-[18px]">filter_list</span>
                        <span className="font-label-caps text-xs sm:text-[13px] uppercase hidden sm:inline">Filter</span>
                    </button>
                    <button className="bg-surface-container-high border border-outline-variant px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 hover:bg-surface-variant transition-colors rounded-sm">
                        <span className="material-symbols-outlined text-sm sm:text-[18px]">sort</span>
                        <span className="font-label-caps text-xs sm:text-[13px] uppercase hidden sm:inline">Sort</span>
                    </button>
                </div>
            </div>

            {/* Sticky Tab Nav */}
            <div className="sticky top-[52px] z-40 bg-background/80 backdrop-blur-md py-2 sm:py-3 mb-2 sm:mb-5 border-b border-outline-variant/30 flex gap-1.5 sm:gap-2 overflow-x-auto">
                <button className="bg-primary text-on-primary font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase whitespace-nowrap">All Archives</button>
                <button className="bg-secondary-container text-on-secondary-container font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase hover:bg-surface-variant transition-all whitespace-nowrap">Analysis</button>
                <button className="bg-secondary-container text-on-secondary-container font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase hover:bg-surface-variant transition-all whitespace-nowrap">Radars</button>
                <button className="bg-secondary-container text-on-secondary-container font-label-caps text-xs sm:text-[13px] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase hover:bg-surface-variant transition-all whitespace-nowrap">Technical</button>
            </div>

            {/* High Density Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-gutter">
                {ARTICLES.map((article) => (
                    <article key={article.id} className="bg-surface-container border border-outline-variant flex flex-col group hover:border-primary/50 transition-all rounded-sm">
                        <div className="relative h-28 sm:h-36 overflow-hidden border-b border-outline-variant">
                            <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" src={article.image} alt={article.title} />
                            <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-slate-950/80 px-1.5 sm:px-2 py-0.5 backdrop-blur-sm border border-white/10">
                                <span className="font-mono-data text-xs sm:text-[13px] text-white">{article.id}</span>
                            </div>
                        </div>
                        <div className="p-2.5 sm:p-4 flex flex-col flex-grow">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                                <span className="font-label-caps text-xs sm:text-[13px] text-primary uppercase">{article.category}</span>
                            </div>
                            <h3 className="font-h2 text-sm sm:text-[18px] text-on-surface mb-2 sm:mb-3 leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                            <div className="mt-auto pt-2.5 sm:pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-mono-data text-xs sm:text-[13px] text-outline uppercase">{article.date}</span>
                                    <span className="font-mono-data text-xs sm:text-[13px] text-on-surface uppercase">{article.readTime}</span>
                                </div>
                                <button className="p-1.5 sm:p-2 border border-outline-variant hover:bg-error-container hover:text-on-error-container hover:border-error transition-all">
                                    <span style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }} className="material-symbols-outlined text-base sm:text-[20px]">bookmark_remove</span>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-outline-variant pt-3 sm:pt-5 gap-2 sm:gap-4">
                <span className="font-mono-data text-xs sm:text-[14px] text-outline uppercase">Showing 8 of 32 saved entries</span>
                <div className="flex gap-1">
                    <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-primary text-primary font-mono-data text-xs sm:text-[14px]">1</button>
                    <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-outline-variant text-on-surface font-mono-data text-xs sm:text-[14px] hover:bg-surface-variant transition-colors">2</button>
                    <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-outline-variant text-on-surface font-mono-data text-xs sm:text-[14px] hover:bg-surface-variant transition-colors">3</button>
                    <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-outline-variant text-on-surface font-mono-data text-xs sm:text-[14px] hover:bg-surface-variant transition-colors">4</button>
                    <button className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-outline-variant text-on-surface font-mono-data text-xs sm:text-[14px] hover:bg-surface-variant transition-colors">
                        <span className="material-symbols-outlined text-sm sm:text-[18px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </main>
    );
}