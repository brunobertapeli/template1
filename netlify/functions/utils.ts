import { MongoClient, Db } from 'mongodb'

// Use environment variables directly in Netlify
const MONGODB_URI = process.env.MONGODB_URI

let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()

  const db = client.db()
  cachedDb = db

  return db
}

export function createResponse(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
    },
    body: JSON.stringify(body)
  }
}
