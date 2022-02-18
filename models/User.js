const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Duplicate Username Not allowed"],
    },
    firstname: {
        type: String,
        required: [true, "Please enter first name"],
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        lowercase: true,
        validate: function (value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        },
    },
    password: { type: String, required: true },
    type: { type: String, enum: ["USER", "ADMIN"], default: "User" },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
