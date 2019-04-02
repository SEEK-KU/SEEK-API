'use struct';

var mongoose = require('mongoose'),
  Order = mongoose.model('Order');
  User = mongoose.model('User');

//Find order by status
exports.getOrderByStatus = function(req, res) {
  Order.find({status: req.params.status}, function(err, order) {
    if (err)
      res.send(err)
    res.json(order)
  })

}
exports.getNewfeed = async function(req, res) {
  var activeOrder = await Order.find({status: 'Active'}, function(err, order) {
    if (err)
      res.send(err) 
  }).sort({createAt: 'desc'})
  
  var feed = []
  for(var i=0; i< activeOrder.length; i++) {
    var userInfo
    var orderTemplate = {
      requester: {},
      _id: activeOrder[i]._id,
      title: activeOrder[i].title,
      location: activeOrder[i].location,
      storeName: activeOrder[i].storeName,
      shippingPoint: activeOrder[i].shippingPoint,
      itemList: activeOrder[i].itemList,
      createAt: activeOrder[i].createAt,
      tip: activeOrder[i].tip
    }
    orderTemplate.requester = await User.findOne({stdId: activeOrder[i].requesterId}, 'firstname lastname', function(err, user) {
      if(err)
        res.send(err)
    })

    feed.push(orderTemplate)

  }
  console.log(feed)
  res.json(feed)

}

//Find order info by postId
exports.getOrderInfo = async function(req, res) {
  var orderDetail = {
    orderInfo: {},
    requester: {},
    deliver: {}
  }
  await Order.findOne({_id: req.params.orderId}, function(err, order) {
    if (err)
      res.send(err)
    orderDetail.orderInfo = order
    
  })

  await User.findOne({userId: orderDetail.orderInfo.requesterId}, function(err, user) {
    if (err) {
      res.send(err)
    }  
    orderDetail.requester = user
    console.log(orderDetail.orderInfo.requesterId)
  })

  await User.findOne({userId: orderDetail.orderInfo.deliverId}, function(err, user) {
    if (err) {
      res.send(err)
    }  
    orderDetail.deliver = user
  })

  res.json(orderDetail)
}

//Create new order
exports.createNewOrder = async function(req, res) {
  var postId
  var newOrder = new Order(req.body);
  await newOrder.save(function(err, order) {
    if(err)
      res.send(err)
    res.json(order)
  })
}

//Update order
exports.updateOrderInfo = function(req, res) {
  Order.update({_id: req.params.orderId}, req.body, function (err, order) {
    if(err)
      res.send(err)
    res.send("Order Updated!")
  })
}

exports.deleteOrderById = function(req, res) {
  Order.deleteOne({_id: req.params.orderId}, function(err, order) {
    if(err)
      res.send(err)
    res.send("Delete order sucess!")
  });
  // Order.deleteMany({status: 'Active'}, function(err, order) {
  //   if(err)
  //     res.send(err)
  //   res.send("Delete order sucess!")
  // });
}

exports.getHistory = async function(req, res) {
  if(req.params.requesterOrdeliverer == "requester") {
    await Order.find({requesterId: req.params.userId}, 'title createAt location shippingPoint itemList tips', function(err, order) {
      if(err)
        res.send(err)
      res.json(order)
    })
  }
  else if(req.params.requesterOrdeliverer == "deliverer") {
    await Order.find({delivererId: req.params.userId}, 'title createAt location shippingPoint itemList tips', function(err, order) {
      if(err)
        res.send(err)
      res.json(order)
    })
  }

}