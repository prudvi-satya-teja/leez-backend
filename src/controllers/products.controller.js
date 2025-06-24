const Vendor = require("../models/vendors.model");
const Category = require("../models/categories.model");
const Product = require("../models/products.model");
const ProductSpecifications = require("../models/product_specificatioins.model");
const Specifications = require("../models/specifications.model");
const { version } = require("mongoose");

// add product
const addProduct = async (req, res) => {
    try {
        const { email, name, category, price, description, count, longitude, latitude } = req.body;

        const vendorId = await Vendor.findOne({ email: email });
        const categoryId = await Category.findOne({ name: category });

        const product = await Product.findOne({
            vendorId: vendorId._id,
            name: name,
            categoryId: categoryId._id,
        });

        if (product) {
            return res.status(400).json({ success: false, message: "Product already exists" });
        }

        const imageUrls = req.files.map((file) => file.filename);

        const newProduct = new Product({
            vendorId: vendorId._id,
            name: name,
            categoryId: categoryId._id,
            price: price,
            description: description,
            count: count,
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
            images: imageUrls,
        });

        await newProduct.save();

        const productId = await Product.findOne({ name: name });

        console.log(newProduct);

        // build specifications manually from form-data
        const specifications = [];
        for (let i = 0; i < 4; i++) {
            const key = req.body[`specifications[${i}].key`];
            const value = req.body[`specifications[${i}].value`];
            // if (key && value) {
            //     specifications.push({ key, value });
            // }
            const specificationId = await Specifications({ name: key });
            const productSpecifications = new ProductSpecifications({
                specificationId: specificationId,
                value: value,
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

// remove product

// update product

// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res
            .status(200)
            .json({ success: true, message: "Product added successfully", products: products });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: true, message: "Server Error !" });
    }
};

// get products by category

module.exports = {
    addProduct,
};
