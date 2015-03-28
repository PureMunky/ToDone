var express = require('express'),
  todo = require('./server/todo/todoRoute.js'),
  tag = require('./server/tag/tagRoute.js'),
  user = require('./server/user/userRoute.js'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./server/config.js')['PRIMARY'];

var app = express();
app.use(bodyParser.json());
app.use('/todo', todo);
app.use('/tag', tag);
app.use('/user', user);
app.use(express.static(__dirname));

app.listen(1337);
console.log('web server listening');

mongoose.connect(config.db.conn, function (err) {
  if (err) {
    console.log('db connection error', err);
  } else {
    console.log('db connection successful');
  }
});