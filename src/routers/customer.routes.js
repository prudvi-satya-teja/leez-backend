const express = require("express");

const router = express.Router();
const customerController = require("../controllers/customer.controller");

// image

router.post("/signup", customerController.signup);

router.post("/login", customerController.login);

router.post("/verify-otp", customerController.verifyOtp);

router.post("/create-account", customerController.createAccount);

module.exports = router;
