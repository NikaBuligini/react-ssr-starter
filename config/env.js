const dotenvVars = require('dotenv').config().parsed;

const desiredVars = ['NODE_ENV', 'PUBLIC_URL'];

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

function getClientEnvironment() {
  const raw = Object.keys(dotenvVars || {}).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    desiredVars.reduce((env, key) => {
      env[key] = process.env[key] || '';
      return env;
    }, {}),
  );

  const parseForDefinePlugin = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      if (key === 'NODE_ENV') {
        env[key] = JSON.stringify(raw[key]);
      } else {
        env[key] = `process.env.${key}`;
      }
      return env;
    }, {}),
  };

  return { raw, parseForDefinePlugin };
}

module.exports = getClientEnvironment;
