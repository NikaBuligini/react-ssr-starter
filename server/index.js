require('babel-core/register')({
  plugins: ['syntax-dynamic-import'],
});

const os = require('os');
const cluster = require('cluster');
const Loadable = require('react-loadable');
const log = require('npmlog');
const app = require('./app').default;

const PORT = process.env.PORT || 5000;

if (cluster.isMaster) {
  log.info('CLUSTER :', `Master PID is ${process.pid}`);

  os.cpus().forEach(() => cluster.fork());

  cluster.on('exit', worker => {
    log.warn('CLUSTER: ', `Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  Loadable.preloadAll().then(() => {
    app.listen(PORT, error => {
      if (error) {
        return log.error('SERVER: ', error);
      }

      log.info(
        'SERVER: ',
        `Server running on port ${PORT} - WORKER PID: ${cluster.worker.process.pid}`,
      );
    });
  });
}
