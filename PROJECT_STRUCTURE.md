# RAISH (Real AI Side Hustle) — Project Architecture & Security Blueprint

## Overview
A monetized AI education platform with blog, courses, tools, and newsletter capabilities. Built for scale, security, and Nigerian market compliance.

---

## 1. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS, TypeScript |
| **Backend** | Next.js API Routes + Railway (Node.js/Express if needed) |
| **Database** | PostgreSQL (Railway) + Prisma ORM |
| **Auth** | Supabase Auth (recommended) or NextAuth.js + JWT |
| **File/Video Storage** | Cloudflare R2 (files), Cloudflare Stream (videos) |
| **Payments** | Paystack (primary), Flutterwave (fallback) |
| **Newsletter** | Resend (transactional), Mailchimp/ConvertKit (campaigns) |
| **AI** | xAI Grok API (blog generation), OpenAI (fallback) |
| **Cache** | Redis (Railway) |
| **Monitoring** | Sentry (errors), Vercel Analytics |

---

## 2. Project Directory Structure

```
raish/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Public pages
│   │   ├── page.tsx              # Blog home
│   │   ├── ai-radar/
│   │   ├── tools-db/
│   │   ├── playbooks/
│   │   ├── e-books/
│   │   ├── courses/
│   │   └── newsletter/
│   ├── (auth)/                   # Auth pages (sign-in, sign-up)
│   ├── admin/                    # Admin dashboard (route group)
│   │   ├── dashboard/
│   │   ├── blog/
│   │   ├── courses/
│   │   ├── tools/
│   │   ├── monetization/
│   │   ├── users/
│   │   └── settings/
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Supabase/Auth webhooks
│   │   ├── blog/
│   │   ├── courses/
│   │   ├── tools/
│   │   ├── payments/
│   │   ├── newsletter/
│   │   ├── upload/               # Cloudflare R2 presigned URLs
│   │   ├── video/              # Cloudflare Stream uploads
│   │   ├── ai/                 # Grok integration
│   │   └── webhook/            # Paystack, webhook handlers
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── admin/                    # Admin-specific components
│   ├── payment/                  # Paystack checkout, etc.
│   └── shared/
├── lib/
│   ├── prisma.ts                 # Database client (singleton)
│   ├── cloudflare.ts             # R2 & Stream clients
│   ├── paystack.ts               # Payment SDK wrapper
│   ├── grok.ts                   # AI service wrapper
│   ├── auth.ts                   # Auth helpers
│   └── utils.ts
├── hooks/                        # Custom React hooks
├── types/                        # Global TypeScript types
├── prisma/
│   └── schema.prisma             # Database schema
├── scripts/                      # Migrations, seeders, AI bulk jobs
├── public/
├── .env.local                    # Local secrets
├── .env.production               # Production secrets (Railway)
├── next.config.js
├── tailwind.config.ts
└── PROJECT_STRUCTURE.md          # This file
```

---

## 3. Database Schema (Prisma)

