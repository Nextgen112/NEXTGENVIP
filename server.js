const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the list of allowed IPs
const allowedIps = [
  '62.201.240.35', '62.201.243.131', '185.244.153.5',
  '216.144.248.25', '216.144.248.23', '216.144.248.21',
  '185.244.153.5', '31.18.96.242', '00.106.205.46'
];

// Create the server
const server = http.createServer((req, res) => {
  const clientIp = req.connection.remoteAddress;

  // Check if the client's IP is allowed
  if (!allowedIps.includes(clientIp)) {
    res.statusCode = 403;  // Forbidden
    res.end('Access Denied');
    return;
  }

  // Serve the WarCommander.js file as JavaScript
  if (req.url === '/WarCommander.js') {
    const filePath = path.join(__dirname, 'WarCommander.js');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500; // Internal Server Error
        res.end('Error reading WarCommander.js');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/javascript');
      res.end(data); // Send the file content
    });
  } else {
    // For all other requests, show a default message
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('WarCommander server is running!');
  }
});

// Set the server to listen on a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
