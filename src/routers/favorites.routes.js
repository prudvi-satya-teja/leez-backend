const express = require("express");

const router = express.Router();

const { addToFavorite, removeFromFavorite } = require("../controllers/favorites.controller");

// add to favorites
router.post("/add-to-favorite", addToFavorite);

// remove from the favorites
router.post("/remove-from-favorite", removeFromFavorite);

//get favorite products by userId
// router.get("/get-favorite-products", getFavoriteProducts);

module.exports = router;
