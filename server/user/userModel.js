'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  Name: {
    First: String,
    Last: String
  },
  Email: String,
  Keys: [{ type: Schema.Types.ObjectId, ref: 'Key' }]
});

module.exports = mongoose.model('User', UserSchema);