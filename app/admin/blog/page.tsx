'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import ToastContainer from '@/components/admin/Toast'
import EditorPanel from './_components/EditorPanel'
import PostsTable from './_components/PostsTable'
import NewsletterSidebar from './_components/NewsletterSidebar'
import { contentHubSections, type SectionKey } from '@/lib/navigation'

const PreviewPanel = dynamic(() => import('./_components/PreviewPanel'), { ssr: false })

export default function BlogManagement() {
  const [activeSection, setActiveSection] = useState<SectionKey>('BLOG')
  const [posts, setPosts] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [previewPost, setPreviewPost] = useState<any | null>(null)
  const [editingPost, setEditingPost] = useState<any | null>(null)
  const [deploying, setDeploying] = useState(false)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', '10')
      params.set('section', activeSection)
      if (statusFilter) params.set('status', statusFilter)
      if (searchQuery) params.set('search', searchQuery)
      const res = await fetch(`/api/admin/blog?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setPosts(data.data.blogs)
        setTotal(data.data.total)
        setPage(data.data.page)
        setPages(data.data.pages)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, searchQuery, activeSection])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleDeployAll = async () => {
    const drafts = posts.filter((p) => !p.published)
    if (drafts.length === 0) return
    if (!confirm(`Publish all ${drafts.length} drafts?`)) return
    setDeploying(true)
    try {
      await Promise.all(
        drafts.map((p) =>
          fetch(`/api/admin/blog/${p.id}/publish`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ published: true }),
          })
        )
      )
      fetchPosts()
    } catch (err) {
      console.error(err)
    } finally {
      setDeploying(false)
    }
  }

  if (previewPost) {
    return (
      <>
        <PreviewPanel
          post={previewPost}
          onExit={() => setPreviewPost(null)}
          onEdit={() => {
            setEditingPost(previewPost)
            setPreviewPost(null)
          }}
          onRefresh={fetchPosts}
        />
        <ToastContainer />
      </>
    )
  }

  return (
    <div className="relative z-10 max-w-[1500px] mx-auto px-margin-edge pt-stack-loose pb-margin-edge">
      <header className="mb-stack-loose">
        <div className="flex items-baseline gap-x-gutter">
          <h1 className="font-display text-display text-on-surface leading-none tracking-tighter">
            CONTENT_HUB<span className="text-primary">.</span>
          </h1>
          <p className="font-mono-data text-mono-data text-outline-variant">v4.0.1</p>
        </div>

        {/* Section Tabs */}
        <div className="mt-stack-tight flex items-center gap-x-2 overflow-x-auto [scrollbar-width:none] pb-1">
          {contentHubSections.map((sec) => {
            const isActive = activeSection === sec.key
            return (
              <button
                key={sec.key}
                onClick={() => { setActiveSection(sec.key); setPage(1) }}
                className={`flex items-center gap-x-1.5 px-3 py-1.5 rounded-full text-xs font-label-caps uppercase whitespace-nowrap transition-all border ${isActive
                  ? 'bg-primary-container/20 text-primary border-primary/40'
                  : 'bg-surface-container-high text-on-surface-variant border-transparent hover:bg-surface-variant hover:text-on-surface'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">{sec.icon}</span>
                {sec.label}
              </button>
            )
          })}
        </div>

        <div className="mt-stack-tight flex items-center gap-x-stack-mid flex-wrap">
          <div className="flex items-center gap-x-1">
            <span className="w-1 h-1 rounded-full bg-primary"></span>
            <span className="font-label-caps text-label-caps uppercase text-primary">Active</span>
          </div>
          <span className="text-body-xs text-on-surface-variant">Section: {contentHubSections.find(s => s.key === activeSection)?.label}</span>
          <div className="ml-auto flex items-center gap-x-stack-mid">
            <span className="font-mono-data text-mono-data text-on-surface-variant">{total.toLocaleString()} ITEMS</span>
            <button
              onClick={handleDeployAll}
              disabled={deploying}
              className="flex items-center gap-x-2 px-stack-loose h-8 bg-primary text-on-primary rounded-lg transition-all hover:brightness-110 shadow-[0_0_15px_-3px_rgba(157,78,221,0.4)] disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
              <span className="font-label-caps text-label-caps uppercase">
                {deploying ? 'Deploying...' : 'Deploy All'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-gutter mb-gutter">
        <EditorPanel
          activeSection={activeSection}
          editingPost={editingPost}
          onSaved={() => {
            setEditingPost(null)
            fetchPosts()
          }}
          onCancelEdit={() => setEditingPost(null)}
          onAiGenerated={(post) => setEditingPost(post)}
        />
        <NewsletterSidebar />
      </div>

      <PostsTable
        posts={posts}
        total={total}
        page={page}
        pages={pages}
        loading={loading}
        onPageChange={(p) => setPage(p)}
        onSearch={(q) => { setSearchQuery(q); setPage(1) }}
        onStatusFilter={(s) => { setStatusFilter(s); setPage(1) }}
        onPreview={(post) => setPreviewPost(post)}
        onEdit={(post) => setEditingPost(post)}
        onRefresh={fetchPosts}
      />

      <ToastContainer />
    </div>
  )
}
