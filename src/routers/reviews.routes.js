const express = require("express");

const router = express.Router();

const { giveReview } = require("../controllers/reviews.controller");

// images

router.post("/give-review", giveReview);

module.exports = router;
