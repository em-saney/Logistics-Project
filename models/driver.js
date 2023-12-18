const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');


const Driver = sequelize.define('Driver', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Driver.associate = (models) => {
  Driver.hasMany(models.Order);
};


// Hooks (Before Create)
Driver.beforeCreate(async (driver) => {
  const salt = await bcrypt.genSalt(10);
  driver.password = await bcrypt.hash(driver.password, salt);
});

Driver.destroyDriver = async (driverId) => {
  await Driver.destroy({
    where: { id: driverId },
  });
};

module.exports = Driver;
