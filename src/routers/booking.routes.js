const express = require("express");

const router = express.Router();

const  bookingController = require("../controllers/booking.controller");

// 1. Book an item
router.post("/book", bookingController.bookItem);

// 2. Accept a booking request (by vendor)
router.post("/accept", bookingController.acceptBooking);

// 3. Vendor marks product as provided
router.post("/start", bookingController.startBooking);

// 4. User confirms usage has started
router.post("/user-started", bookingController.userStartedBooking);

// 5. Cancelled by user
router.post("/cancel/user", bookingController.cancelledByUser);

// 6. Cancelled by admin/vendor
router.post("/cancel/vendor", bookingController.cancelledByVendor);

// 7. Booking returned successfully
router.post("/return", bookingController.returnedSuccessfully);


module.exports = router;


