/** @flow */

import zlib from 'zlib';

export default (html: string, type: string, res: express$Response) => {
  zlib.gzip(html, (error, result) => {
    if (!error) {
      res.writeHead(200, {
        'Content-Length': result.length,
        'Content-Type': type,
        'Content-Encoding': 'gzip',
      });
      res.write(result);
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': type,
      });
      res.write(result);
      res.end();
    }
  });
};
