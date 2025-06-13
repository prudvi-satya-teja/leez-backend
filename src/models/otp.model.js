const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { expireAfterSeconds: 600000 }
);

const OTP = mongoose.model("otps", otpSchema);

module.export = OTP;
