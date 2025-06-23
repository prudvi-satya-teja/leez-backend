const express = require("express");

const router = express.Router();

const { giveReview, getReview } = require("../controllers/reviews.controller");

// images
const { upload } = require("../utils/storage");

//give-review
router.post("/give-review", giveReview);

//get-review by product id
// router.get("/get-reviews/:productId", getReview);

module.exports = router;
