require('dotenv').config();
const { MongoClient } = require('mongodb');

// Use environment variables directly in Netlify
const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  
  const db = client.db();
  cachedDb = db;
  
  return db;
}

function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
    },
    body: JSON.stringify(body)
  };
}

module.exports = {
  connectToDatabase,
  createResponse
}; 