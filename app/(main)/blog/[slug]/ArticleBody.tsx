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
      wrapper.className = "code-block group relative my-3 sm:my-4";
      parent?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const copyBtn = document.createElement("button");
      copyBtn.className =
        "absolute right-2 sm:right-4 top-2 sm:top-4 text-[9px] sm:text-body-xs font-label-caps text-primary border border-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity";
      copyBtn.textContent = "COPY";
      copyBtn.onclick = () => {
        const text = pre.textContent || "";
        navigator.clipboard?.writeText(text);
        copyBtn.textContent = "COPIED";
        setTimeout(() => (copyBtn.textContent = "COPY"), 1500);
      };
      wrapper.appendChild(copyBtn);
    });

    // Style images
    container.querySelectorAll("p").forEach((p) => {
      const children = Array.from(p.childNodes);
      const isOnlyImages = children.every(
        (node) =>
          (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === "img") ||
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() === "")
      );

      if (isOnlyImages) {
        const images = Array.from(p.querySelectorAll("img"));
        if (images.length === 0) return;

        p.className = `my-6 sm:my-8 w-full ${
          images.length > 1
            ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 place-items-center"
            : "flex flex-col items-center justify-center"
        }`;

        images.forEach((img) => {
          const figure = document.createElement("figure");
          figure.className = "flex flex-col items-center justify-center w-full group";

          const newImg = img.cloneNode(true) as HTMLImageElement;
          
          if (images.length > 1) {
            newImg.className = "w-full h-[25vh] sm:h-[40vh] object-cover rounded-lg sm:rounded-xl border border-outline-variant/30 article-shadow bg-surface-container-lowest/50";
          } else {
            newImg.className = "w-full h-[35vh] sm:h-[70vh] object-cover rounded-lg sm:rounded-xl border border-outline-variant/30 article-shadow bg-surface-container-lowest/50";
          }
          
          figure.appendChild(newImg);

          if (newImg.alt) {
            const caption = document.createElement("figcaption");
            caption.className = "mt-2 sm:mt-3 text-[10px] sm:text-[12px] text-outline font-mono-data text-center px-4 max-w-[80%]";
            caption.textContent = newImg.alt;
            figure.appendChild(caption);
          }

          img.parentNode?.replaceChild(figure, img);
        });
      }
    });

    // Fallback for standalone images not in a purely image <p>
    container.querySelectorAll("img").forEach((img) => {
      if (img.parentElement?.tagName.toLowerCase() !== "figure") {
        img.className = "w-full h-[35vh] sm:h-[70vh] rounded-lg sm:rounded-xl border border-outline-variant/30 my-4 sm:my-8 article-shadow object-cover bg-surface-container-lowest/50 block";
      }
    });

    // Style lists and blockquotes
    container.querySelectorAll("blockquote").forEach((q) => {
      q.className = "bg-surface-container-low border-l-4 border-primary p-3 sm:p-6 italic rounded-r-lg my-3 sm:my-6 text-on-surface";
    });
    container.querySelectorAll("ul").forEach((ul) => {
      if (!ul.classList.contains("list-none")) {
        ul.className = "list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 border-l-2 border-outline-variant ml-1 sm:ml-2 py-1 sm:py-2 my-3 sm:my-4 text-on-surface-variant";
      }
    });
    container.querySelectorAll("ol").forEach((ol) => {
      ol.className = "list-decimal pl-4 sm:pl-6 space-y-1 sm:space-y-2 ml-1 sm:ml-2 py-1 sm:py-2 my-3 sm:my-4 text-on-surface-variant";
    });
    container.querySelectorAll("h2").forEach((h2) => {
      h2.className = "font-h2 text-[16px] sm:text-h1 text-primary pt-2 sm:pt-4 flex items-center gap-2";
    });
    container.querySelectorAll("h3").forEach((h3) => {
      h3.className = "font-h2 text-[14px] sm:text-h2 text-on-surface pt-2 sm:pt-4";
    });
    container.querySelectorAll("a").forEach((a) => {
      a.className = "text-primary hover:underline";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
    container.querySelectorAll("p").forEach((p) => {
      if (!p.className) p.className = "my-3 sm:my-4";
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="article-content font-body-sm text-[12px] sm:text-body-sm text-on-surface-variant leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content || "" }}
    />
  );
}
