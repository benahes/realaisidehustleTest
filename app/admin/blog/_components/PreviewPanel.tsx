'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { toast } from '@/components/admin/Toast'
import { markdownToHtml } from '@/lib/markdown'
import ArticleBody from '@/app/(main)/blog/[slug]/ArticleBody'

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

  const rTime = readTime(post.content || '')
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

      <main className="max-w-container-max mx-auto px-2 sm:px-3 pb-6 pt-4">
        <section className="flex-1 w-full max-w-3xl mx-auto lg:mx-0">
          <header className="mb-4 sm:mb-6">
            <h1 className="font-h1 text-[22px] sm:text-[32px] lg:text-[40px] leading-tight text-on-surface mb-3 sm:mb-6 tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-between border-y border-outline-variant/30 py-2 sm:py-4 flex-wrap gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-outline-variant bg-primary-container/30 flex items-center justify-center text-primary overflow-hidden">
                  {post.author?.avatarUrl ? (
                    <Image src={post.author.avatarUrl} alt={post.author.name || ''} width={40} height={40} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-[10px] sm:text-sm">{post.author?.name?.charAt(0).toUpperCase() || 'A'}</span>
                  )}
                </div>
                <div>
                  <p className="font-h2 text-[10px] sm:text-body-sm text-on-surface">{post.author?.name || post.author?.email || 'Admin'}</p>
                  <p className="text-[9px] sm:text-body-xs text-on-surface-variant">{timeAgo(post.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-stack-mid">
                <span className="text-[9px] sm:text-body-xs font-mono-data text-outline flex items-center gap-1 mr-2 sm:mr-4">
                  <span className="material-symbols-outlined text-[12px] sm:text-[14px]">schedule</span> {rTime} min read
                </span>
                <span className="text-[9px] sm:text-body-xs font-mono-data text-outline flex items-center gap-1 mr-2 sm:mr-4">
                  <span className="material-symbols-outlined text-[12px] sm:text-[14px]">visibility</span> Preview
                </span>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-outline-variant/30 mb-4 sm:mb-8 article-shadow">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority unoptimized />
            </div>
          )}

          <ArticleBody content={htmlContent} />

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-6 mt-4 sm:mt-8 border-t border-outline-variant/30">
              <span className="text-[10px] sm:text-body-xs text-outline font-mono-data uppercase">Tags:</span>
              {post.tags.map((tag: string) => (
                <span key={tag} className="bg-surface-container-high text-on-surface-variant border border-outline-variant/20 rounded-sm px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-body-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 sm:mt-16 flex items-stretch border border-outline-variant rounded-lg sm:rounded-xl overflow-hidden bg-surface-container-lowest">
            <div className="flex-1 p-3 sm:p-6 border-r border-outline-variant opacity-50">
              <p className="text-[9px] sm:text-[10px] font-label-caps text-outline uppercase mb-1 sm:mb-2">Previous Entry</p>
              <p className="font-h2 text-[10px] sm:text-body-sm text-on-surface">—</p>
            </div>
            <div className="flex-1 p-3 sm:p-6 opacity-50 text-right">
              <p className="text-[9px] sm:text-[10px] font-label-caps text-outline uppercase mb-1 sm:mb-2">Next Entry</p>
              <p className="font-h2 text-[10px] sm:text-body-sm text-on-surface">—</p>
            </div>
          </div>

          <section className="mt-8 sm:mt-16 pb-4 sm:pb-8">
            <div className="flex items-center justify-between mb-3 sm:mb-8">
              <h2 className="font-h1 text-[16px] sm:text-h1 text-on-surface">Discussion</h2>
              <button className="bg-primary text-on-primary px-2 sm:px-4 py-1 sm:py-1.5 font-label-caps rounded-full text-[10px] sm:text-[12px] flex items-center gap-1 sm:gap-2">
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">edit</span> Post Response
              </button>
            </div>
            <p className="text-[10px] sm:text-body-sm text-on-surface-variant">Comments are coming soon.</p>
          </section>

          <footer className="mt-8 sm:mt-12 glass-panel p-stack-loose rounded-xl flex items-center gap-x-stack-loose">
            <div className="w-16 h-16 rounded-xl bg-secondary-container border border-outline-variant flex items-center justify-center shrink-0">
              {post.author?.avatarUrl ? (
                <Image src={post.author.avatarUrl} alt={post.author.name || ''} width={64} height={64} className="w-full h-full object-cover" unoptimized />
              ) : (
                <span className="material-symbols-outlined text-on-secondary-container text-[32px]">person</span>
              )}
            </div>
            <div>
              <h4 className="font-h2 text-h2 text-on-surface">{post.author?.name || post.author?.email || 'Admin'}</h4>
              <p className="text-body-xs text-on-surface-variant">
                Content contributor at Real AI Side Hustle. Writing about AI, technology, and digital entrepreneurship.
              </p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}
