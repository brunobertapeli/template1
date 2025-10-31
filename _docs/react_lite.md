React_Lite Documentation
Core Philosophy
React_Lite is a minimalist approach to React development that maintains standard React patterns while keeping the codebase lightweight and efficient.
Base Structure
frontend/
├── public/
│   └── index.html    // HTML entry point
├── src/
│   ├── components.js // All components in a single file
│   ├── index.js      // App initialization
│   ├── index.css     // Styling
│   ├── state.js      // State management
│   └── utils.js      // Utility functions
└── .env              // Environment variables

App Initialization
// src/index.js - Standard React initialization
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

Component Definition
// src/components.js - Component architecture
import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Fetch data from backend when available
    if (process.env.REACT_APP_API_URL) {
      fetch(`${process.env.REACT_APP_API_URL}/data`)
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
}

function Header() {
  return (
    <header className="header">
      <h1>React Node Lite App</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Footer content</p>
    </footer>
  );
}

State Management
// src/state.js - Lightweight global state
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
}

API Interactions
// src/utils.js - API utilities
export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`);
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
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

Styling
/* src/index.css - Minimalist styling */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #f5f5f5;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #e0e0e0;
}

button {
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

Environment Configuration
// .env
REACT_APP_API_URL=http://localhost:3001/api
