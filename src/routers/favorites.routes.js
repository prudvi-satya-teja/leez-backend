const express = require("express");

const router = express.Router();

const { addToFavorite } = require("../controllers/favorites.controller");

router.post("/add-to-favorite", addToFavorite);

module.exports = router;
