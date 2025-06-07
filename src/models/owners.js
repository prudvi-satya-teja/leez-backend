const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    owner_name: { type: String },
    password: { type: String },
    phone_no: { type: String, match: [/^\d{10}$/, "Phone number must be exactly 10 digits"] },
    email: { type: String },
    photo: { type: String },
});

const Owners = mongoose.model("owners", ownerSchema);

module.exports = Owners;
