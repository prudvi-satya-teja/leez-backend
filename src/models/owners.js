const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
    {
        owner_name: { type: String, required: true },
        password: { type: String },
        phone_no: {
            type: String,
            match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
            required: true,
        },
        email: { type: String, required: true },
        photo: { type: String },
    },
    {
        timestamps: true,
    }
);

const Owners = mongoose.model("owners", ownerSchema);

module.exports = Owners;
