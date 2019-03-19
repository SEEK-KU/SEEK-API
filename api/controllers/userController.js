'use struct';
var axios = require('axios')
var FormData = require('form-data')
var request = require('request')
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

exports.getAuthen = async function(req, res) {
  var form = new FormData();
  form.append("login", "b5810545866");
  form.append("password", "12324534"); //OUTPUT: failed

  // axios.post('https://tqf.cpe.ku.ac.th/authen/', mu)
  // .then(function (response) {
  //   res.json(response.statusText)
  //   console.log("THEN >>>>> ");
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  await axios({
    method:'POST',
    url:'https://tqf.cpe.ku.ac.th/authen/',
    formData: form,
    data: form
  })
  .then(function (response) {
      // res.json(response)
      console.log(response)
  });



}
