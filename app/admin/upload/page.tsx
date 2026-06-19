'use client'

import { useState, useEffect, useRef } from 'react'

const TABS = [
  'STORAGE OVERVIEW',
  'CLOUDFLARE STREAM',
  'R2 BUCKETS',
  'SSL & FIREWALL',
  'AUDIT TRAIL',
]

interface VideoRow {
  name: string
  id: string
  status: 'uploading' | 'ready'
  progress: number
  duration: string
}

const INITIAL_VIDEOS: VideoRow[] = [
  { name: 'advanced_neural_networks_01.mp4', id: 'cf_821a_92bb1', status: 'uploading', progress: 78, duration: '42:15' },
  { name: 'quantum_computing_intro.mov', id: 'cf_772c_12aa9', status: 'ready', progress: 100, duration: '18:04' },
  { name: 'system_architecture_deep_dive.mp4', id: 'cf_9901_31cc2', status: 'ready', progress: 100, duration: '115:30' },
]

const TERMINAL_LOGS = [
  '[OK] SSL Certificates Validated (Exp: 2025-12-01)',
  '[OK] WAF Rulesets: Managed Ruleset Active',
  '[INFO] Global Firewall rules initialized...',
  '[WARN] Rate limiting threshold reached on Endpoint /v1/auth',
  '[OK] Strong Security Protocol: TLS 1.3 Mandatory',
  '[INFO] Geo-blocking active for: RU, CN, KP',
]

const LIVE_LOGS = [
  '[INFO] Checking cache purge status...',
  '[OK] Cache purge successful (32 nodes)',
  '[WARN] Latency spike detected in US-EAST-1',
  '[INFO] Syncing R2 metadata with edge locations...',
  '[OK] Protocol TLS 1.3 handshake successful',
]

