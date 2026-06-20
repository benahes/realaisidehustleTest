# RAISH Project Readiness Checklist
## Complete Audit — What's Done, What's Missing, What's Fake

> **Date:** 20 June 2026  
> **Status:** NOT READY for client handover  
> **Estimated work remaining:** 3–4 weeks with focused effort

---

## 🔴 CRITICAL — Must Fix Before Any Demo

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | **No blog post detail page exists** | Missing: `app/(main)/blog/[slug]/page.tsx` | Users can see post cards but **cannot click to read any article**. The entire blog is a shell without this. |
| 2 | **Admin dashboard crashes on real data** | `app/admin/dashboard/page.tsx:59` | `log.entity` is referenced but **does not exist in Prisma schema**. The moment a real audit log is written, the dashboard crashes with a runtime error. |
| 3 | **Footer newsletter form is decoration** | `components/Footer.tsx:29-43` | The email input + submit button have **no `onSubmit` handler** and are not wired to `/api/newsletter/subscribe`. Submissions go nowhere. |
| 4 | **All "Enroll" buttons are dead** | `app/(main)/_components/CoursesClient.tsx:117` | Every course card has an "Enroll" button that **does nothing**. No purchase flow, no checkout redirect, no Paystack integration on the frontend. |
| 5 | **Header "Blog (128)" is hardcoded** | `components/Header.tsx:90` | The post count is literally the string `"128"` in the code, not fetched from the API. |
| 6 | **Auth pages show wrong brand** | `app/(auth)/login/page.tsx:51` | Login/register pages display **"IntellectOS"** branding, not "AI Side Hustle". This is leftover from a template. |

---

## 🟠 MAJOR MISSING — Core Features Needed for MVP

### Content Consumption (Frontend)
| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 7 | **Blog post reading page** | ❌ MISSING | No `app/(main)/blog/[slug]/page.tsx`. Clicking any post card does nothing. |
| 8 | **Related posts** | ❌ MISSING | No "Related Articles" section at bottom of posts. |
| 9 | **Social sharing buttons** | ❌ MISSING | No Twitter/X, LinkedIn, WhatsApp share on posts. |
| 10 | **Post comment system** | ❌ MISSING | No comments, no disqus, no custom comment model. |
| 11 | **Post author page** | ❌ MISSING | No `/author/[id]` page to see all posts by an author. |
| 12 | **Category/tag archive pages** | ❌ MISSING | No `/category/[slug]` or `/tag/[slug]` filtered listing pages. |
| 13 | **Site search** | ❌ MISSING | Header search bar is decorative. No search API endpoint. |
| 14 | **E-book download** | ❌ MISSING | E-Books page shows covers but **no download button**, no PDF access. |
| 15 | **Playbook step viewer** | ❌ MISSING | Playbooks list but clicking "View Steps" does nothing. No step-by-step content display. |
| 16 | **Tool detail page** | ❌ MISSING | Tools DB cards have no detail page. "TUTORIAL" link is `#`. |
| 17 | **Tool access/download** | ❌ MISSING | No tool purchase or free access flow. |
| 18 | **Course video player** | ❌ MISSING | No video playback page, no module progression. |
| 19 | **My Courses progress** | 🟡 FAKE | Always shows "0%" and "Not Started". Not connected to `CourseProgress` table. |
| 20 | **Certificates** | 🟡 FAKE | Page exists but always empty. No certificate generation logic. |

### Admin Dashboard
| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 21 | **Real dashboard stats** | 🟡 PARTIAL | Revenue, subscribers, purchases are real from DB. But server health, Cloudflare stats, and payment node latencies are **completely fake/hardcoded**. |
| 22 | **User management** | ❌ PLACEHOLDER | `/admin/users` is literally 3 lines: a heading and "User management placeholder" text. |
| 23 | **Course creation UI** | ❌ MISSING | `/admin/marketplace` shows a fake "Asset Inventory" table with hardcoded rows. No way to create real courses. |
| 24 | **Tool creation UI** | ❌ MISSING | Same as above — no tool creation in admin. |
| 25 | **Real monetization controls** | 🟡 FAKE | Gateway config shows "Paystack Connected" and "Flutterwave Key Expired" as **static UI**. Not connected to actual API key validation. |
| 26 | **Ad slot management** | 🟡 FAKE | Ad performance, CTR charts, pop-up video config are all **demo visuals**. No `AdSlot` table integration. |
| 27 | **Promoted content queue** | 🟡 FAKE | Queue cards with "Approve/Decline" are hardcoded. Not connected to any database. |
| 28 | **Real security monitoring** | 🟡 FAKE | Threat feed, WAF toggles, SSL info, IP whitelist are all **client-side state with fake data**. Not connected to any real security service. |
| 29 | **Real media upload** | 🟡 FAKE | Upload page has fake video uploads with animated progress bars. R2 explorer shows hardcoded files. No actual file upload to R2 except avatars. |
| 30 | **Real system logs** | 🟡 FAKE | Logs page generates random fake log lines every 800ms. Not connected to any real logging service. |
| 31 | **Newsletter campaign sending** | 🟡 PARTIAL | Admin blog page has a "Newsletter Sidebar" component. The `/api/newsletter/send` route exists but the UI to compose and send campaigns is incomplete. |

