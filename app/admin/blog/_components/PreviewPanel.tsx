'use client'

import { useState, useEffect } from 'react'
import { toast } from '@/components/admin/Toast'
import { markdownToHtml } from '@/lib/markdown'
import PreviewArticleBody from '@/components/admin/PreviewArticleBody'

interface PreviewPanelProps {
  post: any
  onExit: () => void
  onEdit: () => void
  onRefresh: () => void
}

function timeAgo(dateStr: string | Date) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function readTime(content: string) {
  const words = content?.split(/\s+/).filter(Boolean).length || 0
  return Math.max(1, Math.ceil(words / 200))
}

export default function PreviewPanel({ post, onExit, onEdit, onRefresh }: PreviewPanelProps) {
  const [scrolled, setScrolled] = useState(false)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const wordCount = post.content?.split(/\s+/).filter(Boolean).length ?? 0
  const rTime = readTime(post.content || '')
  const seoScore = Math.min(100, Math.max(60, 70 + (post.tags?.length || 0) * 5 + (post.coverImage ? 10 : 0)))
  const htmlContent = markdownToHtml(post.content || '')

  const handlePublish = async () => {
    if (post.published) {
      onExit()
      return
    }
    setPublishing(true)
    try {
      const res = await fetch(`/api/admin/blog/${post.id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true }),
      })
      const data = await res.json()
      if (!data.success) {
        toast(data.error || 'Publish failed', 'error')
        return
      }
      toast('Published successfully!', 'success')
      onRefresh()
      onExit()
    } catch (err: any) {
      toast(err.message || 'Publish failed', 'error')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="relative -mx-margin-edge -mt-[66px] -mb-margin-edge min-h-[calc(100vh-3.5rem)]">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? '-translate-y-2' : 'translate-y-0'
        }`}
      >
        <div
          className={`glass-panel px-stack-loose h-14 flex items-center justify-between shadow-2xl mx-margin-edge mt-margin-edge ${
            scrolled ? 'rounded-none mx-0 mt-0' : 'rounded-xl'
          }`}
        >
          <div className="flex items-center gap-x-gutter">
            <button
              onClick={onExit}
              className="flex items-center gap-x-2 text-on-surface-variant hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              <span className="font-label-caps text-label-caps uppercase">Exit Preview</span>
            </button>
            <div className="w-px h-6 bg-outline-variant"></div>
            <div className="flex items-center gap-x-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_rgba(157,78,221,0.4)]"></span>
              <span className="font-label-caps text-label-caps uppercase text-tertiary">
                Live Status: {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-stack-mid">
            <button
              onClick={onEdit}
              className="flex items-center gap-x-2 px-stack-loose h-8 bg-surface-variant hover:bg-surface-container-high text-on-surface rounded-lg transition-all border border-outline-variant"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span className="font-label-caps text-label-caps uppercase">Edit Content</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-x-2 px-stack-loose h-8 bg-primary text-on-primary rounded-lg transition-all hover:brightness-110 shadow-[0_0_15px_-3px_rgba(157,78,221,0.4)] disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {post.published ? 'check_circle' : 'publish'}
              </span>
              <span className="font-label-caps text-label-caps uppercase">
                {post.published ? 'Live on Site' : 'Publish Now'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative min-h-screen pt-8 pb-24 px-margin-edge flex justify-center">
        <aside className="hidden xl:flex flex-col gap-y-stack-loose w-48 sticky top-24 self-start">
          <div className="glass-panel p-stack-loose rounded-xl border-l-2 border-l-primary">
            <h3 className="font-label-caps text-label-caps uppercase text-primary mb-stack-mid">Core Metrics</h3>
            <div className="space-y-stack-mid">
              <div className="flex justify-between items-center py-stack-tight border-b border-outline-variant/30">
                <span className="text-on-surface-variant text-body-xs">Read Time</span>
                <span className="font-mono-data text-mono-data text-on-surface">{readTime} MIN</span>
              </div>
              <div className="flex justify-between items-center py-stack-tight border-b border-outline-variant/30">
                <span className="text-on-surface-variant text-body-xs">Word Count</span>
                <span className="font-mono-data text-mono-data text-on-surface">{wordCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-stack-tight">
                <span className="text-on-surface-variant text-body-xs">SEO Score</span>
                <span className="font-mono-data text-mono-data text-tertiary">{seoScore}/100</span>
              </div>
            </div>
          </div>
          <div className="p-stack-loose">
            <h3 className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-stack-mid">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-surface-container text-body-xs rounded border border-outline-variant">{tag}</span>
              ))}
            </div>
          </div>
        </aside>

        <article className="w-full max-w-3xl flex flex-col gap-y-12 mx-gutter">
          <header className="flex flex-col gap-y-stack-loose">
            <div className="flex items-center gap-x-2 text-primary">
              <span className="font-label-caps text-label-caps uppercase tracking-widest">{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-outline"></span>
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="font-h1 text-[42px] leading-tight text-on-surface tracking-tighter">
              {post.title}
            </h1>
            <div className="flex items-center gap-x-stack-loose mt-stack-mid">
              <div className="flex items-center gap-x-2">
                <div className="w-6 h-6 rounded-full bg-secondary-container border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] text-on-secondary-container">person</span>
                </div>
                <span className="font-body-sm font-medium text-on-surface">
                  {post.author?.name || post.author?.email || 'Admin'}
                </span>
              </div>
              <div className="w-px h-4 bg-outline-variant"></div>
              <div className="flex items-center gap-x-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="text-body-xs">{rTime} min read</span>
              </div>
              <div className="w-px h-4 bg-outline-variant"></div>
              <div className="flex items-center gap-x-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span className="text-body-xs">Preview Mode</span>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative group aspect-video rounded-xl overflow-hidden border border-outline-variant shadow-2xl">
              <img
                alt="Cover"
                className="w-full h-full object-cover"
                src={post.coverImage}
              />
            </div>
          )}

          <PreviewArticleBody content={htmlContent} />

          <footer className="mt-12 glass-panel p-stack-loose rounded-xl flex items-center gap-x-stack-loose">
            <div className="w-16 h-16 rounded-xl bg-secondary-container border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container text-[32px]">person</span>
            </div>
            <div>
              <h4 className="font-h2 text-h2 text-on-surface">{post.author?.name || post.author?.email || 'Admin'}</h4>
              <p className="text-body-xs text-on-surface-variant">
                Content contributor at Real AI Side Hustle. Writing about AI, technology, and digital entrepreneurship.
              </p>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
