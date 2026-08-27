import 'server-only'

import fs from 'fs'
import path from 'path'
import type { CreateEnquiryInput, Enquiry } from './enquiry-types'
import { getMongoDb, isMongoConfigured } from './db/mongodb'

const ENQUIRIES_PATH = path.join(process.cwd(), 'data', 'enquiries.json')
const COLLECTION = 'enquiries'

function readFileEnquiries(): Enquiry[] {
  try {
    if (!fs.existsSync(ENQUIRIES_PATH)) return []
    const raw = fs.readFileSync(ENQUIRIES_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as Enquiry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeFileEnquiries(items: Enquiry[]) {
  try {
    fs.mkdirSync(path.dirname(ENQUIRIES_PATH), { recursive: true })
    fs.writeFileSync(ENQUIRIES_PATH, JSON.stringify(items, null, 2), 'utf-8')
  } catch (error) {
    // Vercel FS is read-only — Mongo is the source of truth there.
    console.error('[enquiries] File write skipped:', error)
  }
}

export function createEnquiryId() {
  return `enq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export async function listEnquiries(): Promise<Enquiry[]> {
  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb()
      const docs = await db
        .collection(COLLECTION)
        .find({})
        .sort({ createdAt: -1 })
        .limit(500)
        .toArray()
      return docs.map((doc) => {
        const { _id, ...rest } = doc as Enquiry & { _id?: unknown }
        return {
          ...rest,
          id: rest.id || String(_id),
        }
      })
    } catch (error) {
      console.error('[enquiries] Mongo list failed — using file:', error)
    }
  }
  return readFileEnquiries().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function createEnquiry(
  input: CreateEnquiryInput,
  emailMeta: Pick<Enquiry, 'emailStatus' | 'emailError'>,
): Promise<Enquiry> {
  const enquiry: Enquiry = {
    id: createEnquiryId(),
    createdAt: new Date().toISOString(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || undefined,
    type: input.type?.trim() || 'general',
    subject: input.subject.trim(),
    message: input.message.trim(),
    productName: input.productName?.trim() || undefined,
    quantity: typeof input.quantity === 'number' && input.quantity > 0 ? input.quantity : undefined,
    moq: typeof input.moq === 'number' && input.moq > 0 ? input.moq : undefined,
    emailStatus: emailMeta.emailStatus,
    emailError: emailMeta.emailError,
  }

  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb()
      await db.collection(COLLECTION).insertOne({ ...enquiry })
      const existing = readFileEnquiries()
      writeFileEnquiries([enquiry, ...existing].slice(0, 500))
      return enquiry
    } catch (error) {
      console.error('[enquiries] Mongo insert failed — using file:', error)
    }
  }

  const existing = readFileEnquiries()
  writeFileEnquiries([enquiry, ...existing].slice(0, 500))
  return enquiry
}

export async function updateEnquiryEmailStatus(
  id: string,
  emailStatus: Enquiry['emailStatus'],
  emailError?: string,
): Promise<void> {
  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb()
      await db.collection(COLLECTION).updateOne(
        { id },
        { $set: { emailStatus, emailError: emailError || null } },
      )
    } catch (error) {
      console.error('[enquiries] Mongo email status update failed:', error)
    }
  }

  const existing = readFileEnquiries()
  const next = existing.map((item) =>
    item.id === id ? { ...item, emailStatus, emailError } : item,
  )
  writeFileEnquiries(next)
}
