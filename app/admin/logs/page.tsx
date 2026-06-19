'use client'

import { useState, useEffect, useRef } from 'react'

interface LogEntry {
  id: string
  time: string
  level: 'INFO' | 'WARN' | 'ERROR'
  source: string
  message: string
  pid: number
}

const LEVEL_STYLES = {
  INFO: 'bg-tertiary/20 text-tertiary',
  WARN: 'bg-on-surface-variant/20 text-on-surface-variant',
  ERROR: 'bg-error/20 text-error',
}

const STATIC_LOGS: LogEntry[] = [
  {
    id: 'static-1',
    time: '2023-11-20 14:02:44.112',
    level: 'INFO',
    source: 'core_engine.v4',
    message: 'Successfully initialized neural weighting for node cluster [X-99]',
    pid: 4402,
  },
  {
    id: 'static-2',
    time: '2023-11-20 14:02:44.381',
    level: 'ERROR',
    source: 'db_gateway',
    message: "Query timeout after 2500ms on shard 'us-east-4' - Retrying...",
    pid: 1922,
  },
  {
    id: 'static-3',
    time: '2023-11-20 14:02:44.901',
    level: 'WARN',
    source: 'auth_service',
    message: 'High latency detected on LDAP connection pool (98ms)',
    pid: 3310,
  },
  {
    id: 'static-4',
    time: '2023-11-20 14:02:45.012',
    level: 'INFO',
    source: 'system_monitor',
    message: 'Heartbeat received from 24 active edge agents',
    pid: 841,
  },
]

const SOURCES = ['core_engine.v4', 'db_gateway', 'auth_service', 'load_balancer', 'cache_layer', 'io_handler']
const MESSAGES = [
  'Handshake verified with remote cluster peer',
  'Garbage collection cycle completed (14ms)',
  'Worker thread pool resized to 64 units',
  'Resource threshold warning on memory bank 4',
  'Encrypted tunnel re-established successfully',
  'Incoming request throttled by rate-limiting policy',
  'Index optimization task scheduled for 04:00UTC',
]

