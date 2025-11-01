function parseQuery(url) {
  if (!url.includes('?')) return {};
  
  const params = {};
  const queryString = url.split('?')[1];
  
  queryString.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value || '');
  });
  
  return params;
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function formatResponse(data) {
  return { data, timestamp: Date.now() };
}

module.exports = {
  parseQuery,
  generateId,
  formatResponse
}; 