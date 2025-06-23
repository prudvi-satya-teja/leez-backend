const Favourites = require("../models/favorites.model");
const Products = require("../models/products.model");
const Customers = require("../models/customers.model");

// add to favorites
const addToFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const newFavorite = new Favourites({ productId: productId._id, customerId: userId });
        await newFavorite.save();
        return res
            .status(200)
            .json({ success: true, message: "Product added to Favourite Successfully" });
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({ success: false, message: "Server error !" });
    }
};

// remove from favorites
const removeFromFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        await Favourites.findOneAndDelete({ productId: productId._id, customerId: userId })
        return res
            .status(200)
            .json({ success: true, message: "Product removed from Favourite Successfully" });
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({ success: false, message: "Server error !" });
    }
};

module.exports = {
    addToFavorite,
    removeFromFavorite
};

