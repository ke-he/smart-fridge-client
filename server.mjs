import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import { readFileSync } from 'fs';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000; // Change if needed

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Load SSL Certificates
const httpsOptions = {
  key: readFileSync('./localhost-key.pem'), // Path to private key
  cert: readFileSync('./localhost.pem'), // Path to certificate
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, () => {
    console.log(`🚀 Next.js running on https://${hostname}:${port}`);
  });
});
