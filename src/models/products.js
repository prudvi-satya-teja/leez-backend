const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "owners", required: true },
        name: { type: String, required: true },
        category_id: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
        price: { type: Number, required: true },
        availbility_status: { type: Boolean },
        descritpion: { type: String },
        views: { type: Number, default: 0 },
        images: [{ type: String }],
        location: {
            type: { String, enum: ["Point"], required: true },
            coordinates: { type: [Number], required: true },
        },
        count: { type: Number, default: 1 },
    },
    {
        timestamps: true,
    }
);

const Products = mongoose.model("products", productSchema);

module.exports = Products;
