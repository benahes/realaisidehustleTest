'use client'

import { useState, useEffect } from 'react'
import { toast } from '@/components/admin/Toast'

interface PreviewPanelProps {
  post: any
  onExit: () => void
  onEdit: () => void
  onRefresh: () => void
}

function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gim, '<h3 class="font-h3 text-h3 text-on-surface mt-8 mb-4 border-l-4 border-primary pl-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="font-h2 text-h2 text-on-surface mt-8 mb-4 border-l-4 border-primary pl-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="font-h1 text-h1 text-on-surface mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-on-surface font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic text-on-surface-variant">$1</em>')
    .replace(/^> (.*$)/gim, '<blockquote class="bg-surface-container-low p-4 rounded-lg border-l-2 border-primary italic text-on-surface my-6">$1</blockquote>')
    .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-on-surface-variant py-1">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-on-surface-variant py-1">$1</li>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='max-w-full max-h-[70vh] w-auto h-auto mx-auto rounded-xl border border-outline-variant/30 my-8 article-shadow object-contain bg-surface-container-lowest/50 block' />")
    .replace(/```([\s\S]*?)```/gim, '<pre class="bg-surface-container-low p-4 rounded-lg border border-outline-variant overflow-x-auto my-6 font-mono-data text-sm text-primary"><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code class="bg-surface-container-low px-1.5 py-0.5 rounded text-primary font-mono-data text-sm">$1</code>')
    .replace(/\n/gim, '<br/>')
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
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const seoScore = Math.min(100, Math.max(60, 70 + (post.tags?.length || 0) * 5 + (post.coverImage ? 10 : 0)))

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

          <div
            className="flex flex-col gap-y-stack-loose text-on-surface-variant text-[16px] leading-[1.7] font-body-sm"
            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(post.content || '') }}
          />

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
