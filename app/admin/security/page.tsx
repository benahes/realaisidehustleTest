'use client'

import { useState, useEffect } from 'react'

interface ThreatItem {
  id: string
  icon: string
  iconColor: string
  title: string
  time: string
  detail: string
  badge: string
  badgeColor: string
}

const INITIAL_THREATS: ThreatItem[] = [
  {
    id: '1',
    icon: 'warning',
    iconColor: 'text-tertiary',
    title: 'SQL Injection Attempt',
    time: '12:44:01',
    detail: 'Origin: 192.168.1.104 (Russia)',
    badge: 'Blocked',
    badgeColor: 'bg-surface-variant text-on-surface',
  },
  {
    id: '2',
    icon: 'dangerous',
    iconColor: 'text-error',
    title: 'DDoS Pattern Detected',
    time: '12:42:58',
    detail: 'Volume: 15k req/s per node',
    badge: 'Mitigating',
    badgeColor: 'bg-error/20 text-error border border-error/30',
  },
  {
    id: '3',
    icon: 'info',
    iconColor: 'text-primary',
    title: 'SSH Login Success',
    time: '12:40:12',
    detail: 'User: admin_root (Trusted IP)',
    badge: 'Verified',
    badgeColor: 'bg-primary/20 text-primary border border-primary/30',
  },
  {
    id: '4',
    icon: 'lock_open',
    iconColor: 'text-on-surface-variant',
    title: 'WAF Rule Update',
    time: '12:35:50',
    detail: 'Updated Core Ruleset v4.2.1',
    badge: 'System',
    badgeColor: 'bg-surface-variant text-on-surface',
  },
]

const INITIAL_IPS = [
  { ip: '142.250.190.46', label: 'Corporate HQ Gateway' },
  { ip: '92.158.1.38', label: 'Admin Remote VPN' },
  { ip: '10.0.0.0/8', label: 'Internal VPC Subnet' },
]

