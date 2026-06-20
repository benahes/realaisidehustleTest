'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export default function RegisterPage() {
    const router = useRouter()
    const { signUp, signInWithOAuth } = useAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleGoogleSignIn = async () => {
        setError('')
        try {
            await signInWithOAuth('google')
        } catch (err: any) {
            setError(err.message || 'Google sign-in failed')
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!agreed) {
            setError('You must agree to the terms')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setError('')
        setLoading(true)
        try {
            await signUp(email, password, { full_name: name })
            router.push('/')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-background text-on-background font-body-sm selection:bg-primary/30">
            {/* Technical Visualization Side */}
            <section className="hidden lg:flex w-1/2 relative overflow-hidden bg-surface-container-lowest border-r border-outline-variant">
                <div className="absolute inset-0 w-full h-full object-cover opacity-60 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn3IHZ1OPyS6xWx0s2Baz_Q4tWj6L1FdOUpTZ0d-q84-ArpO1AqUf2Xnxl0d7NgqWWIaBLNYVIMhuBTZUGGAsqcHq8D2YZG1z1EmbraLGdhXmaNJ7O9plkTobpmRxKvvbBJTORci6b1gQHKm75MG1uuyVuDMIZxyFDLHrTdhgnIKKEBbkkuA3sCuzOJ2qOg6vAl1Wn0Kx0kGvwH9P6uY7JDjTWLAvkn9SjC_6MLEyLAndATSVqFUd1zvMPcEeOpLd5FPlr7g2gg6fI')] bg-cover bg-center"></div>
                <div className="relative z-10 p-margin-edge flex flex-col justify-start w-full h-full">
                    {/* Branding Anchor */}
                    <div>
                        <div className="flex items-center gap-stack-mid">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-primary text-[18px]">psychology</span>
                            </div>
                            <h1 className="font-h1 text-h1 tracking-tight text-primary">AI Side Hustle</h1>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-stack-tight opacity-70">Engineering your financial freedom with AI</p>
                    </div>
                </div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #998d9e 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            </section>

            {/* Register Form Side */}
            <section className="w-full lg:w-1/2 flex items-center justify-center p-margin-edge bg-surface">
                <div className="w-full max-w-[400px] flex flex-col gap-stack-loose pt-[10px]">
                    {/* Mobile Branding */}
                    <div className="lg:hidden mb-stack-loose">
                        <div className="flex items-center gap-stack-mid mb-stack-tight">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-primary text-[18px]">psychology</span>
                            </div>
                            <h1 className="font-h1 text-h1 tracking-tight text-primary">AI Side Hustle</h1>
                        </div>
                    </div>

                    <div className="space-y-stack-tight pt-[10px]">
                        <h2 className="font-h1 text-h1 text-on-surface">Create Node Profile</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Initialize your entity within the Synthetic Intelligence Index.</p>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-error-container/10 border border-error/30 text-on-error-container text-sm font-mono-data">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-stack-loose pt-[10px]" onSubmit={handleSubmit}>
                        <div className="space-y-stack-mid pt-[10px]">
                            {/* Name Field */}
                            <div className="group">
                                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-unit block" htmlFor="name">Entity Designation</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 bottom-stack-tight text-[18px] text-outline group-focus-within:text-primary transition-colors">badge</span>
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-outline-variant py-stack-tight pl-7 text-on-surface font-body-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant"
                                        id="name"
                                        placeholder="Johnathan Doe"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Email Field */}
                            <div className="group">
                                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-unit block" htmlFor="email">Network Identity</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 bottom-stack-tight text-[18px] text-outline group-focus-within:text-primary transition-colors">alternate_email</span>
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-outline-variant py-stack-tight pl-7 text-on-surface font-body-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant"
                                        id="email"
                                        placeholder="operator@nexus.io"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Password Field */}
                            <div className="group">
                                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-unit block" htmlFor="password">Access Key</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 bottom-stack-tight text-[18px] text-outline group-focus-within:text-primary transition-colors">key</span>
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-outline-variant py-stack-tight pl-7 text-on-surface font-body-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant"
                                        id="password"
                                        placeholder="••••••••••••"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                            {/* Confirm Password Field */}
                            <div className="group">
                                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-unit block" htmlFor="confirm-password">Confirm Access Key</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 bottom-stack-tight text-[18px] text-outline group-focus-within:text-primary transition-colors">verified_user</span>
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-outline-variant py-stack-tight pl-7 text-on-surface font-body-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant"
                                        id="confirm-password"
                                        placeholder="••••••••••••"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Terms Agreement */}
                        <div className="flex items-start gap-2 pt-stack-tight">
                            <input
                                className="mt-0.5 rounded-sm border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container/20 w-3 h-3 shrink-0"
                                id="terms"
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <label className="font-body-xs text-body-xs text-on-surface-variant cursor-pointer" htmlFor="terms">
                                I acknowledge the <span className="text-primary hover:underline cursor-pointer">Neural Service Agreement</span> and authorize data indexing protocols.
                            </label>
                        </div>
                        {/* CTA Actions */}
                        <div className="pt-stack-mid space-y-stack-mid">
                            <button
                                className="w-full bg-primary-container text-on-primary-container h-10 rounded-lg font-label-caps text-label-caps uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-stack-mid shadow-lg shadow-primary/10"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'INITIALIZING...' : 'Create Node Profile'}
                                <span className="material-symbols-outlined text-[16px]">bolt</span>
                            </button>
                            <div className="relative flex items-center py-stack-tight">
                                <div className="flex-grow border-t border-outline-variant/30"></div>
                                <span className="flex-shrink mx-4 font-label-caps text-label-caps text-outline-variant">Secure Registration</span>
                                <div className="flex-grow border-t border-outline-variant/30"></div>
                            </div>
                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center gap-stack-mid border border-outline-variant rounded-lg h-9 font-label-caps text-label-caps uppercase text-on-surface-variant hover:bg-surface-variant/30 transition-colors"
                                type="button"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google Sign-in
                            </button>
                        </div>
                    </form>
                    {/* Footer Links */}
                    <div className="pt-stack-loose mt-auto">
                        <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
                            Existing entity in the ecosystem?
                            <a className="text-primary font-semibold hover:underline" href="/login"> Initialize Session</a>
                        </p>
                    </div>
                    {/* Legal/System Info */}
                    <div className="mt-stack-loose pt-stack-loose border-t border-outline-variant/30 flex justify-between items-center opacity-40">
                        <span className="font-mono-data text-mono-data">ENCRYPTION: AES-256-GCM</span>
                        <span className="font-mono-data text-mono-data">© 2024 AI SIDE HUSTLE</span>
                    </div>
                </div>
            </section>
        </div>
    )
}