### E-Commerce & Payments
| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 32 | **Frontend checkout flow** | ❌ MISSING | Paystack checkout API exists on backend (`/api/payments/checkout`) but **no frontend integration**. The "Enroll" buttons don't call it. |
| 33 | **Payment verification page** | 🟡 EXISTS | `/api/payments/verify` exists but no frontend success/failure page for users after payment. |
| 34 | **Webhook handling** | 🟡 EXISTS | `/api/webhook/paystack` is implemented but needs testing with real Paystack events. |
| 35 | **Order history** | ❌ MISSING | No `/orders` or `/purchases` page for users to see their purchase history. |
| 36 | **Refund handling** | 🟡 PARTIAL | Webhook handles `refund.processed` but no admin UI to initiate refunds. |

### User Features
| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 37 | **Bookmark create/delete** | ❌ MISSING | `/api/bookmarks` only has GET (assumed). The "bookmark_remove" button in Saved Articles is not wired to a DELETE endpoint. No "Save" button on post cards. |
| 38 | **Notifications system** | 🟡 FAKE | Notifications page exists and calls `/api/notifications` but the API likely returns empty. Header notification bell has a hardcoded dot. |
| 39 | **Settings save** | 🟡 FAKE | Settings page has beautiful UI but **"COMMIT CHANGES" button does nothing**. No PUT endpoint for updating settings. |
| 40 | **Support ticket creation** | 🟡 FAKE | Support page has "Open Ticket" buttons that do nothing. `/api/support/tickets` likely only GET, no POST. |
| 41 | **API key generation** | 🟡 FAKE | Settings shows "GENERATE KEY" button but **not wired to any API**. |
| 42 | **Password rotation** | 🟡 FAKE | "Rotate Key" button in settings does nothing. |

### SEO & Marketing
| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 43 | **Dynamic SEO metadata** | 🟡 PARTIAL | Page-level metadata exists (e.g., `/courses` has title) but **individual blog posts have no `<meta>` tags**, no Open Graph, no Twitter cards. |
| 44 | **Sitemap.xml** | ❌ MISSING | No `app/sitemap.ts` or `public/sitemap.xml`. |
| 45 | **RSS feed** | ❌ MISSING | No `/feed.xml` or `/rss.xml`. |
| 46 | **Robots.txt** | ❌ MISSING | No `app/robots.ts`. |
| 47 | **Structured data (JSON-LD)** | ❌ MISSING | No schema.org markup for blog posts, courses, or organization. |

---

## 🟡 MEDIUM — Polish & Reliability

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 48 | **Blog home trending/latest are identical** | `BlogHomeClient.tsx:63-64` | Both `trending` and `latest` use `posts.slice(1, 4)` — they show the exact same posts. Should be different queries or slices. |
| 49 | **AI Radar filters don't filter** | `AIRadarClient.tsx:130` | Category filter buttons are static. Clicking them does nothing. |
| 50 | **Courses tabs don't filter** | `CoursesClient.tsx:57-59` | "All Courses / In Progress / Completed" tabs are static. No filtering logic. |
| 51 | **Playbook sidebar steps are hardcoded** | `PlaybooksClient.tsx:166-181` | "Define Niche Market", "Scrape Leads", "Automate Flow" are static. Not tied to any playbook data. |
| 52 | **E-Books video courses are actually blog posts** | `EBooksClient.tsx:112` | Video Courses section reuses `books` array (which is blog posts) with **fake progress bars** (65%, 100%, 0%). |
| 53 | **Load More buttons don't load more** | Multiple pages | "Load More" and "Load More Signals" buttons are present but **not wired to pagination**. |
| 54 | **Avatar in header uses ui-avatars fallback** | `Header.tsx:43` | When no avatar URL exists, it generates one from `ui-avatars.com` — this should use the initials fallback like the profile page. |
| 55 | **Admin dashboard server health is fake** | `app/admin/dashboard/page.tsx:125-149` | CPU 42%, MEM 6.8GB, Uptime 94.2% are all **hardcoded strings**. |
| 56 | **Admin dashboard Paystack/Flutterwave status is fake** | `app/admin/dashboard/page.tsx:154-183` | "99.98%", "142ms latency" are hardcoded. Not actual API health checks. |
| 57 | **Newsletter subscribe in footer missing** | `Footer.tsx` | No connection to `/api/newsletter/subscribe`. |
| 58 | **No loading/error states on some admin pages** | Various | Some admin pages lack proper loading skeletons and error handling. |
| 59 | **Mobile responsiveness on admin** | Various | Some admin tables and grids overflow on mobile. |
| 60 | **No data export functionality** | Admin | "Export CSV", "Export" buttons in logs and marketplace are non-functional. |

