import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  ServerIcon, 
  BeakerIcon, 
  DocumentTextIcon,
  CommandLineIcon,
  CpuChipIcon,
  LightBulbIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="documentation-page">
      <DocumentationHeader />
      <DocumentationNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <DocumentationContent activeTab={activeTab} />
    </div>
  );
}

function DocumentationHeader() {
  return (
    <section className="documentation-header">
      <div className="documentation-header-content">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="page-title"
        >
          Documentation
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="page-subtitle"
        >
          Everything you need to know about React+Node.JS Lite
        </motion.p>
      </div>
    </section>
  );
}

function DocumentationNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <DocumentTextIcon className="nav-icon" /> },
    { id: 'philosophy', label: 'Philosophy', icon: <LightBulbIcon className="nav-icon" /> },
    { id: 'react-lite', label: 'React Lite', icon: <CodeBracketIcon className="nav-icon" /> },
    { id: 'node-lite', label: 'Node Lite', icon: <ServerIcon className="nav-icon" /> },
    { id: 'netlify', label: 'Netlify Deployment', icon: <CubeTransparentIcon className="nav-icon" /> },
    { id: 'ai-integration', label: 'AI Integration', icon: <CpuChipIcon className="nav-icon" /> },
    { id: 'cli', label: 'CLI Commands', icon: <CommandLineIcon className="nav-icon" /> }
  ];
  
  return (
    <div className="documentation-nav">
      <div className="container">
        <nav className="tabs-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function DocumentationContent({ activeTab }) {
  const contentMap = {
    'overview': <OverviewContent />,
    'philosophy': <PhilosophyContent />,
    'react-lite': <ReactLiteContent />,
    'node-lite': <NodeLiteContent />,
    'netlify': <NetlifyContent />,
    'ai-integration': <AIIntegrationContent />,
    'cli': <CLIContent />
  };
  
  return (
    <section className="documentation-content">
      <div className="container">
        {contentMap[activeTab]}
      </div>
    </section>
  );
}

