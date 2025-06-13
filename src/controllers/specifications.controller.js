const Specifications = require("../models/specifications.model");
const Category = require("../models/categories.model");

const addSpecification = async(req, res) => {
    try {
        const {category, name}= req.body;
        const findCategory = await Category.findOne({name: category});
        if(!findCategory) return res.status(400).json({success: false, message: "Category not found"});
    }
    catch(err) {
        console.log("Error is: ", err);
        return res.status(500).json({success: false, message: "Server Error !"});
    }
}

module.exports = {
    addSpecification
}