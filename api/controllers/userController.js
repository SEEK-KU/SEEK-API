'use struct';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

//Find all user
exports.getAllUsers = function(req, res) {
  var x = User.find({}, function(err, user) {
    if (err)
      res.send(err)
    res.json(user)
  })
}

//Find user by student Id
exports.getUserById = function(req, res) {
  User.findOne({stdId: req.params.userId}, 'firstname lastname', function(err, user) {
    if(err)
      res.send(err)
    res.json(user)
  })
}

//Create new user
exports.createNewUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if(err)
      res.send(err);
    res.json(user);  
  })
}

//Delete user
exports.deleteUserById = function(req, res) {
  User.deleteOne({stdId: req.params.userId}, function(err, user) {
    if(err)
      res.send(err)
    res.send("Delete user sucess!")
  });
}

exports.updateUserInfo = function(req, res) {
  User.update({stdId: req.params.userId}, req.body , function(err, user) {
    if(err)
      res.send(err);
    res.send("User Updated!");
  })
}


// MyModel.update({ age: { $gt: 18 } }, { oldEnough: true }, fn);
// MyModel.update({ name: 'Tobi' }, { ferret: true }, { multi: true }, function (err, raw) {
//   if (err) return handleError(err);
//   console.log('The raw response from Mongo was ', raw);
// });