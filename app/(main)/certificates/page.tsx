import Image from "next/image";

export const metadata = {
    title: 'Accreditation Registry | AI Intelligence',
    description: 'Validated technical credentials and registry history.',
};

const CERTIFICATES = [
    {
        id: "9X2-AI-2024-001",
        title: "Advanced Neural Architecture",
        tag: "VERIFIED",
        tagColor: "primary",
        issued: "MAR 14, 2024",
        level: "ELITE",
        desc: "Expert mastery in transformer-based models, attention mechanisms, and custom layer optimization for large-scale production environments.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSRAGnoSBXsroqEZV8WDaDBY4UXlCVeOdGcrzaqtIYJJQdMvhDgAd7UjMeUsJMPF6BwACstCHfdjQT0_4GRH1y-XGeMwxtUkEyNJjxPJMpNFGIwzlGQE4NHOw1y3Dy0b0lmdjJux2ruJPDk7-qJO_trInlJ61xronl9mk6xBybBFESDYQZR1bV-tSgyTBpgxt24JlIfm0SGOd3Y5bXhSWJAxDhYYRXDEptC3FXXWzsUjmWGVOsKOUyS5Epjcta0en_uu43tkTVncjc",
    },
    {
        id: "4A7-SEC-2023-992",
        title: "AI Ethics & Alignment",
        tag: "RECERTIFIED",
        tagColor: "tertiary",
        issued: "DEC 02, 2023",
        level: "PROFESSIONAL",
        desc: "Validation of compliance knowledge regarding GDPR, AI Act, and algorithmic bias mitigation strategies in enterprise systems.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAIHuHEC9JbiWDTEqU5_vRrCSha-01bspjY3--OvkEYxEpvaEeu2jX7po6L0tS37VF8LqWfj7tWO0oaN9Zgi3KHjBDyFoMHl2eBzJbwQCiIstOgUCJGASj4vYVWU1GoqkUNlBLwepIsdATIw5GVvM6bQ4WOPFfRkv9Ht9OOPD_hIJGy3EoL0L4M2E-eKq5LcSUnPxnnKLfPct7Jl2voLRcXK_Uph-kJl4hjpW-VNEWx-aiLS3ii23aj8e_o04ZiFDyDMT-0wIWiuCi",
    },
    {
        id: "1L0-OPS-2024-554",
        title: "LLM Operations Specialist",
        tag: "VERIFIED",
        tagColor: "primary",
        issued: "JAN 20, 2024",
        level: "SENIOR",
        desc: "Credential for deploying and monitoring large language models, managing context windows, and RAG pipeline optimization.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBhHj2gNDT2NLitIf3yS1RtAwSFVKv_KyiYDnVpSIkQVjuhpuRqzM-KowRjmJUy7a3ia_hlu_1-nCrHBmCtFN8s0QqPglj92iPLCJHz0MfaeWeNLOwimj3oBeQZsDw6ZixN7IdP3cFIE2tubYcWc-q3s0vj5rcBSvc4L5ggCaDLCw3InfuRKurDTbB2R1VNX6hrk3l2Xvxv4C86ABtbkJJuXc4ZqPmgd7rKYTgbsevC2k6sOYZQ4bT-Cwr0q84AOONt4vaGkUGRzIK",
    },
];

const REGISTRY_HISTORY = [
    {
        spec: "Quantum Machine Learning Beta",
        issueDate: "2024.05.10",
        validUntil: "2026.05.10",
        score: "94/100",
        credentialId: "#QM-99823-X",
        bgClass: ""
    },
    {
        spec: "Generative Adversarial Design",
        issueDate: "2023.11.12",
        validUntil: "2025.11.12",
        score: "88/100",
        credentialId: "#GA-11202-A",
        bgClass: "bg-slate-900/10"
    },
    {
        spec: "Tokenization Strategy Masterclass",
        issueDate: "2023.08.01",
        validUntil: "LIFETIME",
        score: "99/100",
        credentialId: "#TS-44501-M",
        bgClass: ""
    },
];