function generateLogEntry(): LogEntry {
  const now = new Date()
  const time = now.toISOString().replace('T', ' ').substring(0, 23)
  const levels: Array<'INFO' | 'WARN' | 'ERROR'> = ['INFO', 'WARN', 'ERROR']
  const level = levels[Math.floor(Math.random() * levels.length)]
  const source = SOURCES[Math.floor(Math.random() * SOURCES.length)]
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
  const pid = Math.floor(1000 + Math.random() * 9000)
  return { id: `dyn-${now.getTime()}`, time, level, source, message, pid }
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>(STATIC_LOGS)
  const [isLive, setIsLive] = useState(false)
  const [activeTab, setActiveTab] = useState('All Streams')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, generateLogEntry()]
        return next.slice(-50)
      })
    }, 800)
    return () => clearInterval(interval)
  }, [isLive])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  const filteredLogs =
    activeTab === 'All Streams'
      ? logs
      : logs.filter((l) => {
          if (activeTab === 'Core Engine') return l.source === 'core_engine.v4'
          if (activeTab === 'Database') return l.source === 'db_gateway'
          if (activeTab === 'Auth API') return l.source === 'auth_service'
          return true
        })

  const tabs = ['All Streams', 'Core Engine', 'Database', 'Auth API']

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col -mx-margin-edge -mt-margin-edge p-margin-edge">
      {/* Content Header / Sticky Tab Nav */}
      <div className="flex items-center justify-between glass-panel border-t-0 border-x-0 p-margin-edge mb-gutter">
        <div className="flex items-center gap-stack-loose">
          <div className="flex items-center gap-stack-tight">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-primary live-dot' : 'bg-on-surface-variant'}`}></span>
            <h2 className="font-h2 text-h2 text-on-surface">Infrastructure Logs</h2>
          </div>
          <nav className="flex gap-stack-tight ml-stack-loose">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-label-caps text-label-caps px-stack-mid py-unit rounded-full transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex gap-stack-mid">
          <button
            onClick={() => setIsLive(!isLive)}
            className="h-[28px] border border-outline-variant bg-surface-container-low text-on-surface font-label-caps text-label-caps px-stack-loose rounded hover:bg-surface-container-high flex items-center gap-unit"
          >
            <span className="material-symbols-outlined text-[14px]">{isLive ? 'pause' : 'play_arrow'}</span>
            {isLive ? 'LIVE' : 'RESUME'}
          </button>
          <button className="h-[28px] bg-primary-container text-on-primary-container font-label-caps text-label-caps px-stack-loose rounded hover:opacity-90 transition-opacity flex items-center gap-unit">
            <span className="material-symbols-outlined text-[14px]">file_download</span>
            EXPORT
          </button>
        </div>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-12 gap-gutter mb-gutter">
        <div className="col-span-3 glass-panel p-stack-loose flex flex-col gap-unit">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Events / Min</span>
          <div className="flex items-baseline gap-unit">
            <span className="font-h1 text-h1 text-primary">12,482</span>
            <span className="font-mono-data text-body-xs text-tertiary">+4.2%</span>
          </div>
        </div>
        <div className="col-span-3 glass-panel p-stack-loose flex flex-col gap-unit">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Error Rate</span>
          <div className="flex items-baseline gap-unit">
            <span className="font-h1 text-h1 text-error">0.02%</span>
            <span className="font-mono-data text-body-xs text-on-surface-variant">Stable</span>
          </div>
        </div>
        <div className="col-span-3 glass-panel p-stack-loose flex flex-col gap-unit">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Disk I/O</span>
          <div className="flex items-baseline gap-unit">
            <span className="font-h1 text-h1 text-on-surface">148 MB/s</span>
            <span className="font-mono-data text-body-xs text-on-surface-variant">Peak 210</span>
          </div>
        </div>
        <div className="col-span-3 glass-panel p-stack-loose flex flex-col gap-unit">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Uptime</span>
          <div className="flex items-baseline gap-unit">
            <span className="font-h1 text-h1 text-on-surface">99.998%</span>
            <span className="font-mono-data text-body-xs text-tertiary">32d 14h</span>
          </div>
        </div>
      </div>

      {/* Main Log Interface */}
      <div className="flex-grow glass-panel overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant bg-surface-container-high/50">
          <div className="col-span-2 p-stack-mid border-r border-outline-variant">Timestamp</div>
          <div className="col-span-1 p-stack-mid border-r border-outline-variant text-center">Level</div>
          <div className="col-span-2 p-stack-mid border-r border-outline-variant">Source</div>
          <div className="col-span-6 p-stack-mid border-r border-outline-variant">Event Message</div>
          <div className="col-span-1 p-stack-mid text-center">PID</div>
        </div>

        {/* Scrollable Log Content */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto font-mono-data text-mono-data scroll-hide">
          {filteredLogs.map((log) => (
            <div key={log.id} className="grid grid-cols-12 zebra-row border-l-2 border-transparent transition-all">
              <div className="col-span-2 p-stack-tight px-stack-mid text-on-surface-variant">{log.time}</div>
              <div className="col-span-1 p-stack-tight text-center">
                <span className={`${LEVEL_STYLES[log.level]} px-stack-tight rounded-sm text-[10px]`}>{log.level}</span>
              </div>
              <div className="col-span-2 p-stack-tight px-stack-mid text-primary">{log.source}</div>
              <div className="col-span-6 p-stack-tight px-stack-mid truncate">{log.message}</div>
              <div className="col-span-1 p-stack-tight text-center text-on-surface-variant">{log.pid}</div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="p-stack-mid bg-surface-container/50 border-t border-outline-variant flex justify-between items-center px-margin-edge">
          <span className="text-body-xs text-on-surface-variant">
            Showing last {filteredLogs.length} events · <span className="text-primary">{isLive ? 'Stream Active' : 'Paused'}</span>
          </span>
          <div className="flex items-center gap-stack-loose">
            <span className="text-body-xs text-on-surface-variant">
              Buffer: <strong className="text-on-surface">12%</strong>
            </span>
            <div className="flex gap-unit">
              <button className="w-6 h-6 flex items-center justify-center hover:bg-surface-variant rounded">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-surface-variant rounded">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
