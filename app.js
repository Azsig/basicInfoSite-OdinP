const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper function to serve files
function serveFile(filePath, contentType, response) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('500 - Internal Server Error');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/index.html') {
        serveFile(path.join(__dirname, 'index.html'), 'text/html', res);
    } else if (url === '/about') {
        serveFile(path.join(__dirname, 'about.html'), 'text/html', res);
    } else if (url === '/contact-me') {
        serveFile(path.join(__dirname, 'contact-me.html'), 'text/html', res);
    } else {
        serveFile(path.join(__dirname, '404.html'), 'text/html', res);
    }
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});