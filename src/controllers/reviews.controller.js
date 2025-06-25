const mongoose = require("mongoose");
const Reviews = require("../models/reviews.model");

// give review
const giveReview = async (req, res) => {
    try {
        const { bookingId, rating, reviewText } = req.body;
        const review = new Reviews({
            bookingId: new mongoose.Types.ObjectId(bookingId),
            rating: rating,
            reviewText: reviewText,
        });

        await review.save();
        return res.status(200).json({ success: true, message: "Review get successfully" });
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({ success: true, message: "Server Error !" });
    }
};

// get-reviews
const getReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Reviews.findById(productId);
        return res.status(200).json({success: true, message: "Reviews get Successfully", reviews: reviews});
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({ success: true, message: "Server Error !" });
    }
};


// get-rating
const getRating = async(req, res) => {
    try {
        const { productId} = req.query;
        const productObjectId = new mongoose.Types.ObjectId(productId);
        const rating = await Reviews.aggregate([]);
        return res.status(200).json({success: true, message: "Average Rating provided successfully"});
    }
    catch(err) {
         console.log("Error is : ", err);
        return res.status(500).json({ success: true, message: "Server Error !" });
    }
}

module.exports = {
    giveReview,
};
