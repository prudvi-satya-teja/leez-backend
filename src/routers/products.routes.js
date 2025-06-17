const express = require("express");

const router = express.Router();

const {addProduct} = require("../controllers/products.controller");

// images

router.post("/add-product", addProduct);

module.exports = router;