const express = require("express");

const router = express.Router();

const { addProduct } = require("../controllers/products.controller");

// images
const { upload } = require("../utils/storage");

// add-product
router.post("/add-product", upload.array("images", 6), addProduct);

// update-product

// delete-prodcut

module.exports = router;