export default function AdminSecurityPage() {
  const [lockdown, setLockdown] = useState(false)
  const [threats, setThreats] = useState<ThreatItem[]>(INITIAL_THREATS)
  const [botProtection, setBotProtection] = useState(true)
  const [rateLimiting, setRateLimiting] = useState(true)
  const [geoBlocking, setGeoBlocking] = useState(false)
  const [ips, setIps] = useState(INITIAL_IPS)
  const [newIp, setNewIp] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeString =
        now.getHours().toString().padStart(2, '0') +
        ':' +
        now.getMinutes().toString().padStart(2, '0') +
        ':' +
        now.getSeconds().toString().padStart(2, '0')
      setThreats((prev) =>
        prev.map((t, i) => (i === 0 && Math.random() > 0.5 ? { ...t, time: timeString } : t))
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleLockdown = () => {
    const confirmed = confirm(
      'WARNING: Panic Lockdown will immediately terminate all active sessions and block all non-whitelisted traffic. Proceed?'
    )
    if (confirmed) {
      setLockdown(true)
    }
  }

  const addIp = () => {
    if (newIp.trim()) {
      setIps((prev) => [...prev, { ip: newIp.trim(), label: 'Manual Entry' }])
      setNewIp('')
    }
  }

  const removeIp = (index: number) => {
    setIps((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={lockdown ? 'grayscale contrast-125' : ''}>
      {/* Panic Bar */}
      <div className="flex justify-between items-center mb-gutter bg-error-container/10 border border-error/30 p-stack-mid px-6 glass-panel">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-error animate-pulse">report</span>
          <div>
            <p className="font-label-caps text-error">CRITICAL SYSTEM OVERRIDE</p>
            <p className="font-body-xs text-on-error-container">
              Use &apos;Panic Lockdown&apos; only in the event of an active breach.
            </p>
          </div>
        </div>
        <button
          onClick={handleLockdown}
          className="h-[28px] px-6 bg-error text-on-error font-label-caps rounded-lg hover:bg-error/90 transition-all active:scale-95"
        >
          PANIC LOCKDOWN
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Security Perimeter Status */}
        <div className="col-span-12 lg:col-span-8 glass-panel p-6 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-h2 text-h2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Security Perimeter
              </h3>
              <p className="font-body-xs text-on-surface-variant">
                Global protection status and packet analysis
              </p>
            </div>
            <div className="flex gap-2">
              <div className="bg-surface-container-high px-3 py-1 rounded border border-outline-variant flex items-center gap-2">
                <span className="text-[8px] uppercase font-bold text-primary">Active</span>
                <span className="font-mono-data">99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Radar Visual */}
          <div className="h-48 w-full relative overflow-hidden bg-surface-container-lowest border border-outline-variant/30 rounded flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #4d4353 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            ></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-32 h-32 border-2 border-primary/20 rounded-full animate-ping"></div>
              <div className="absolute w-48 h-48 border border-primary/10 rounded-full animate-pulse"></div>
              <div className="flex flex-col items-center z-10">
                <span className="material-symbols-outlined text-primary text-5xl mb-2">shield_with_heart</span>
                <span className="font-mono-data text-xl text-primary">SECURE</span>
              </div>
              <div className="absolute top-10 left-1/4 flex items-center gap-2 font-mono-data text-body-xs text-on-surface-variant">
                <span className="w-2 h-2 bg-primary rounded-full"></span> Node_AMS-01
              </div>
              <div className="absolute bottom-12 right-1/3 flex items-center gap-2 font-mono-data text-body-xs text-on-surface-variant">
                <span className="w-2 h-2 bg-primary rounded-full"></span> Node_NYC-04
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-stack-mid">
            <div className="p-4 bg-surface-container-low border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1">INCOMING REQUESTS</p>
              <p className="font-mono-data text-2xl">
                42.8k<span className="text-xs text-on-surface-variant ml-1">/m</span>
              </p>
            </div>
            <div className="p-4 bg-surface-container-low border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1">BLOCKED THREATS</p>
              <p className="font-mono-data text-2xl text-tertiary">1,204</p>
            </div>
            <div className="p-4 bg-surface-container-low border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1">LATENCY</p>
              <p className="font-mono-data text-2xl text-primary">14ms</p>
            </div>
          </div>
        </div>

        {/* Threat Detection Feed */}
        <div className="col-span-12 lg:col-span-4 glass-panel flex flex-col h-[500px]">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="font-h2 text-h2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
              Threat Detection
            </h3>
            <p className="font-body-xs text-on-surface-variant">Real-time incident response log</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {threats.map((threat) => (
              <div key={threat.id} className="threat-row p-4 flex gap-4 transition-all">
                <span className={`material-symbols-outlined ${threat.iconColor} text-lg shrink-0`}>{threat.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono-data text-on-surface">{threat.title}</span>
                    <span className="font-body-xs text-on-surface-variant">{threat.time}</span>
                  </div>
                  <p className="font-body-xs text-on-surface-variant mb-2">{threat.detail}</p>
                  <span className={`${threat.badgeColor} text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider`}>
                    {threat.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-outline-variant bg-surface-container-low text-center">
            <button className="font-label-caps text-primary hover:underline">View All Incident Logs</button>
          </div>
        </div>

        {/* WAF Configuration & SSL/TLS Management */}
        <div className="col-span-12 lg:col-span-7 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-h2 text-h2">WAF &amp; SSL Management</h3>
            <div className="flex gap-2">
              <button className="h-[28px] px-3 bg-surface-variant text-on-surface font-label-caps rounded border border-outline-variant hover:bg-surface-container-high transition-colors">
                Export Config
              </button>
              <button className="h-[28px] px-3 bg-primary text-on-primary font-label-caps rounded hover:opacity-90 transition-colors">
                Apply Changes
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WAF Controls */}
            <div className="space-y-4">
              <p className="font-label-caps text-on-surface-variant border-b border-outline-variant/30 pb-2">
                Web Application Firewall
              </p>
              {[
                { label: 'Bot Protection', desc: 'JS Challenge enabled', state: botProtection, setState: setBotProtection },
                { label: 'Rate Limiting', desc: '100 req/s threshold', state: rateLimiting, setState: setRateLimiting },
                { label: 'Geo-Blocking', desc: '3 regions restricted', state: geoBlocking, setState: setGeoBlocking },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 bg-surface-container-low border border-outline-variant"
                >
                  <div>
                    <p className="font-body-sm font-semibold">{item.label}</p>
                    <p className="font-body-xs text-on-surface-variant">{item.desc}</p>
                  </div>
                  <div
                    className={`relative inline-block w-8 h-4 rounded-full cursor-pointer transition-colors ${
                      item.state ? 'bg-primary' : 'bg-surface-variant'
                    }`}
                    onClick={() => item.setState(!item.state)}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${
                        item.state ? 'right-0.5 bg-white' : 'left-0.5 bg-on-surface-variant'
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {/* SSL Controls */}
            <div className="space-y-4">
              <p className="font-label-caps text-on-surface-variant border-b border-outline-variant/30 pb-2">
                SSL/TLS Stack
              </p>
              <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded relative">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono-data text-primary">*.synthetic-index.io</p>
                  <span className="bg-primary/20 text-primary text-[9px] px-2 py-0.5 rounded border border-primary/30">
                    Active
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="font-body-xs flex justify-between">
                    <span>Provider:</span> <span className="text-on-surface">GlobalSign EV</span>
                  </p>
                  <p className="font-body-xs flex justify-between">
                    <span>Expires:</span> <span className="text-on-surface">284 days</span>
                  </p>
                  <p className="font-body-xs flex justify-between">
                    <span>Min TLS:</span> <span className="text-on-surface">1.3 (Forced)</span>
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="text-primary font-label-caps hover:underline">RENEW</button>
                  <button className="text-on-surface-variant font-label-caps hover:underline">DETAILS</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IP Whitelisting / Access Controls */}
        <div className="col-span-12 lg:col-span-5 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-h2 text-h2">Access Controls</h3>
            <button className="flex items-center gap-1 font-label-caps text-primary hover:underline">
              <span className="material-symbols-outlined text-[14px]">add</span> ADD IP
            </button>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {ips.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-outline-variant bg-surface-container-low"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">vpn_key</span>
                  <div>
                    <p className="font-mono-data">{item.ip}</p>
                    <p className="font-body-xs text-on-surface-variant">{item.label}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeIp(i)}
                  className="material-symbols-outlined text-on-surface-variant hover:text-error cursor-pointer transition-colors text-lg"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
          {/* Quick Add */}
          <div className="mt-6">
            <label className="font-label-caps text-on-surface-variant block mb-2">QUICK WHITELIST IP</label>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-mono-data text-body-sm transition-all"
                placeholder="0.0.0.0"
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addIp()}
              />
              <button
                onClick={addIp}
                className="bg-primary text-on-primary px-4 font-label-caps rounded"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
