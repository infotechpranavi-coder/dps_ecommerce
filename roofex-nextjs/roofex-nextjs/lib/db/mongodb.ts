import { MongoClient, type Db } from 'mongodb'

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient
  _mongoDb?: Db
  _mongoConnectPromise?: Promise<Db>
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim())
}

export async function getMongoDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (globalForMongo._mongoDb) {
    return globalForMongo._mongoDb
  }

  if (!globalForMongo._mongoConnectPromise) {
    globalForMongo._mongoConnectPromise = (async () => {
      const client = new MongoClient(uri)
      await client.connect()
      const db = client.db(process.env.MONGODB_DB_NAME?.trim() || 'dbs_ecommerce')
      globalForMongo._mongoClient = client
      globalForMongo._mongoDb = db
      return db
    })().catch((error) => {
      globalForMongo._mongoConnectPromise = undefined
      globalForMongo._mongoClient = undefined
      globalForMongo._mongoDb = undefined
      throw error
    })
  }

  return globalForMongo._mongoConnectPromise
}

export const CATALOG_DOC_ID = 'main'
