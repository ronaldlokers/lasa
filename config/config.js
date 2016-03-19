var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'läsa'
    },
    port: 3000,
    db: 'mongodb://localhost/läsa-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'läsa'
    },
    port: 3000,
    db: 'mongodb://localhost/läsa-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'läsa'
    },
    port: 3000,
    db: 'mongodb://localhost/läsa-production'
  }
};

module.exports = config[env];
