const mongoose = require('mongoose');

//@TODO: Change the uniqueness to true in email and username

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        area: {
            type: String,
            required: false,
        },
        pincode: {
            type: Number,
            required: false,
        },
    },
    { collection: 'users', timestamps: true }
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
