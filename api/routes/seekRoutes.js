'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');
  var orderController = require('../controllers/orderController');
  //newfeed(active order)
  //user info(user, requester order, deliver order)
  //order info - requester (requester user, order, item)
  //           - deliver
  //history - 

  app.route('/users')
    .get(userController.getAllUsers)
    .post(userController.createNewUser);

  app.route('/users/:stdID')
    .get(userController.getUserByID)
    // .put(usersController.updateUserInfo)
    // .delete(usersController.deleteUser)

  app.route('/order')
  .post(orderController.createNewOrder) 

  app.route('/order/status/:status')
    .get(orderController.getOrderByStatus)

  app.route('/order/info/:orderID')
    .get(orderController.getOrderInfo)



  // app.route('/order/:orderID')
  //   .get(orderController.getOrderDetail)
}