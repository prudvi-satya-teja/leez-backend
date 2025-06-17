const Favourites = require("../models/favorites.model");
const Products = require("../models/products.model");
const Customers = require("../models/customers.model");

const addToFavorite = async (req, res) => {
    try {
        const { name, vendorEmail, email } = req.body;

        const productId = await Products.findOne({ name: name });
        const customer = await Customers.findOne({ email: email });

        // console.log(req.body);

        const newFavorite = new Favourites({ productId: productId._id, customerId: customer._id });
        await newFavorite.save();
        return res
            .status(200)
            .json({ success: true, message: "Product added to Favourite Successfully" });
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({ success: false, message: "Server error !" });
    }
};

module.exports = {
    addToFavorite,
};
