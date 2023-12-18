const User = require('../models/user'); 
const Order = require('../models/order');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const createUser = async (req, res) => {
  try {
    const { email, username, password, phone_number } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      id: uuidv4(),
      email,
      username,
      password: hashedPassword,
      phone_number
        });

    res.status(201).json({ userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { userId, pickupLocation, deliveryLocation, packageDescription, } = req.body;

    // Check if the user with the provided userId exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the order and associate it with the user
    const newOrder = await Order.create({
      packageDescription,
      pickupLocation,
      deliveryLocation,
      UserId: userId,
    });

    res.status(201).json({ orderId: newOrder.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const trackPackage = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ orderStatus: order.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const markDeliverySuccess = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'delivered';
    await order.save();

    res.status(200).json({ message: 'Delivery marked as successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const markDeliveryFailed = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'failed';
    await order.save();

    res.status(200).json({ message: 'Delivery marked as failed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const leaveReview = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { rating, comment } = req.body;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

   
    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createUser,
  loginUser,
  placeOrder,
  trackPackage,
  markDeliverySuccess,
  markDeliveryFailed,
  leaveReview,
};
