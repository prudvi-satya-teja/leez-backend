const mongoose = require("mongoose");

const productSpecificationSchema = new mongoose.Schema({
    specification_id: { type: mongoose.Schema.Types.ObjectId, ref: "specifications" },
    value: { type: String },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
});

const ProductSpecifications = mongoose.model("products", productSpecificationSchema);

module.exports = productSpecificationSchema;
