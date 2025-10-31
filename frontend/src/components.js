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
        .catch(err => {
          // Silent error handling
        });
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