function OverviewContent() {
  return (
    <div className="doc-content">
      <h2>React+Node.JS Lite Overview</h2>
      
      <p>React+Node.JS Lite is a minimalist, production-ready template for building SaaS applications. It combines lightweight React frontend with serverless Node.js functions, designed for optimal developer experience and AI compatibility.</p>
      
      <div className="doc-features">
        <div className="doc-feature">
          <CodeBracketIcon className="doc-icon" />
          <h3>Lightweight React</h3>
          <p>Optimized React implementation with minimal dependencies, making it easier to understand, modify, and maintain.</p>
        </div>
        
        <div className="doc-feature">
          <ServerIcon className="doc-icon" />
          <h3>Serverless Node.js</h3>
          <p>Serverless functions that deploy effortlessly to Netlify, reducing infrastructure complexity and costs.</p>
        </div>
        
        <div className="doc-feature">
          <BeakerIcon className="doc-icon" />
          <h3>AI-Friendly Architecture</h3>
          <p>Well-structured codebase specifically designed for better AI comprehension and interaction.</p>
        </div>
      </div>
      
      <div className="doc-callout">
        <h3>Getting Started</h3>
        <p>To get started with React+Node.JS Lite, clone the repository and install dependencies:</p>
        
        <div className="code-snippet">
          <pre>
{`git clone https://github.com/your-username/react-node-lite.git
cd react-node-lite
npm install
npm run dev`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function PhilosophyContent() {
  return (
    <div className="doc-content">
      <h2>Design Philosophy</h2>
      
      <p>React+Node.JS Lite is built on principles that emphasize simplicity, maintainability, and AI compatibility.</p>
      
      <div className="doc-principles">
        <div className="doc-principle">
          <h3>Minimalist Approach</h3>
          <p>We embrace minimalism not just for aesthetics, but for practical benefits:</p>
          <ul>
            <li><strong>Reduced complexity</strong> - Fewer components and dependencies mean fewer bugs and easier debugging</li>
            <li><strong>Better performance</strong> - Smaller bundle sizes lead to faster load times</li>
            <li><strong>Easier maintenance</strong> - Simpler code is easier to update and maintain</li>
          </ul>
        </div>
        
        <div className="doc-principle">
          <h3>AI-First Development</h3>
          <p>Our codebase is specifically optimized for AI interaction:</p>
          <ul>
            <li><strong>Well-indexed structure</strong> - Logical file organization that AI can navigate efficiently</li>
            <li><strong>Consistent patterns</strong> - Predictable code patterns make it easier for AI to understand and generate compatible code</li>
            <li><strong>Comprehensive documentation</strong> - Clear comments and documentation help AI understand the purpose and behavior of code</li>
          </ul>
        </div>
        
        <div className="doc-principle">
          <h3>Convention Over Configuration</h3>
          <p>We reduce cognitive load by establishing clear conventions:</p>
          <ul>
            <li><strong>Standardized project structure</strong> - Consistent file organization across projects</li>
            <li><strong>Naming conventions</strong> - Clear, predictable naming patterns</li>
            <li><strong>Minimal configuration</strong> - Sensible defaults that work out of the box</li>
          </ul>
        </div>
      </div>
      
      <div className="doc-quote">
        <blockquote>
          "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
          <cite>— Antoine de Saint-Exupéry</cite>
        </blockquote>
      </div>
    </div>
  );
}

function ReactLiteContent() {
  return (
    <div className="doc-content">
      <h2>React Lite Documentation</h2>
      
      <p>React_Lite is a minimalist approach to React development that maintains standard React patterns while keeping the codebase lightweight and efficient.</p>
      
      <div className="doc-section">
        <h3>Base Structure</h3>
        <div className="code-snippet">
          <pre>
{`frontend/
├── public/
│   └── index.html    // HTML entry point
├── src/
│   ├── components.js // All components in a single file
│   ├── index.js      // App initialization
│   ├── index.css     // Styling
│   ├── state.js      // State management
│   └── utils.js      // Utility functions
└── .env              // Environment variables`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>App Initialization</h3>
        <div className="code-snippet">
          <pre>
{`// src/index.js - Standard React initialization
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Component Architecture</h3>
        <p>In React_Lite, we use functional components with hooks for state management:</p>
        <div className="code-snippet">
          <pre>
{`// src/components.js - Component architecture
import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Fetch data from backend when available
    if (process.env.REACT_APP_API_URL) {
      fetch(\`\${process.env.REACT_APP_API_URL}/data\`)
        .then(res => res.json())
        .then(data => setApiData(data))
        .catch(err => {});
    }
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div>Count: {count}</div>
        {apiData && <div>API Data: {JSON.stringify(apiData)}</div>}
        <div className="button-container">
          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>State Management</h3>
        <p>React_Lite includes a simple global state management solution:</p>
        <div className="code-snippet">
          <pre>
{`// src/state.js - Lightweight global state
import { useState, useEffect } from 'react';

let globalState = {
  count: 0,
  theme: 'light'
};

const listeners = [];

export function getState() {
  return globalState;
}

export function setState(newState) {
  globalState = {...globalState, ...newState};
  listeners.forEach(listener => listener(globalState));
}

export function useGlobalState() {
  const [state, setState] = useState(globalState);
  
  useEffect(() => {
    const handler = (newState) => setState(newState);
    listeners.push(handler);
    return () => {
      const index = listeners.indexOf(handler);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);
  
  return [state, setState];
}`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>API Interactions</h3>
        <p>Utility functions for API calls:</p>
        <div className="code-snippet">
          <pre>
{`// src/utils.js - API utilities
export async function fetchData(endpoint) {
  try {
    const response = await fetch(\`\${process.env.REACT_APP_API_URL}/\${endpoint}\`);
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function postData(endpoint, data) {
  try {
    const response = await fetch(\`\${process.env.REACT_APP_API_URL}/\${endpoint}\`, {
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
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function NodeLiteContent() {
  return (
    <div className="doc-content">
      <h2>Node Lite Documentation</h2>
      
      <p>Node_Lite is a minimalist Node.js implementation designed for efficient server-side JavaScript development. This framework provides a lightweight approach while maintaining essential functionality.</p>
      
      <div className="doc-section">
        <h3>Base Structure</h3>
        <div className="code-snippet">
          <pre>
{`backend/
├── app.js          // Main application entry point
├── modules/        // Feature modules
├── utils.js        // Shared utilities
└── .env            // Environment variables`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Minimalist Server Implementation</h3>
        <div className="code-snippet">
          <pre>
{`// app.js - Compact server implementation
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
  const routeKey = \`\${req.method}:\${parsedUrl.pathname}\`;
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
http.createServer(handleRequest).listen(PORT);`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Data Processing</h3>
        <div className="code-snippet">
          <pre>
{`// Inline data handlers
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
}`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Authentication (Simplified)</h3>
        <div className="code-snippet">
          <pre>
{`// Compact auth implementation
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
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function NetlifyContent() {
  return (
    <div className="doc-content">
      <h2>Netlify Serverless Functions</h2>
      
      <p>React+Node.JS Lite is optimized for deployment on Netlify, using serverless functions for backend logic. This approach eliminates the need for maintaining servers while providing powerful backend capabilities.</p>
      
      <div className="doc-section">
        <h3>Serverless Function Structure</h3>
        <p>Serverless functions are organized in the netlify/functions directory:</p>
        <div className="code-snippet">
          <pre>
{`netlify/
└── functions/
    ├── api.js       // Main API handler
    ├── auth.js      // Authentication functions
    ├── data.js      // Data management functions
    └── package.json // Function-specific dependencies`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Basic Function Structure</h3>
        <p>Each serverless function follows this pattern:</p>
        <div className="code-snippet">
          <pre>
{`// netlify/functions/api.js
exports.handler = async (event, context) => {
  // Set up CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };
  
  // Handle OPTIONS requests (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    // Route the request based on path
    const path = event.path.replace('/.netlify/functions/api', '');
    
    if (path === '/data' && event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Data from serverless function' })
      };
    }
    
    // Default response for unhandled routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: 'Not Found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Server Error' })
    };
  }
};`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Netlify Configuration</h3>
        <p>Configure Netlify using the netlify.toml file:</p>
        <div className="code-snippet">
          <pre>
{`# netlify.toml
[build]
  command = "cd frontend && npm run build"
  publish = "frontend/build"
  functions = "netlify/functions"

[dev]
  command = "cd frontend && npm start"
  publish = "frontend/public"
  port = 3000
  targetPort = 3000
  autoLaunch = true
  framework = "#custom"

# Redirects for React Router
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Redirect API calls to functions
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200`}
          </pre>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Connecting Frontend to Serverless Functions</h3>
        <p>Set up the environment variables to connect the frontend to your functions:</p>
        <div className="code-snippet">
          <pre>
{`# frontend/.env
REACT_APP_API_URL=/.netlify/functions
`}
          </pre>
        </div>
        
        <p>Then use these environment variables in your API calls:</p>
        <div className="code-snippet">
          <pre>
{`// Example API call
fetch(\`\${process.env.REACT_APP_API_URL}/api/data\`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function AIIntegrationContent() {
  return (
    <div className="doc-content">
      <h2>AI Integration & Compatibility</h2>
      
      <p>React+Node.JS Lite is specifically designed for optimal AI understanding and interaction. This architecture makes it easier for AI tools to comprehend, modify, and generate compatible code for your project.</p>
      
      <div className="doc-section">
        <h3>Why AI Compatibility Matters</h3>
        <p>Modern development increasingly relies on AI-powered tools for code generation, completion, and refactoring. An AI-friendly codebase provides several advantages:</p>
        <ul className="doc-list">
          <li><strong>Better code suggestions</strong> - AI can provide more accurate and contextually relevant code</li>
          <li><strong>Faster development</strong> - Reduce time spent explaining complex architectures to AI</li>
          <li><strong>More accurate refactoring</strong> - AI can better understand the implications of code changes</li>
          <li><strong>Improved documentation</strong> - AI can generate more useful documentation when it understands the codebase</li>
        </ul>
      </div>
      
      <div className="doc-section">
        <h3>AI-Friendly Features</h3>
        <div className="doc-features">
          <div className="doc-feature">
            <h4>Logical File Structure</h4>
            <p>Our files are organized with a clear, predictable structure that's easy for AI to navigate:</p>
            <ul>
              <li>Component-based organization</li>
              <li>Clear separation of concerns</li>
              <li>Predictable file naming patterns</li>
            </ul>
          </div>
          
          <div className="doc-feature">
            <h4>Well-Indexed Code</h4>
            <p>Our codebase is designed to be easily indexed and searched:</p>
            <ul>
              <li>Consistent function and variable naming</li>
              <li>Clear module boundaries</li>
              <li>Limited use of complex abstractions</li>
            </ul>
          </div>
          
          <div className="doc-feature">
            <h4>Minimalist Approach</h4>
            <p>We keep things simple and focused:</p>
            <ul>
              <li>Fewer dependencies to track</li>
              <li>Simplified component structure</li>
              <li>Clear patterns repeated throughout the codebase</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Working with AI Tools</h3>
        <p>To get the most out of AI tools with this template:</p>
        <ol className="doc-ordered-list">
          <li>
            <strong>Provide context</strong> - When asking AI to modify code, reference the specific file and describe its relationship to other components
          </li>
          <li>
            <strong>Follow existing patterns</strong> - Ask AI to follow the established patterns in the codebase
          </li>
          <li>
            <strong>Start simple</strong> - Begin with small, focused changes before attempting large refactors
          </li>
          <li>
            <strong>Leverage documentation</strong> - Point AI to the documentation when asking for new features
          </li>
        </ol>
      </div>
      
      <div className="doc-callout">
        <h3>Best Practices</h3>
        <p>For optimal AI collaboration, maintain these practices when extending the template:</p>
        <ul>
          <li>Keep components focused on a single responsibility</li>
          <li>Use clear, descriptive naming for functions and variables</li>
          <li>Add meaningful comments for complex logic</li>
          <li>Maintain consistent styling and formatting</li>
          <li>Document APIs and interfaces thoroughly</li>
        </ul>
      </div>
    </div>
  );
}

function CLIContent() {
  return (
    <div className="doc-content">
      <h2>CLI Commands</h2>
      
      <p>React+Node.JS Lite comes with several built-in commands to simplify development and deployment.</p>
      
      <div className="doc-section">
        <h3>Development Commands</h3>
        <div className="command-list">
          <div className="command-item">
            <div className="command-name">npm run dev</div>
            <div className="command-description">
              <p>Starts the development server with hot reloading. This launches both the React frontend and the Netlify dev environment for local function testing.</p>
            </div>
          </div>
          
          <div className="command-item">
            <div className="command-name">npm run build</div>
            <div className="command-description">
              <p>Builds the production-ready frontend bundle and prepares serverless functions for deployment.</p>
            </div>
          </div>
          
          <div className="command-item">
            <div className="command-name">npm run lint</div>
            <div className="command-description">
              <p>Runs linting checks across the codebase to ensure code quality and consistency.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Netlify-Specific Commands</h3>
        <div className="command-list">
          <div className="command-item">
            <div className="command-name">npx netlify-cli deploy</div>
            <div className="command-description">
              <p>Deploys your application to Netlify (requires Netlify CLI to be installed and authenticated).</p>
            </div>
          </div>
          
          <div className="command-item">
            <div className="command-name">npx netlify-cli functions:create</div>
            <div className="command-description">
              <p>Creates a new serverless function from a template, making it easy to extend your backend.</p>
            </div>
          </div>
          
          <div className="command-item">
            <div className="command-name">npx netlify-cli functions:invoke</div>
            <div className="command-description">
              <p>Tests a serverless function locally without making an HTTP request.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="doc-section">
        <h3>Custom Utility Commands</h3>
        <div className="command-list">
          <div className="command-item">
            <div className="command-name">npm run create:component [name]</div>
            <div className="command-description">
              <p>Creates a new component with the specified name, following the project's conventions.</p>
            </div>
          </div>
          
          <div className="command-item">
            <div className="command-name">npm run create:function [name]</div>
            <div className="command-description">
              <p>Creates a new serverless function with the specified name, including basic request handling.</p>
            </div>
          </div>
          
          <div className="command-item">
            <div className="command-name">npm run analyze</div>
            <div className="command-description">
              <p>Analyzes the bundle size to help identify and optimize large dependencies.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="doc-callout">
        <h3>Environment Setup</h3>
        <p>Before running these commands, make sure you have:</p>
        <ol>
          <li>Node.js 14+ installed</li>
          <li>npm or yarn package manager</li>
          <li>Netlify CLI installed globally (for deployment commands): <code>npm install -g netlify-cli</code></li>
        </ol>
      </div>
    </div>
  );
} 