export default function AdminUploadPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [videos, setVideos] = useState<VideoRow[]>(INITIAL_VIDEOS)
  const [terminalLines, setTerminalLines] = useState<string[]>(TERMINAL_LOGS)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setVideos((prev) =>
        prev.map((v) => {
          if (v.status === 'uploading' && v.progress < 100) {
            const next = Math.min(v.progress + Math.floor(Math.random() * 4) + 1, 100)
            return { ...v, progress: next, status: next >= 100 ? 'ready' : 'uploading' }
          }
          return v
        })
      )
    }, 3000)
    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    const logInterval = setInterval(() => {
      const newLog = LIVE_LOGS[Math.floor(Math.random() * LIVE_LOGS.length)]
      setTerminalLines((prev) => {
        const next = [...prev, newLog]
        if (next.length > 12) next.shift()
        return next
      })
    }, 5000)
    return () => clearInterval(logInterval)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  const logColor = (line: string) => {
    if (line.startsWith('[WARN]')) return 'text-tertiary'
    if (line.startsWith('[OK]')) return 'text-on-surface'
    if (line.startsWith('[INFO]')) return 'text-on-surface-variant'
    if (line.startsWith('[ERROR]')) return 'text-error'
    return 'text-on-surface-variant'
  }

  return (
    <div className="space-y-gutter">
      {/* Sticky Tab Nav */}
      <div className="sticky top-14 z-40 py-stack-mid bg-background/95 backdrop-blur-sm flex items-center gap-stack-mid overflow-x-auto no-scrollbar">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-1.5 rounded-full font-label-caps text-label-caps whitespace-nowrap transition-colors ${
              i === activeTab
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-secondary text-on-secondary hover:opacity-90'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-gutter items-start">
        {/* Cloudflare Stream Manager */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container-low border border-outline-variant rounded shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <h2 className="font-h2 text-h2 uppercase tracking-wider">Cloudflare Stream Manager</h2>
            </div>
            <button className="bg-primary text-on-primary font-label-caps text-label-caps px-4 py-1.5 rounded hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">cloud_upload</span>
              UPLOAD NEW VIDEO
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest text-on-surface-variant font-label-caps text-[10px] uppercase border-b border-outline-variant">
                  <th className="px-4 py-3">Video Source</th>
                  <th className="px-4 py-3">Status / Progress</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3 text-right">HLS Generation</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video, i) => (
                  <tr
                    key={video.id}
                    className="zebra-row border-b border-outline-variant/30 hover:border-l-2 hover:border-l-primary transition-all"
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-mono-data text-on-surface">{video.name}</span>
                        <span className="text-body-xs text-on-surface-variant">ID: {video.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {video.status === 'uploading' ? (
                        <div className="flex flex-col gap-1 w-32">
                          <div className="flex justify-between font-mono-data text-[10px] text-primary">
                            <span>Uploading</span>
                            <span>{video.progress}%</span>
                          </div>
                          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full transition-all duration-500"
                              style={{ width: `${video.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-tertiary">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span className="font-mono-data text-[10px] uppercase">Ready</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono-data text-body-sm">{video.duration}</td>
                    <td className="px-4 py-3 text-right">
                      {video.status === 'ready' && i === 1 ? (
                        <button className="font-label-caps text-label-caps bg-primary-container text-on-primary-container px-3 py-1 rounded">
                          GENERATE HLS
                        </button>
                      ) : (
                        <button className="font-label-caps text-label-caps border border-outline-variant px-3 py-1 rounded hover:bg-surface-variant">
                          GET LINK
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SecOps Terminal */}
        <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded shadow-sm flex flex-col overflow-hidden relative min-h-[400px]">
          <div className="scanline"></div>
          <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">terminal</span>
              <h2 className="font-h2 text-h2 uppercase tracking-wider">SecOps Terminal</h2>
            </div>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-error/40"></span>
              <span className="w-2 h-2 rounded-full bg-tertiary/40"></span>
              <span className="w-2 h-2 rounded-full bg-primary/40"></span>
            </div>
          </div>
          <div
            ref={terminalRef}
            className="p-4 bg-black/40 font-mono-data text-[11px] leading-relaxed text-on-surface-variant flex-1 overflow-y-auto custom-scrollbar"
          >
            <div className="text-primary mb-2">admin@sys-idx:~$ ./init_security_audit --strong</div>
            {terminalLines.map((line, i) => (
              <div key={i} className={logColor(line)}>
                {line}
              </div>
            ))}
            <div className="text-primary animate-pulse mt-2">_</div>
          </div>
          <div className="p-2 border-t border-outline-variant bg-surface-container-low grid grid-cols-2 gap-1">
            <button className="font-label-caps text-[9px] bg-error-container text-on-error-container py-1 rounded hover:brightness-110">
              PANIC LOCKDOWN
            </button>
            <button className="font-label-caps text-[9px] bg-secondary-container text-on-secondary-container py-1 rounded hover:brightness-110">
              CLEAR CACHE
            </button>
          </div>
        </section>

        {/* Cloudflare R2 Explorer */}
        <section className="col-span-12 lg:col-span-7 bg-surface-container-low border border-outline-variant rounded shadow-sm">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">database</span>
              <h2 className="font-h2 text-h2 uppercase tracking-wider">Cloudflare R2 Explorer</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-surface-container-lowest border border-outline-variant flex rounded px-2 py-0.5 items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">folder</span>
                <span className="font-mono-data text-[11px]">root/assets/media/</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            <div className="aspect-square bg-surface-container-lowest border border-outline-variant rounded p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">folder_zip</span>
              <span className="font-mono-data text-[11px] text-center truncate w-full">Backup_2023.zip</span>
            </div>
            <div className="aspect-square bg-surface-container-lowest border border-outline-variant rounded p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-secondary text-3xl">picture_as_pdf</span>
              <span className="font-mono-data text-[11px] text-center truncate w-full">syllabus_q4.pdf</span>
            </div>
            <div className="aspect-square relative rounded overflow-hidden border border-outline-variant group cursor-pointer">
              <img
                className="w-full h-full object-cover"
                alt="Server hardware"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUf8qnnnwJ1Z0gkk1kg_NOYheQyty225YUMUA9MPm07mwP2sCLNI9KdpzB4GjvMXDIlMvyEPjYSFWVs2HaTHR_ctV0AUqw_4z7pdM3lU-ILa5eq0NAvtXp10evMDYnSFVaK8hehf38lJhG-o4D16N_Z5hnpkoQbM77Ob6lhNiWqU6UycOkoFNLAOlHmnCzmcpUCWnvfQ4IB64IfwD5FMRJvbVKlT5bcSgkUYPXUPszHdP48hQISNzHkA63iJbCcgLJQJ6dNN0613gn"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white">visibility</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-surface-container-lowest/80 backdrop-blur-sm px-1.5 py-0.5 border-t border-outline-variant">
                <p className="font-mono-data text-[10px] truncate text-on-surface">hero_v3.webp</p>
              </div>
            </div>
            <div className="aspect-square bg-surface-container-lowest border border-dashed border-outline rounded p-3 flex flex-col items-center justify-center gap-1 group cursor-pointer hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-outline-variant text-2xl">add</span>
              <span className="font-label-caps text-[9px] text-outline-variant uppercase">Drop File</span>
            </div>
          </div>
        </section>

        {/* System Audit Logs */}
        <section className="col-span-12 lg:col-span-5 bg-surface-container-low border border-outline-variant rounded shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              <h2 className="font-h2 text-h2 uppercase tracking-wider">System Audit Trail</h2>
            </div>
            <span className="font-label-caps text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded animate-pulse">REAL-TIME</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
            <div className="divide-y divide-outline-variant/30">
              <div className="px-4 py-3 flex gap-3 hover:bg-surface-variant/30 transition-colors">
                <span className="material-symbols-outlined text-[18px] text-tertiary">edit_note</span>
                <div className="flex-1 flex flex-col gap-0.5">
                  <p className="font-body-xs text-on-surface">
                    <span className="text-primary font-bold">admin_root</span> modified Firewall Rule <span className="font-mono-data">#922</span>
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant font-mono-data">IP: 192.168.1.45</span>
                    <span className="text-[10px] text-on-surface-variant">2 mins ago</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex gap-3 hover:bg-surface-variant/30 transition-colors">
                <span className="material-symbols-outlined text-[18px] text-primary">cloud_upload</span>
                <div className="flex-1 flex flex-col gap-0.5">
                  <p className="font-body-xs text-on-surface">
                    <span className="text-primary font-bold">instructor_01</span> uploaded <span className="font-mono-data">lesson_42_final.mp4</span>
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant font-mono-data">Size: 1.2GB</span>
                    <span className="text-[10px] text-on-surface-variant">14 mins ago</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex gap-3 hover:bg-surface-variant/30 transition-colors">
                <span className="material-symbols-outlined text-[18px] text-error">security</span>
                <div className="flex-1 flex flex-col gap-0.5">
                  <p className="font-body-xs text-on-surface">
                    <span className="text-error font-bold">Security Alert:</span> Multiple failed logins from <span className="font-mono-data">85.203.xx.xx</span>
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant font-mono-data">Origin: Frankfurt, DE</span>
                    <span className="text-[10px] text-on-surface-variant">42 mins ago</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex gap-3 hover:bg-surface-variant/30 transition-colors opacity-60">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">key</span>
                <div className="flex-1 flex flex-col gap-0.5">
                  <p className="font-body-xs text-on-surface">
                    <span className="text-primary font-bold">system</span> rotated SSL certificates
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant font-mono-data">Automatic Task</span>
                    <span className="text-[10px] text-on-surface-variant">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
