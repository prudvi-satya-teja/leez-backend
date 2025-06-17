const express = require("express");

const router = express.Router();

const vendorController = require("../controllers/vendor.controller");

// image

router.post("/signup", vendorController.signup);

router.post("/login", vendorController.login);

router.post("/verify-otp", vendorController.verifyOtp);

router.post("/create-account", vendorController.createAccount);

module.exports = router;


