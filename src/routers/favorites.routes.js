const express = require("express");

const router = express.Router();

const { addToFavorite } = require("../controllers/favorites.controller");

// add to favorites
router.post("/add-to-favorite", addToFavorite);

// remove from the favorites
// router.post("/remove-from-favorite", removeFromFavorite);

module.exports = router;
