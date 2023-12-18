const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./db/db');
const Admin = require('./models/admin');
const User = require('./models/user');
const Driver = require('./models/driver');
const Order = require('./models/order');
const userRouter = require('./routes/userRoutes');
const driverRouter = require('./routes/driverRoutes');
const adminRouter = require('./routes/adminRoutes');


const app = express();

// Middleware
app.use(bodyParser.json());

// 
  
  
  

// Routes
app.use('/api/user', userRouter);
app.use('/api/driver', driverRouter);
app.use('/api/admin', adminRouter);

// Sync models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Models synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing models with the database:', error);
  });

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
