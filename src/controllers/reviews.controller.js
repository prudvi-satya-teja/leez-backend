const mongoose = require("mongoose");
const Reviews = require("../models/reviews.model");

const giveReview = async (req, res) => {
    try {
        const { bookingId, rating, reviewText } = req.body;
        const review = new Reviews({
            bookingId: new mongoose.Types.ObjectId(bookingId),
            rating: rating,
            reviewText: reviewText,
        });

        await review.save();
        return res.status(200).json({ success: true, message: "Review given successful" });
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(200).json({ success: true, message: "Server Error !" });
    }
};

module.exports = {
    giveReview,
};
