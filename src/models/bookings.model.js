const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        cusomer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
        count: { type: Number, default: 1 },
        start_date_time: { type: Date, required: true },
        end_date_time: { type: Date, required: true },
        status: {
            type: String,
            enum: ["ongoing", "started", "completed", "cancelled", "pending", "confirmed"],
        },
    },
    {
        timestamps: true,
    }
);
 
const Bookings = mongoose.model("bookings", bookingSchema);

module.exports = Bookings;
