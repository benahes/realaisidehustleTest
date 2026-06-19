'use client'

import { useState } from 'react'

const ERROR_CODES = [
  { code: '401', definition: 'Unauthorized: Missing/Invalid Token', resolution: 'Provision a new bearer token.' },
  { code: '403', definition: 'Forbidden: Insufficient Scopes', resolution: 'Verify scope permissions in Admin Console.' },
  { code: '429', definition: 'Too Many Requests', resolution: 'Implement exponential backoff.' },
]

const ON_THIS_PAGE = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'token-lifecycle', label: 'Token Lifecycle' },
  { id: 'vault-integration', label: 'Vault Integration' },
  { id: 'error-handling', label: 'Error Handling' },
]

export default function AdminDocsPage() {
  const [activeNav, setActiveNav] = useState('Neural Mapping')
  const [activeSection, setActiveSection] = useState('getting-started')
  const [authOpen, setAuthOpen] = useState(true)
  const [vectorOpen, setVectorOpen] = useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] flex -mx-margin-edge -mt-margin-edge">
      {/* Left Column: Documentation Navigation Tree */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container border-r border-outline-variant overflow-y-auto custom-scrollbar px-stack-mid py-stack-loose">
        <div className="mb-stack-loose">
          <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-stack-mid px-2">
            Core Modules
          </h3>
          <div className="flex flex-col gap-y-1">
            {[
              { icon: 'psychology', label: 'Intelligence Core' },
              { icon: 'hub', label: 'Neural Mapping' },
              { icon: 'terminal', label: 'Data Streams' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`flex items-center gap-x-2 px-2 py-1.5 rounded transition-all group ${
                  activeNav === item.label
                    ? 'bg-primary-container text-on-primary-container border-l-4 border-primary'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span
                  className={`material-symbols-outlined ${activeNav === item.label ? '' : 'text-primary'}`}
                  style={activeNav === item.label ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className={`text-body-sm ${activeNav === item.label ? 'font-bold' : 'group-hover:translate-x-1'} transition-transform`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-stack-loose">
          <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-stack-mid px-2">
            API Reference
          </h3>
          {/* Authentication */}
          <div>
            <button
              onClick={() => setAuthOpen(!authOpen)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-on-surface-variant hover:bg-surface-variant rounded cursor-pointer"
            >
              <div className="flex items-center gap-x-2">
                <span className="material-symbols-outlined">api</span>
                <span className="text-body-sm">Authentication</span>
              </div>
              <span
                className={`material-symbols-outlined transition-transform ${authOpen ? 'rotate-90' : ''}`}
              >
                chevron_right
              </span>
            </button>
            {authOpen && (
              <div className="ml-6 mt-1 flex flex-col gap-y-1 border-l border-outline-variant">
                {[
                  { label: 'Overview', active: true },
                  { label: 'Bearer Tokens' },
                  { label: 'OAuth2 Flow' },
                  { label: 'Rate Limiting' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href="#"
                    className={`px-3 py-1 text-body-xs ${
                      link.active ? 'text-primary border-l-2 border-primary' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Vector DB */}
          <div className="mt-1">
            <button
              onClick={() => setVectorOpen(!vectorOpen)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-on-surface-variant hover:bg-surface-variant rounded cursor-pointer"
            >
              <div className="flex items-center gap-x-2">
                <span className="material-symbols-outlined">storage</span>
                <span className="text-body-sm">Vector DB</span>
              </div>
              <span
                className={`material-symbols-outlined transition-transform ${vectorOpen ? 'rotate-90' : ''}`}
              >
                chevron_right
              </span>
            </button>
            {vectorOpen && (
              <div className="ml-6 mt-1 flex flex-col gap-y-1 border-l border-outline-variant">
                <a href="#" className="px-3 py-1 text-body-xs text-on-surface-variant hover:text-primary">
                  Collections
                </a>
                <a href="#" className="px-3 py-1 text-body-xs text-on-surface-variant hover:text-primary">
                  Embeddings
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto pt-stack-loose border-t border-outline-variant">
          <button className="w-full flex items-center gap-x-2 px-2 py-1.5 text-on-surface-variant hover:bg-surface-variant rounded mb-1">
            <span className="material-symbols-outlined">help</span>
            <span className="text-body-sm">Support</span>
          </button>
          <button className="w-full flex items-center gap-x-2 px-2 py-1.5 text-on-surface-variant hover:bg-surface-variant rounded">
            <span className="material-symbols-outlined">sensors</span>
            <span className="text-body-sm">API Status</span>
            <div className="ml-auto w-2 h-2 rounded-full bg-tertiary"></div>
          </button>
        </div>
      </aside>

      {/* Center Column: Documentation Reader */}
      <section className="flex-1 overflow-y-auto bg-background px-margin-edge py-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-x-2 text-on-surface-variant mb-8 text-body-xs font-mono-data uppercase tracking-wider">
            <a href="#" className="hover:text-primary transition-colors">Docs</a>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <a href="#" className="hover:text-primary transition-colors">API</a>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary font-bold">Authentication</span>
          </nav>

          {/* Doc Header */}
          <div className="border-b border-outline-variant pb-6 mb-8">
            <h1 className="font-h1 text-h1 text-on-surface mb-2">
              Synthetic Intelligence Index: Authentication Protocols
            </h1>
            <p className="text-on-surface-variant text-body-sm leading-relaxed max-w-2xl">
              Secure your integration with the Synthetic Intelligence Index (SII) using high-entropy bearer
              tokens and multi-layered validation layers. This guide outlines the mandatory cryptographic
              standards for all V2.4.0-stable endpoints.
            </p>
          </div>

          {/* Documentation Content */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section id="getting-started">
              <h2 className="font-h2 text-h2 text-primary mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Getting Started
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                All requests to the IntellectOS API must include an{' '}
                <code className="bg-surface-container px-1 py-0.5 rounded text-primary text-body-xs font-mono-data">
                  Authorization
                </code>{' '}
                header. The system uses a stateless JWT (JSON Web Token) architecture to maintain high
                throughput and low latency.
              </p>
              <div className="glass-panel rounded-xl overflow-hidden mb-4">
                <div className="bg-surface-container-high px-4 py-2 border-b border-outline-variant flex justify-between items-center">
                  <span className="font-mono-data text-body-xs text-on-surface-variant uppercase tracking-widest">
                    HTTP Header Example
                  </span>
                  <button className="text-primary hover:text-primary-fixed text-body-xs flex items-center gap-1">
                    <span className="material-symbols-outlined !text-sm">content_copy</span> Copy
                  </button>
                </div>
                <pre className="p-4 font-mono-data text-body-sm overflow-x-auto bg-surface/50">
                  <code>
                    <span className="text-primary font-semibold">GET</span> /v2/intelligence/core{' '}
                    <span className="text-primary font-semibold">HTTP/1.1</span>
                    {'\n'}
                    <span className="text-primary">Host:</span> api.intellectos.io
                    {'\n'}
                    <span className="text-primary">Authorization:</span> Bearer{' '}
                    <span className="text-secondary">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span>
                    {'\n'}
                    <span className="text-primary">Accept:</span> application/json
                  </code>
                </pre>
              </div>
            </section>

            {/* Section 2 */}
            <section id="token-lifecycle">
              <h2 className="font-h2 text-h2 text-primary mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Token Lifecycle &amp; Renewal
              </h2>
              <p className="text-on-surface-variant mb-6">
                Tokens generated via the{' '}
                <code className="bg-surface-container px-1 py-0.5 rounded text-primary text-body-xs font-mono-data">
                  /auth/provision
                </code>{' '}
                endpoint have a fixed TTL of 3600 seconds. Automatic rotation is recommended for long-running
                neural mapping tasks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container border border-outline-variant rounded-lg">
                  <h4 className="font-h2 text-body-sm font-bold text-on-surface mb-2">Short-Lived Keys</h4>
                  <p className="text-body-xs text-on-surface-variant">
                    Recommended for edge-computing and ephemeral stream analysis. Minimized blast radius in
                    case of compromise.
                  </p>
                </div>
                <div className="p-4 bg-surface-container border border-outline-variant rounded-lg">
                  <h4 className="font-h2 text-body-sm font-bold text-on-surface mb-2">Vault Integration</h4>
                  <p className="text-body-xs text-on-surface-variant">
                    Enterprise users should leverage the Security Module&apos;s vault to handle secure secret
                    injection.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="error-handling">
              <h2 className="font-h2 text-h2 text-primary mb-4">Error Handling</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant text-label-caps text-on-surface-variant">
                    <th className="py-3 font-medium">Status Code</th>
                    <th className="py-3 font-medium">Definition</th>
                    <th className="py-3 font-medium">Resolution</th>
                  </tr>
                </thead>
                <tbody className="text-body-xs">
                  {ERROR_CODES.map((err) => (
                    <tr
                      key={err.code}
                      className="border-b border-outline-variant/30 hover:bg-surface-variant/20 transition-colors"
                    >
                      <td className="py-3 font-mono-data text-error">{err.code}</td>
                      <td className="py-3">{err.definition}</td>
                      <td className="py-3">{err.resolution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Next Page CTA */}
            <div className="mt-12 p-8 border border-outline-variant rounded-xl flex items-center justify-between bg-surface-container-low group cursor-pointer hover:border-primary transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined !text-3xl">terminal</span>
                </div>
                <div>
                  <h3 className="font-h2 text-on-surface group-hover:text-primary transition-colors">
                    Next: Neural Mapping Integration
                  </h3>
                  <p className="text-on-surface-variant text-body-xs">
                    Learn how to connect your data streams to the mapping engine.
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Technical Graphic Placeholder */}
          <div className="mt-16 w-full h-48 bg-surface-container border border-outline-variant rounded-xl overflow-hidden relative group">
            <div
              className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  'radial-gradient(circle at 30% 40%, rgba(157,78,221,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(224,182,255,0.1) 0%, transparent 50%), linear-gradient(135deg, #231e26 0%, #16111a 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #4d4353 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              {/* Glowing nodes */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary/60 rounded-full shadow-[0_0_10px_rgba(224,182,255,0.6)]"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-secondary/60 rounded-full shadow-[0_0_8px_rgba(212,188,243,0.6)]"></div>
              <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-primary/40 rounded-full shadow-[0_0_10px_rgba(224,182,255,0.4)]"></div>
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#e0b6ff" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="66%" y2="66%" stroke="#d4bcf3" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="25%" x2="66%" y2="66%" stroke="#9d4edd" strokeWidth="0.5" strokeDasharray="2 4" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="font-label-caps text-label-caps text-primary bg-primary-container/20 px-2 py-1 rounded">
                Visual Overview
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Column: Contextual Sidebar */}
      <aside className="hidden xl:flex flex-col w-72 bg-surface-container-low border-l border-outline-variant px-stack-loose py-stack-loose overflow-y-auto custom-scrollbar">
        <div className="mb-stack-loose">
          <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-stack-mid">
            On This Page
          </h3>
          <nav className="flex flex-col gap-y-2 border-l border-outline-variant ml-1">
            {ON_THIS_PAGE.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-1 text-body-xs text-left transition-colors ${
                  activeSection === item.id
                    ? 'text-primary border-l-2 border-primary -ml-[2px] font-medium'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 bg-surface-container border border-outline-variant rounded-lg mb-stack-loose">
          <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-2">Metadata</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-body-xs">
              <span className="text-on-surface-variant/70">Last Updated</span>
              <span className="font-mono-data text-primary">2023.11.14</span>
            </div>
            <div className="flex justify-between items-center text-body-xs">
              <span className="text-on-surface-variant/70">Stable Version</span>
              <span className="font-mono-data text-on-surface">v2.4.0</span>
            </div>
            <div className="flex justify-between items-center text-body-xs">
              <span className="text-on-surface-variant/70">Author</span>
              <span className="font-mono-data text-on-surface">Core Team</span>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-x-2 py-2 bg-primary text-on-primary font-label-caps text-label-caps rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/10 active:scale-95 duration-150 ease-in-out">
          <span className="material-symbols-outlined !text-sm">bug_report</span>
          Report Issue
        </button>

        <div className="mt-auto pt-stack-loose">
          <div className="p-4 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest/50 text-center">
            <span className="material-symbols-outlined text-primary mb-2">bolt</span>
            <p className="text-body-xs text-on-surface-variant">
              Need help? Join our developer discord for real-time support.
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}
