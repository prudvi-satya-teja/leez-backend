const express = require("express");

const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/signup", customerController.signup);

router.get("/login", customerController.login);

module.exports = router;
