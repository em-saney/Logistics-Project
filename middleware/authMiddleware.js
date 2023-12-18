const jwt = require('jsonwebtoken');
const crypto = require('crypto');  
const Admin = require('../models/admin');  

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const admin = await Admin.findByPk(decoded.adminId);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid admin' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  authenticateAdmin,
  secretKey, 
};
