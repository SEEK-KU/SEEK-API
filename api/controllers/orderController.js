'use struct';

var mongoose = require('mongoose'),
  Order = mongoose.model('Order');
  User = mongoose.model('User');

exports.getOrderByStatus = function(req, res) {
  Order.find({status: req.params.status}, function(err, order) {
    if (err)
      res.send(err)
    res.json(order)
  })
}

exports.getOrderInfo = async function(req, res) {
  var orderDetail = {
    orderInfo: {},
    requester: {},
    deliver: {}
  }
  await Order.findOne({_id: req.params.orderID}, function(err, order) {
    if (err)
      res.send(err)
    orderDetail.orderInfo = order
    
  })

  await User.find({stdID: orderDetail.orderInfo.requesterID}, function(err, user) {
    if (err) {
      res.send(err)
    }  
    orderDetail.requester = user
    console.log(orderDetail.orderInfo.requesterID)
  })

  await User.find({stdID: orderDetail.orderInfo.deliverID}, function(err, user) {
    if (err) {
      res.send(err)
    }  
    orderDetail.deliver = user
  })

  res.json(orderDetail)
}

exports.createNewOrder = function(req, res) {
  var newOrder = new Order(req.body);
  newOrder.save(function(err, order) {
    if(err)
      res.send(err);
    res.json(order);  
  })
}