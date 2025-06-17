const Vendor = require("../models/vendors.model");
const Category = require("../models/categories.model");
const Product = require("../models/products.model");
const ProductSpecifications = require("../models/product_specificatioins.model");
const Specifications = require("../models/specifications.model");
const { eventNames } = require("../models/otp.model");

const addProduct = async (req, res) => {
    try {
        const { email, name, category, price, description, count, location, specifications } =
            req.body;

        const vendorId = await Vendor.findOne({ email: email });
        const categoryId = await Category.findOne({ name: category });

        const product = await Product.findOne({
            ownerId: ownerId._id,
            name: name,
            categoryId: categoryId._id,
        });

        if (product) {
            return res.status(400).json({ success: false, message: "Product already exists" });
        }

        const newProduct = new Product({
            vendorId: ownerId._id,
            name: name,
            categoryId: categoryId._id,
            price: price,
            description: description,
            count: count,
            location: location,
        });

        await newProduct.save();

        const productId = await Product.findOne({ name: name });

        for (let i = 0; i < 4; i++) {
            const specificationId = await Specifications({ name: specifications[i].key });
            const productSpecifications = new ProductSpecifications({
                specificationId: specificationId,
                value: specifications[i].value,
                productId: productId._id,
            });

            await productSpecifications.save();
        }

        await newProduct.save();
        return res.status(200).json({ success: true, message: "Product added successfully" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: true, message: "Server Error !" });
    }
};

module.exports = {
    addProduct,
};
