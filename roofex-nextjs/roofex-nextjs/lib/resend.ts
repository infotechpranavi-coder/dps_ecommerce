import 'server-only'

import { brand } from './brand'
import type { Enquiry } from './enquiry-types'
import { ENQUIRY_TYPE_LABELS } from './enquiry-types'

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

function notifyTo() {
  return (
    process.env.RESEND_TO_EMAIL?.trim()
    || brand.supportEmail
    || brand.email
  )
}

function fromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim()
    || `${brand.shortName} <onboarding@resend.dev>`
  )
}

function buildEmailHtml(enquiry: Enquiry) {
  const typeLabel = ENQUIRY_TYPE_LABELS[enquiry.type] || enquiry.type
  const rows: [string, string][] = [
    ['Type', typeLabel],
    ['Subject', enquiry.subject],
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone || '—'],
    ['Product', enquiry.productName || '—'],
    ['Quantity', enquiry.quantity != null ? String(enquiry.quantity) : '—'],
    ['MOQ', enquiry.moq != null ? String(enquiry.moq) : '—'],
    ['Submitted', new Date(enquiry.createdAt).toLocaleString('en-IN')],
  ]

  const rowHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:140px">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#222">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${rowHtml}</table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.5;background:#f7f7f7;padding:12px;border-radius:8px">${escapeHtml(enquiry.message)}</p>
    </div>
  `
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export type SendEnquiryEmailResult =
  | { status: 'sent' }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; error: string }

/** Sends via Resend when RESEND_API_KEY is set. Safe to call without credentials. */
export async function sendEnquiryEmail(enquiry: Enquiry): Promise<SendEnquiryEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return { status: 'skipped', reason: 'RESEND_API_KEY not configured' }
  }

  try {
    const typeLabel = ENQUIRY_TYPE_LABELS[enquiry.type] || enquiry.type
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [notifyTo()],
        reply_to: enquiry.email,
        subject: `[${brand.shortName}] ${typeLabel}: ${enquiry.subject}`,
        html: buildEmailHtml(enquiry),
        text: [
          `New enquiry (${typeLabel})`,
          `From: ${enquiry.name} <${enquiry.email}>`,
          enquiry.phone ? `Phone: ${enquiry.phone}` : null,
          enquiry.productName ? `Product: ${enquiry.productName}` : null,
          enquiry.quantity != null ? `Quantity: ${enquiry.quantity}` : null,
          enquiry.moq != null ? `MOQ: ${enquiry.moq}` : null,
          '',
          enquiry.message,
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      return { status: 'failed', error: `Resend ${res.status}: ${body.slice(0, 240)}` }
    }

    return { status: 'sent' }
  } catch (error) {
    return {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Resend request failed',
    }
  }
}
