import { UserRole, PriceType, ItemType, PaymentStatus, AdType } from '@prisma/client'

export type { UserRole, PriceType, ItemType, PaymentStatus, AdType }

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  details?: unknown
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  pages: number
}
