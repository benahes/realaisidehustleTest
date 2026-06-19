import { z } from 'zod'

// --- Blog ---
export const BlogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  coverImage: z.string().optional().or(z.literal('')),
  section: z.enum(['BLOG', 'AI_RADAR', 'TOOLS_DB', 'PLAYBOOKS', 'COURSES']).default('BLOG'),
  category: z.string().min(1).max(100),
  tags: z.array(z.string().max(50)).max(10).default([]),
  published: z.boolean().default(false),
  aiGenerated: z.boolean().default(false),
})

export const GenerateBlogSchema = z.object({
  topic: z.string().min(1).max(200),
  tone: z.enum(['professional', 'casual', 'technical', 'tutorial']).default('professional'),
  length: z.enum(['short', 'medium', 'long']).default('medium'),
})

// --- Courses ---
export const CourseSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1).max(2000),
  price: z.number().int().min(0),
  currency: z.string().length(3).default('NGN'),
  thumbnail: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
})

export const ModuleSchema = z.object({
  title: z.string().min(1).max(200),
  videoUrl: z.string().optional().or(z.literal('')),
  duration: z.number().int().min(0).default(0),
  order: z.number().int().min(0),
})

// --- Tools ---
export const ToolSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1).max(2000),
  price: z.number().int().min(0),
  priceType: z.enum(['FREE', 'ONE_TIME', 'SUBSCRIPTION']).default('FREE'),
  category: z.string().min(1).max(100),
  icon: z.string().optional().or(z.literal('')),
  externalUrl: z.string().url().optional().or(z.literal('')),
  accessUrl: z.string().optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
})

// --- Payments ---
export const CheckoutSchema = z.object({
  itemType: z.enum(['COURSE', 'TOOL']),
  itemId: z.string().min(1),
})

export const PaystackWebhookSchema = z.object({
  event: z.string(),
  data: z.record(z.string(), z.unknown()),
})

// --- Newsletter ---
export const NewsletterSubscribeSchema = z.object({
  email: z.string().email(),
})

export const NewsletterSendSchema = z.object({
  subject: z.string().min(1).max(200),
  content: z.string().min(1),
  segment: z.enum(['all', 'subscribed', 'purchasers']).default('all'),
})

// --- Upload ---
export const PresignSchema = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.string().min(1),
})

// --- AI ---
export const AIGenerateSchema = z.object({
  prompt: z.string().min(1).max(2000),
  model: z.enum(['grok', 'openai']).default('grok'),
})

// --- Audit Log Query ---
export const AuditLogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  action: z.string().optional(),
})
