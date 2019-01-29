'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
  name: String,
  stdID: String,
  tel: String
})


var ItemsSchema = new Schema ({
  title: String,
  price: Number,
  qty: Number,
  note: String
})

module.exports = mongoose.model('User', UserSchema)
