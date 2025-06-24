const Vendor = require("../models/vendors.model");
const Category = require("../models/categories.model");
const Product = require("../models/products.model");
const ProductSpecifications = require("../models/product_specificatioins.model");
const Specifications = require("../models/specifications.model");
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
        const products = await Product.find();
        return res
            .status(200)
            .json({ success: true, message: "Products get successfully", products: products });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: true, message: "Server Error !" });
    }
};

// get products by category

// GET /api/products/all-products?categoryId=60f123abc456...

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log(req.params);
        console.log(category);
        // Step 1: Find category by name
        const categoryDoc = await Category.findOne({ name:category});
         console.log(categoryDoc);
        if (!categoryDoc) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        const categoryId = categoryDoc._id;

        // Step 2: Find products by categoryId
        const products = await Product.find({ categoryId });

        return res.status(200).json({
            success: true,
            categoryId,
            products,
        });
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
module.exports = {
    addProduct,
    getAllProducts,
    getProductsByCategory
};

