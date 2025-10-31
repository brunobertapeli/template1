Node_Lite Documentation
Core Philosophy
Node_Lite is a minimalist Node.js implementation designed for efficient server-side JavaScript development. This framework provides a lightweight approach while maintaining essential functionality.
Base Structure
backend/
├── app.js          // Main application entry point
├── modules/        // Feature modules
├── utils.js        // Shared utilities
└── .env            // Environment variables

Minimalist Server Implementation

// app.js - Compact server implementation
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
require('dotenv').config();

function handleRequest(req, res) {
  // CORS headers for frontend connections
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route mapping with inline handlers
  const routes = {
    'GET:/api/data': getData,
    'POST:/api/data': postData
  };
  
  const parsedUrl = url.parse(req.url);
  const routeKey = `${req.method}:${parsedUrl.pathname}`;
  const handler = routes[routeKey] || notFound;
  
  try {
    handler(req, res);
  } catch (e) {
    res.writeHead(500);
    res.end('500');
  }
}

// Start server
const PORT = process.env.PORT || 3001;
http.createServer(handleRequest).listen(PORT);

Data Processing

// Inline data handlers
function getData(req, res) {
  const data = { message: "Hello from server" };
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(data));
}

function postData(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ success: true }));
  });
}

Authentication (Simplified)

// Compact auth implementation
function validateAuth(req) {
  const token = req.headers.authorization?.split(' ')[1];
  return token === process.env.API_TOKEN;
}

function protectedRoute(req, res) {
  if (!validateAuth(req)) {
    res.writeHead(401);
    res.end();
    return;
  }
  
  // Protected logic here
}

// .env
MONGODB_URI=mongodb+srv://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
PORT=3001