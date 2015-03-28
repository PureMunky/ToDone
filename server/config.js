'use strict';

var config = {};

config['PRIMARY'] = {};
config['PRIMARY'].db = {};
config['PRIMARY'].db.conn = 'mongodb://localhost/todoAppDev';

config['TEST'] = {};
config['TEST'].db = {};
config['TEST'].db.conn = 'mongodb://localhost/todoAppTest';

module.exports = config;