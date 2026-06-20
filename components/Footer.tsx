import Link from "next/link";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 pb-4 md:pb-4 pt-4 md:pt-6 px-4 md:px-6 relative z-10 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-start gap-3 md:gap-6 relative z-20">

                {/* Brand & Newsletter Block */}
                <div className="flex flex-col w-full md:max-w-xs gap-2 border-b border-slate-800/60 pb-3 md:border-0 md:pb-0">
                    <div className="flex flex-row md:flex-col justify-between items-center md:items-start gap-1 w-full">
                        <span className="text-white font-mono-data font-black tracking-tighter text-xl sm:text-2xl uppercase">AI SIDE HUSTLE</span>

                        {/* Mobile Socials placed inline with Brand text to save massive vertical space */}
                        <div className="flex gap-3 md:hidden">
                            <Link href="#" aria-label="Twitter" className="text-slate-500 hover:text-purple-400"><Twitter className="w-4 h-4" /></Link>
                            <Link href="#" aria-label="GitHub" className="text-slate-500 hover:text-purple-400"><Github className="w-4 h-4" /></Link>
                            <Link href="#" aria-label="LinkedIn" className="text-slate-500 hover:text-purple-400"><Linkedin className="w-4 h-4" /></Link>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed hidden md:block mt-2">
                            Engineering your financial freedom. Discover modern AI playbooks, articles, and specialized learning paths.
                        </p>
                    </div>

                    <NewsletterForm />
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 md:gap-y-6 gap-x-2 md:gap-8 w-full md:w-auto md:ml-auto">
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <span className="text-slate-200 text-xs font-bold tracking-widest uppercase">Platform</span>
                        <div className="flex flex-col gap-1 md:gap-1.5 justify-start">
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">Features</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">Pricing</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">Roadmap</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">Playbooks</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <span className="text-slate-200 text-xs font-bold tracking-widest uppercase">Resources</span>
                        <div className="flex flex-col gap-1 md:gap-1.5 justify-start">
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">Blog</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">E-Books</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">Community</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors w-fit" href="#">Help Center</Link>
                        </div>
                    </div>

                    {/* Company Column - Hyper-compact horizontal line on mobile */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5 md:gap-2 border-t border-slate-800/40 pt-2 md:border-0 md:pt-0">
                        <span className="text-slate-200 text-xs font-bold tracking-widest uppercase md:block hidden">Company</span>
                        <div className="flex flex-wrap md:flex-col gap-x-6 gap-y-1 md:gap-1.5 justify-start w-full">
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors" href="#">About</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors" href="#">Careers</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors" href="#">Contact</Link>
                            <Link className="text-slate-500 text-sm hover:text-purple-400 transition-colors" href="#">Partners</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Copyright & Terms */}
            <div className="w-full max-w-7xl mx-auto mt-2 md:mt-4 pt-2 md:pt-4 border-t border-slate-800/60 flex items-center justify-between relative z-20">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 md:gap-6 gap-y-1 text-slate-500 text-[10px] sm:text-xs font-medium uppercase tracking-widest w-full md:w-auto">
                    <p>&copy; {new Date().getFullYear()} AI Side Hustle.</p>
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="#" className="hover:text-purple-400 transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-purple-400 transition-colors">Terms</Link>
                    </div>
                </div>

                {/* Social Icons - Desktop only as mobile is shifted top right */}
                <div className="hidden md:flex gap-6 w-auto justify-end">
                    <Link href="#" aria-label="Twitter" className="text-slate-500 hover:text-purple-400 transition-colors">
                        <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href="#" aria-label="GitHub" className="text-slate-500 hover:text-purple-400 transition-colors">
                        <Github className="w-4 h-4" />
                    </Link>
                    <Link href="#" aria-label="LinkedIn" className="text-slate-500 hover:text-purple-400 transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Subtle background glow effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
        </footer>
    );
}