const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String },
    phone_no: { type: String, match: [/^\d{10}$/, "Phone number must be exactly 10 digits"] },
    email: { type: String },
    password: { type: String },
    photo: { type: String },
});

const Customers = mongoose.model("customers", customerSchema);

module.exports = Customers;
