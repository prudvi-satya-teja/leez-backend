const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
    {
        owner_name: { type: String, required: true },
        password: { type: String },
        phone_no: {
            type: String,
            required: true,
        },
        email: { type: String, required: true },
        photo: { type: String },
    },
    {
        timestamps: true,
    }
);

const Vendor = mongoose.model("vendors", vendorSchema);

module.exports = Vendor;
