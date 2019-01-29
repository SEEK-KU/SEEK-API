'use struct';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.getAllUsers = function(req, res) {
  var x = User.find({}, function(err, user) {
    if (err)
      res.send(err)
      console.log(">>>>>>" + typeof user)
      var obj2 = {
        user: user,
        order: user
      }
    res.json(obj2)
  })
}

exports.createNewUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if(err)
      res,send(err);
    res.json(user);  
  })
}

exports.getUserByID = function(req, res) {
  User.find({stdID: req.params.stdID}, function(err, user) {
    if(err)
      res.send(err)
    res.json(user)
  })
}
