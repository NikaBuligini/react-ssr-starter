import path from 'path';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import favicon from 'serve-favicon';

import routes from './router';
import createDevelopmentProxy from './serverUtils/createDevelopmentProxy';
import startServer from './serverUtils/startServer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = express();
const server = http.createServer(app);

app.use(compression());
app.use(favicon(path.resolve(__dirname, '../../public/favicon.ico')));

if (isDevelopment) {
  createDevelopmentProxy(app);
} else {
  app.use(helmet());

  app.set('trust proxy', 1);

  app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));
}

app.use(cookieParser('super secret'));

app.use('/', routes);

startServer(server);
