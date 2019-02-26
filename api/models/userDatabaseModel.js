'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
  stdId: String,
  firstname: String,
  lastname: String,
  faculty: String,
  telephone: String,
  img: ""
})

module.exports = mongoose.model('User', UserSchema)
