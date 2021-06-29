const express = require("express");
const CustomerController = require('../controller/customerController')
const userController = require('../controller/userController')

const router = express.Router();

router.get('/', userController.protect,CustomerController.getAllCustomer);  
router.post('/', userController.protect, CustomerController.createNewCustomer);
router.get("/:id", userController.protect, CustomerController.getCustomerById);  
router.patch("/:id", userController.protect, CustomerController.editCustomer); 
router.delete("/:id", userController.protect,CustomerController.deleteCustomer); 
router.patch("/status/:id", userController.protect, CustomerController.changeStatus); 


module.exports = router;