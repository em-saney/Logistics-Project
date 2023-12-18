const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const { v4: uuidv4 } = require('uuid');

   const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    packageDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  });   


  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Driver);
    

  };

  module.exports = Order

