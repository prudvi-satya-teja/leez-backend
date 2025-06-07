const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "owners" },
    name: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    price: { type: Number },
    availbility_status: { type: Boolean },
    descritpion: { type: String },
    views: { type: Number },
    images: [{ type: String }],
    location: {
        type: { String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
    },
    count: { type: Number },
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
