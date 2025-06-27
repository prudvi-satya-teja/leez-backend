const Vendor = require("../models/vendors.model");
const Category = require("../models/categories.model");
const Product = require("../models/products.model");
const ProductSpecifications = require("../models/product_specificatioins.model");
const Specifications = require("../models/specifications.model");

const mongoose = require("mongoose");
// add product
const addProduct = async (req, res) => {
    try {
        const { email, name, category, price, description, count, longitude, latitude } = req.body;
        console.log(req.body);
        const vendorId = await Vendor.findOne({ email: email });
        const categoryId = await Category.findOne({ name: category });

        const product = await Product.findOne({
            vendorId: vendorId._id,
            name: name,
            categoryId: categoryId._id,
        });

        console.log(product);

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
            const specification = await Specifications.findOne({ name: key });
            console.log(specification);
            const productSpecifications = new ProductSpecifications({
                specificationId: specification._id,
                value: value,
                productId: productId._id,
            });

            await productSpecifications.save();
        }
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
        const products = await Category.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "result",
                },
            },
            {
                $unwind: {
                    path: "$result",
                },
            },
            {
                $lookup: {
                    from: "favorites",
                    localField: "result._id",
                    foreignField: "productId",
                    as: "status",
                },
            },
            {
                $unwind: {
                    path: "$status",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);
        return res
            .status(200)
            .json({ success: true, message: "Product added successfully", products: products });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: true, message: "Server Error !" });
    }
};

// get products by category

// GET /api/products/all-products?categoryId=60f123abc456...
const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const categoryDoc = await Category.findOne({ name: categoryId });

        console.log(categoryDoc);
        if (!categoryDoc) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        const products = await Category.aggregate([
            {
                $match: {
                    name: categoryId,
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "result",
                },
            },
            {
                $unwind: {
                    path: "$result",
                },
            },
            {
                $lookup: {
                    from: "favorites",
                    localField: "result._id",
                    foreignField: "productId",
                    as: "status",
                },
            },
            {
                $unwind: {
                    path: "$status",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);

        console.log(products);

        return res.status(200).json({
            success: true,
            message: "All Products get successful",
            categoryId: categoryDoc._id,
            products: products,
        });
    } catch (error) {
        console.error("Error fetching category ID:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
// get product details by  Id
const getProductDetailsByCategory = async (req, res) => {
    try {
        const { productId } = req.query;
        const productObjectId = new mongoose.Types.ObjectId("685bc0879af09398acc4197f");

        const product = await Product.findById(productObjectId);
        console.log(productObjectId);
        const specifications = await ProductSpecifications.aggregate([
            {
                $match: {
                    productId: productObjectId,
                },
            },
            {
                $lookup: {
                    from: "specifications",
                    localField: "specificationId",
                    foreignField: "_id",
                    as: "result",
                },
            },
            {
                $project: {
                    value: 1,
                    key: "$result.name",
                    _id: 0,
                },
            },
            {
                $unwind: {
                    path: "$key",
                },
            },
        ]);

        return res.json({ success: true, productDetails: product, specifications: specifications });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Servor Error" });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductsByCategory,
    getProductDetailsByCategory,
};
