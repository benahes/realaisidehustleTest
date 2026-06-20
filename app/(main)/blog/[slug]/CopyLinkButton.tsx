"use client";

export default function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => navigator.clipboard?.writeText(url)}
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-colors"
      aria-label="Copy link"
      title="Copy link"
    >
      <span className="material-symbols-outlined text-on-surface-variant text-[16px] sm:text-[18px]">link</span>
    </button>
  );
}
