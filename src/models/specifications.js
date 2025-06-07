const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    name: { type: String },
});

const Specifications = mongoose.model("specifications", specificationSchema);

module.exports = Specifications;
