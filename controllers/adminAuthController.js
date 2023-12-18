// adminAuthController.js
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin by username
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ adminId: admin.id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { adminLogin };
