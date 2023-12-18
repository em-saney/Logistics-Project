const Driver = require('../models/driver');
const Order = require('../models/order');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const createDriver = async (req, res) => {
  try {
    const { email, username, password, licenseNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = await Driver.create({
      id: uuidv4(),
      email,
      username,
      licenseNumber,
      password: hashedPassword,
    });

    res.status(201).json({ driverId: newDriver.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ where: { email } });

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, driver.password);

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

const viewPackages = async (req, res) => {
  try {
    const { driverId } = req.params;

    // Retrieve orders assigned to the driver
    const orders = await Order.findAll({
      where: { driverId },
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePackageStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createDriver,
  loginDriver,
  viewPackages,
  updatePackageStatus,
};
