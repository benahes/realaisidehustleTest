'use client'

import { useState } from 'react'
import { toast } from '@/components/admin/Toast'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  section: string
  category: string
  author: { name: string | null; email: string }
  published: boolean
  aiGenerated: boolean
  createdAt: string
}

interface PostsTableProps {
  posts: Post[]
  total: number
  page: number
  pages: number
  loading: boolean
  onPageChange: (p: number) => void
  onSearch: (q: string) => void
  onStatusFilter: (s: string) => void
  onPreview: (post: Post) => void
  onEdit: (post: Post) => void
  onRefresh: () => void
}

export default function PostsTable({
  posts,
  total,
  page,
  pages,
  loading,
  onPageChange,
  onSearch,
  onStatusFilter,
  onPreview,
  onEdit,
  onRefresh,
}: PostsTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [publishing, setPublishing] = useState<string | null>(null)

  const publishedCount = posts.filter((p) => p.published).length
  const draftCount = posts.filter((p) => !p.published).length

  const handleDelete = async (post: Post, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    setDeleting(post.id)
    try {
      const res = await fetch(`/api/blog/${post.slug}`, { method: 'DELETE' })
      const data = await res.json()
      if (!data.success) {
        toast(data.error || 'Delete failed', 'error')
        return
      }
      toast('Deleted successfully', 'success')
      onRefresh()
    } catch (err: any) {
      toast(err.message || 'Delete failed', 'error')
    } finally {
      setDeleting(null)
    }
  }

  const handleTogglePublish = async (post: Post, e: React.MouseEvent) => {
    e.stopPropagation()
    setPublishing(post.id)
    try {
      const res = await fetch(`/api/admin/blog/${post.id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      })
      const data = await res.json()
      if (!data.success) {
        toast(data.error || 'Update failed', 'error')
        return
      }
      toast(post.published ? 'Unpublished' : 'Published!', 'success')
      onRefresh()
    } catch (err: any) {
      toast(err.message || 'Update failed', 'error')
    } finally {
      setPublishing(null)
    }
  }

  return (
    <div className="bg-surface-container rounded-lg border border-outline-variant overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-high/50 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <h3 className="font-label-caps text-on-surface">CONTENT_MANAGEMENT</h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            className="bg-surface-container-low border border-outline-variant rounded px-3 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none w-48"
            placeholder="Search content..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); onSearch(e.target.value) }}
          />
          <select
            className="bg-surface-container-low border border-outline-variant rounded px-3 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); onStatusFilter(e.target.value) }}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <span className="text-body-xs text-on-surface-variant flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary"></span> {publishedCount} Published
          </span>
          <span className="text-body-xs text-on-surface-variant flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span> {draftCount} Drafts
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-4 py-3 font-label-caps text-outline text-[10px]">CONTENT TITLE</th>
              <th className="px-4 py-3 font-label-caps text-outline text-[10px]">SECTION</th>
              <th className="px-4 py-3 font-label-caps text-outline text-[10px]">CATEGORY</th>
              <th className="px-4 py-3 font-label-caps text-outline text-[10px]">AUTHOR</th>
              <th className="px-4 py-3 font-label-caps text-outline text-[10px]">STATUS</th>
              <th className="px-4 py-3 font-label-caps text-outline text-[10px]">DATE</th>
              <th className="px-4 py-3 font-label-caps text-outline text-[10px]">AI</th>
              <th className="px-4 py-3 font-label-caps text-outline text-[10px] text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-on-surface-variant text-sm">
                  Loading content...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-on-surface-variant text-sm">
                  No content found in this section. Create your first item above.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="zebra-row group transition-colors cursor-pointer hover:bg-surface-variant/30"
                  onClick={() => onPreview(post)}
                >
                  <td className="px-4 py-3">
                    <p className="text-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{post.title}</p>
                    <p className="text-[10px] text-on-surface-variant opacity-60">ID: {post.id.slice(0, 8)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-label-caps bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
                      {post.section}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-label-caps bg-primary-container/10 text-primary border border-primary/20">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
                      <span className="text-body-sm">{post.author.name || post.author.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-label-caps ${
                        post.published
                          ? 'bg-primary-container/20 text-primary'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {post.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono-data text-body-xs text-on-surface-variant">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    {post.aiGenerated ? (
                      <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                    ) : (
                      <span className="material-symbols-outlined text-outline-variant text-[18px]">person</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onPreview(post) }}
                        className="p-1 hover:text-primary transition-colors"
                        title="Preview"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onEdit(post) }}
                        className="p-1 hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={(e) => handleTogglePublish(post, e)}
                        disabled={publishing === post.id}
                        className="p-1 hover:text-primary transition-colors disabled:opacity-50"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {post.published ? 'unpublished' : 'publish'}
                        </span>
                      </button>
                      <button
                        onClick={(e) => handleDelete(post, e)}
                        disabled={deleting === post.id}
                        className="p-1 hover:text-error transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="p-3 bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center px-4">
          <span className="text-[10px] text-outline font-mono-data">
            SHOWING {posts.length} OF {total} RECORDS
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="w-6 h-6 flex items-center justify-center border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-6 h-6 flex items-center justify-center border transition-all ${
                  p === page
                    ? 'border-primary text-primary bg-primary-container/10'
                    : 'border-outline-variant text-outline hover:border-primary hover:text-primary'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= pages}
              className="w-6 h-6 flex items-center justify-center border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
