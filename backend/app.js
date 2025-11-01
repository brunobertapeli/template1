require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

let db;

async function startServer() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db();
  
  http.createServer(handleRequest).listen(PORT);
  
  console.log(`Node Server running at port ${PORT} and mongodb successfully connected.`);
}

function handleRequest(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
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

function notFound(req, res) {
  res.writeHead(404);
  res.end('404');
}

startServer(); 