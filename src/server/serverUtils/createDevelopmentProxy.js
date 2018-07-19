/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default app => {
  proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') {
      console.error('Proxy server error: ', error);
    }

    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }

    console.log('Could not connect to proxy, please try again...');
    const json = { error: 'proxy_error', reason: error.message };
    res.end(JSON.stringify(json));
  });

  app.all('/assets/*', (req, res) => {
    const filename = path.join(__dirname, 'assets', path.basename(req.url));

    if (fs.existsSync(filename)) {
      return res.sendFile(filename);
    }

    return proxy.web(req, res, { target: 'http://localhost:8080' });
  });
};
