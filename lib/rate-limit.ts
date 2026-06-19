import { Redis } from 'ioredis'

const redisUrl = process.env.REDIS_URL
let redis: Redis | null = null

// Only create Redis client if URL is provided and not localhost in production
const isLocalRedis = redisUrl?.includes('localhost') || redisUrl?.includes('127.0.0.1')
const isProd = process.env.NODE_ENV === 'production'

if (redisUrl && !(isProd && isLocalRedis)) {
  try {
    redis = new Redis(redisUrl, { lazyConnect: true, connectTimeout: 2000 })
    redis.on('error', () => { redis = null })
  } catch {
    redis = null
  }
}

// In-memory fallback when Redis is not configured or connection fails
const memoryStore = new Map<string, number[]>()

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  keyPrefix?: string
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const { windowMs, maxRequests, keyPrefix = 'rl' } = config
  const key = `${keyPrefix}:${identifier}`
  const now = Date.now()
  const windowStart = now - windowMs

  if (redis) {
    try {
      await redis.zremrangebyscore(key, 0, windowStart)
      const currentCount = await redis.zcard(key)

      if (currentCount >= maxRequests) {
        const oldest = await redis.zrange(key, 0, 0, 'WITHSCORES')
        const resetTime = oldest.length > 1 ? parseInt(oldest[1]) + windowMs : now + windowMs
        return { allowed: false, remaining: 0, resetTime }
      }

      await redis.zadd(key, now, `${now}-${Math.random()}`)
      await redis.pexpire(key, windowMs)

      return {
        allowed: true,
        remaining: maxRequests - currentCount - 1,
        resetTime: now + windowMs,
      }
    } catch {
      // Redis operation failed — fall through to in-memory
    }
  }

  // In-memory fallback
  const entries = memoryStore.get(key) || []
  const valid = entries.filter((t) => t > windowStart)

  if (valid.length >= maxRequests) {
    const resetTime = valid[0] + windowMs
    return { allowed: false, remaining: 0, resetTime }
  }

  valid.push(now)
  memoryStore.set(key, valid)

  return {
    allowed: true,
    remaining: maxRequests - valid.length,
    resetTime: now + windowMs,
  }
}

// Pre-configured rate limiters
export const publicRateLimit = (identifier: string) =>
  rateLimit(identifier, { windowMs: 60_000, maxRequests: 100, keyPrefix: 'public' })

export const authRateLimit = (identifier: string) =>
  rateLimit(identifier, { windowMs: 60_000, maxRequests: 1000, keyPrefix: 'auth' })

export const aiRateLimit = (identifier: string) =>
  rateLimit(identifier, { windowMs: 60_000, maxRequests: 5, keyPrefix: 'ai' })

export const adminRateLimit = (identifier: string) =>
  rateLimit(identifier, { windowMs: 60_000, maxRequests: 500, keyPrefix: 'admin' })
