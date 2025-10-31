export async function fetchData(endpoint) {
  try {
    const functionName = endpoint.includes('-') ? endpoint : `get-${endpoint}`;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${functionName}`);
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function postData(endpoint, data) {
  try {
    const functionName = endpoint.includes('-') ? endpoint : `post-${endpoint}`;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${functionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { success: false };
  }
} 