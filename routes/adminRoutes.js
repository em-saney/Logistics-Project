const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuthController = require('../controllers/adminAuthController');

const adminRouter = express.Router();

adminRouter.post('/create-admin', adminController.createAdmin);
adminRouter.post('/login', adminAuthController.adminLogin);


adminRouter.patch('/verify-driver/:driverId', adminController.verifyDriver);
adminRouter.patch('/verify-package/:orderId', adminController.acceptPackage);
adminRouter.get('/all-packages', adminController.getAllPackages);
adminRouter.delete('/remove-driver/:driverId', adminController.removeDriver);
// adminRouter.patch('/update-package-acceptance', adminController.updatePackageAcceptance);

module.exports = adminRouter;
