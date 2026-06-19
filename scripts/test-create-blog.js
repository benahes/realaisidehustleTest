const http = require('http');

const data = JSON.stringify({
  title: 'Test Post',
  slug: 'test-post-' + Date.now(),
  excerpt: 'A test excerpt',
  content: '# Hello\nThis is a test.',
  category: 'AI',
  tags: ['test'],
  published: false,
  aiGenerated: false
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/blog/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
}, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => console.error('Request error:', e.message));
req.write(data);
req.end();
