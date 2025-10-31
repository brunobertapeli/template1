const { connectToDatabase, createResponse } = require('./utils');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }
  
  try {
    // Example response - modify as needed based on your actual data model
    const data = { message: "Hello from serverless function" };
    
    // Uncomment to use MongoDB
    // const db = await connectToDatabase();
    // const data = await db.collection('data').find({}).toArray();
    
    return createResponse(200, data);
  } catch (error) {
    return createResponse(500, { error: "Server error" });
  }
}; 