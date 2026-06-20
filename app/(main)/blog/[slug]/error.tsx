'use client'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-5 pt-[84px] sm:pt-[90px]">
      <div className="bg-error/10 border border-error/30 rounded-xl p-6 text-error">
        <h1 className="font-h1 text-xl mb-2">Failed to load post</h1>
        <p className="text-sm opacity-80 font-mono">{error?.message || 'Unknown error'}</p>
        {error?.digest && <p className="text-xs opacity-60 mt-2">Digest: {error.digest}</p>}
      </div>
    </main>
  )
}
