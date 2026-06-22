'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from '@/components/admin/Toast'
import { contentHubSections, getContentHubSection, type SectionKey } from '@/lib/navigation'

interface EditorPanelProps {
  activeSection: SectionKey
  editingPost: any | null
  onSaved: () => void
  onCancelEdit: () => void
  onAiGenerated?: (post: any) => void
}

export default function EditorPanel({ activeSection, editingPost, onSaved, onCancelEdit, onAiGenerated }: EditorPanelProps) {
  const [tab, setTab] = useState<'manual' | 'ai'>('manual')
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)

  // Manual editor state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [section, setSection] = useState<SectionKey>(activeSection)
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [monetization, setMonetization] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const contentRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // AI generator state
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiTone, setAiTone] = useState<'professional' | 'casual' | 'technical' | 'tutorial'>('professional')
  const [aiLength, setAiLength] = useState<'short' | 'medium' | 'long'>('medium')

  const charCount = content.length
  const readTime = Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))

  // Sync section when admin switches tabs
  useEffect(() => {
    if (!editingPost) {
      setSection(activeSection)
      const sec = getContentHubSection(activeSection)
      if (sec && !category) setCategory(sec.categories[0])
    }
  }, [activeSection, editingPost, category])

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '')
      setSlug(editingPost.slug || '')
      setExcerpt(editingPost.excerpt || '')
      setContent(editingPost.content || '')
      setSection((editingPost.section as SectionKey) || 'BLOG')
      setCategory(editingPost.category || '')
      setTags((editingPost.tags || []).join(', '))
      setCoverImage(editingPost.coverImage || '')
      setMonetization(false)
      setTab('manual')
    } else {
      setTitle('')
      setSlug('')
      setExcerpt('')
      setContent('')
      setSection(activeSection)
      const sec = getContentHubSection(activeSection)
      setCategory(sec?.categories[0] || '')
      setTags('')
      setCoverImage('')
      setMonetization(false)
    }
  }, [editingPost, activeSection])

  const generateSlug = (t: string) =>
    t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100)

  useEffect(() => {
    if (!editingPost && title && !slug) {
      setSlug(generateSlug(title))
    }
  }, [title, slug, editingPost])

  const handleSave = async (publish = false) => {
    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      toast('Please fill in all required fields', 'error')
      return
    }
    setSaving(true)
    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage: coverImage.trim() || undefined,
        section,
        category: category.trim() || 'General',
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        published: publish,
        aiGenerated: false,
      }

      const url = editingPost ? `/api/blog/${editingPost.slug}` : '/api/blog/'
      const method = editingPost ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!data.success) {
        const details = Array.isArray(data.details)
          ? `\n${data.details.join(', ')}`
          : data.details
            ? `\n${data.details}`
            : ''
        toast(`${data.error || 'Failed to save'}${details}`, 'error')
        return
      }
      toast(publish ? 'Published successfully!' : 'Draft saved!', 'success')
      onSaved()
      if (!editingPost) {
        setTitle('')
        setSlug('')
        setExcerpt('')
        setContent('')
        setTags('')
        setCoverImage('')
      }
    } catch (err: any) {
      toast(err.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload/image/', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.success) {
        toast(data.error || 'Upload failed', 'error')
        return
      }

      const imageUrl = data.data.url
      const altText = file.name.split('.')[0].replace(/[-_]/g, ' ')
      const markdownImage = `\n![${altText}](${imageUrl})\n`

      // Insert at cursor position or append to end
      const textarea = contentRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const before = content.slice(0, start)
        const after = content.slice(end)
        setContent(before + markdownImage + after)
        // Reset file input
        e.target.value = ''
        setTimeout(() => {
          const newCursor = start + markdownImage.length
          textarea.setSelectionRange(newCursor, newCursor)
          textarea.focus()
        }, 0)
      } else {
        setContent((prev) => prev + markdownImage)
      }
      toast('Image uploaded and inserted', 'success')
    } catch (err: any) {
      toast(err.message || 'Upload failed', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast('Enter a prompt first', 'error')
      return
    }
    setGenerating(true)
    try {
      const res = await fetch('/api/ai/generate-blog/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiPrompt,
          tone: aiTone,
          length: aiLength,
        }),
      })
      const data = await res.json()
      if (!data.success) {
        toast(data.error || 'AI generation failed', 'error')
        return
      }
      const blog = data.data.blog
      setTitle(blog.title)
      setSlug(blog.slug)
      setExcerpt(blog.excerpt)
      setContent(blog.content)
      setCategory(blog.category)
      setTags((blog.tags || []).join(', '))
      toast('AI content generated! Review and publish.', 'success')
      onAiGenerated?.(blog)
      setTab('manual')
    } catch (err: any) {
      toast(err.message || 'Generation failed', 'error')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="col-span-12 lg:col-span-8 glass-panel rounded-lg flex flex-col min-h-[420px]">
      <div className="flex border-b border-outline-variant">
        <button
          onClick={() => setTab('manual')}
          className={`flex-1 py-3 font-label-caps transition-all ${
            tab === 'manual'
              ? 'text-primary border-b-2 border-primary bg-primary-container/10'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          MANUAL_EDITOR.MD
        </button>
        <button
          onClick={() => setTab('ai')}
          className={`flex-1 py-3 font-label-caps transition-all ${
            tab === 'ai'
              ? 'text-primary border-b-2 border-primary bg-primary-container/10'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          AI_GEMINI_GENERATOR
        </button>
      </div>

      <div className="flex-1 p-stack-loose relative flex flex-col">
        {tab === 'manual' ? (
          <div className="flex-1 flex flex-col gap-5">
            {editingPost && (
              <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span className="font-medium">Editing mode active: <span className="text-white">{editingPost.title}</span></span>
                <button onClick={onCancelEdit} className="ml-auto text-primary hover:text-white text-xs underline font-medium">
                  Exit Editing
                </button>
              </div>
            )}

            {/* Basic Info */}
            <div className="space-y-3">
              <input
                className="w-full bg-transparent border-none text-2xl sm:text-3xl font-bold text-on-surface focus:ring-0 placeholder:text-outline-variant outline-none px-0"
                placeholder="Enter Post Title..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Post Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-surface-container/50 border border-outline-variant/30 rounded-lg">
              <div className="space-y-1">
                <label className="text-[10px] font-label-caps uppercase text-outline">URL Slug</label>
                <input
                  className="w-full bg-surface-container border border-outline-variant/50 rounded px-2.5 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g. entropic-systems"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-label-caps uppercase text-outline">Cover Image URL</label>
                <input
                  className="w-full bg-surface-container border border-outline-variant/50 rounded px-2.5 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"
                  placeholder="https://... (Optional)"
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-label-caps uppercase text-outline">Section & Category</label>
                <div className="flex gap-2">
                  <select
                    className="flex-1 bg-surface-container border border-outline-variant/50 rounded px-2.5 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none transition-colors cursor-pointer"
                    value={section}
                    onChange={(e) => {
                      const newSection = e.target.value as SectionKey
                      setSection(newSection)
                      const sec = getContentHubSection(newSection)
                      if (sec) setCategory(sec.categories[0])
                    }}
                  >
                    {contentHubSections.map((sec) => (
                      <option key={sec.key} value={sec.key}>{sec.label}</option>
                    ))}
                  </select>
                  <select
                    className="flex-1 bg-surface-container border border-outline-variant/50 rounded px-2.5 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none transition-colors cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {getContentHubSection(section)?.categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-label-caps uppercase text-outline">Tags (Comma Separated)</label>
                <input
                  className="w-full bg-surface-container border border-outline-variant/50 rounded px-2.5 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"
                  placeholder="AI, Tech, Updates"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1">
              <label className="text-[10px] font-label-caps uppercase text-outline pl-1">Excerpt / Summary</label>
              <textarea
                className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none resize-none transition-colors"
                rows={2}
                placeholder="A short, catchy summary for the blog feed..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col border border-outline-variant/50 rounded-lg overflow-hidden bg-surface-container/30">
              <div className="flex items-center gap-2 border-b border-outline-variant/50 bg-surface-container-high/50 p-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-on-surface bg-surface-container border border-outline-variant/50 hover:border-primary hover:text-primary rounded shadow-sm transition-all disabled:opacity-50"
                  title="Upload image to content"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {uploadingImage ? 'sync' : 'add_photo_alternate'}
                  </span>
                  {uploadingImage ? 'Uploading...' : 'Insert Image'}
                </button>
                <span className="text-[10px] text-outline ml-auto pr-2 font-mono-data uppercase">Markdown Supported</span>
              </div>
              
              <textarea
                ref={contentRef}
                className="w-full flex-1 min-h-[350px] bg-transparent border-none text-[14px] leading-relaxed font-mono-data text-on-surface-variant focus:ring-0 resize-y custom-scrollbar outline-none p-4"
                placeholder="Write your amazing content here... (Supports Markdown)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center gap-6 px-12">
            <div className="text-center">
              <span className="material-symbols-outlined text-primary text-[48px] animate-pulse">auto_awesome</span>
              <h3 className="font-h2 text-on-surface mt-2">Gemini Engine</h3>
              <p className="text-body-xs text-on-surface-variant">Describe the subject, tone, and target complexity.</p>
            </div>
            <div className="w-full relative">
              <input
                className="w-full bg-surface-container-high border-b border-primary p-4 text-body-sm focus:outline-none placeholder:text-outline"
                placeholder="Prompt: Write a deep technical analysis of Llama-4 quantization..."
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-container text-on-primary-container p-2 rounded hover:opacity-80 transition-all disabled:opacity-50"
              >
                {generating ? (
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined">bolt</span>
                )}
              </button>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              {(['professional', 'casual', 'technical', 'tutorial'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setAiTone(t)}
                  className={`px-2 py-1 font-label-caps rounded transition-all ${
                    aiTone === t
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              {(['short', 'medium', 'long'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setAiLength(l)}
                  className={`px-2 py-1 font-label-caps rounded transition-all ${
                    aiLength === l
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-1 border-t border-outline-variant bg-surface-container-low/50 flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono-data text-outline">CHARS: {charCount.toLocaleString()}</span>
          <span className="text-[10px] font-mono-data text-outline">READ_TIME: {readTime}M</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-label-caps text-on-surface-variant">MONETIZATION</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                checked={monetization}
                onChange={(e) => setMonetization(e.target.checked)}
              />
              <div className="w-7 h-4 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-x-2 px-stack-loose h-8 bg-surface-variant hover:bg-surface-container-high text-on-surface rounded-lg transition-all border border-outline-variant disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span className="font-label-caps text-label-caps uppercase">
              {editingPost ? 'Update Draft' : 'Save Draft'}
            </span>
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-x-2 px-stack-loose h-8 bg-primary text-on-primary rounded-lg transition-all hover:brightness-110 shadow-[0_0_15px_-3px_rgba(157,78,221,0.4)] disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              publish
            </span>
            <span className="font-label-caps text-label-caps uppercase">
              {editingPost ? 'Update & Publish' : 'Publish Now'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
