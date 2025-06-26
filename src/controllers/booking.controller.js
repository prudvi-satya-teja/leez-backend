const Customers = require("../models/customers.model");
const Products = require("../models/products.model");
const Vendors = require("../models/vendors.model");
const Bookings = require("../models/bookings.model");

const mongoose = require("mongoose");

// book an product
const bookItem = async (req, res) => {
    try {
        const { productId, customerId, count, startDateTime, endDateTime } = req.body;
        const productObjectId = new mongoose.Types.ObjectId(productId);
        const customerObjectId = new mongoose.Types.ObjectId(customerId);

        const booking = new Bookings({
            customerId: customerObjectId,
            productId: productObjectId,
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

// accept the request by the vendor
const acceptBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
        const booking = await Bookings.findOneAndUpdate(
            { _id: bookingObjectId },
            { status: "confirmed" },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Your request is confirmed" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// start the initiation
const startBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
        const booking = await Bookings.findOneAndUpdate(
            { _id: bookingObjectId },
            { status: "started" },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Picked up the vehicle or object" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// ongoing
const userStartedBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
        const booking = await Bookings.findOneAndUpdate(
            { _id: bookingObjectId },
            { status: "ongoing" },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Your are started" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// cancelled by the use
const cancelledByUser = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
        const booking = await Bookings.findOneAndUpdate(
            { _id: bookingObjectId },
            { status: "cancelled by user" },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "User cancelled the booking" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// cancelled by the admin or refuse the request
const cancelledByVendor = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
        const booking = await Bookings.findOneAndUpdate(
            { _id: bookingObjectId },
            { status: "cancelled by vendor" },
            { new: true }
        );
        return res
            .status(200)
            .json({ success: true, message: "Admin cancelled the booking or request" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// returned sucessful
const returnedSuccessfully = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
        const booking = await Bookings.findOneAndUpdate(
            { _id: bookingObjectId },
            { status: "returned" },
            { new: true }
        );
        return res
            .status(200)
            .json({ success: true, message: "Returned the product successfully" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// customer bookings
const customerBookings = async (req, res) => {
    try {
        const { customerId } = req.body;
        const customerObjectId = new mongoose.Types.ObjectId(customerId);

        const booking = await Bookings.aggregate([
            {
                $match: {
                    customerId: customerObjectId,
                },
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customer",
                },
            },
            {
                $unwind: {
                    path: "$customer",
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: {
                    path: "$product",
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Customer bookings get successful",
            bookings: booking,
        });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

// vendor bookings
const vendorBookings = async (req, res) => {
    try {
        const { vendorId } = req.body;
        const vendorObjectId = new mongoose.Types.ObjectId(vendorId);

        const booking = await Bookings.aggregate([
            {
                $match: {
                    vendorId: vendorObjectId,
                },
            },
            {
                $limit: 1,
            },
            {
                $project: {
                    vendorId: 1,
                },
            },
            {
                $lookup: {
                    from: "bookings",
                    localField: "_id",
                    foreignField: "productId",
                    as: "booking",
                },
            },
            {
                $unwind: {
                    path: "$booking",
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "booking.productId",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: {
                    path: "$product",
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "vendor bookings get successful",
            bookings: booking,
        });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server Error !" });
    }
};

module.exports = {
    bookItem,
    acceptBooking,
    startBooking,
    userStartedBooking,
    cancelledByUser,
    cancelledByVendor,
    returnedSuccessfully,
    customerBookings,
    vendorBookings,
};
