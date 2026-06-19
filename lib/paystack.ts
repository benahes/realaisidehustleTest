import axios from 'axios'

const paystack = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
})

export async function initializeTransaction(data: {
  email: string
  amount: number // in kobo
  reference: string
  callback_url?: string
  metadata?: Record<string, unknown>
}) {
  const res = await paystack.post('/transaction/initialize', data)
  return res.data.data
}

export async function verifyTransaction(reference: string) {
  const res = await paystack.get(`/transaction/verify/${reference}`)
  return res.data.data
}

export async function createRefund(transaction: string, amount?: number) {
  const res = await paystack.post('/refund', { transaction, amount })
  return res.data.data
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const crypto = require('crypto')
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')
  return hash === signature
}

export default paystack
