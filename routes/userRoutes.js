const express = require('express');
const UserController = require('../controllers/userController');

const userRouter = express.Router();

// User registration
userRouter.post('/register', UserController.createUser);

// User login
userRouter.post('/login', UserController.loginUser);

// Place an order
userRouter.post('/place-order', UserController.placeOrder);

// Track a package
userRouter.get('/track-package/:orderId', UserController.trackPackage);

// Mark delivery as successful
userRouter.put('/mark-delivery-success/:orderId', UserController.markDeliverySuccess);

// Mark delivery as failed
userRouter.put('/mark-delivery-failed/:orderId', UserController.markDeliveryFailed);

// Leave a review for a package
userRouter.post('/leave-review/:orderId', UserController.leaveReview);

module.exports = userRouter;
