const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true},
});

const Favourites = mongoose.model("favorites", favoriteSchema);

module.exports = Favourites;
