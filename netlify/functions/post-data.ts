import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { connectToDatabase, createResponse } from './utils'

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  context.callbackWaitsForEmptyEventLoop = false

  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {})
  }

  try {
    let body: any = {}

    if (event.body) {
      body = JSON.parse(event.body)
    }

    // Uncomment to use MongoDB
    // const db = await connectToDatabase()
    // await db.collection('data').insertOne(body)

    return createResponse(201, { success: true })
  } catch (error) {
    return createResponse(500, { error: "Server error" })
  }
}
