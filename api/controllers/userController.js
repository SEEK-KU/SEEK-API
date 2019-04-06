'use struct';
var axios = require('axios')
var FormData = require('form-data')
var request = require('request')
var mongoose = require('mongoose'),
  User = mongoose.model('User');

var jwt = require('jsonwebtoken')

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
  User.findOne({stdId: req.params.userId}, 'firstname lastname faculty stdId telephone img', function(err, user) {
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
exports.deleteUserById = async function(req, res) {
  var verifyToken = await jwt.verify(req.body.token, 'seeklovelyshopping', function(err, decoded) {
    if (err) {
      res.send(err)
    }
      return decoded
  });
  console.log(verifyToken.stdId)

  User.deleteOne({stdId: verifyToken.stdId}, function(err, user) {
    if(err)
      res.send(err)
    res.send("Delete user sucess!")
  });
}

exports.updateUserInfo = async function(req, res) {
  var verifyToken = await jwt.verify(req.body.token, 'seeklovelyshopping', function(err, decoded) {
    if (err) {
      res.send(err)
    }
      return decoded
  });
  console.log(verifyToken.stdId)

  User.update({stdId: verifyToken.stdId}, req.body.userInfo , function(err, user) {
    if(err)
      res.send(err);
    res.send("User Updated!");
  })
}

exports.getAuthen = async function(req, res) {
  var form = new FormData();
  form.append("login", req.body.username);
  form.append("password", req.body.password); //OUTPUT: failed

  var checkAccount = "FAILED"
  await axios({
    method:'POST',
    url:'https://tqf.cpe.ku.ac.th/authen/',
    headers: { 'Content-Type': form.getHeaders()['content-type'] },
    data: form
  })
  .then(function (response) {
      checkAccount = response.data
      console.log("Login Status: " + response.data)
      res.json(response.data)
  });
}

exports.loginByNontri = async function(req, res) {
  //1) check correct NotriAccount
  var form = new FormData();
  form.append("login", req.body.username);
  form.append("password", req.body.password); //OUTPUT: failed

  var checkAccount = await axios({
    method:'POST',
    url:'https://tqf.cpe.ku.ac.th/authen/',
    headers: { 'Content-Type': form.getHeaders()['content-type'] },
    data: form
  })
  .then(function (response) {
    return response.data
  });
  
  if (checkAccount == 'OK') {
    //2. Generate Token
    var token = jwt.sign({ stdId: req.body.userId}, 'seeklovelyshopping')
    console.log(token)

    //3) find user in database
    var userInfo =  await User.findOne({stdId: req.body.userId}, 'firstname lastname faculty stdId telephone img', function(err, user) {
      if(err)
        res.send(err)
    })
    
    //4. Create returnData
    var returnData
    if(userInfo) {
      returnData = {
        token: token,
        isUpdateUserData: false
      }
    } else {
      //create new data
      var newUser = new User({
        stdId: req.body.userId,
        firstname: '',
        lastname: '',
        faculty: '',
        telephone: '',
        img: ''
      });
      await newUser.save(function(err, user) {
        if(err)
          res.send(err); 
        console.log(user)
      })
      returnData = {
        token: token,
        havetoSignup: true
      }
    }

    res.json(returnData)
  }
}

exports.getHistory = async function(req, res) {
  var verifyToken = await jwt.verify(req.body.token, 'seeklovelyshopping', function(err, decoded) {
    if (err) {
      res.send(err)
    }
      return decoded
  });
  console.log(verifyToken.stdId)

  if(req.body.historyType == "requester") {
    var returnHistory = await Order.find({requesterId: verifyToken.stdId}, 'title createAt location shippingPoint itemList tips', function(err, order) {
      if(err)
        res.send(err)
    }).sort({createAt: 'desc'})
    res.json(returnHistory)
  }
  else if(req.body.historyType == "deliverer") {
    var returnHistory = await Order.find({delivererId: verifyToken.stdId}, 'title createAt location shippingPoint itemList tips', function(err, order) {
      if(err)
        res.send(err)
    }).sort({createAt: 'desc'})
    res.json(returnHistory)
  }

}
