const Customers = require("../models/customers.model");
const Products = require("../models/products.model");
const Vendors = require("../models/vendors.model");
const Bookings = require("../models/bookings.model");


// book an product 
const bookAnItem = async (req, res) => {
    try {
        const { email, vendorEmail, productName, count, startDateTime, endDateTime } = req.body;
        const customer = await Customers.findOne({ email: email });
        const vendor = await Vendors.findOne({ email: vendorEmail });
        const product = await Products.findOne({ vendorId: vendor._id, name: productName });
        const booking = new Bookings({
            customerId: customer._id,
            productId: product._id,
            count: count,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            status: "pending",
        });

        await booking.save();

        return res.status(200).json({
            success: true,
            message: "Your booking is placed successfully. Owner will need to accept your request",
        });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// cancel the product


// cancel an prodcut
module.exports = {
    bookAnItem,
};
