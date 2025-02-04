import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import { readFileSync } from 'fs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync('./localhost-key.pem'),
  cert: readFileSync('./localhost.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl).then((r) => {
      if (r) {
        console.log(r);
      }
    });
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Next.js running on https://localhost:3000');
  });
});
