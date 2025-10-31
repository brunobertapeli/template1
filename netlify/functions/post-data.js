const { connectToDatabase, createResponse } = require('./utils');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }
  
  try {
    let body = {};
    
    if (event.body) {
      body = JSON.parse(event.body);
    }
    
    // Uncomment to use MongoDB
    // const db = await connectToDatabase();
    // await db.collection('data').insertOne(body);
    
    return createResponse(201, { success: true });
  } catch (error) {
    return createResponse(500, { error: "Server error" });
  }
}; 