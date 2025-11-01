import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import { connectToDatabase } from './utils'

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log("--- Auth Function Start ---")
  context.callbackWaitsForEmptyEventLoop = false

  console.log("Read SUPABASE_URL:", supabaseUrl ? 'Exists' : 'MISSING')
  console.log("Read SUPABASE_SERVICE_KEY:", supabaseServiceKey ? 'Exists' : 'MISSING')

  // Check if the request is valid
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    console.log("Attempting to initialize Supabase client...")
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.log("Supabase client initialized:", !!supabase)

    // Parse the request body
    const { token, profile } = JSON.parse(event.body || '{}')
    console.log("Received token (first 10 chars):", token ? token.substring(0, 10) + '...' : 'No token received')
    console.log("Received profile data:", !!profile)

    if (!token) {
      console.log("Token missing, returning 400.")
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Token is required' }),
      }
    }

    // Verify the user token first
    console.log("Attempting supabase.auth.getUser(token)...")
    const { data: userData, error: userError } = await supabase.auth.getUser(token)
    console.log("supabase.auth.getUser result:", {
      hasData: !!userData,
      hasUser: !!userData?.user,
      userId: userData?.user?.id,
      userError: userError ? userError.message : null
    })

    if (userError || !userData.user) {
      console.log("getUser failed or user not found, returning 401.", { error: userError?.message })
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Unauthorized' }),
      }
    }

    // Database operation - Upsert user data
    console.log("Attempting Database operation - Upsert user data...")
    try {
      console.log("Attempting to connect to MongoDB...")
      const db = await connectToDatabase()
      console.log("MongoDB connection successful:", !!db)

      const usersCollection = db.collection('users')

      const filter = { supabase_id: userData.user.id }

      const updateDoc = {
        $set: {
          email: userData.user.email,
          name: userData.user.user_metadata?.full_name || userData.user.user_metadata?.name || null,
          picture_url: userData.user.user_metadata?.avatar_url || userData.user.user_metadata?.picture || null,
          plan: 'free', // Default plan
          updatedAt: new Date(),
        },
        $setOnInsert: {
          supabase_id: userData.user.id,
          createdAt: new Date(),
        }
      }

      console.log("Preparing MongoDB upsert:", { filter, updateDoc })
      await usersCollection.updateOne(filter, updateDoc, { upsert: true })
      console.log(`User ${userData.user.id} data upserted successfully.`)

    } catch (dbError) {
      console.error("Database operation failed inside try/catch:", dbError)
      // Decide if you want to fail the whole request or just log the error
      // For now, just logging and continuing.
    }

    // Determine action based on presence of 'profile' data
    if (profile) {
      console.log("Profile data present, proceeding with Supabase profile update...")
      // Update Profile Logic
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userData.user.id,
          updated_at: new Date(),
          ...profile
        })
        .select()

      if (error) {
        return {
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ error: error.message }),
        }
      }

      // Return the updated profile
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          profile: data[0],
          message: 'Profile updated successfully'
        }),
      }

    } else {
      console.log("No profile data, returning standard authentication success response.")
      // Validate User Logic (Token already validated, user data upserted to MongoDB)
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          user: userData.user,
          message: 'User is authenticated'
        }),
      }
    }

  } catch (error) {
    console.error("Auth function main try/catch error:", error)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
