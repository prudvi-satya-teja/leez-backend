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
            { status: "cancelled by Admin" },
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
            { status: "cancelled by Admin" },
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

module.exports = {
    bookItem,
    acceptBooking,
    startBooking,
    userStartedBooking,
    cancelledByUser,
    cancelledByVendor,
    returnedSuccessfully,
};
