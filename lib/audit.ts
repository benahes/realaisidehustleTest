import { prisma } from './prisma'

export type AuditAction =
  | 'ADMIN_LOGIN'
  | 'ADMIN_LOGOUT'
  | 'BLOG_CREATE'
  | 'BLOG_UPDATE'
  | 'BLOG_DELETE'
  | 'BLOG_PUBLISH'
  | 'BLOG_UNPUBLISH'
  | 'COURSE_CREATE'
  | 'COURSE_UPDATE'
  | 'COURSE_DELETE'
  | 'TOOL_CREATE'
  | 'TOOL_UPDATE'
  | 'TOOL_DELETE'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_REFUNDED'
  | 'USER_PROMOTED'
  | 'USER_DEMOTED'
  | 'SETTINGS_UPDATE'
  | 'AI_GENERATE_BLOG'
  | 'NEWSLETTER_SEND'

export async function logAudit(
  action: AuditAction,
  metadata: Record<string, unknown>,
  options: { userId?: string; ip?: string; userAgent?: string } = {}
) {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        userId: options.userId || null,
        ip: options.ip || '0.0.0.0',
        userAgent: options.userAgent || '',
        metadata: metadata as any,
      },
    })
  } catch (err) {
    // Audit logging should never break the app
    console.error('[AUDIT] Failed to log:', err)
  }
}
