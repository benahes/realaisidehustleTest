export const metadata = {
    title: 'Edit Profile ΓÇö AI Side Hustle',
    description: 'Edit your profile and subscription.',
};

export default function EditProfilePage() {
    return (
        <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 space-y-2 sm:space-y-5 pt-[10px] sm:pt-[15px]">
            {/* Header & Breadcrumbs */}
            <section className="space-y-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="font-label-caps text-xs sm:text-[13px] uppercase tracking-widest">Settings</span>
                    <span className="material-symbols-outlined text-sm sm:text-[16px]">chevron_right</span>
                    <span className="font-label-caps text-xs sm:text-[13px] uppercase tracking-widest text-primary">Billing &amp; Plans</span>
                </div>
                <h1 className="font-h1 text-lg sm:text-[24px] text-on-surface">Subscription Management</h1>
            </section>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-2 sm:gap-4">
                {/* Active Plan Status */}
                <div className="col-span-12 md:col-span-4 glass-panel p-2.5 sm:p-5 flex flex-col justify-between rounded-xl border border-outline-variant/30">
                    <div>
                        <div className="flex justify-between items-start mb-2 sm:mb-4">
                            <span className="font-label-caps text-xs sm:text-[13px] text-on-surface-variant uppercase tracking-widest">Current Status</span>
                            <span className="bg-primary-container text-on-primary-container text-xs sm:text-[13px] px-2 py-0.5 sm:px-2.5 font-bold uppercase rounded-sm">Active</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2.5">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <h2 className="font-h2 text-base sm:text-[22px] text-primary">Professional Tier</h2>
                        </div>
                        <p className="text-xs sm:text-[14px] text-on-surface-variant leading-relaxed opacity-80">Next billing cycle starts on Jan 14, 2025. Automated recurring payment enabled.</p>
                    </div>
                    <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-outline-variant/30">
                        <div className="flex justify-between text-on-surface items-center">
                            <span className="font-mono-data text-sm sm:text-[16px]">$49.00/mo</span>
                            <button className="font-label-caps text-xs sm:text-[13px] text-error hover:underline transition-all uppercase tracking-widest">Cancel Plan</button>
                        </div>
                    </div>
                </div>

                {/* Usage Metrics */}
                <div className="col-span-12 md:col-span-8 glass-panel p-2.5 sm:p-5 space-y-2 sm:space-y-5 rounded-xl border border-outline-variant/30">
                    <div className="flex justify-between items-center">
                        <span className="font-label-caps text-sm sm:text-[15px] text-on-surface-variant uppercase tracking-widest">Usage Metrics (30D)</span>
                        <span className="font-mono-data text-xs sm:text-[14px] text-primary">Reset in 12 days</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6">
                        {/* Metric 1 */}
                        <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between font-mono-data text-xs sm:text-[13px]">
                                <span className="text-on-surface">API CALLS</span>
                                <span className="text-on-surface-variant">74,200 / 100k</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[74%] transition-all"></div>
                            </div>
                        </div>
                        {/* Metric 2 */}
                        <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between font-mono-data text-xs sm:text-[13px]">
                                <span className="text-on-surface">TOKENS CONSUMED</span>
                                <span className="text-on-surface-variant">8.2M / 10M</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary w-[82%] transition-all"></div>
                            </div>
                        </div>
                        {/* Metric 3 */}
                        <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between font-mono-data text-xs sm:text-[13px]">
                                <span className="text-on-surface">STORAGE USED</span>
                                <span className="text-on-surface-variant">42.1GB / 50GB</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-[84%] transition-all"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing/Plan Grid */}
                <div className="col-span-12 mt-2 sm:mt-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-5">
                        <span className="font-label-caps text-sm sm:text-[15px] text-on-surface-variant uppercase tracking-widest">Switch Plan</span>
                        <div className="h-px flex-1 bg-outline-variant/30"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
                        {/* Starter */}
                        <div className="bg-surface-container-low border border-outline-variant/30 p-2.5 sm:p-5 hover:border-primary/50 transition-all flex flex-col rounded-xl">
                            <span className="font-label-caps text-xs sm:text-[13px] text-on-surface-variant mb-1 sm:mb-2 uppercase tracking-widest">FOR INDIVIDUALS</span>
                            <h3 className="font-h2 text-lg sm:text-[22px] text-on-surface mb-1 sm:mb-2">Starter</h3>
                            <div className="mb-2 sm:mb-5">
                                <span className="font-h1 text-2xl sm:text-[32px]">$0</span>
                                <span className="text-xs sm:text-[14px] text-on-surface-variant">/month</span>
                            </div>
                            <ul className="space-y-1.5 sm:space-y-3 flex-1 mb-3 sm:mb-6">
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    1,000 API calls/mo
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    500k Tokens included
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface-variant opacity-40">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] mt-0.5">block</span>
                                    Community Support
                                </li>
                            </ul>
                            <button className="w-full border border-outline-variant text-on-surface font-label-caps text-xs sm:text-[13px] py-2 sm:py-2.5 hover:bg-surface-variant transition-colors rounded-md uppercase tracking-widest">Downgrade</button>
                        </div>
                        {/* Pro */}
                        <div className="relative bg-surface-container-highest border-2 border-primary p-2.5 sm:p-5 flex flex-col shadow-2xl rounded-xl">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-caps text-xs sm:text-[13px] px-2 sm:px-3 py-0.5 sm:py-1 uppercase font-bold tracking-widest rounded-full">Active Plan</div>
                            <span className="font-label-caps text-xs sm:text-[13px] text-primary mb-1 sm:mb-2 mt-1 sm:mt-2 uppercase tracking-widest">MOST POPULAR</span>
                            <h3 className="font-h2 text-lg sm:text-[22px] text-on-surface mb-1 sm:mb-2">Professional</h3>
                            <div className="mb-2 sm:mb-5">
                                <span className="font-h1 text-2xl sm:text-[32px]">$49</span>
                                <span className="text-xs sm:text-[14px] text-on-surface-variant">/month</span>
                            </div>
                            <ul className="space-y-1.5 sm:space-y-3 flex-1 mb-3 sm:mb-6">
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    100,000 API calls/mo
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    10M Tokens included
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    50GB Shared Storage
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    Priority Email Support
                                </li>
                            </ul>
                            <button className="w-full bg-primary text-on-primary font-label-caps text-xs sm:text-[13px] py-2 sm:py-2.5 opacity-50 cursor-not-allowed rounded-md uppercase tracking-widest">Current Tier</button>
                        </div>
                        {/* Enterprise */}
                        <div className="bg-surface-container-low border border-outline-variant/30 p-2.5 sm:p-5 hover:border-primary/50 transition-all flex flex-col rounded-xl">
                            <span className="font-label-caps text-xs sm:text-[13px] text-on-surface-variant mb-1 sm:mb-2 uppercase tracking-widest">FOR TEAMS</span>
                            <h3 className="font-h2 text-lg sm:text-[22px] text-on-surface mb-1 sm:mb-2">Enterprise</h3>
                            <div className="mb-2 sm:mb-5">
                                <span className="font-h1 text-2xl sm:text-[32px]">$499</span>
                                <span className="text-xs sm:text-[14px] text-on-surface-variant">/month</span>
                            </div>
                            <ul className="space-y-1.5 sm:space-y-3 flex-1 mb-3 sm:mb-6">
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    Unlimited API calls
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    Custom Token Limits
                                </li>
                                <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm sm:text-[16px] text-primary mt-0.5">check_circle</span>
                                    Dedicated Account Manager
                                </li>
                            </ul>
                            <button className="w-full border border-primary text-primary font-label-caps text-xs sm:text-[13px] py-2 sm:py-2.5 hover:bg-primary hover:text-on-primary transition-all rounded-md uppercase tracking-widest">Contact Sales</button>
                        </div>
                    </div>
                </div>

                {/* Billing History Table */}
                <div className="col-span-12 mt-2 sm:mt-4 glass-panel overflow-hidden rounded-xl border border-outline-variant/30">
                    <div className="px-2.5 sm:px-5 py-2 sm:py-3.5 border-b border-outline-variant/30 flex justify-between items-center">
                        <span className="font-label-caps text-sm sm:text-[15px] text-on-surface-variant uppercase tracking-widest">Billing History</span>
                        <button className="text-xs sm:text-[14px] text-primary font-medium hover:underline">Request Full Audit</button>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden bg-surface-container-lowest divide-y divide-outline-variant/10">
                        <div className="p-2.5 flex flex-col gap-1 hover:bg-slate-800/20 transition-colors">
                            <div className="flex justify-between items-center">
                                <span className="font-mono-data text-xs text-on-surface">INV-2024-8842</span>
                                <span className="flex items-center gap-1 text-xs font-bold text-primary uppercase">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Paid
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-on-surface-variant">Dec 14, 2024</span>
                                <span className="font-mono-data text-on-surface">$49.00</span>
                            </div>
                        </div>
                        <div className="p-2.5 flex flex-col gap-1 hover:bg-slate-800/20 transition-colors">
                            <div className="flex justify-between items-center">
                                <span className="font-mono-data text-xs text-on-surface">INV-2024-7210</span>
                                <span className="flex items-center gap-1 text-xs font-bold text-primary uppercase">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Paid
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-on-surface-variant">Nov 14, 2024</span>
                                <span className="font-mono-data text-on-surface">$49.00</span>
                            </div>
                        </div>
                        <div className="p-2.5 flex flex-col gap-1 hover:bg-slate-800/20 transition-colors">
                            <div className="flex justify-between items-center">
                                <span className="font-mono-data text-xs text-on-surface">INV-2024-6101</span>
                                <span className="flex items-center gap-1 text-xs font-bold text-primary uppercase">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Paid
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-on-surface-variant">Oct 14, 2024</span>
                                <span className="font-mono-data text-on-surface">$49.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-surface-container-low">
                                <tr>
                                    <th className="px-2.5 py-2 font-mono-data text-xs sm:text-[13px] text-on-surface-variant uppercase tracking-widest">Invoice ID</th>
                                    <th className="px-2.5 py-2 font-mono-data text-xs sm:text-[13px] text-on-surface-variant uppercase tracking-widest">Date</th>
                                    <th className="px-2.5 py-2 font-mono-data text-xs sm:text-[13px] text-on-surface-variant uppercase tracking-widest">Amount</th>
                                    <th className="px-2.5 py-2 font-mono-data text-xs sm:text-[13px] text-on-surface-variant uppercase tracking-widest">Status</th>
                                    <th className="px-2.5 py-2 font-mono-data text-xs sm:text-[13px] text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                <tr className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-2.5 py-2 font-mono-data text-sm text-on-surface">INV-2024-8842</td>
                                    <td className="px-2.5 py-2 text-sm text-on-surface-variant">Dec 14, 2024</td>
                                    <td className="px-2.5 py-2 font-mono-data text-sm text-on-surface">$49.00</td>
                                    <td className="px-2.5 py-2">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-2.5 py-2 text-right">
                                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-lg">download</button>
                                    </td>
                                </tr>
                                <tr className="bg-surface-container-low/30 hover:bg-slate-800/20 transition-colors">
                                    <td className="px-2.5 py-2 font-mono-data text-sm text-on-surface">INV-2024-7210</td>
                                    <td className="px-2.5 py-2 text-sm text-on-surface-variant">Nov 14, 2024</td>
                                    <td className="px-2.5 py-2 font-mono-data text-sm text-on-surface">$49.00</td>
                                    <td className="px-2.5 py-2">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-2.5 py-2 text-right">
                                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-lg">download</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-2.5 py-2 font-mono-data text-sm text-on-surface">INV-2024-6101</td>
                                    <td className="px-2.5 py-2 text-sm text-on-surface-variant">Oct 14, 2024</td>
                                    <td className="px-2.5 py-2 font-mono-data text-sm text-on-surface">$49.00</td>
                                    <td className="px-2.5 py-2">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-2.5 py-2 text-right">
                                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-lg">download</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}