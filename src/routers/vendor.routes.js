const express = require("express");

const router = express.Router();

const vendorController = require("../controllers/vendor.controller");

router.get("/signup", vendorController.signup);

router.get("/login", vendorController.login);

module.exports = router;
