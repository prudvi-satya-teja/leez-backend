const express = require("express");

const router = express.Router();
const customerController = require("../controllers/customer.controller");

// image
const { upload } = require("../utils/storage");

//signup
router.post("/signup", customerController.signup);
//login
router.post("/login", customerController.login);

//verify-otp
router.post("/verify-otp", customerController.verifyOtp);

//create-account
router.post("/create-account", customerController.createAccount);

//get-customer-details
router.get("/get-customer-details/:id",customerController.customer_details);

//update image


module.exports = router;
