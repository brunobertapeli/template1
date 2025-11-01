// API utility functions using relative paths for Netlify Functions
const API_BASE = '/.netlify/functions'

export async function fetchData(endpoint: string) {
  try {
    const functionName = endpoint.includes('-') ? endpoint : `get-${endpoint}`
    const response = await fetch(`${API_BASE}/${functionName}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

export async function postData(endpoint: string, data: any) {
  try {
    const functionName = endpoint.includes('-') ? endpoint : `post-${endpoint}`
    const response = await fetch(`${API_BASE}/${functionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    console.error('Error posting data:', error)
    return { success: false }
  }
}
