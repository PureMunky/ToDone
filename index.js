var express = require('express'),
  todo = require('./server/todo/todoRoute.js'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todoApp', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var app = express();

app.use('/todo', todo);
app.use(express.static(__dirname));

app.listen(1337);