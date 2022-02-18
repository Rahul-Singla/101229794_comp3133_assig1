const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    booking_date: { type: Date, required: true },
    booking_start: { type: Date, required: true },
    booking_end: { type: Date, required: true },
    username: { type: String, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
