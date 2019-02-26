'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');
  var orderController = require('../controllers/orderController');

  app.route('/user')
    .get(userController.getAllUsers)
    .post(userController.createNewUser);

  app.route('/user/:userId')
    .get(userController.getUserById)
    // .put(usersController.updateUserInfo)
    .delete(userController.deleteUserById)

  app.route('/order')
  .post(orderController.createNewOrder) 

  app.route('/order/status/:status')
    .get(orderController.getOrderByStatus)

  app.route('/order/:orderId')
    .get(orderController.getOrderInfo)
    .delete(orderController.deleteOrderById)
  
  app.route('/feed')
    .get(orderController.getNewfeed)

  app.route('/history/:userId/:requesterOrdeliver')
    .get(orderController.getHistory)
}