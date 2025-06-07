const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    cusomer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    count: { type: Number },
    start_date_time: { type: timestamp },
    end_date_time: { type: DateTime },
    status: {
        type: String,
        enum: ["ongoing", "started", "completed", "cancelled", "pending", "confirmed"],
    },
});

const Bookings = mongoose.model("bookings", bookingSchema);

module.exports = Bookings;
