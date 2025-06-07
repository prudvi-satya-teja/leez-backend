const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
});

const Favourites = mongoose.model("favorites", favoriteSchema);

module.exports = Favourites;
