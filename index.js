var express = require('express'),
  todo = require('./server/todo/todoRoute.js'),
  tag = require('./server/tag/tagRoute.js'),
  user = require('./server/user/userRoute.js'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./server/config.js');

var app = express();
app.use(bodyParser.json());
app.use('/todo', todo);
app.use('/tag', tag);
app.use('/user', user);
app.use(express.static(__dirname + '/app'));

// Start listening at a particular port
app.listen(config.web.port);
console.log('web server listening on port ' + config.web.port);

mongoose.connect(config.db.conn, function (err) {
  if (err) {
    console.log('db connection error', err);
  } else {
    console.log('db connection successful');
  }
});