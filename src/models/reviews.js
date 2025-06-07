const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "bookings" },
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    feedback_text: { type: String },
    images: [{ type: String }],
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
