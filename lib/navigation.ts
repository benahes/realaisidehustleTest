/**
 * Section-specific sub-navigation menus for the RAISH platform.
 * Each section defines tabs that render inside the SubNav header.
 */

export interface SubNavTab {
  label: string;
  href: string;
  query?: Record<string, string>; // optional query params to append
}

export interface SubNavSection {
  basePath: string;
  tabs: SubNavTab[];
  resourceLabel?: string;
  resourceCount?: number | string;
}

export const subNavSections: SubNavSection[] = [
  {
    basePath: "/",
    tabs: [
      { label: "ALL POSTS", href: "/" },
      { label: "TRENDING", href: "/", query: { tab: "trending" } },
      { label: "FEATURED", href: "/", query: { tab: "featured" } },
      { label: "SIDE HUSTLES", href: "/", query: { tab: "side-hustles" } },
      { label: "TUTORIALS", href: "/", query: { tab: "tutorials" } },
      { label: "AI NEWS", href: "/", query: { tab: "ai-news" } },
      { label: "REVIEWS", href: "/", query: { tab: "reviews" } },
    ],
    resourceLabel: "POSTS",
    resourceCount: 128,
  },
  {
    basePath: "/ai-radar",
    tabs: [
      { label: "ALL SIGNALS", href: "/ai-radar" },
      { label: "BREAKING", href: "/ai-radar", query: { filter: "breaking" } },
      { label: "MODEL RELEASES", href: "/ai-radar", query: { filter: "model-release" } },
      { label: "FUNDING", href: "/ai-radar", query: { filter: "funding" } },
      { label: "RESEARCH", href: "/ai-radar", query: { filter: "research" } },
      { label: "PRODUCTS", href: "/ai-radar", query: { filter: "product" } },
      { label: "REGULATION", href: "/ai-radar", query: { filter: "regulation" } },
      { label: "HUSTLE PLAYS", href: "/ai-radar", query: { filter: "hustle-play" } },
    ],
    resourceLabel: "SIGNALS",
    resourceCount: 42,
  },
  {
    basePath: "/tools-db",
    tabs: [
      { label: "ALL TOOLS", href: "/tools-db" },
      { label: "WRITING & CHAT", href: "/tools-db", query: { category: "writing" } },
      { label: "CODING & DEV", href: "/tools-db", query: { category: "coding" } },
      { label: "VIDEO GEN", href: "/tools-db", query: { category: "video" } },
      { label: "IMAGE GEN", href: "/tools-db", query: { category: "image" } },
      { label: "AUDIO & VOICE", href: "/tools-db", query: { category: "audio" } },
      { label: "PRODUCTIVITY", href: "/tools-db", query: { category: "productivity" } },
    ],
    resourceLabel: "TOOLS",
    resourceCount: 64,
  },
  {
    basePath: "/playbooks",
    tabs: [
      { label: "ALL PLAYBOOKS", href: "/playbooks" },
      { label: "BEGINNER", href: "/playbooks", query: { level: "beginner" } },
      { label: "INTERMEDIATE", href: "/playbooks", query: { level: "intermediate" } },
      { label: "ADVANCED", href: "/playbooks", query: { level: "advanced" } },
      { label: "FREELANCING", href: "/playbooks", query: { category: "freelancing" } },
      { label: "CONTENT", href: "/playbooks", query: { category: "content-creation" } },
      { label: "AUTOMATION", href: "/playbooks", query: { category: "automation" } },
    ],
    resourceLabel: "PLAYBOOKS",
    resourceCount: 32,
  },
  {
    basePath: "/courses",
    tabs: [
      { label: "ALL COURSES", href: "/courses" },
      { label: "IN PROGRESS", href: "/courses", query: { status: "in-progress" } },
      { label: "COMPLETED", href: "/courses", query: { status: "completed" } },
      { label: "NOT STARTED", href: "/courses", query: { status: "not-started" } },
      { label: "CERTIFICATES", href: "/certificates" },
    ],
    resourceLabel: "COURSES",
    resourceCount: 14,
  },
];

/**
 * Find the matching sub-nav section for a given pathname.
 * Falls back to the Blog section if nothing matches.
 */
export function getSubNavSection(pathname: string): SubNavSection {
  // Sort by longest basePath first so nested routes match correctly
  const sorted = [...subNavSections].sort(
    (a, b) => b.basePath.length - a.basePath.length
  );

  const match = sorted.find((section) => {
    if (section.basePath === "/") {
      // Home page should only match exact "/" or "/blog/*" if it existed
      return pathname === "/";
    }
    return pathname.startsWith(section.basePath);
  });

  return match ?? subNavSections[0];
}

// ─── Admin Content Hub Section Definitions ─────────────────────────

export type SectionKey = "BLOG" | "AI_RADAR" | "TOOLS_DB" | "PLAYBOOKS" | "COURSES";

export interface ContentHubSection {
  key: SectionKey;
  label: string;
  icon: string;
  color: string;
  categories: string[];
}

export const contentHubSections: ContentHubSection[] = [
  {
    key: "BLOG",
    label: "Blog",
    icon: "article",
    color: "text-purple-400",
    categories: [
      "Trending",
      "Featured",
      "Side Hustles",
      "Tutorials",
      "AI News",
      "Reviews",
      "Opinion",
      "Case Study",
    ],
  },
  {
    key: "AI_RADAR",
    label: "AI Radar",
    icon: "radar",
    color: "text-cyan-400",
    categories: [
      "Breaking",
      "Model Release",
      "Funding",
      "Research",
      "Product",
      "Regulation",
      "Hustle Play",
    ],
  },
  {
    key: "TOOLS_DB",
    label: "Tools DB",
    icon: "build",
    color: "text-emerald-400",
    categories: [
      "Writing & Chat",
      "Coding & Dev",
      "Video Gen",
      "Image Gen",
      "Audio & Voice",
      "Productivity",
      "No-Code",
      "Data & Analytics",
    ],
  },
  {
    key: "PLAYBOOKS",
    label: "Playbooks",
    icon: "menu_book",
    color: "text-amber-400",
    categories: [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Freelancing",
      "Content Creation",
      "Automation",
      "SaaS",
      "Agency",
    ],
  },
  {
    key: "COURSES",
    label: "Courses",
    icon: "school",
    color: "text-rose-400",
    categories: [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert",
      "Research",
      "Certification",
    ],
  },
];

export function getContentHubSection(key: SectionKey): ContentHubSection | undefined {
  return contentHubSections.find((s) => s.key === key);
}
