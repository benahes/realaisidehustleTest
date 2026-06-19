'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export default function AdminLoginPage() {
    const router = useRouter()
    const { signIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signIn(email, password)
            router.push('/admin/dashboard')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Authentication failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-on-surface font-body-sm selection:bg-primary-container selection:text-white overflow-x-hidden">
            {/* Background Accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full" style={{ background: 'rgba(157,78,221,0.10)', filter: 'blur(120px)' }} />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full" style={{ background: 'rgba(157,78,221,0.05)', filter: 'blur(100px)' }} />
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40%] h-[40%] rounded-full" style={{ background: 'rgba(212,188,243,0.03)', filter: 'blur(80px)' }} />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 w-full px-margin-edge py-4 flex items-center justify-between">
                <a href="/" className="text-xl font-black tracking-tighter text-white font-mono-data hover:text-primary transition-colors">
                    AI SIDE HUSTLE
                </a>
                <a href="/" className="font-label-caps text-label-caps text-outline hover:text-on-surface transition-colors">
                    EXIT TERMINAL
                </a>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-margin-edge">
                <div className="w-full max-w-[420px]">
                    {/* Header */}
                    <div className="text-center mb-stack-loose">
                        <h1 className="font-h1 text-h1 text-on-surface mb-2 tracking-tight">
                            Admin Terminal
                        </h1>
                        <p className="font-body-xs text-on-surface-variant opacity-80">
                            Restricted Access Zone. Authorized Personnel Only.
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="rounded-xl overflow-hidden border border-outline-variant/30" style={{ background: 'rgba(35,30,38,0.7)', backdropFilter: 'blur(12px)' }}>
                        {error && (
                            <div className="mx-6 mt-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono-data">
                                {error}
                            </div>
                        )}

                        <div className="p-6 space-y-stack-mid">
                            <form className="space-y-stack-mid" onSubmit={handleSubmit}>
                                <div className="space-y-unit">
                                    <label className="font-label-caps text-label-caps text-on-surface-variant/50 ml-1 block">ADMIN IDENTIFIER</label>
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-primary-container focus:ring-0 text-body-sm font-mono-data text-primary placeholder:text-on-surface-variant/30 transition-all px-1 py-2"
                                        placeholder="admin@synthetic.ai"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-unit">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="font-label-caps text-label-caps text-on-surface-variant/50 block">ACCESS KEY</label>
                                    </div>
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-primary-container focus:ring-0 text-body-sm font-mono-data text-primary placeholder:text-on-surface-variant/30 transition-all px-1 py-2"
                                        placeholder="••••••••••••"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    className="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps py-3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
                                    style={{ boxShadow: '0 0 15px -5px rgba(157,78,221,0.5)' }}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'AUTHENTICATING...' : 'ACCESS TERMINAL'}
                                </button>
                            </form>
                        </div>

                        <div className="bg-surface-container-lowest py-3 px-6 border-t border-outline-variant/20 text-center">
                            <p className="font-body-xs text-on-surface-variant/40">
                                Not an admin?{' '}
                                <a className="text-on-surface hover:text-primary transition-colors font-medium" href="/login">
                                    Return to Frontend
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full py-4 text-center">
                <p className="font-label-caps text-[9px] text-on-surface-variant/30 tracking-widest">
                    SECURE CONNECTION // TLS 1.3 // ENCRYPTED
                </p>
            </footer>
        </div>
    )
}
