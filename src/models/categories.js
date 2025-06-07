const mongoose = require("mongoose");

const categorySchmea = new mongoose.Schmea({
    name: { type: String },
});

const Categories = mongoose.model("categories", categorySchmea);

module.exports = Categories;
