'use client'

import { useState, useRef } from 'react'

type AssetType = 'COURSE' | 'TOOL'

export default function CreateAssetModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [type, setType] = useState<AssetType>('COURSE')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<Record<string, any>>({
    title: '',
    name: '',
    slug: '',
    description: '',
    price: 0,
    currency: 'NGN',
    category: '',
    thumbnail: '',
    pdfUrl: '',
    videoUrl: '',
    icon: '',
    externalUrl: '',
    priceType: 'FREE',
    isPublished: false,
  })

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingThumbnail(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload/image/', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.error || 'Upload failed')
        return
      }

      handleChange('thumbnail', data.data.url)
      e.target.value = ''
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploadingThumbnail(false)
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingPdf(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload/pdf/', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.error || 'PDF upload failed')
        return
      }

      handleChange('pdfUrl', data.data.url)
      e.target.value = ''
    } catch (err: any) {
      setError(err.message || 'PDF upload failed')
    } finally {
      setUploadingPdf(false)
    }
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload: any = {
      description: form.description,
      price: Number(form.price) || 0,
      isPublished: form.isPublished,
    }

    if (type === 'COURSE') {
      payload.title = form.title || form.name
      payload.slug = form.slug || generateSlug(form.title || form.name)
      payload.currency = form.currency || 'NGN'
      payload.thumbnail = form.thumbnail || ''
      payload.pdfUrl = form.pdfUrl || ''
      payload.videoUrl = form.videoUrl || ''
    } else {
      payload.name = form.name || form.title
      payload.slug = form.slug || generateSlug(form.name || form.title)
      payload.category = form.category || 'General'
      payload.icon = form.icon || ''
      payload.externalUrl = form.externalUrl || ''
      payload.priceType = form.priceType || 'FREE'
    }

    const endpoint = type === 'COURSE' ? '/api/courses' : '/api/tools'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Failed to create asset')
      } else {
        onCreated()
        onClose()
      }
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-surface-container border border-outline-variant/30 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-h2 text-base text-white uppercase tracking-wider">Create Asset</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && (
          <div className="bg-error-container/20 border border-error/30 text-error text-xs p-2 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType('COURSE')}
              className={`flex-1 py-2 rounded font-label-caps text-xs uppercase tracking-wider transition-all ${
                type === 'COURSE' ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface-variant'
              }`}
            >
              Course
            </button>
            <button
              type="button"
              onClick={() => setType('TOOL')}
              className={`flex-1 py-2 rounded font-label-caps text-xs uppercase tracking-wider transition-all ${
                type === 'TOOL' ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface-variant'
              }`}
            >
              Tool
            </button>
          </div>

          <div>
            <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">
              {type === 'COURSE' ? 'Title' : 'Name'}
            </label>
            <input
              value={type === 'COURSE' ? form.title : form.name}
              onChange={(e) => handleChange(type === 'COURSE' ? 'title' : 'name', e.target.value)}
              required
              className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
              placeholder={type === 'COURSE' ? 'Course title' : 'Tool name'}
            />
          </div>

          <div>
            <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
              placeholder="auto-generated if empty"
            />
          </div>

          <div>
            <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              rows={3}
              className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none"
              placeholder="Short description"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                min={0}
                className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
            {type === 'COURSE' ? (
              <div>
                <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Price Type</label>
                <select
                  value={form.priceType}
                  onChange={(e) => handleChange('priceType', e.target.value)}
                  className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="FREE">Free</option>
                  <option value="ONE_TIME">One-time</option>
                  <option value="SUBSCRIPTION">Subscription</option>
                </select>
              </div>
            )}
          </div>

          {type === 'TOOL' && (
            <div>
              <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Category</label>
              <input
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                placeholder="e.g. Productivity, Marketing"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {type === 'COURSE' && (
              <>
                <div>
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Thumbnail</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      ref={thumbnailInputRef}
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      disabled={uploadingThumbnail}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-on-surface bg-surface-variant/30 border border-outline-variant/30 hover:border-primary hover:text-primary rounded transition-all disabled:opacity-50 w-full justify-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {uploadingThumbnail ? 'sync' : 'wallpaper'}
                      </span>
                      {uploadingThumbnail ? 'Uploading...' : 'Upload Thumbnail'}
                    </button>
                    {form.thumbnail && (
                      <div className="flex items-center gap-2 shrink-0">
                        <img
                          src={form.thumbnail}
                          alt="Thumbnail preview"
                          className="w-10 h-10 object-cover rounded border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => handleChange('thumbnail', '')}
                          className="text-error hover:text-red-400 material-symbols-outlined text-[18px]"
                          title="Remove thumbnail"
                        >
                          cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Course PDF</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="application/pdf"
                      ref={pdfInputRef}
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => pdfInputRef.current?.click()}
                      disabled={uploadingPdf}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-on-surface bg-surface-variant/30 border border-outline-variant/30 hover:border-primary hover:text-primary rounded transition-all disabled:opacity-50 w-full justify-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {uploadingPdf ? 'sync' : 'upload_file'}
                      </span>
                      {uploadingPdf ? 'Uploading...' : 'Upload PDF'}
                    </button>
                    {form.pdfUrl && (
                      <div className="flex items-center gap-2 shrink-0 text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        <span className="hidden sm:inline">PDF Ready</span>
                        <button
                          type="button"
                          onClick={() => handleChange('pdfUrl', '')}
                          className="text-error hover:text-red-400 material-symbols-outlined text-[18px]"
                          title="Remove PDF"
                        >
                          cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {type === 'TOOL' && (
              <div className="sm:col-span-2">
                <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase tracking-wider mb-1">Icon</label>
                <input
                  value={form.icon}
                  onChange={(e) => handleChange('icon', e.target.value)}
                  className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="Material icon name"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              id="publish"
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => handleChange('isPublished', e.target.checked)}
              className="rounded border-outline-variant bg-surface-variant"
            />
            <label htmlFor="publish" className="text-xs text-on-surface-variant">Publish immediately</label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant text-xs text-on-surface-variant font-label-caps uppercase rounded hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-on-primary px-4 py-2 rounded text-xs font-label-caps uppercase hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
