const express = require("express");
const editHistroyController = require("../controller/editHistoryController");
const userController = require("../controller/userController");

const router = express.Router();

router.get('/:id',userController.protect,editHistroyController.getUserWhoedit)

module.exports = router;



