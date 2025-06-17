const express = require("express");

const router = express.Router();

const { bookAnItem } = require("../controllers/booking.controller");

router.post("/book-an-item", bookAnItem);

module.exports = router;