```prisma
// User & Auth (managed by Supabase, synced to DB)
model User {
  id            String    @id @default(cuid())
  supabaseUid   String    @unique
  email         String    @unique
  name          String?
  role          UserRole  @default(USER)
  isSubscribed  Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  purchases     Purchase[]
  progress      CourseProgress[]
  newsletterSubs NewsletterSub[]
}

enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

// Blog
model BlogPost {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  excerpt     String
  content     String    // Markdown / JSON
  coverImage  String?
  category    String
  tags        String[]  // PostgreSQL array
  published   Boolean   @default(false)
  aiGenerated Boolean   @default(false)
  authorId    String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// Courses
model Course {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  description String
  price       Int       // Naira (kobo) or USD (cents)
  currency    String    @default("NGN")
  thumbnail   String?
  videoUrl    String?   // Cloudflare Stream ID
  modules     Module[]
  isPublished Boolean @default(false)
  createdAt   DateTime  @default(now())
  
  purchases   Purchase[]
}

model Module {
  id        String   @id @default(cuid())
  title     String
  videoUrl  String?  // Cloudflare Stream ID
  duration  Int      // minutes
  order     Int
  courseId  String
  course    Course   @relation(fields: [courseId], references: [id])
}

model CourseProgress {
  id         String   @id @default(cuid())
  userId     String
  courseId   String
  progress   Int      @default(0) // percentage
  completed  Boolean  @default(false)
  updatedAt  DateTime @updatedAt
}

// Tools
model Tool {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Int      // 0 = free
  priceType   PriceType @default(FREE)
  category    String
  icon        String?
  externalUrl String?  // if off-site tool
  accessUrl   String?  // if on-site tool (locked behind auth)
  isPublished Boolean @default(false)
  createdAt   DateTime @default(now())
  
  purchases   Purchase[]
}

enum PriceType {
  FREE
  ONE_TIME
  SUBSCRIPTION
}

// Purchases (Courses + Tools)
model Purchase {
  id            String        @id @default(cuid())
  userId        String
  user          User          @relation(fields: [userId], references: [id])
  itemType      ItemType
  courseId      String?
  course        Course?       @relation(fields: [courseId], references: [id])
  toolId        String?
  tool          Tool?         @relation(fields: [toolId], references: [id])
  amount        Int
  currency      String
  status        PaymentStatus @default(PENDING)
  paystackRef   String?       // transaction reference
  createdAt     DateTime      @default(now())
}

enum ItemType { COURSE TOOL }
enum PaymentStatus { PENDING SUCCESS FAILED REFUNDED }

// Newsletter
model NewsletterSub {
  id        String   @id @default(cuid())
  email     String   @unique
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

// Monetization (Ads & Promotions)
model AdSlot {
  id          String   @id @default(cuid())
  name        String   // e.g. "homepage-popup"
  type        AdType
  content     String   // HTML/image URL
  linkUrl     String?
  startDate   DateTime
  endDate     DateTime
  isActive    Boolean  @default(false)
  impressions Int      @default(0)
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())
}

enum AdType {
  POPUP_VIDEO
  BANNER
  SIDEBAR
  SPONSORED_CONTENT
}

// Security Audit Log
model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String   // e.g. "ADMIN_LOGIN", "BLOG_PUBLISH"
  ip        String
  userAgent String
  metadata  Json?    // extra context
  createdAt DateTime @default(now())
}
```

---

## 4. Feature Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Railway PostgreSQL + Redis setup
- [ ] Supabase Auth integration
- [ ] Prisma schema + initial migration
- [ ] Cloudflare R2 bucket + Stream setup
- [ ] Environment variables (.env structure)
- [ ] Admin route protection middleware

### Phase 2: Content Management (Week 3-4)
- [ ] Admin dashboard shell
- [ ] Manual blog upload (rich text editor: TipTap or Plate)
- [ ] Grok AI blog generation (`/api/ai/generate-blog`)
- [ ] Blog CRUD API + image upload to R2
- [ ] Slugify + SEO metadata automation

### Phase 3: Payments & Products (Week 5-6)
- [ ] Paystack integration (test mode → live)
- [ ] Course creation admin UI
- [ ] Tool creation admin UI
- [ ] Purchase flow (checkout → verify → grant access)
- [ ] Order history page
- [ ] Webhook handlers (`/api/webhook/paystack`)

### Phase 4: Media & Delivery (Week 7)
- [ ] Cloudflare Stream video upload pipeline
- [ ] Secure video playback (signed URLs)
- [ ] File storage (PDFs, resources) via R2
- [ ] Course progress tracking

### Phase 5: Monetization (Week 8)
- [ ] Ad slot management in admin
- [ ] Pop-up video/banner component
- [ ] Impression/click tracking
- [ ] Sponsored content placement API

### Phase 6: Newsletter (Week 9)
- [ ] Resend API integration
- [ ] Subscription form + confirmation
- [ ] Admin campaign composer
- [ ] Automated new-blog email alerts

---

## 5. Security Architecture

### 5.1 Authentication & Authorization
```
Public Routes: /, /blog/*, /courses, /tools-db, /newsletter
Protected Routes: /admin/*, /my-courses, /account
Middleware: app/middleware.ts — checks Supabase session + role
```
- **Admin-only routes**: `role === ADMIN || SUPER_ADMIN`
- **API route guards**: Every `/api/admin/*` route validates JWT + role
- **RBAC**: Middleware rejects non-admin access with 403

### 5.2 Data Protection
- **Prisma + parameterized queries**: Prevents SQL injection
- **Input validation**: Zod schemas on ALL API inputs
- **XSS prevention**: Sanitize HTML via DOMPurify before storing
- **CSRF**: Next.js handles this natively; validate origin headers on state-changing APIs
- **Rate limiting**: Redis-based per-IP (100 req/min public, 1000 req/min authed)

### 5.3 File & Video Security
- **R2**: Private buckets; generate presigned GET/PUT URLs (15-min expiry)
- **Stream**: Signed URLs for video playback; domain-restricted embeds
- **Upload validation**: File type whitelist (png,jpg,pdf,mp4), size limits (10MB images, 500MB videos)
- **Scan uploads**: ClamAV or Cloudflare malware scanning

