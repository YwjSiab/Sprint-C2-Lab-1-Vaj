// Import the built-in 'http' module
const http = require('http');

// Define a constant port number
const PORT = 3000;

// Define a timeout in milliseconds (5 seconds)
const REQUEST_TIMEOUT = 5000;

// Create request handler function
const requestHandler = (req, res) => {
  // Set headers for plain text response
  res.setHeader('Content-Type', 'text/plain');

  // Basic route handling
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200); // OK
    res.end('Welcome to the Node.js server!');
  } else {
    // Handle invalid routes
    res.writeHead(404); // Not Found
    res.end('404 - Page not found');
    console.error(`Invalid route requested: ${req.url}`);
  }
};

// Create the server using the request handler
const server = http.createServer((req, res) => {
  // Set a timeout handler for the request
  req.setTimeout(REQUEST_TIMEOUT, () => {
    console.error('Request timed out.');
    res.writeHead(408); // Request Timeout
    res.end('408 - Request timed out');
  });

  // Pass request to the handler
  requestHandler(req, res);
});

// Handle errors during server startup
server.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
});

// Start the server and log to console
server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});