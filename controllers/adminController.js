const Driver = require('../models/driver');
const Order = require('../models/order');
const Admin = require('../models/admin');

const createAdmin = async (req, res) => {
  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    // Create a new admin
    const newAdmin = await Admin.create(req.body);

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
        createdAt: newAdmin.createdAt,
        updatedAt: newAdmin.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const verifyDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    
    const driver = await Driver.findByPk(driverId);

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Verifying Drivers account
    driver.isVerified = true;
    await driver.save();

    res.status(200).json({ message: 'Driver verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const acceptPackage = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'verified';
    await order.save();

    res.status(200).json({ message: 'Package verified/accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPackages = async (req, res) => {
  try {
    // to fetch all orders
    const packages = await Order.findAll({ attributes: ['id', 'status'] });

    res.status(200).json({ packages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    
    // Deleting Driver account
    await Driver.destroy({ where: { id: driverId } });

    res.status(200).json({ message: 'Driver removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  verifyDriver,
  acceptPackage,
  getAllPackages,
  removeDriver,
  createAdmin,
//   updatePackageAcceptance,
};
