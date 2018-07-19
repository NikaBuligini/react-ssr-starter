import path from 'path';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import compression from 'compression';
import favicon from 'serve-favicon';
import routes from './router';
import createDevelopmentProxy from './serverUtils/createDevelopmentProxy';
import logger from './serverUtils/logger';

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = express();
const server = http.createServer(app);

app.use(compression()); // to compress each response
// app.use(favicon(path.resolve(__dirname, '../../public/favicon.ico')));

const sessionConfig = {
  name: 'eSession',
  secret: 'super secret', // better be the same as cookie-parser
  resave: false, // to avoid alter at parallel request
  cookie: {},
};

if (isDevelopment) {
  createDevelopmentProxy(app);
} else {
  app.use(helmet());

  app.set('trust proxy', 1);
  sessionConfig.cookie.secure = true;

  app.use(express.static('/assets', path.join(__dirname, '../client/assets')));
}

app.use(cookieParser('super secret')); // better be the same as express-session
app.use(session(sessionConfig));

app.use('/', routes);

// Get the intended host and port number, use localhost and port 8000 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const port = process.env.PORT || 8000;

server.listen(port, host, error => {
  if (error) {
    logger.error(error);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
