const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "owners", required: true },
        name: { type: String, required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
        price: { type: Number, required: true },
        availbilityStatus: { type: Boolean },
        description: { type: String },
        views: { type: Number, default: 0 },
        images: [String],
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        count: { type: Number, default: 1 },
        specifications: [
            {
                key: { type: String, required: true },
                value: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Products = mongoose.model("products", productSchema);

module.exports = Products;
