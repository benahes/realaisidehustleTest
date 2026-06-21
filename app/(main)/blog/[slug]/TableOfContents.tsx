"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const items: Heading[] = [];
    doc.querySelectorAll("h2, h3").forEach((el, i) => {
      const id = el.id || `heading-${i}`;
      el.id = id;
      items.push({ id, text: el.textContent || "", level: Number(el.tagName[1]) });
    });
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    if (typeof document === "undefined" || headings.length === 0) return;

    // assign ids to actual rendered headings
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) el.id = h.id;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target.id);
        if (visible.length > 0) setActiveId(visible[0]);
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-surface-container-low p-4 border border-outline-variant rounded-lg">
      <h3 className="text-[10px] font-label-caps text-outline uppercase tracking-widest mb-4">Contents</h3>
      <ul className="space-y-3 text-body-xs">
        {headings.map((h) => (
          <li key={h.id} className={`flex items-center gap-2 ${h.level === 3 ? "ml-3.5" : ""}`}>
            {h.level === 2 && (
              <div className={`w-1.5 h-1.5 rounded-full ${activeId === h.id ? "bg-primary" : "bg-outline-variant"}`} />
            )}
            <button
              onClick={(e) => handleClick(e, h.id)}
              className={`cursor-pointer text-left ${activeId === h.id ? "text-primary" : "text-on-surface-variant hover:text-on-surface transition-colors"}`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
