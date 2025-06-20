const express = require("express");

const router = express.Router();

const { giveReview } = require("../controllers/reviews.controller");

// images
const { upload } = require("../utils/storage");

//give-review
router.post("/give-review", giveReview);

module.exports = router;
