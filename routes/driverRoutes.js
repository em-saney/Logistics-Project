const express = require('express');
const driverRouter = express.Router();
const driverController = require('../controllers/driverController');
const { authenticateDriver } = require('../middleware/authMiddleware');

driverRouter.post('/create', driverController.createDriver);
driverRouter.post('/login', driverController.loginDriver);
driverRouter.get('/packages/:driverId', driverController.viewPackages);
driverRouter.patch('/update-status/:orderId',driverController.updatePackageStatus);

module.exports = driverRouter;