### 5.4 Payment Security
- **Paystack**: Verify ALL webhooks (signature HMAC check)
- **Idempotency**: Purchase records keyed by `paystackRef` — prevent double-charge
- **Never trust frontend prices**: Recalculate server-side from DB
- **HTTPS only**: Railway auto-SSL; reject HTTP requests

### 5.5 Admin Security
- **2FA**: Enforce for all admin accounts (Supabase supports MFA/TOTP)
- **Audit logging**: Every admin action → `AuditLog` table
- **IP allowlisting**: Optional — restrict `/admin` to known IPs
- **Session timeout**: 30-min idle logout for admin sessions
- **Secret management**: Railway env vars only — never commit secrets

### 5.6 Anti-Abuse
- **Rate limiting**: `/api/ai/*` — 5 requests/min per user (Grok is expensive)
- **Bot protection**: Cloudflare Turnstile (free CAPTCHA alternative)
- **DDoS**: Cloudflare proxy + rate limiting

### 5.7 Secrets Management
```bash
# .env.local (never commit)
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
CLOUDFLARE_R2_ACCOUNT_ID="..."
CLOUDFLARE_R2_ACCESS_KEY_ID="..."
CLOUDFLARE_R2_SECRET_ACCESS_KEY="..."
CLOUDFLARE_STREAM_TOKEN="..."
PAYSTACK_SECRET_KEY="sk_..."
PAYSTACK_PUBLIC_KEY="pk_..."
RESEND_API_KEY="re_..."
GROK_API_KEY="xai-..."
SENTRY_DSN="..."
```

---

## 6. API Route Structure

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/blog` | GET | No | List published blogs |
| `/api/blog` | POST | Admin | Create blog (manual) |
| `/api/blog/[slug]` | GET | No | Single blog |
| `/api/blog/[slug]` | PUT/DEL | Admin | Update/delete |
| `/api/ai/generate-blog` | POST | Admin | Grok AI generation |
| `/api/courses` | GET | No | List published courses |
| `/api/courses/[id]` | GET | User | Full course (if purchased) |
| `/api/courses` | POST | Admin | Create course |
| `/api/tools` | GET | No | List tools |
| `/api/tools/[id]` | GET | User | Access tool (if paid) |
| `/api/payments/checkout` | POST | User | Initiate Paystack |
| `/api/payments/verify` | GET | User | Verify transaction |
| `/api/webhook/paystack` | POST | No | Paystack webhook |
| `/api/upload/presign` | GET | Admin/User | R2 presigned URL |
| `/api/video/upload` | POST | Admin | Cloudflare Stream TUS |
| `/api/newsletter/subscribe` | POST | No | Subscribe email |
| `/api/newsletter/send` | POST | Admin | Send campaign |
| `/api/admin/audit-logs` | GET | Super Admin | View audit trail |
| `/api/admin/stats` | GET | Admin | Dashboard metrics |

---

## 7. Cloudflare Configuration

### R2 (File Storage)
- Bucket: `raish-assets`
- CORS: Allow `*.raish.com`
- Public URL: `https://assets.raish.com` (custom domain)
- Lifecycle: Auto-delete temp upload chunks after 24h

### Stream (Video)
- Upload via TUS protocol (resumable)
- Playback restricted by domain (`raish.com`)
- Signed URLs for premium course videos

---

## 8. Nigerian Payment Flow (Paystack)

```
User clicks "Buy Course" → Frontend calls /api/payments/checkout
  → Server creates Purchase record (PENDING) + Paystack transaction
  → Returns Paystack authorization URL
  → User completes payment on Paystack
  → Paystack webhook hits /api/webhook/paystack
  → Server verifies, updates Purchase to SUCCESS
  → Grants course access
  → Sends confirmation email via Resend
```

**Fallback**: Flutterwave for users whose cards fail on Paystack.

---

## 9. Railway Deployment Plan

1. **Create Railway project**: `raish-platform`
2. **Services**:
   - PostgreSQL (managed)
   - Redis (managed)
   - `raish-app` (Next.js)
3. **Environment**: Copy `.env.production` variables
4. **Domain**: Connect custom domain (`raish.com`) + SSL
5. **CI/CD**: GitHub → Railway auto-deploy on `main` push

---

## 10. Next Steps

1. Review and approve this structure
2. I will scaffold the Prisma schema + migrations
3. Set up Supabase auth + admin middleware
4. Build the admin dashboard shell
5. Integrate Grok AI blog generation
6. Connect Paystack (test mode)

**Say the word and I'll start scaffolding.**
