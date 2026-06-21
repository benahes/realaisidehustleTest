"use client";

import { useEffect, useRef } from "react";

export default function ArticleBody({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preBlocks = container.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      const parent = pre.parentElement;
      if (parent?.classList.contains("code-block")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "code-block group relative my-4";
      parent?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const copyBtn = document.createElement("button");
      copyBtn.className =
        "absolute right-4 top-4 text-body-xs font-label-caps text-primary border border-primary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity";
      copyBtn.textContent = "COPY";
      copyBtn.onclick = () => {
        const text = pre.textContent || "";
        navigator.clipboard?.writeText(text);
        copyBtn.textContent = "COPIED";
        setTimeout(() => (copyBtn.textContent = "COPY"), 1500);
      };
      wrapper.appendChild(copyBtn);
    });

    // Style lists and blockquotes
    container.querySelectorAll("blockquote").forEach((q) => {
      q.className = "bg-surface-container-low border-l-4 border-primary p-6 italic rounded-r-lg my-6";
    });
    container.querySelectorAll("ul").forEach((ul) => {
      if (!ul.classList.contains("list-none")) {
        ul.className = "list-disc pl-6 space-y-2 border-l-2 border-outline-variant ml-2 py-2 my-4";
      }
    });
    container.querySelectorAll("ol").forEach((ol) => {
      ol.className = "list-decimal pl-6 space-y-2 ml-2 py-2 my-4";
    });
    container.querySelectorAll("h2").forEach((h2) => {
      h2.className = "font-h2 text-h1 text-primary pt-4 flex items-center gap-2";
    });
    container.querySelectorAll("h3").forEach((h3) => {
      h3.className = "font-h2 text-h2 text-on-surface pt-4";
    });
    container.querySelectorAll("p").forEach((p) => {
      if (!p.className) p.className = "my-4";
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="article-content font-body-sm text-on-surface-variant leading-relaxed space-y-6"
      dangerouslySetInnerHTML={{ __html: content || "" }}
    />
  );
}
