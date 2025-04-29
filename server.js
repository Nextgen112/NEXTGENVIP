const http = require('http');
const fs = require('fs');
const path = require('path');

// Only these IPs can access WarCommander.js
const allowedIps = [
  '62.201.240.35',
  '62.201.243.131',
  '185.244.153.5',
  '216.144.248.25',
  '216.144.248.23',
  '216.144.248.21',
  '31.18.96.242',
  '00.106.205.46'
];

const server = http.createServer((req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const cleanIp = ip.replace(/^.*:/, ''); // handle IPv6/IPv4 mix

  if (!allowedIps.includes(cleanIp)) {
    res.statusCode = 403;
    res.end('Forbidden: Your IP is not allowed.');
    return;
  }

  if (req.url === '/WarCommander.js') {
    const filePath = path.join(__dirname, 'WarCommander.js');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/javascript');
      res.end(data);
    });
  } else {
    res.statusCode = 200;
    res.end('Server is running');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