---

## 🟢 WORKING — These Are Actually Functional

| Feature | Evidence |
|---------|----------|
| **Authentication** (Supabase) | Login, register, Google OAuth, password reset, OTP all work. Middleware protects routes. |
| **Auth sync to Prisma** | `/api/auth/sync` creates User record on first login. |
| **Blog admin CRUD** | Admin can create, edit, publish, unpublish, delete posts via `/api/admin/blog`. Section tabs work. |
| **Blog public API** | `/api/blog` returns real posts with filtering by section, category, search. |
| **Single blog API** | `/api/blog/[slug]` fetches individual posts. |
| **Avatar upload** | Uploads to R2, proxies through `/api/avatar`, displays correctly. |
| **Profile fetch/update** | `/api/profile` GET/PUT works with resilient error handling. |
| **Newsletter subscription API** | `/api/newsletter/subscribe` creates records in DB. |
| **Paystack backend** | Checkout creation, webhook handling, purchase records all implemented. |
| **Admin stats API** | `/api/admin/stats` returns real aggregate data from DB. |
| **Audit logging** | Admin actions are logged to `AuditLog` table. |
| **Content sections** | Blog, AI Radar, Tools DB, Playbooks, E-Books, Courses all fetch real data from DB via section filter. |
| **Role-based admin access** | Admin layout checks role and redirects non-admins. |
| **Database schema** | Complete Prisma schema with all models, relations, enums. |
| **Header auth state** | Shows login/register or profile dropdown based on auth state. |
| **Logout** | Works in both main header dropdown and admin sidebar. |

---

## 📋 Recommended Priority Order

### Phase 1: Make It Functional (Week 1)
1. **Create blog post detail page** (`app/(main)/blog/[slug]/page.tsx`) — this is the single most critical missing piece.
2. **Fix admin dashboard crash** — remove `log.entity` reference or add `entity` field to AuditLog schema.
3. **Wire footer newsletter** to `/api/newsletter/subscribe`.
4. **Fix "IntellectOS" branding** on auth pages to "AI Side Hustle".
5. **Make "Enroll" buttons work** — create a course detail page with Paystack checkout flow.

### Phase 2: Core Content Experience (Week 2)
6. Add **search functionality** (API + frontend).
7. Add **related posts** to blog detail page.
8. Add **social sharing** to blog detail page.
9. Add **category/tag archive pages**.
10. Make **AI Radar filters** functional.
11. Make **Courses tabs** functional (filter by progress).
12. Add **Load More pagination** to all listing pages.

### Phase 3: User Value Features (Week 3)
13. Build **real user management** in admin (`/admin/users`).
14. Build **course creation** admin UI (replace mock marketplace).
15. Build **tool creation** admin UI.
16. Wire **settings save** to actual API endpoints.
17. Wire **support ticket creation**.
18. Add **bookmarks save/remove** functionality.
19. Add **order history** page for users.
20. Build **newsletter campaign composer** in admin.

### Phase 4: Polish & SEO (Week 4)
21. Add **dynamic SEO metadata** for all pages (especially blog posts).
22. Generate **sitemap.xml**, **RSS feed**, **robots.txt**.
23. Replace all **hardcoded demo data** in admin with real data or remove those widgets.
24. Add **JSON-LD structured data**.
25. Add **password change** functionality.
26. Add **2FA setup** flow (UI says it's active but no setup flow exists).
27. Final **mobile responsiveness** pass on admin.
28. **Build & deploy testing** on Railway.

---

## 🏗️ Architecture Notes for Developer

- **Content is unified through `BlogPost` model** — Blog, AI Radar, Tools DB, Playbooks, E-Books, and Courses are all stored in the same table, differentiated by the `section` enum field. This is actually clever but means "Courses" frontend doesn't use the actual `Course` model (which has price, modules, etc.). The real `Course` model exists but is only used by the payment APIs.
- **Admin dashboard has two data sources** — Some widgets pull from DB (revenue, purchases), others are entirely fake visuals (server health, Cloudflare, WAF). This creates a jarring experience when real data mixes with fake data.
- **Payment flow is backend-complete but frontend-invisible** — The entire Paystack integration is there server-side, but a user browsing courses has no way to actually pay.
- **R2 avatar upload is the only file upload that actually works** — All other "upload" functionality in admin is visual demo only.
