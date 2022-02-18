const UserModel = require("./models/User");
const ListingModel = require("./models/Listing");
const BookingModel = require("./models/Booking");
const jwt = require("jsonwebtoken");

exports.resolvers = {
    Query: {
        me: async (parent, args, { user, sub }) => {
            return await UserModel.findById(sub);
        },
        getBookingByLoginedUser: async (parent, args, { user }) => {
            return await BookingModel.find({ username: user.username });
        },
        getListingsByAdmin: async (parent, args) => {
            return await ListingModel.find({ username: args.username });
        },
        getListingsByLoginedAdmin: async (parent, args, { user }) => {
            return await ListingModel.find({ username: user.username });
        },
        getListingsByName: async (parent, args) => {
            return await ListingModel.find({ title: { $regex: ".*" + args.title + ".*" } });
        },
        getListingsByCity: async (parent, args) => {
            return await ListingModel.find({ city: args.city });
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            let newUser = await UserModel({ ...args });
            return newUser.save();
        },
        login: async (parent, args) => {
            let user = await UserModel.findOne({ username: args.username, password: args.password });
            return await jwt.sign({ user }, "SUPER_SECRET", { algorithm: "HS256", subject: user._id.toString(), expiresIn: "1d" });
        },
        addListing: async (parent, args, { user }) => {
            if (!user) {
                return null;
            }

            let newListing = await ListingModel({
                title: args.title,
                description: args.description,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
                username: user.username,
            });
            return newListing.save();
        },
        addBooking: async (parent, args, { user }) => {
            if (!user) {
                return null;
            }

            let newBooking = await BookingModel({
                listing_id: args.listing_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                username: user.username,
            });
            return newBooking.save();
        },
    },
};
