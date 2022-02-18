const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    price: { type: Number, min: 1, required: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: function (value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        },
    },
    username: { type: String, required: true },
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
