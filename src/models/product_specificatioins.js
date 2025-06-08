const mongoose = require("mongoose");

const productSpecificationSchema = new mongoose.Schema({
    specification_id: { type: mongoose.Schema.Types.ObjectId, ref: "specifications", required: true },
    value: { type: String, required: true},
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
});

const ProductSpecifications = mongoose.model("products", productSpecificationSchema);

module.exports = ProductSpecifications;
