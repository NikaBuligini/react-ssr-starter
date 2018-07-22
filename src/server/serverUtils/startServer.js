import Loadable from 'react-loadable';
import logger from './logger';

export default server => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 8000;

  Loadable.preloadAll().then(() => {
    server.listen(port, host, error => {
      if (error) {
        logger.error(error);
      } else {
        logger.appStarted(port, host);
      }
    });
  });
};
