import { MongoClient, type Db } from 'mongodb'

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient
  _mongoDb?: Db
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim())
}

export async function getMongoDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri)
    await globalForMongo._mongoClient.connect()
    globalForMongo._mongoDb = globalForMongo._mongoClient.db(
      process.env.MONGODB_DB_NAME?.trim() || 'dbs_ecommerce',
    )
  }

  return globalForMongo._mongoDb!
}

export const CATALOG_DOC_ID = 'main'