export default function CertificatesPage() {
    return (
        <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5">
            {/* Summary Dashboard Section */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-gutter mb-2 sm:mb-5">
                <div className="md:col-span-8 flex flex-col justify-end py-2 sm:py-4">
                    <span className="text-primary font-label-caps text-xs sm:text-[13px] mb-1 sm:mb-2 block tracking-widest uppercase">Registry Overview</span>
                    <h1 className="font-h1 text-lg sm:text-[24px] text-white mb-1.5 sm:mb-3">Accreditation Registry</h1>
                    <p className="text-xs sm:text-[14px] text-on-surface-variant max-w-xl leading-relaxed">Validated technical credentials verifying proficiency in neural network architecture, ethical AI deployment, and enterprise LLM integration.</p>
                </div>
                <div className="md:col-span-4 grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-surface-container border border-outline-variant/30 p-2.5 sm:p-4 flex flex-col justify-between rounded-lg">
                        <div>
                            <span className="text-on-surface-variant font-label-caps text-xs sm:text-[13px] tracking-widest uppercase">Total Certifications</span>
                            <div className="mt-1 sm:mt-2 text-2xl sm:text-[32px] font-mono-data text-white">14</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs sm:text-[13px] text-tertiary mt-1.5 sm:mt-3">
                            <span className="material-symbols-outlined text-sm sm:text-[16px]">trending_up</span>
                            <span>+2 THIS QUARTER</span>
                        </div>
                    </div>
                    <div className="bg-surface-container border border-outline-variant/30 p-2.5 sm:p-4 flex flex-col justify-between rounded-lg">
                        <div>
                            <span className="text-on-surface-variant font-label-caps text-xs sm:text-[13px] tracking-widest uppercase">Skill Score</span>
                            <div className="mt-1 sm:mt-2 text-2xl sm:text-[32px] font-mono-data text-white">98.4</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs sm:text-[13px] text-primary mt-1.5 sm:mt-3">
                            <span className="material-symbols-outlined text-sm sm:text-[16px]">workspace_premium</span>
                            <span>TOP 1% GLOBAL</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Tab Navigation */}
            <nav className="sticky top-14 z-40 mb-2 sm:mb-5 py-2 sm:py-3 border-y border-outline-variant/30 glass-panel">
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar px-1">
                    <button className="bg-primary-container text-on-primary-container px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-caps text-xs sm:text-[13px] whitespace-nowrap uppercase tracking-widest">All Credentials</button>
                    <button className="bg-surface-container text-on-surface px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-caps text-xs sm:text-[13px] whitespace-nowrap hover:bg-surface-container-high transition-colors uppercase tracking-widest">Neural Architects</button>
                    <button className="bg-surface-container text-on-surface px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-caps text-xs sm:text-[13px] whitespace-nowrap hover:bg-surface-container-high transition-colors uppercase tracking-widest">Ethics &amp; Compliance</button>
                    <button className="bg-surface-container text-on-surface px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-caps text-xs sm:text-[13px] whitespace-nowrap hover:bg-surface-container-high transition-colors uppercase tracking-widest">MLOps Specialists</button>

                    <div className="ml-auto hidden md:flex items-center gap-2">
                        <span className="text-on-surface-variant font-label-caps tracking-widest uppercase text-xs sm:text-[13px]">Sort By:</span>
                        <select className="bg-transparent border-none text-on-surface font-label-caps tracking-widest uppercase text-xs sm:text-[13px] p-0 focus:ring-0 cursor-pointer">
                            <option>RECENT ISSUANCE</option>
                            <option>EXPIRATION DATE</option>
                            <option>CREDENTIAL RANK</option>
                        </select>
                    </div>
                </div>
            </nav>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-gutter">
                {CERTIFICATES.map((cert) => (
                    <article key={cert.id} className="bg-surface-container-low border border-outline-variant/30 group hover:border-primary/50 transition-colors flex flex-col h-full rounded-sm">
                        <div className="relative aspect-[1.414/1] overflow-hidden bg-slate-900 border-b border-outline-variant">
                            <img className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src={cert.image} alt={cert.title} />
                            <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 bg-${cert.tagColor} text-on-${cert.tagColor} rounded-full px-2 py-0.5 text-xs sm:text-[13px] font-bold tracking-widest uppercase`}>
                                {cert.tag}
                            </div>
                            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm">
                                    <span className="text-white font-mono-data text-xs sm:text-[13px]">ID: {cert.id}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-2.5 sm:p-5 flex-grow">
                            <div className="flex justify-between items-start mb-1.5 sm:mb-2.5">
                                <h3 className="font-h2 text-base sm:text-[20px] text-white leading-tight">{cert.title}</h3>
                                <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-${cert.tagColor} mt-1 shrink-0`}></div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 text-on-surface-variant font-label-caps text-xs sm:text-[13px] uppercase tracking-widest mb-2 sm:mb-4 flex-wrap">
                                <span>ISSUED: {cert.issued}</span>
                                <span className="w-1 h-1 rounded-full bg-outline-variant hidden sm:inline"></span>
                                <span>LEVEL: {cert.level}</span>
                            </div>
                            <p className="text-xs sm:text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed">
                                {cert.desc}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 border-t border-outline-variant">
                            <button className="py-2 sm:py-3.5 font-label-caps text-[10px] sm:text-[13px] tracking-widest uppercase border-r border-outline-variant hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-1 sm:gap-2">
                                <span className="material-symbols-outlined text-sm sm:text-[18px]">download</span>
                                <span className="hidden sm:inline">DOWNLOAD PDF</span>
                                <span className="sm:hidden">PDF</span>
                            </button>
                            <button className="py-2 sm:py-3.5 font-label-caps text-[10px] sm:text-[13px] tracking-widest uppercase hover:bg-on-secondary-fixed hover:text-white transition-colors flex items-center justify-center gap-1 sm:gap-2">
                                <span className="material-symbols-outlined text-sm sm:text-[18px]">share</span>
                                <span className="hidden sm:inline">SHARE TO LINKEDIN</span>
                                <span className="sm:hidden">SHARE</span>
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {/* Data Integrity Table */}
            <section className="mt-4 sm:mt-8">
                <div className="flex items-center justify-between mb-2 sm:mb-5">
                    <h2 className="font-h2 text-base sm:text-[22px] text-white flex items-center gap-1.5 sm:gap-2">
                        <span className="material-symbols-outlined text-primary text-lg sm:text-[24px]">analytics</span>
                        Registry History &amp; Validation
                    </h2>
                    <div className="bg-surface-container px-2 sm:px-3 py-1 sm:py-1.5 border border-outline-variant rounded-sm">
                        <span className="text-xs sm:text-[13px] font-mono-data text-on-surface-variant uppercase tracking-widest">Sync: 2m ago</span>
                    </div>
                </div>
                <div className="overflow-x-auto border border-outline-variant rounded-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-high border-b border-outline-variant">
                                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px]">SPECIALIZATION</th>
                                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-center">ISSUE DATE</th>
                                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-center hidden sm:table-cell">VALID UNTIL</th>
                                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-center">SCORE</th>
                                <th className="p-2 sm:p-4 font-label-caps text-on-surface tracking-widest uppercase text-xs sm:text-[13px] text-right">CREDENTIAL ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/30">
                            {REGISTRY_HISTORY.map((row, index) => (
                                <tr key={index} className={`${row.bgClass} hover:bg-slate-800/30 transition-colors group`}>
                                    <td className="p-2 sm:p-4 text-sm sm:text-[15px] text-white font-medium border-l-2 border-transparent group-hover:border-primary">
                                        {row.spec}
                                    </td>
                                    <td className="p-2 sm:p-4 text-xs sm:text-[14px] text-on-surface-variant text-center font-mono-data">
                                        {row.issueDate}
                                    </td>
                                    <td className="p-2 sm:p-4 text-xs sm:text-[14px] text-on-surface-variant text-center font-mono-data hidden sm:table-cell">
                                        {row.validUntil}
                                    </td>
                                    <td className="p-2 sm:p-4 text-center">
                                        <span className="bg-primary-container/20 text-primary px-1.5 sm:px-2.5 py-0.5 rounded text-xs sm:text-[13px] font-bold">
                                            {row.score}
                                        </span>
                                    </td>
                                    <td className="p-2 sm:p-4 text-right font-mono-data text-xs sm:text-[13px] text-on-surface-variant">
                                        {row.credentialId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}