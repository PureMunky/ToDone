'use strict';

var config = {};

config = {
  db: {
    conn: process.env.MONGODB_URL || 'mongodb://localhost/todoApp'
  },
  web: {
    port: process.env.PORT,
    IP: process.env.IP
  }
};

module.exports = config;