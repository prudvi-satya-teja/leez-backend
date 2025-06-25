const Favourites = require("../models/favorites.model");
const Products = require("../models/products.model");
const Customers = require("../models/customers.model");
const mongoose = require("mongoose");

const addToFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const productObjectId = new mongoose.Types.ObjectId(productId);

        const newFavorite = new Favourites({
            productId: productObjectId,
            customerId: userObjectId,
        });

        await newFavorite.save();

        return res.status(200).json({
            success: true,
            message: "Product added to Favourite Successfully",
        });
    } catch (err) {
        console.error("Error is:", err);
        return res.status(500).json({
            success: false,
            message: "Server error!",
        });
    }
};

// remove from favorites
const removeFromFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const productObjectId = new mongoose.Types.ObjectId(productId);

        await Favourites.findOneAndDelete({ productId: productObjectId, customerId: userObjectId });
        return res
            .status(200)
            .json({ success: true, message: "Product removed from Favourite Successfully" });
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({ success: false, message: "Server error !" });
    }
};

// get all favorites
// const getFavorites = async (req, res) => {
//   try {
//         const { userId} = req.body;
//         const favorites = await Favourites.findOne({customerId: userId});
//     }
// }

module.exports = {
    addToFavorite,
    removeFromFavorite,
};
